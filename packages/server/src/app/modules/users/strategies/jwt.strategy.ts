import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models';
import { JWT_AT, JWT_AT_COOKIE } from '../../../../core/constants';
import { Role } from '../../roles/models';

@Injectable()
export class JwtAtStrategy extends PassportStrategy(Strategy, JWT_AT) {
  constructor(
    configService: ConfigService,
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies[JWT_AT_COOKIE];
          }
          return token;
        },
      ]),
      secretOrKey: configService.get('auth.jwt_secret'),
    });
  }

  /**
   * Validates JWT and returns the relevant user.
   */
  async validate(payload: { sub: number }) {
    const user = await this.userModel.findByPk(payload.sub, {
      include: [{ model: Role }],
    });

    return user?.dataValues;
  }
}
