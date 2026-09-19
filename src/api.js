import axios from "axios";
import { API_URL } from "./config/getUrl";
import { fetchGapiDomain } from "./common-lib/config/gapidomain";

axios.defaults.withCredentials = true;

const TOKEN =
  "fbfbf3a5a4d168940fa2c0516725439ef4f5d46fa6805653b2dc59308de65f0e";
export const apiGetHelp = (gameId, lang) => {
  return axios.get(`${API_URL}/frontend/help/?game_id=${gameId}&lang=${lang}`, {
    headers: { token: TOKEN },
  });
};

export const apiGetPayTable = (gameId) => {
  return axios.get(`https://gapi.twp999.cc/api/frontend/pay_table/?game_id=${gameId}`, {
    headers: { token: TOKEN },
  });
};

export const apiGetImgsDomain = (query = "imgbaseon") => {
  return axios.get(
    `${fetchGapiDomain({})}/domain/?type=${query}
  `,
    {
      headers: {
        token:
          "d2777be739f7674d1299bdafa8050f36d1c0cfd3904e241d6a756c08c5b6bfdf",
      },
    }
  );
};
