'use strict';

import { faker } from '@faker-js/faker';
import {
  generateRomanianPhoneNumber,
  hashPassword,
} from '../../src/core/utils';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const queryPayload = Array.from(
      { length: faker.number.int({ max: 50 }) },
      (_, i) => {
        const updated_at = faker.date.past({ years: 1 });

        const userData = {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          phone_number: generateRomanianPhoneNumber(),
          password_hash: hashPassword(faker.internet.password()),
          created_at: faker.date.past({ refDate: updated_at }),
          updated_at,
          deleted_at: faker.datatype.boolean({ probability: 0.1 })
            ? faker.date.between({ from: updated_at, to: Date.now() })
            : null,
        };

        if (i === 0) {
          return {
            email: 'admin@admin.com',
            password_hash: hashPassword('STRONG@#$%asf,3.'),
            ...userData,
          };
        }

        return userData;
      },
    );

    await queryInterface.bulkInsert('users', queryPayload);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
