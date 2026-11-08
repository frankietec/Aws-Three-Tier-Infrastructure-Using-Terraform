
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      middleName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      programmingLanguage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankCard: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      lastLoginDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      salary: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 400,
      },
      lastSalaryIncreaseDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE'),
      },
      position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mentorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vacationDates: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      hireDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE'),
      },
      githubLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedinLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      adminNote: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      currentProject: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      englishLevel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workingHoursPerWeek: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM('employee', 'admin'),
        allowNull: false,
        defaultValue: 'employee',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      schema: 'public',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users', { schema: 'public' });
  },
};
