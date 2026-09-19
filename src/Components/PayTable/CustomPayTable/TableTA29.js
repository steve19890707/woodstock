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
import { PayTableWrapper, PayList } from "../CommonPaytable/Normal";

const TableTA29 = ({
  lang,
  windowDimensions,
  payTableData,
  gameId,
  isCurrency,
  currency,
  denom,
  betLevel,
  moneyConvert,
  bet,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const payTableList = ["H1", "H2", "H3", "H4", "H5"];
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
          payTableList.map((v) => (
            <div className="half" key={v}>
              <div className="pic">
                <img
                  className={cx("pay-img object-fit-scale", {
                    mobileSize: windowDimensions.width < 375,
                  })}
                  alt=""
                  src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${v}.png`}
                />
              </div>
              <div className="list">
                {[]
                  .concat(getData(payTableData, ["math_data"]))
                  .filter((val) => getData(val, ["SymbolName"]).includes(v))
                  .reverse()
                  .map((v, k) => (
                    <Fragment key={k}>
                      {getData(v, ["SymbolPays", 0]) !== 0 && (
                        <div key={k}>
                          -
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
                              ? moneyConvert(
                                  getData(v, ["SymbolPays", 0]) *
                                    denom *
                                    betLevel
                                )
                              : getData(v, ["SymbolPays", 0]) * betLevel}
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

export default TableTA29;
