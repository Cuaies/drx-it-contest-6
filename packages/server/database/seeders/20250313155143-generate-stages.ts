'use strict';

import { StageDescriptions } from '../../src/core/constants';
import { RolesEnum, StagesEnum } from '../../src/ts/enums';

interface StageMapping {
  name: StagesEnum;
  description: string;
  role_id: RolesEnum | null;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const stageRoleMapping: Record<StagesEnum, RolesEnum | null> = {
      [StagesEnum.Concept]: RolesEnum.Designer,
      [StagesEnum.Fezabilitate]: RolesEnum.Seller,
      [StagesEnum.Proiectare]: RolesEnum.Designer,
      [StagesEnum.Productie]: RolesEnum.PortofolioManagement,
      [StagesEnum.Retragere]: RolesEnum.PortofolioManagement,
      [StagesEnum.StandBy]: RolesEnum.PortofolioManagement,
      [StagesEnum.Cancel]: RolesEnum.Admin,
    };

    const roleIds = await queryInterface.sequelize.query(
      'SELECT id, role_name FROM roles WHERE role_name IN (:roles)',
      {
        replacements: { roles: Object.values(RolesEnum) },
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    const roleMapping = roleIds.reduce(
      (
        acc: Record<RolesEnum, number>,
        role: { id: number; role_name: RolesEnum },
      ) => {
        acc[role.role_name] = role.id;
        return acc;
      },
      {},
    );

    const stageMappings: StageMapping[] = Object.values(StagesEnum).map(
      (stage) => ({
        name: stage,
        description: StageDescriptions[stage],
        role_id: stageRoleMapping[stage]
          ? roleMapping[stageRoleMapping[stage]]
          : null,
      }),
    );

    await queryInterface.bulkInsert('stages', stageMappings);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('stages', null, {});
  },
};
