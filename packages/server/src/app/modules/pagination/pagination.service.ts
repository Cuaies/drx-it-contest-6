import { getPaginationDto } from '@drx-it-contest-6/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Attributes, FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';

export class PaginationDto extends getPaginationDto() {}

@Injectable()
export class PaginationService {
  async paginate<M extends Model>(
    paginationDto: PaginationDto,
    model: ModelCtor<M>,
    extraWhereOptions?: WhereOptions<Attributes<M>>,
    extraFindOptions?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>,
  ) {
    const modelFields = Object.keys(model.getAttributes());
    const { limit, sortField, sortOrder, cursor, ...filters } = paginationDto;

    const whereOptions = {
      ...Object.entries(filters).reduce((acc, [key, value]) => {
        if (modelFields.includes(key)) {
          acc[key] = {
            [Op.like]: `%${value}%`,
          };
        }
        return acc;
      }, {}),
      ...extraWhereOptions,
    };

    if (cursor) {
      const cursorCondition =
        sortOrder === 'ASC' ? { [Op.gt]: cursor } : { [Op.lt]: cursor };

      whereOptions[sortField] = cursorCondition;
    }

    const findOptions: Omit<FindAndCountOptions<Attributes<M>>, 'group'> = {
      where: whereOptions,
      order: [[sortField, sortOrder]],
      limit,
      ...extraFindOptions,
    };

    let queryResponse;

    try {
      queryResponse = await model.findAndCountAll(findOptions);
    } catch (e) {
      if (
        (e as { parent?: { code?: string } })?.parent?.code === '42883' ||
        (e as { parent?: { code?: string } })?.parent?.code === '22P02' ||
        (e as { parent?: { code?: string } })?.parent?.code === '42703'
      ) {
        throw new BadRequestException();
      }
      throw e;
    }

    const { rows, count } = queryResponse;

    if (sortOrder === 'DESC') {
      rows.reverse();
    }

    const nextCursor =
      rows.length && count > limit ? rows[rows.length - 1][sortField] : null;
    const prevCursor = cursor
      ? rows.length
        ? rows[0][sortField]
        : null
      : null;

    return {
      count,
      nextCursor,
      prevCursor,
      rows,
    };
  }
}
