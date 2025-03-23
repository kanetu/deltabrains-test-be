import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize";

const Attendee = sequelize.define("Attendee", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  gender: {
    type: DataTypes.ENUM("Anh", "Chị"),
    allowNull: false,
    validate: {
      len: [1, 500],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },

  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
    },
  },
});

export { Attendee };
