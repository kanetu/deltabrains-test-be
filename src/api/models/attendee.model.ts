import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize";

const Attendee = sequelize.define("attendee", {
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
    type: DataTypes.ENUM("Anh", "Chi"),
    allowNull: false,
    validate: {
      len: [1, 500],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
    },
  },
});

export { Attendee };
