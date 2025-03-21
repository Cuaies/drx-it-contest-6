'use strict';

import { RolesEnum } from '../../src/ts/enums';

module.exports = {
  up: async (queryInterface) => {
    const queryPayload = Object.values(RolesEnum).map((role) => {
      return {
        role_name: role,
      };
    });

    await queryInterface.bulkInsert('roles', queryPayload);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
