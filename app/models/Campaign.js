import { DataTypes, Model } from "sequelize";
import { Offer } from ".";
import { sequelize } from "../config/db";

class Campaign extends Model {}

Campaign.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    offerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "offers",
        key: "id",
      },
    },
    status: {
      type: DataTypes.INTEGER,
    },
    gaTid: {
      type: DataTypes.STRING,
    },
    gaEa: {
      type: DataTypes.STRING,
    },
    gaEc: {
      type: DataTypes.STRING,
    },
    gaEl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "campaigns",
    timestamps: true,
    tableName: "campaigns",
  }
);
Campaign.belongsTo(Offer, { as: "offer", foreignKey: "offerId" });
export default Campaign;
