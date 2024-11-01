import { generateError, responses } from "../config/responseCodes";
import ClickDal from "../dal/Click";
import CampaignDal from "../dal/Campaign";
import UtmMedium from "../dal/UtmMedium";
import { v4 as uuid } from "uuid";
import axios from "axios";

const clickDal = new ClickDal();
const campaignDal = new CampaignDal();
const utmMediumDal = new UtmMedium();

class Campaign {
  async markConversion(internalClickId, currency, payout) {
    const click = await clickDal.getClickByInternalClickId(internalClickId);
    if (!click) generateError(responses.invalidParameters, "Click not found");

    if (click.isConverted) {
      const errMessage = "Click already converted";
      generateError(responses.invalidParameters, errMessage);
    }

    const campaign = await campaignDal.getCampaignById(click.campaignId);

    click.isConverted = true;
    click.currency = currency;
    click.payout = payout;
    click.convertedAt = Date.now();
    click.save();
    if (click.gclid) {
      this.postGoogleCall(
        click.gclid,
        campaign.gaEl,
        campaign.gaEc,
        campaign.gaEa,
        campaign.gaTid
      );
    }
    return click.toJSON();
  }

  async generateTestLink(campaignId) {
    const campaign = await campaignDal.getCampaignByIdWithOffer(campaignId);
    if (!campaign) {
      generateError(responses.invalidParameters, "Campaign not found");
    }
    const clickPayload = {
      internalClickId: uuid(),
      campaignId: campaignId,
      utmMediumId: 1,
    };
    await clickDal.createClick(clickPayload);
    const trackingUrl = this.generateTrackingUrl(
      campaign.offer.trackingUrl,
      clickPayload.internalClickId,
      1
    );
    return trackingUrl;
  }

  async traffic(utmMediumName, gClickId, campaignId, utmCampaign, utmSource) {
    const utmMedium = await utmMediumDal.createOrFindByName(utmMediumName);
    const campaign = await campaignDal.getCampaignByIdWithOffer(campaignId);
    if (!campaign) {
      generateError(responses.invalidParameters, "Campaign not found");
    }
    const clickPayload = {
      internalClickId: uuid(),
      campaignId: campaign.id,
      utmMediumId: utmMedium.id,
      gclid: gClickId,
      utmSource: utmSource,
      utmCampaign: utmCampaign,
    };
    await clickDal.createClick(clickPayload);
    const trackingUrl = this.generateTrackingUrl(
      campaign.offer.trackingUrl,
      clickPayload.internalClickId,
      utmMedium.id
    );
    return trackingUrl;
  }

  generateTrackingUrl(url, uuid, utmId) {
    url = url.replace("{click_id}", uuid);
    url = url.replace("{pub_id}", utmId);
    return url;
  }

  postGoogleCall(gclid, gaEl, gaEc, gaEa, gaTid) {
    const data = `v=1&t=event&tid=${gaTid}&cid=1&ec=${gaEc}&ea=${gaEa}&el=${gaEl}&ev=1&gclid=${gclid}`;
    const config = {
      method: "post",
      url: "http://www.google-analytics.com/collect",
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    };
    axios(config)
      .then(console.log)
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Campaign;
