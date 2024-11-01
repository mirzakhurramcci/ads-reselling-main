import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Offer extends Model {}
Offer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    trackingUrl: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    payout: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "offers",
    timestamps: true,
    tableName: "offers",
  }
);

export default Offer;

// the defined model is the class itself
