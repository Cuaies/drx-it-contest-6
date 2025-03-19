'use strict';

import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const queryPayload = Array.from({ length: 20 }, () => {
      const updated_at = faker.date.past({ years: 1 });

      return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        estimated_height: faker.number.int({ max: 1000 }),
        estimated_weight: faker.number.int({ max: 1000 }),
        estimated_width: faker.number.int({ max: 1000 }),
        created_at: faker.date.past({ refDate: updated_at }),
        updated_at,
        deleted_at: faker.datatype.boolean({ probability: 0.1 })
          ? faker.date.between({ from: updated_at, to: Date.now() })
          : null,
      };
    });

    await queryInterface.bulkInsert('products', queryPayload);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
