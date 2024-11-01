import { Click } from "../models";

class ClickDal {
  async getClickByInternalClickId(internalClickId) {
    const click = await Click.findOne({ where: { internalClickId } });
    return click;
  }
  async createClick(payload) {
    const click = new Click(payload);
    click.save();
    return click.toJSON();
  }
}

export default ClickDal;
