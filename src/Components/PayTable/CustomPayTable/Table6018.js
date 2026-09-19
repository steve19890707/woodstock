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
export const PayTableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const PayList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.windowDimensions.width >= BREAKPOINT ? "row" : "column"};
  text-align: left;
  flex-wrap: wrap;
  & .half {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${(props) => (props.isLongList ? "40px" : "-5px")};
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
          .map((v) => (
            <div
              className="half"
              key={getData(v, ["SymbolID"])}
              style={{ margin: "5px 0" }}
            >
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
                  .filter((v, k, array) => array.length - k < 13)
                  .map((v, k, array = getData(v, ["SymbolPays"])) => (
                    <Fragment key={k}>
                      {v !== 0 && (
                        <div>
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

export default Normal;
