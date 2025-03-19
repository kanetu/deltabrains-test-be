import { Model, UUIDV4, DataTypes, Sequelize } from "sequelize";
import sequelize from "../../config/sequelize";

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        customValidator(value: string) {
          if (new Date(value) < new Date()) {
            throw new Error("The date must be before today");
          }
        },
      },
    },
    maxPerson: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100,
      },
    },
  },
  {
    sequelize,
    modelName: "event", // We need to choose the model name
  }
);

export default Event;
