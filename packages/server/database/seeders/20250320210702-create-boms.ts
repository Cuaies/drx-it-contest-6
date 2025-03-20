'use strict';

import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [products] = await queryInterface.sequelize.query(
      'SELECT * FROM products',
    );

    const DATE_REF = faker.date.between({
      from: new Date('2025-01-01T00:00:00'),
      to: new Date('2025-03-03T23:59:59'),
    });

    const queryPayload = Array.from(
      {
        length: faker.number.int({
          min: products.length / 2,
          max: products.length,
        }),
      },
      () => {
        return {
          name: faker.commerce.product(),
          created_at: DATE_REF,
          updated_at: faker.date.soon({ days: 20, refDate: DATE_REF }),
        };
      },
    );

    await queryInterface.bulkInsert('boms', queryPayload);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('boms', null, {});
  },
};
