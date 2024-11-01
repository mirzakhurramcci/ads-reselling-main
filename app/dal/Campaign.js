import { Campaign, Offer } from "../models";

class CampaignDal {
  async getCampaignById(campaignId) {
    const campaign = await Campaign.findByPk(campaignId);
    if (campaign) return campaign.toJSON();
    return campaign;
  }

  async getCampaignByIdWithOffer(campaignId) {
    const campaign = await Campaign.findByPk(campaignId, {
      include: { model: Offer, as: "offer" },
    });
    if (campaign) return campaign.toJSON();
    return campaign;
  }
}
export default CampaignDal;
