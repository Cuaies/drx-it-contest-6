'use strict';

import { RolesEnum } from '../../src/ts/enums';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const queryPayload = Object.values(RolesEnum).map((role) => {
      return {
        roleName: role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Roles', queryPayload);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
