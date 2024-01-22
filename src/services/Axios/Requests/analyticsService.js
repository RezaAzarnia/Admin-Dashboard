import { baseURL } from "../configs/Configs";

const getWebSiteAnaltic = async () => {
  try {
    const response = await baseURL.get("/websiteAnaltic");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSociaCampaignsInfo = async () => {
  try {
    const response = await baseURL.get("/sociaCampaignsInfo");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getWebSiteAnaltic, getSociaCampaignsInfo };
