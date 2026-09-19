import { getData } from "common-lib/lib";
import song from "../audio/UI_Button.mp3";
import song_GB from "../audio/UI_Button_GB.mp3";

// 預設語系 非中文即英文
export const fetchLanguage = (isMultiLang = true) => {
  const { navigator } = window;
  const nLanguage = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage;
  const language = isMultiLang
    ? nLanguage.split("-")[0] === "zh"
      ? "cn"
      : "en"
    : "cn";
  return language;
};

// 取網址參數
export const getQuery = (param) => {
  const url = window.location;
  const searchUrl = url.search.split("?");
  const joinQuery = searchUrl.slice(1, searchUrl.length).join("");
  const query = new URLSearchParams(joinQuery);
  const value = query.get(param);
  return value;
};
// 判斷手機的裝置
export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(new RegExp("Android", "i"));
  },
  BlackBerry: function () {
    return navigator.userAgent.match(new RegExp("BlackBerry", "i"));
  },
  iPhone: function () {
    return navigator.userAgent.match(new RegExp("iPhone", "i"));
  },
  Opera: function () {
    return navigator.userAgent.match(new RegExp("Opera Mini", "i"));
  },
  Windows: function () {
    return navigator.userAgent.match(new RegExp("IEMobile", "i"));
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iPhone() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

// replace繁中
export const zhTwConvReplace = (value = "") => {
  let update = value;
  for (let i = 0; i < value.length; i++) {
    update = update.replace(/游/g, `遊`);
  }
  return update;
};

// 播放音效
export const playSound = (song) => {
  let sound = new Audio(song);
  sound.play();
  sound.onended = () => {
    sound.remove();
    sound.srcObject = null;
  };
};

// 播放音效
export const languageClickSound = (isSoundOn, gameId) => {
  if (isSoundOn) {
    if (gameId.includes("GB")) {
      if (gameId === "GB8" || gameId === "GB9" || gameId === "GB12") {
        playSound(song);
      } else {
        playSound(song_GB);
      }
    } else {
      playSound(song);
    }
  }
};

// 取得各RuleContent中的icon link, 因為javascript物件內有link 所以需要判斷掉
export const getFeatureIconLink = (rule = {}) => {
  const link = getData(rule, ["icon", "link"]);
  const result = typeof link === "function" ? "" : link;
  return {
    imageLink: result,
  };
};

export const formatNumber = (money) => {
  if (money.toFixed(0).toString().length > 6) {
    let num = `${money.toFixed(0).toString().slice(0, -6)}${
      money.toFixed(0).toString().slice(-6, -5) !== "0"
        ? `.${money.toFixed(0).toString().slice(-6, -5)}`
        : ".0"
    }${
      money.toFixed(0).toString().slice(-5, -4) !== "0"
        ? `${money.toFixed(0).toString().slice(-5, -4)}`
        : "0"
    }${
      money.toFixed(0).toString().slice(-4, -3) !== "0"
        ? `${money.toFixed(0).toString().slice(-4, -3)}`
        : "0"
    }${
      money.toFixed(0).toString().slice(-3, -2) !== "0"
        ? `${money.toFixed(0).toString().slice(-3, -2)}`
        : "0"
    }${
      money.toFixed(0).toString().slice(-2, -1) !== "0"
        ? `${money.toFixed(0).toString().slice(-2, -1)}`
        : "0"
    }${
      money.toFixed(0).toString().slice(-1) !== "0"
        ? `${money.toFixed(0).toString().slice(-1)}`
        : "0"
    }`;
    return `${num * 1}M`;
  } else {
    let num = `${money.toFixed(0).toString().slice(0, -3)}${
      money.toFixed(0).toString().slice(-3, -2) !== "0"
        ? `.${money.toFixed(0).toString().slice(-3, -2)}`
        : ".0"
    }${
      money.toFixed(0).toString().slice(-2, -1) !== "0"
        ? `${money.toFixed(0).toString().slice(-2, -1)}`
        : "0"
    }${
      money.toFixed(0).toString().slice(-1) !== "0"
        ? `${money.toFixed(0).toString().slice(-1)}`
        : "0"
    }`;
    return `${num * 1}K`;
  }
};
