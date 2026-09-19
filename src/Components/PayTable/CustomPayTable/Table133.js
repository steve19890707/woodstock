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
  justify-content: space-between;
  & .row-pair {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  & .half {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: -5px;
    border: 1px solid #3a2c25;
    box-sizing: border-box;
    margin-bottom: 15px;

    @media (min-width: 700px) {
      width: 48%;
    }
    @media (min-width: 1024px) {
      width: 33%;
    }
    & .pic {
      width: 40%;
      padding: 5px 0;
      text-align: right;
      .pay-img {
        width: 112px;
        height: 112px;
        image-rendering: -webkit-optimize-contrast;
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
  const rule = new RegExp("H\\d$", "g");
  const pairsCount = getData(payTableData, ["math_data"], [])?.filter((i) =>
    getData(i, ["SymbolName"]).match(rule)
  );

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
          pairsCount.map((v) => (
            <div className="half" key={getData(v, ["SymbolID"])}>
              {getData(payTableData, ["math_data"]).some(
                (i) =>
                  getData(i, ["SymbolName"]) ===
                  `${getData(v, ["SymbolName"])}L`
              ) && (
                <div className="row-pair">
                  <div className="pic">
                    <img
                      className={cx("pay-img object-fit-scale", {
                        bigSymbol: symbol.some(
                          (i) => i === `${getData(v, ["SymbolName"])}L`
                        ),
                        mobileSize: windowDimensions.width < 375,
                      })}
                      alt=""
                      src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                        v,
                        ["SymbolName"]
                      )}L.png`}
                    />
                  </div>
                  <div className="list">
                    {getData(payTableData, ["math_data"]) &&
                      []
                        .concat(
                          getData(payTableData, ["math_data"]).filter(
                            (i) =>
                              getData(i, ["SymbolName"]) ===
                              `${getData(v, ["SymbolName"])}L`
                          )?.[0]?.SymbolPays
                        )
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
              )}
              <div className="row-pair">
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
            </div>
          ))}
        <div className="half">
          <div className="row-pair">
            <div className="pic">
              <img
                className={cx("pay-img object-fit-scale", {
                  mobileSize: windowDimensions.width < 375,
                })}
                alt=""
                src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/AKQJ109.png`}
              />
            </div>
            <div className="list">
              {getData(payTableData, ["math_data"]) &&
                []
                  .concat(
                    getData(payTableData, ["math_data"]).filter(
                      (i) => getData(i, ["SymbolName"]) === "N1"
                    )?.[0]?.SymbolPays
                  )
                  ?.reverse()
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
        </div>
      </PayList>
    </PayTableWrapper>
  );
};

export default Normal;
