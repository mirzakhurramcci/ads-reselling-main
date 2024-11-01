import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Click extends Model {}

Click.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    campaignId: {
      type: DataTypes.INTEGER,
      references: {
        model: "campaigns",
        key: "id",
      },
    },
    utmMediumId: {
      type: DataTypes.INTEGER,
      references: {
        model: "utm_mediums",
        key: "id",
      },
    },
    convertedAt: { type: DataTypes.DATE },
    status: { type: DataTypes.INTEGER },
    utmCampaign: { type: DataTypes.STRING },
    utmSource: { type: DataTypes.STRING },
    gclid: { type: DataTypes.STRING },
    isConverted: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    internalClickId: { type: DataTypes.STRING },
    payout: { type: DataTypes.STRING },
    currency: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "clicks",
    timestamps: true,
    tableName: "clicks",
    indexes: [
      {
        fields: ["internalClickId"],
      },
    ],
  }
);

export default Click;

// the defined model is the class itself
