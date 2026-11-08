// models/notification.js
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      relatedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      type: {
        type: DataTypes.ENUM(
          "birthday_reminder",
          "birthday",
          "salary_increase_reminder",
          "salary_increased",
          "salary_threshold_reached",
          "welcome",
          "general",
          "employee_created",
          "user_update"
        ),
        allowNull: false,
        defaultValue: "general",
      },
      eventDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_DATE"),
      },
    },
    {
      schema: "public",
      tableName: "Notifications",
      timestamps: true,
    }
  );

  Notification.associate = function (models) {
    Notification.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Notification.belongsTo(models.User, {
      foreignKey: "relatedUserId",
      as: "relatedUser",
    });
  };

  return Notification;
};