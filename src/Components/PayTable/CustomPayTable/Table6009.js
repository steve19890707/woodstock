import React, { Fragment } from "react";
import cx from "classnames";
import { useSelector } from "react-redux";
import TotalBet from "../TotalBet";
// lib
import { createSymbol } from "../../../config/replace";
import { getData } from "common-lib/lib";
// config
import { currencyList } from "../../../config/currencyList";
import translation from "../../../config/translation";
// styled
import { PayTableWrapper, PayList } from "../CommonPaytable/Normal";
import Any from "../Any";

const Table6009 = ({
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
        {getData(payTableData, ["math_data"]) && (
          <div className="half">
            <div className="pic">
              <img
                className={cx("pay-img object-fit-scale", {
                  bigSymbol: symbol.some((i) => i === "H1"),
                  mobileSize: windowDimensions.width < 375,
                })}
                alt=""
                src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/H1.png`}
              />
            </div>
            <div className="list">
              {[]
                .concat(
                  getData(payTableData, ["math_data"]).find(
                    (v) => getData(v, ["SymbolName"]) === "H1"
                  ).SymbolPays
                )
                .reverse()
                .map((v, k, array = getData(v, ["SymbolPays"])) => (
                  <Fragment key={k}>
                    {v !== 0 && (
                      <Any key={k}>
                        {k !== 2 && translation["any"][lang]}
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
                      </Any>
                    )}
                  </Fragment>
                ))}
            </div>
          </div>
        )}
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
                getData(i, ["SymbolName"]) !== "W5" &&
                getData(i, ["SymbolName"]) !== "H1" &&
                getData(i, ["SymbolName"]) !== "N4"
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
        {getData(payTableData, ["math_data"]) && (
          <div className="half">
            <div className="pic">
              <img
                className={cx("pay-img object-fit-scale", {
                  bigSymbol: symbol.some((i) => i === "N4"),
                  mobileSize: windowDimensions.width < 375,
                })}
                alt=""
                src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/N4.png`}
              />
            </div>
            <div className="list">
              {getData(payTableData, ["math_data"])
                .find((v) => getData(v, ["SymbolName"]) === "N4")
                .SymbolPays?.reverse()
                .map((v, k, array = getData(v, ["SymbolPays"])) => (
                  <Fragment key={k}>
                    {v !== 0 && (
                      <Any key={k}>
                        {translation["any"][lang]}
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
                      </Any>
                    )}
                  </Fragment>
                ))}
            </div>
          </div>
        )}
      </PayList>
    </PayTableWrapper>
  );
};

export default Table6009;
