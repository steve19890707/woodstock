import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import cx from "classnames";
// import { List } from "immutable";
// hooks
import BREAKPOINT from "../../../config/breakpoint";
//lib
import { createSymbol } from "../../../config/replace";
import { useSelector } from "react-redux";
import { getData } from "common-lib/lib";
//config
import { currencyList } from "../../../config/currencyList";
import translation from "../../../config/translation";
//style
import { BlockCol } from "../CommonRule/Rule";

const FreeGamePayTable = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    display: flex;
    flex-direction: ${(props) =>
      props.windowDimensions.width >= 1024 ? "column" : "row"};
    width: ${(props) =>
      props.windowDimensions.width >= 1024
        ? "20%"
        : props.windowDimensions.width >= BREAKPOINT
        ? "50%"
        : "100%"};
    .object-fit-scale {
      width: 112px;
      height: 112px;
    }
    .list {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      font-size: 24px;
      margin-left: 10px;
      & > div {
        margin: 3px 0;
      }
      & span {
        font-size: 24px;
        color: #ffd542;
        margin-left: 5px;
      }
      .any {
        font-size: 18px;
        white-space: nowrap;
      }
    }
    .half {
      align-items: flex-start;
    }
  }
`;
const Rule = ({
  helpData,
  createContent,
  gameId,
  payTableData,
  isCurrency,
  currency,
  moneyConvert,
  denom,
  betLevel,
  windowDimensions,
  lang,
  sify,
  tify,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [freeGamePayTableArray, setFreeGamePayTableArray] = useState([]);
  const [scData, setScData] = useState([]);
  useEffect(() => {
    const freeGamePayTableList = ["H5", "N4", "N5", "H8"];

    if (getData(payTableData, ["math_data"])) {
      const array = getData(payTableData, ["math_data"]).filter((i) =>
        freeGamePayTableList.includes(getData(i, ["SymbolName"]))
      );
      const data = getData(payTableData, ["math_data"]).filter(
        (i) => getData(i, ["SymbolName"]) === "SC"
      );

      setFreeGamePayTableArray(array);
      setScData(data);
    }
  }, [payTableData]);

  return (
    <>
      <hr />
      <BlockCol windowDimensions={windowDimensions}>
        <p className="title">
          {lang === "zh-tw"
            ? tify(getData(helpData, ["data", 0, "title"]))
            : lang === "cn"
            ? sify(getData(helpData, ["data", 0, "title"]))
            : getData(helpData, ["data", 0, "title"])}
        </p>
        <div className="rules">
          <div
            dangerouslySetInnerHTML={createContent(
              getData(helpData, ["data", 0, "content"]),
              gameId,
              imgsdomain
            )}
          />
          {/* free game pay table */}
          <FreeGamePayTable windowDimensions={windowDimensions}>
            {freeGamePayTableArray.map((v, i) => (
              <div className="item">
                <img
                  className="object-fit-scale"
                  alt=""
                  src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                    v,
                    ["SymbolName"]
                  )}.png`}
                />
                <div className="half">
                  <div className="list">
                    {[]
                      .concat(getData(v, ["SymbolPays"]))
                      .reverse()
                      .map((v, k, array = getData(v, ["SymbolPays"])) => (
                        <Fragment key={k}>
                          {v !== 0 && (
                            <div className={i === 3 ? "any" : ""} key={k}>
                              {i === 3 && translation["any"][lang]}
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
            {scData.map((v, i) => (
              <div className="item">
                <img
                  className="object-fit-scale"
                  alt=""
                  src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                    v,
                    ["SymbolName"]
                  )}.png`}
                />
                <div className="list">
                  {[]
                    .concat(getData(v, ["SymbolPays"]))
                    .reverse()
                    .map((v, k, array = getData(v, ["SymbolPays"])) => (
                      <Fragment key={k}>
                        {v !== 0 && (
                          <div key={k}>
                            {array.length - k} -<span>{`${v}X`}</span>
                          </div>
                        )}
                      </Fragment>
                    ))}
                </div>
              </div>
            ))}
          </FreeGamePayTable>

          <div
            dangerouslySetInnerHTML={createContent(
              getData(helpData, ["data", 1, "content"]),
              gameId,
              imgsdomain
            )}
          />
        </div>
      </BlockCol>
    </>
  );
};

export default Rule;
