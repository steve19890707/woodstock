import axios from "axios";
import { API_URL } from "./config/getUrl";
import { fetchGapiDomain } from "./common-lib/config/gapidomain";

axios.defaults.withCredentials = true;

const TOKEN =
  "fbfbf3a5a4d168940fa2c0516725439ef4f5d46fa6805653b2dc59308de65f0e";
const mockHelpDetail = {
  game_id: "121",
  data: [
    {
      content:
        "<p>Any 3 [F1] on reel 1, 2, and 3, win 3 free spins, and the credits on scatters.</p><p>When the games match feature of base game and free game at the same time, the [F1] will counting twice for win prize.</p>",
      icon: {
        link: "random_wild",
        name: "隨機百搭",
      },
      title: "FREE GAME",
    },
    {
      content:
        "<p>Win prize with any [icons] anywhere on the reels. [icons] are held until the end of free spins.</p><p>Win 2000X BONUS AWARD with 15 [icons] on all reels! FREE GAME ends when either no FREE SPINS remain or BONUS AWARD is won.</p><p>If 1 or more [icons] spin up those [icons] are held anywhere on the reels and 1 or more FREE SPINS are awarded.&nbsp;You can retrigger the Bonus multiple times.The maximum number of free spins allowed is 15.</p><p>During free game, the play amount is the same as the game triggered the bonus.</p>",
      title: "FREE GAME FEATURE",
    },
  ],
  default_data: [
    {
      content:
        "<p>Any 5 or more [icons] appearing on the reels win the scatter prize.</p><p>Possible [icons] prizes are 400, 80, 40, 30, 20, 16, 10, 8, 6 , 4, 2,&nbsp;multiplied by play amount during base game.</p><p>Possible [icons] prizes are 1200, 800, 400, 80, 40, 30, 20 ,16 , 10&nbsp;multiplied by play amount during free game.</p>",
      icon: {
        link: "main_game_feature",
        name: "主遊戲特色",
      },
      title: "BASE GAME FEATURE",
    },
  ],
  game_title: true,
  game_name: {
    cn: "直式跳起来2",
  },
  game_icon: "https://rd3-dev-images.guardians.one/cherry/icon/B6WtMKzZ.png",
  created_at: "2022-02-16T09:58:35-04:00",
  updated_at: "2022-08-12T02:22:00-04:00",
  line: "any5",
  line_content: {
    data: "<p>Player will win prizes with any 5 or more [icons] appearing on the reels.</p>",
  },
  pay_table: {
    status: false,
    symbol: [],
    type: "normal",
  },
  edited: ["cn", "en", "es", "id", "ja", "ko", "th", "vn"],
};

export const apiGetHelp = (gameId, lang) => {
  // return axios.get(`${API_URL}/frontend/help/?game_id=${gameId}&lang=${lang}`, {
  //   headers: { token: TOKEN },
  // });
  return Promise.resolve({
    data: {
      error_msg: "SUCCESS",
      result: mockHelpDetail,
    },
  });
};

export const apiGetPayTable = (gameId) => {
  return axios.get(`https://gapi.twp999.cc/api/frontend/pay_table/?game_id=${gameId}`, {
    headers: { token: TOKEN },
  });
};

export const apiGetImgsDomain = (query = "imgbaseon") => {
  // return axios.get(
  //   `${fetchGapiDomain({})}/domain/?type=${query}
  // `,
  //   {
  //     headers: {
  //       token:
  //         "d2777be739f7674d1299bdafa8050f36d1c0cfd3904e241d6a756c08c5b6bfdf",
  //     },
  //   }
  // );
  return Promise.resolve({
    data: {
      result: `${process.env.PUBLIC_URL || ""}/mock/hfyali`,
    },
  });
};
