'use strict';

import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const queryPayload = Array.from(
      { length: faker.number.int({ max: 2000 }) },
      () => {
        return {
          material_number: faker.string.uuid(),
          material_description: faker.commerce.productDescription(),
          height: faker.number.int({ max: 1000 }),
          weight: faker.number.int({ max: 1000 }),
          width: faker.number.int({ max: 1000 }),
          created_at: faker.date.between({
            from: new Date('2025-01-01T00:00:00'),
            to: new Date('2025-03-03T23:59:59'),
          }),
          updated_at: faker.date.between({
            from: new Date('2025-01-01T00:00:00'),
            to: new Date('2025-12-31T23:59:59'),
          }),
        };
      },
    );

    await queryInterface.bulkInsert('materials', queryPayload);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('materials', null, {});
  },
};
