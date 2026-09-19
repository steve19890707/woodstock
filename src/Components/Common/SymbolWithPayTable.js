import React, { Fragment } from "react";
import cx from "classnames";

//lib
import { createSymbol } from "../../config/replace";
import { useSelector } from "react-redux";
import { getData } from "common-lib/lib";
import { getFeatureIconLink } from "../../lib/index";
//config
import { currencyList } from "../../config/currencyList";

const FeatureWithPayTable = ({
  rule,
  payTableData,
  isCurrency,
  currency,
  moneyConvert,
  denom,
  betLevel,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const { imageLink } = getFeatureIconLink(rule);
  return getData(payTableData, ["math_data"], [])
    .filter(
      (i) =>
        getData(i, ["SymbolName"]) === imageLink &&
        !getData(i, ["SymbolPays"])?.every((v) => v === 0)
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
    ));
};

export default FeatureWithPayTable;
