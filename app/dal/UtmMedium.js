import { UtmMedium } from "../models";

class UtmMediumDal {
  async createOrFindByName(name) {
    const [utmMedium, created] = await UtmMedium.findOrCreate({ where: { name } });
    return utmMedium;
  }
}

export default UtmMediumDal;
