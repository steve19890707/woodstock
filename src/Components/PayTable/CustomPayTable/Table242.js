import React, { Fragment } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import cx from "classnames";
import TotalBet from "../TotalBet";
// lib
import { createSymbol } from "../../../config/replace";
import { getData } from "common-lib/lib";
// config
import { currencyList } from "../../../config/currencyList";
import translation from "../../../config/translation";
import { PayTableWrapper, PayList } from "../CommonPaytable/Normal";
const TotalValueAmount = styled.span`
  font-size: 20px !important;
  &.en {
    font-size: 14px !important;
  }
`;

const Table242 = ({
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
  isLongList,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const totalValueAmount = {
    tw: "總顯示分數",
    cn: "总显示分数",
    en: "TOTAL VALUE AMOUNT",
    ko: "총 심벌 점수",
    th: "แสดงคะแนนรวม",
  };
  const langFetch = (lang = "") => {
    const tw = lang === "zh-tw";
    const cn = lang === "cn";
    const ko = lang === "ko";
    const th = lang === "th";
    if (!tw && !cn && !ko && !th) {
      return "en";
    } else return lang;
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
      <PayList windowDimensions={windowDimensions} isLongList={isLongList}>
        {getData(payTableData, ["math_data"]) &&
          getData(payTableData, ["math_data"])
            .filter(
              (i) =>
                !getData(i, ["SymbolPays"]).every((v) => v === 0) &&
                getData(i, ["SymbolName"]) !== "SC" &&
                getData(i, ["SymbolName"]) !== "W" &&
                getData(i, ["SymbolName"]) !== "F" &&
                getData(i, ["SymbolName"]) !== "W1" &&
                getData(i, ["SymbolName"]) !== "W2" &&
                getData(i, ["SymbolName"]) !== "W3" &&
                getData(i, ["SymbolName"]) !== "W4" &&
                getData(i, ["SymbolName"]) !== "W5"
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
                  {getData(v, ["SymbolName"]) === "H5" && (
                    <div>
                      5 -
                      <TotalValueAmount
                        className={cx({ en: langFetch(lang) === "en" })}
                      >
                        {totalValueAmount[langFetch(lang)]}
                      </TotalValueAmount>
                    </div>
                  )}
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

export default Table242;
