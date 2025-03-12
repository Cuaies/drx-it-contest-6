'use strict';

import { DataType } from 'sequelize-typescript';
import { RolesEnum } from '../src/ts/enums';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: DataType.ENUM(...Object.values(RolesEnum)),
        unique: true,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.bulkInsert('roles', [
      Object.values(RolesEnum).map((role) => {
        return { roleName: role };
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  },
};
