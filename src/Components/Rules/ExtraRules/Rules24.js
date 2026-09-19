import React, { Fragment, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import cx from "classnames";
//lib
import { createSymbol } from "../../../config/replace";
import { useSelector } from "react-redux";
import { getData } from "common-lib/lib";
//config
import { currencyList } from "../../../config/currencyList";
//style
import { BlockCol, Wf } from "../CommonRule/Rule";

const FreeGame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.img && (props.isHorizontal ? "200px" : "350px")};
  margin: 10px 0;
  & .free-span {
    font-weight: bold;
    font-size: 20px;
    display: flex;
    & > span {
      font-weight: normal;
      margin-left: 3px;
      color: rgb(255, 213, 66);
      display: flex;
      align-items: center;
    }
  }

  & .half {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70%;
    justify-content: space-evenly;
    & > div {
      display: flex;
      align-items: center;
      padding: 0 5px;
    }
    & img {
      object-fit: scale-down;
      height: 40px;
      vertical-align: middle;
    }
    & .pic {
      width: 110px;
      padding: 20px 0;
      margin-right: 10px;
      text-align: center;
      .pay-img {
        width: 110px;
        height: 110px;
        image-rendering: -webkit-optimize-contrast;
      }
    }
  }
`;
const Rules24 = ({
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
  const ruleImgRef = useRef();
  const [isHorizontal, setIsHorizontal] = useState(true);
  useEffect(() => {
    const ratio =
      ruleImgRef.current?.naturalHeight / ruleImgRef.current?.naturalWidth;
    if (ratio > 1.2) {
      setIsHorizontal(false);
    }
  }, [ruleImgRef]);
  return (
    <>
      {getData(helpData, ["data", 0, "title"]) !== "+" && <hr />}
      <BlockCol windowDimensions={windowDimensions}>
        {getData(helpData, ["data", 0, "title"]) !== "+" && (
          <p className="title">
            {lang === "zh-tw"
              ? tify(getData(helpData, ["data", 0, "title"]))
              : lang === "cn"
              ? sify(getData(helpData, ["data", 0, "title"]))
              : getData(helpData, ["data", 0, "title"])}
          </p>
        )}
        <FreeGame
          img={getData(helpData, ["data", 0, "icon", "link"])}
          isHorizontal={isHorizontal}
        >
          {getData(helpData, ["data", 0, "icon", "link"]) && (
            <img
              className="object-fit-scale h100"
              alt=""
              ref={ruleImgRef}
              src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                helpData,
                ["data", 0, "icon", "link"]
              )}.png`}
            />
          )}
          <div className="half list">
            <div>
              <img
                className="object-fit-scale"
                alt=""
                ref={ruleImgRef}
                src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/F3.png`}
              />
              <span className="free-span">
                1-
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
                        getData(payTableData, [
                          "math_data",
                          1,
                          "SymbolPays",
                          0,
                        ]) *
                          denom *
                          betLevel
                      )
                    : getData(payTableData, ["math_data", 1, "SymbolPays", 0]) *
                      betLevel}
                </span>
              </span>
            </div>
            <div>
              <img
                className="object-fit-scale"
                alt=""
                ref={ruleImgRef}
                src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/F2.png`}
              />
              <span className="free-span">
                1-
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
                        getData(payTableData, [
                          "math_data",
                          2,
                          "SymbolPays",
                          0,
                        ]) *
                          denom *
                          betLevel
                      )
                    : getData(payTableData, ["math_data", 2, "SymbolPays", 0]) *
                      betLevel}
                </span>
              </span>
            </div>
          </div>
        </FreeGame>
        <div className="rules">
          <div
            dangerouslySetInnerHTML={createContent(
              getData(helpData, ["data", 0, "content"]),
              gameId,
              imgsdomain
            )}
          />
        </div>
      </BlockCol>
      {/* part2 */}
      {getData(helpData, ["data", 1, "title"]) !== "+" && <hr />}
      <BlockCol windowDimensions={windowDimensions}>
        {getData(helpData, ["data", 1, "title"]) !== "+" && (
          <p className="title">
            {lang === "zh-tw"
              ? tify(getData(helpData, ["data", 1, "title"]))
              : lang === "cn"
              ? sify(getData(helpData, ["data", 1, "title"]))
              : getData(helpData, ["data", 1, "title"])}
          </p>
        )}
        {getData(helpData, ["data", 1, "icon", "link"]) && (
          <Wf
            img={getData(helpData, ["data", 1, "icon", "link"])}
            isHorizontal={isHorizontal}
          >
            <img
              className="object-fit-scale mb20 h100"
              alt=""
              ref={ruleImgRef}
              src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                helpData,
                ["data", 1, "icon", "link"]
              )}.png`}
            />
            {getData(helpData, ["data", 1, "icon", "link"]) === "F"
              ? getData(payTableData, ["math_data"]) &&
                getData(payTableData, ["math_data"])
                  .filter(
                    (i) =>
                      (getData(i, ["SymbolName"]) === "F" ||
                        getData(i, ["SymbolName"]) === "SC") &&
                      !getData(i, ["SymbolPays"]).every((v) => v === 0)
                  )
                  .map((v) => (
                    <div className="half" key={getData(v, ["SymbolID"])}>
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
                  ))
              : getData(payTableData, ["math_data"]) &&
                getData(payTableData, ["math_data"])
                  .filter(
                    (i) =>
                      getData(i, ["SymbolName"]) ===
                        getData(helpData, ["data", 1, "icon", "link"]) &&
                      !getData(i, ["SymbolPays"]).every((v) => v === 0)
                  )
                  .map((v) => (
                    <div className="half" key={getData(v, ["SymbolID"])}>
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
          </Wf>
        )}

        <div className="rules">
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

export default Rules24;
