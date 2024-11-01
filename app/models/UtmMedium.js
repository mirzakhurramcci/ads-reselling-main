import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class UtmMedium extends Model {}

UtmMedium.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "utm_mediums",
    timestamps: true,
    tableName: "utm_mediums",
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
  }
);

export default UtmMedium;

// the defined model is the class itself
