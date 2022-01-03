'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userDonates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
            model: "users",
            key: "id",
          },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fundId: {
        type: Sequelize.INTEGER,
        references: {
            model: "funds",
            key: "id",
          },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      donateAmount: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending"
      },
      proofAttachment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userDonates');
  }
};