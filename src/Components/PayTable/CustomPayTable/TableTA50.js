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

const TableTA50 = ({
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
        {getData(payTableData, ["math_data"], [])
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
          .map((val, k) => (
            <div className="half" key={k} style={{ margin: "5px 0" }}>
              <div className="pic">
                <img
                  className={cx("pay-img object-fit-scale", {
                    bigSymbol: symbol.some(
                      (i) => i === getData(val, ["SymbolName"])
                    ),
                    mobileSize: windowDimensions.width < 375,
                  })}
                  alt=""
                  src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                    val,
                    ["SymbolName"]
                  )}.png`}
                />
              </div>
              <div className="list">
                {[]
                  .concat(getData(val, ["SymbolPays"]))
                  .reverse()
                  .filter((v, k, array) => array.length - k < 13)
                  .map((v, k, array = getData(val, ["SymbolPays"], [])) => (
                    <Fragment key={k}>
                      {v !== 0 && (
                        <div key={k}>
                          {array.length - k} {array.length - k === 12 && "↑ "}-
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

export default TableTA50;
