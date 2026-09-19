import React, { Fragment, useState } from "react";
import cx from "classnames";
//lib
import { createSymbol } from "../../../config/replace";
import { useSelector } from "react-redux";
import { getData } from "common-lib/lib";
//config
import { currencyList } from "../../../config/currencyList";
//style
import { BlockCol, Wf } from "../CommonRule/Rule";

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
  const [isHorizontal, setIsHorizontal] = useState(true);
  const onLoad = (e) => {
    const ratio = e.target.naturalHeight / e.target.naturalWidth;
    if (ratio > 1.2) {
      setIsHorizontal(false);
    }
  };
  return (
    <>
      {getData(helpData, ["data"], []).map((rule, idx) => (
        <Fragment key={idx}>
          <BlockCol windowDimensions={windowDimensions}>
            {getData(rule, ["title"]) !== "+" && (
              <p className="title">
                {lang === "zh-tw"
                  ? tify(getData(rule, ["title"]))
                  : lang === "cn"
                  ? sify(getData(rule, ["title"]))
                  : getData(rule, ["title"])}
              </p>
            )}
            {getData(rule, ["icon", "link"]) && (
              <Wf
                img={getData(rule, ["icon", "link"])}
                isHorizontal={isHorizontal}
              >
                <img
                  className={cx("object-fit-scale mb20 h100", {
                    w100:
                      getData(rule, ["icon", "link"]) !== "F" &&
                      getData(rule, ["icon", "link"]) !== "W",
                  })}
                  alt=""
                  onLoad={(e) => onLoad(e)}
                  src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                    rule,
                    ["icon", "link"]
                  )}.png`}
                />
                {getData(rule, ["icon", "link"]) === "F"
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
                              .map(
                                (v, k, array = getData(v, ["SymbolPays"])) => (
                                  <Fragment key={k}>
                                    {v !== 0 && (
                                      <div key={k}>
                                        {array.length - k} -
                                        <span>{`${v}X`}</span>
                                      </div>
                                    )}
                                  </Fragment>
                                )
                              )}
                          </div>
                        </div>
                      ))
                  : getData(payTableData, ["math_data"]) &&
                    getData(payTableData, ["math_data"])
                      .filter(
                        (i) =>
                          getData(i, ["SymbolName"]) ===
                            getData(rule, ["icon", "link"]) &&
                          !getData(i, ["SymbolPays"]).every((v) => v === 0)
                      )
                      .map((v) => (
                        <div className="half" key={getData(v, ["SymbolID"])}>
                          <div className="list">
                            {[]
                              .concat(getData(v, ["SymbolPays"]))
                              .reverse()
                              .map(
                                (v, k, array = getData(v, ["SymbolPays"])) => (
                                  <Fragment key={k}>
                                    {v !== 0 && (
                                      <div key={k}>
                                        {array.length - k} -
                                        <span
                                          className={cx({
                                            money: isCurrency,
                                          })}
                                        >
                                          {isCurrency && (
                                            <div
                                              className="symbol"
                                              dangerouslySetInnerHTML={createSymbol(
                                                currencyList[currency][
                                                  "symbol"
                                                ],
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
                                )
                              )}
                          </div>
                        </div>
                      ))}
              </Wf>
            )}

            <div className="rules">
              <div
                dangerouslySetInnerHTML={createContent(
                  getData(rule, ["content"]),
                  gameId,
                  imgsdomain
                )}
              />
            </div>
          </BlockCol>
        </Fragment>
      ))}
    </>
  );
};

export default Rule;
