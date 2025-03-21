'use strict';

import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [products] = await queryInterface.sequelize.query(
      'SELECT * FROM products',
    );
    const [stages] = await queryInterface.sequelize.query(
      'SELECT * FROM stages',
    );

    if (products.length > 0 && stages.length > 0) {
      for (const product of products) {
        let previousStageEnd = null;

        for (let i = 0; i < stages.length; i++) {
          const stage = stages[i];

          const startOfStage = previousStageEnd
            ? new Date(
                previousStageEnd.getTime() +
                  faker.number.int({ min: 7, max: 50 }) * 24 * 60 * 60 * 1000,
              )
            : faker.date.soon({ days: 50 });

          await queryInterface.bulkInsert('product_stages', [
            {
              product_id: product.id,
              stage_id: stage.id,
              start_of_stage: startOfStage,
            },
          ]);

          previousStageEnd = startOfStage;
        }
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('product_stages', null, {});
  },
};
