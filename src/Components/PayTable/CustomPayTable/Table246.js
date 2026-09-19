import React, { Fragment } from "react";
import styled from "styled-components";
import cx from "classnames";
import { useSelector } from "react-redux";
import TotalBet from "../TotalBet";
// lib
import { createSymbol } from "../../../config/replace";
import { getData } from "common-lib/lib";
// hooks
import BREAKPOINT from "../../../config/breakpoint";
// config
import { currencyList } from "../../../config/currencyList";
import translation from "../../../config/translation";
// styled
import { PayTableWrapper } from "../CommonPaytable/Normal";

const StyledTable246PayList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.windowDimensions.width >= BREAKPOINT ? "row" : "column"};
  text-align: left;
  flex-wrap: wrap;
  justify-content: ${(props) => {
    // eslint-disable-next-line
    return props.gameId == 6028 ? "center" : "space-between";
  }};
  & .row-pair {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .extra-type-box {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @media (min-width: 700px) {
      /* justify-content: space-between; */
    }
    @media (min-width: 1024px) {
      justify-content: center;
    }
  }
  .half {
    .list span.money {
      margin-left: 8px !important;
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #3a2c25;
    box-sizing: border-box;
    margin-bottom: 15px;
    @media (min-width: 700px) {
      width: 48%;
      &.extra-type {
        margin-left: 0;
        margin-right: 0;
      }
    }
    @media (min-width: 1024px) {
      width: 33%;
      &.extra-type {
        margin-left: 3px;
        margin-right: 3px;
      }
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
        margin-left: 8px;
      }
    }
  }
`;

const Table246 = ({
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
  const newGroupData = getData(payTableData, ["math_data"], []).filter(
    (value) => {
      const groupData = [...new Set(value?.SymbolPays || [])];
      return groupData.length !== 1;
    }
  );
  const pairsCount = newGroupData.filter(
    (i) => getData(i, ["SymbolName"]) !== "F"
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
      <StyledTable246PayList
        windowDimensions={windowDimensions}
        className={cx(`id${gameId}`)}
        gameId={gameId}
      >
        <div className="extra-type-box">
          {newGroupData &&
            pairsCount
              .filter((_, key) => key === 0 || key === 1)
              .map((v) => (
                <div className="half extra-type" key={getData(v, ["SymbolID"])}>
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
                            {v !== 0 &&
                              (array.length - k === 8 ||
                                array.length - k === 10 ||
                                array.length - k === 12) && (
                                <div
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "26px",
                                      display: "inline-block",
                                      textAlign: "center",
                                    }}
                                  >
                                    {array.length - k}
                                  </div>
                                  <div>&nbsp;</div>-<div>&nbsp;</div>
                                  {array.length - k === 12 ? (
                                    <div
                                      style={{
                                        width: "26px",
                                        display: "inline-block",
                                        textAlign: "center",
                                      }}
                                    >
                                      {array.length}
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        width: "26px",
                                        display: "inline-block",
                                        textAlign: "center",
                                      }}
                                    >
                                      {array.length - k + 1}
                                    </div>
                                  )}
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
                  {getData(payTableData, ["math_data"], []).some(
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
                        {[]
                          .concat(
                            getData(
                              getData(payTableData, ["math_data"], []).filter(
                                (i) =>
                                  getData(i, ["SymbolName"]) ===
                                  `${getData(v, ["SymbolName"])}L`
                              ),
                              [0, "SymbolPays"]
                            )
                          )
                          .reverse()
                          .map((v, k, array = getData(v, ["SymbolName"])) => (
                            <Fragment key={k}>
                              {v !== 0 &&
                                (array.length - k === 8 ||
                                  array.length - k === 10 ||
                                  array.length - k === 12) && (
                                  <div
                                    key={k}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "26px",
                                        display: "inline-block",
                                        textAlign: "center",
                                      }}
                                    >
                                      {array.length - k}
                                    </div>
                                    <div>&nbsp;</div>-<div>&nbsp;</div>
                                    {array.length - k === 12 ? (
                                      <div
                                        style={{
                                          width: "26px",
                                          display: "inline-block",
                                          textAlign: "center",
                                        }}
                                      >
                                        {array.length}
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          width: "26px",
                                          display: "inline-block",
                                          textAlign: "center",
                                        }}
                                      >
                                        {array.length - k + 1}
                                      </div>
                                    )}
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
                </div>
              ))}
        </div>
        {newGroupData &&
          pairsCount
            .filter(
              (_, key) => key !== 0 && key !== 1 && key !== 4 && key !== 5
            )
            .map((v) => (
              <div className="half" key={getData(v, ["SymbolID"])}>
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
                          {v !== 0 &&
                            (array.length - k === 8 ||
                              array.length - k === 10 ||
                              array.length - k === 12) && (
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "26px",
                                    display: "inline-block",
                                    textAlign: "center",
                                  }}
                                >
                                  {array.length - k}
                                </div>
                                <div>&nbsp;</div>-<div>&nbsp;</div>
                                {array.length - k === 12 ? (
                                  <div
                                    style={{
                                      width: "26px",
                                      display: "inline-block",
                                      textAlign: "center",
                                    }}
                                  >
                                    {array.length}
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      width: "26px",
                                      display: "inline-block",
                                      textAlign: "center",
                                    }}
                                  >
                                    {array.length - k + 1}
                                  </div>
                                )}
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
      </StyledTable246PayList>
    </PayTableWrapper>
  );
};

export default Table246;
