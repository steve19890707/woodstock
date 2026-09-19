import React, { Fragment, useState, useEffect } from "react";
import cx from "classnames";
import TotalBet from "../TotalBet";
import { v4 as uuidv4 } from "uuid";
// lib
import { createSymbol } from "../../../config/replace";
import { useSelector } from "react-redux";
import { getData } from "common-lib/lib";
// config
import { currencyList } from "../../../config/currencyList";
import translation from "../../../config/translation";
// styled
import { PayTableWrapper, PayList } from "../CommonPaytable/Challenge";

const TableTA1011 = ({
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
  const [level, setLevel] = useState(1);
  const [levelSymbols, setLevelSymbols] = useState([]);
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  // 總共有幾關
  useEffect(() => {
    if (getData(payTableData, ["math_data"])) {
      const level = getData(payTableData, ["math_data"]).filter((i) =>
        getData(i, ["SymbolName"]).includes("H1_")
      );
      setLevel(level.length);
    }
  }, [payTableData]);

  // 找出每一關變換的圖
  useEffect(() => {
    if (getData(payTableData, ["math_data"])) {
      const array = getData(payTableData, ["math_data"]).filter((i) =>
        getData(i, ["SymbolName"]).includes("_1")
      );
      const array2 = array.map((v) => getData(v, ["SymbolName"]).slice(0, -1));
      setLevelSymbols(array2);
    }
  }, [payTableData]);

  const cnLevelConvert = (level) => {
    switch (level) {
      case 1:
        return "一";
      case 2:
        return "二";
      case 3:
        return "三";
      case 4:
        return "四";
      case 5:
        return "五";
      default:
        break;
    }
  };
  const i18nLevelConvert = (lang, level) => {
    switch (lang) {
      case "cn":
        return `第${cnLevelConvert(level)}关赔率表`;
      case "en":
        return `Level ${level}`;
      case "ko":
        return `제 ${level}레벨`;
      case "th":
        return `ด่านที่${level}`;
      case "vn":
        return `Cửa ải số ${level}`;
      case "id":
        return `Level ${level}`;
      case "ja":
        return `ステージ${level}`;
      case "es":
        return `Nivel${level}`;
      case "pt-br":
        return `nível ${level}`;
      default:
        return `Level ${level}`;
    }
  };
  const caseVerifying = (key = "") => {
    switch (key) {
      case "H1_1":
      case "H2_1":
      case "H3_1":
      case "H4_1":
      case "H5_1":
      case "H1_2":
      case "H2_2":
      case "H3_2":
      case "H4_2":
      case "H5_2":
      case "H1_4":
        return 13;
      case "H1_3":
      case "H2_3":
      case "H3_3":
      case "H4_3":
      case "H5_3":
      case "H2_4":
      case "H3_4":
      case "H4_4":
      case "H5_4":
      case "H1_5":
        return 14;
      case "H2_5":
      case "H3_5":
      case "H4_5":
      case "H5_5":
        return 15;
      default:
        return -1;
    }
  };
  return (
    <>
      <TotalBet
        lang={lang}
        isCurrency={isCurrency}
        currency={currency}
        bet={bet}
        denom={denom}
      />
      <p className="title">{translation["payTable"][lang]}</p>
      {Array.from({ length: level }, (v, i) => i).map((v, k) => (
        <Fragment key={uuidv4()}>
          <PayTableWrapper>
            <p className="level-title">{i18nLevelConvert(lang, k + 1)}</p>
            <PayList
              windowDimensions={windowDimensions}
              isLongList={isLongList}
            >
              {levelSymbols.map((value, key) => (
                <div className="half" key={uuidv4()}>
                  <div className="pic">
                    <img
                      className={cx("pay-img object-fit-scale", {
                        bigSymbol: symbol.some(
                          (i) => i === getData(v, ["SymbolName"])
                        ),
                        mobileSize: windowDimensions.width < 375,
                      })}
                      alt=""
                      src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${`${value}${
                        k + 1
                      }`}.png`}
                    />
                  </div>
                  <div className="list">
                    {getData(payTableData, ["math_data"]) &&
                      []
                        .concat(
                          getData(
                            getData(payTableData, ["math_data"]).filter(
                              (i) =>
                                getData(i, ["SymbolName"]) ===
                                `${value}${k + 1}`
                            ),
                            [0, "SymbolPays"]
                          )
                        )
                        .filter((fv, fk) => {
                          const verified = caseVerifying(`${value}${k + 1}`);
                          return fk <= verified;
                        })
                        .reverse()
                        .map((v, k, array = getData(v, ["SymbolName"])) => (
                          <Fragment key={uuidv4()}>
                            {v !== 0 && k <= 100 && (
                              <div key={uuidv4()}>
                                {array.length - k}
                                {k === 0 && "以上"} -
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
                      !getData(i, ["SymbolPays"]).every((v) => v === 0) &&
                      !getData(i, ["SymbolName"]).includes("_") &&
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
                          .map((v, k, array = getData(v, ["SymbolName"])) => (
                            <Fragment key={uuidv4()}>
                              {v !== 0 && (
                                <div key={uuidv4()}>
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
        </Fragment>
      ))}
    </>
  );
};

export default TableTA1011;
