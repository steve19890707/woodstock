import React, { Fragment } from "react";
import styled from "styled-components";
import cx from "classnames";
import TotalBet from "../TotalBet";
// lib
import { createSymbol } from "../../../config/replace";
import { useSelector } from "react-redux";
import { getData } from "common-lib/lib";
// hooks
import BREAKPOINT from "../../../config/breakpoint";
// config
import { currencyList } from "../../../config/currencyList";
import translation from "../../../config/translation";
// styled
import { PayTableWrapper } from "../CommonPaytable/Normal";

const PayList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.windowDimensions.width >= BREAKPOINT ? "row" : "column"};
  text-align: left;
  flex-wrap: wrap;
  & .outline {
    width: 100%;
    display: flex;
    flex-direction: ${(props) =>
      props.windowDimensions.width >= BREAKPOINT ? "row" : "column"};
    text-align: left;
    flex-wrap: wrap;
    border: solid 1px #3a2c25;
    & p {
      width: 100%;
      text-align: center;
      margin: 0 0 20px 0;
      line-height: 2;
    }
    & .half {
      @media (min-width: 700px) {
        width: 50%;
      }
      @media (min-width: 1024px) {
        width: 50%;
      }
    }
  }
  & .half {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: -5px;
    @media (min-width: 700px) {
      width: 50%;
    }
    @media (min-width: 1024px) {
      width: 33.3%;
    }
    & .pic {
      width: 40%;
      padding: 20px 0;
      text-align: right;
      .pay-img {
        width: 112px;
        height: 112px;
        image-rendering: -webkit-optimize-contrast;
        &.h-pic {
          width: 112px;
          height: 200px;
        }
      }
    }
    & .list {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;
      margin-left: 10px;
      & > div {
        margin: 3px 0;
        white-space: nowrap;
      }
      & span {
        font-size: 24px;
        color: #ffd542;
        margin-left: 5px;
      }
    }
  }
`;
const Normal = ({
  lang,
  windowDimensions,
  payTableData,
  gameId,
  isCurrency,
  currency,
  denom,
  betLevel,
  moneyConvert,
  symbol,
  bet,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const payTableContent = {
    cn: "2个相同图标的得分奖励，只出现在免费游戏",
    en: "2 of a kind reward only appears in free games.",
    th: "สัญลักษณ์เหมือนกัน 2 ตัวที่ชนะรางวัลจะปรากฎเฉพาะในฟรีเกมเท่านั้น",
    id: "2 of a kind reward only appears in free games.",
    vn: "Thưởng 2 hình giống nhau chỉ xuất hiện trong Trò chơi miễn phí",
    ko: "동일한2개 아이콘의 득점 보상은 무료 게임에만 나타납니다",
    es: "2 of a kind reward only appears in free games.",
    ja: "2 of a kind reward only appears in free games.",
    "pt-br":
      "Prêmio de 2 imagens idênticas somente aparecem em jogos gratuitos",
    ph: "2 of a kind reward only appears in free games.",
  };
  return (
    <PayTableWrapper>
      <TotalBet
        lang={lang}
        isCurrency={isCurrency}
        currency={currency}
        bet={bet}
        denom={denom}
      />
      <p className="title">{translation["payTable"][lang]}</p>
      <PayList windowDimensions={windowDimensions}>
        <div className="outline">
          {getData(payTableData, ["math_data"]) &&
            getData(payTableData, ["math_data"])
              .filter(
                (i) =>
                  getData(i, ["SymbolName"]) === "H1" ||
                  getData(i, ["SymbolName"]) === "H2" ||
                  getData(i, ["SymbolName"]) === "H3" ||
                  getData(i, ["SymbolName"]) === "H4"
              )
              .map((v) => (
                <div className="half" key={getData(v, ["SymbolID"])}>
                  <div className="pic">
                    <img
                      className={cx("pay-img object-fit-scale h-pic", {
                        bigSymbol: symbol.some(
                          (i) => i === getData(v, ["SymbolName"])
                        ),
                        mobileSize: windowDimensions.width < 375,
                      })}
                      alt=""
                      src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                        v,
                        ["SymbolName"]
                      )}.png`}
                    />
                  </div>
                  <div className="list">
                    {[]
                      .concat(getData(v, ["SymbolPays"]))
                      .reverse()
                      .map((v, k, array = getData(v, ["SymbolPays"])) => (
                        <Fragment key={k}>
                          {v !== 0 && (
                            <div key={k}>
                              {array.length - k} -
                              <span className={cx({ money: isCurrency })}>
                                {isCurrency && (
                                  <div
                                    className="symbol"
                                    dangerouslySetInnerHTML={createSymbol(
                                      currencyList[currency]["symbol"],
                                      imgsdomain
                                    )}
                                  />
                                )}
                                {isCurrency
                                  ? moneyConvert(v * denom * betLevel)
                                  : v * betLevel}
                              </span>
                            </div>
                          )}
                        </Fragment>
                      ))}
                  </div>
                </div>
              ))}
          <p>{`( ${payTableContent[lang]} )`}</p>
        </div>
        {getData(payTableData, ["math_data"]) &&
          getData(payTableData, ["math_data"])
            .filter(
              (i) =>
                getData(i, ["SymbolName"]) === "N1" ||
                getData(i, ["SymbolName"]) === "N2" ||
                getData(i, ["SymbolName"]) === "N3" ||
                getData(i, ["SymbolName"]) === "N4" ||
                getData(i, ["SymbolName"]) === "N5" ||
                getData(i, ["SymbolName"]) === "N6"
            )
            .map((v) => (
              <div className="half" key={getData(v, ["SymbolID"])}>
                <div className="pic">
                  <img
                    className={cx("pay-img object-fit-scale", {
                      bigSymbol: symbol.some(
                        (i) => i === getData(v, ["SymbolName"])
                      ),
                      mobileSize: windowDimensions.width < 375,
                    })}
                    alt=""
                    src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                      v,
                      ["SymbolName"]
                    )}.png`}
                  />
                </div>
                <div className="list">
                  {[]
                    .concat(getData(v, ["SymbolPays"]))
                    .reverse()
                    .map((v, k, array = getData(v, ["SymbolPays"])) => (
                      <Fragment key={k}>
                        {v !== 0 && (
                          <div key={k}>
                            {array.length - k} -
                            <span className={cx({ money: isCurrency })}>
                              {isCurrency && (
                                <div
                                  className="symbol"
                                  dangerouslySetInnerHTML={createSymbol(
                                    currencyList[currency]["symbol"],
                                    imgsdomain
                                  )}
                                />
                              )}
                              {isCurrency
                                ? moneyConvert(v * denom * betLevel)
                                : v * betLevel}
                            </span>
                          </div>
                        )}
                      </Fragment>
                    ))}
                </div>
              </div>
            ))}
      </PayList>
    </PayTableWrapper>
  );
};

export default Normal;
