import { responses } from "../config/responseCodes";
import Campaign from "../services/Campaign";

const campaign = new Campaign();

export const globalPostBack = async (req, res, next) => {
  try {
    console.log("Request Received\n%o", req.query);
    const { click_id, currency, payout } = req.query;
    await campaign.markConversion(click_id, currency, payout);
    res.json({ message: "success", responseCode: responses.success });
  } catch (err) {
    next(err);
  }
};

export const generateTestLink = async (req, res, next) => {
  try {
    const { campaign_id } = req.query;
    console.log("Request Received\n%o", req.query);
    const redirectUrl = await campaign.generateTestLink(campaign_id);
    res.redirect(redirectUrl);
  } catch (err) {
    next(err);
  }
};

export const traffic = async (req, res, next) => {
  try {
    console.log("Request Received\n%o", req.query);
    const { utm_medium, gclid, campaign_id, utm_campaign, utm_source } =
      req.query;
    const redirectUrl = await campaign.traffic(
      utm_medium,
      gclid,
      campaign_id,
      utm_campaign,
      utm_source
    );
    res.redirect(redirectUrl);
  } catch (err) {
    next(err);
  }
};
