'use strict';

import { faker } from '@faker-js/faker';
import { RolesEnum } from '../../src/ts/enums';
import { USER_CONSTANTS } from '@drx-it-contest-6/core';

module.exports = {
  up: async (queryInterface) => {
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');
    const [roles] = await queryInterface.sequelize.query('SELECT * FROM roles');

    if (roles.length > 0) {
      const userRoles = users.map((user) => {
        if (user.email === USER_CONSTANTS.adminUser.email) {
          return {
            user_id: user.id,
            role_id: roles.find((r) => r.role_name === RolesEnum.Admin).id,
            created_at: faker.date.past({ years: 1 }),
          };
        }

        return {
          user_id: user.id,
          role_id: roles[Math.floor(Math.random() * roles.length)].id,
          created_at: faker.date.past({ years: 1 }),
        };
      });

      await queryInterface.bulkInsert('user_roles', userRoles);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_roles', null, {});
  },
};
