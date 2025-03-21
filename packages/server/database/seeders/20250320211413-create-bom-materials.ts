'use strict';

import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [boms] = await queryInterface.sequelize.query('SELECT * FROM boms');
    const [materials] = await queryInterface.sequelize.query(
      'SELECT * FROM materials',
    );

    const DATE_REF = faker.date.between({
      from: new Date('2025-01-01T00:00:00'),
      to: new Date('2025-03-03T23:59:59'),
    });

    const usedBomMaterialPairs = new Set();

    const queryPayload = Array.from(
      {
        length: faker.number.int({
          min: boms.length,
          max: boms.length * 5,
        }),
      },
      () => {
        const bomIndex = () => Math.floor(Math.random() * boms.length);
        const materialIndex = () =>
          Math.floor(Math.random() * materials.length);

        let bomId = boms[bomIndex()].id;
        let materialId = materials[materialIndex()].material_number;

        while (usedBomMaterialPairs.has(`${bomId}-${materialId}`)) {
          bomId = boms[bomIndex()].id;
          materialId = materials[materialIndex()].material_number;
        }

        usedBomMaterialPairs.add(`${bomId}-${materialId}`);

        return {
          bom_id: bomId,
          material_number: materialId,
          qty: faker.number.int({ min: 1, max: 5000 }),
          unit_measure_code: faker.science.unit().name,
          created_at: DATE_REF,
          updated_at: faker.date.soon({ days: 20, refDate: DATE_REF }),
        };
      },
    );

    await queryInterface.bulkInsert('bom_materials', queryPayload);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('bom_materials', null, {});
  },
};
