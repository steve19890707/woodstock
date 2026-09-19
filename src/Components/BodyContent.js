import React, { useState } from "react";
import { zhTwConvReplace } from "../lib";
import { sify, tify } from "chinese-conv";
import styled from "styled-components";
// hooks
import useGetQuery from "lib/hooks/useGetQuery";
// config
import translation from "../config/translation";
import BREAKPOINT from "../config/breakpoint";
import { getData } from "common-lib/lib";
import { formatNumber } from "../lib/index";

import { slotImgFetch } from "../config/replace";

// components
import WildFree from "./WildFree";
import PayTable from "./PayTable";
import Rules from "./Rules";
import Ways from "./Ways";

const Content = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: ${(props) =>
    props.windowDimensions.width >= BREAKPOINT ? "1024px" : "375px"};
  padding: ${(props) =>
    props.windowDimensions.width >= BREAKPOINT
      ? "40px 50px 80px"
      : "40px 35px 80px"};
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
  ${(props) => {
    return props.theme.bodyContentlayout(props);
  }}
`;

const BodyContent = ({
  helpData = {},
  lang = "",
  windowDimensions,
  payTableData = {},
}) => {
  const { gameId, denom, bet, betLevel, currency, isCurrency } = useGetQuery();
  const [isMoneyOver6, setIsMoneyOver6] = useState(false);
  const [isMoneyOver7, setIsMoneyOver7] = useState(false);
  const longListGame = ["34", "136", "153", "184", "GB5001", "TA25", "TA1011"]; // SymbolPays length > 4
  const defaultData = getData(helpData, ["default_data"], []);
  const createContent = (value, gameId, imagesdomain) => {
    return {
      __html: slotImgFetch({
        html:
          lang === "zh-tw"
            ? zhTwConvReplace(tify(value))
            : lang === "cn"
            ? sify(value)
            : value,
        game_id: gameId,
        imagesdomain: imagesdomain,
      }),
    };
  };
  const moneyConvert = (money) => {
    const noNeedConvertList = ["cny", "usd", "thb", "krw"];
    const needConvert =
      !noNeedConvertList.includes(currency.toLowerCase()) &&
      money.toFixed(0).toString().length > 3;

    if (money.toFixed(0).toString().length >= 6 && !needConvert) {
      setIsMoneyOver6(true);
    }
    if (money.toFixed(0).toString().length >= 7 && !needConvert) {
      setIsMoneyOver7(true);
    }
    if (needConvert) {
      return formatNumber(money);
    } else {
      return money.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  };
  return (
    <Content
      windowDimensions={windowDimensions}
      isMoneyOver6={isMoneyOver6}
      isMoneyOver7={isMoneyOver7}
    >
      {defaultData.length > 0 && (
        <WildFree
          lang={lang}
          helpData={helpData}
          windowDimensions={windowDimensions}
          createContent={createContent}
          gameId={gameId}
          payTableData={payTableData}
          isCurrency={isCurrency}
          currency={currency}
          denom={denom}
          betLevel={betLevel}
          moneyConvert={moneyConvert}
        />
      )}
      {defaultData.length > 0 && getData(helpData, ["pay_table", "status"]) && (
        <hr />
      )}
      {getData(helpData, ["pay_table", "status"]) && (
        <PayTable
          gameId={gameId}
          type={getData(helpData, ["pay_table", "type"])}
          propsData={{
            lang: lang,
            windowDimensions: windowDimensions,
            payTableData: payTableData,
            gameId: gameId,
            isCurrency: isCurrency,
            currency: currency,
            denom: denom,
            betLevel: betLevel,
            moneyConvert: moneyConvert,
            symbol: getData(helpData, ["pay_table", "symbol"]),
            bet: bet,
            isLongList: longListGame.includes(gameId),
          }}
        />
      )}
      {Object.keys(helpData).length !== 0 &&
        getData(helpData, ["data"]).length !== 0 && (
          <Rules
            gameId={gameId}
            propsData={{
              lang: lang,
              helpData: helpData,
              betLevel: betLevel,
              denom: denom,
              moneyConvert: moneyConvert,
              currency: currency,
              isCurrency: isCurrency,
              payTableData: payTableData,
              createContent: createContent,
              gameId: gameId,
              windowDimensions: windowDimensions,
              sify: sify,
              tify: (val) => zhTwConvReplace(tify(val)),
            }}
          />
        )}
      {getData(helpData, ["line"]) !== "none" && (
        <Ways
          helpData={helpData}
          lang={lang}
          windowDimensions={windowDimensions}
          createContent={createContent}
          gameId={gameId}
        />
      )}
      <hr className="caution-hr" />
      <p className="cautions">{translation["cautions"][lang]}</p>
    </Content>
  );
};

export default BodyContent;
