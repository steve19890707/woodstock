import React, { Fragment } from "react";
import cx from "classnames";
import TotalBet from "../TotalBet";
// lib
import { createSymbol } from "../../../config/replace";
import { useSelector } from "react-redux";
import { getData } from "common-lib/lib";
// config
import { currencyList } from "../../../config/currencyList";
import translation from "../../../config/translation";
// styled
import { PayTableWrapper, PayList } from "../CommonPaytable/Normal";

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
        {getData(payTableData, ["math_data"]) &&
          getData(payTableData, ["math_data"])
            .filter(
              (i) =>
                getData(i, ["SymbolName"]) === `H1L` ||
                getData(i, ["SymbolName"]) === `H2L` ||
                getData(i, ["SymbolName"]) === `H3L` ||
                getData(i, ["SymbolName"]) === `H4L` ||
                getData(i, ["SymbolName"]) === `H5L`
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
        {getData(payTableData, ["math_data"]) &&
          getData(payTableData, ["math_data"])
            .filter(
              (i) =>
                getData(i, ["SymbolName"]) === "N1" ||
                getData(i, ["SymbolName"]) === "N2" ||
                getData(i, ["SymbolName"]) === "N3" ||
                getData(i, ["SymbolName"]) === "N4" ||
                getData(i, ["SymbolName"]) === "N5"
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
      <hr />
      <p className="title">{translation["payTable"][lang]}</p>
      <PayList windowDimensions={windowDimensions}>
        {getData(payTableData, ["math_data"]) &&
          getData(payTableData, ["math_data"])
            .filter(
              (i) =>
                getData(i, ["SymbolName"]) === `H1` ||
                getData(i, ["SymbolName"]) === `H2` ||
                getData(i, ["SymbolName"]) === `H3` ||
                getData(i, ["SymbolName"]) === `H4` ||
                getData(i, ["SymbolName"]) === `H5`
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
        {getData(payTableData, ["math_data"]) &&
          getData(payTableData, ["math_data"])
            .filter(
              (i) =>
                getData(i, ["SymbolName"]) === "N1" ||
                getData(i, ["SymbolName"]) === "N2" ||
                getData(i, ["SymbolName"]) === "N3" ||
                getData(i, ["SymbolName"]) === "N4" ||
                getData(i, ["SymbolName"]) === "N5"
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
