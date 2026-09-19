import React, { Fragment } from "react";
import { getData } from "common-lib/lib";

const FeatureSpecialCase = ({ payTableData, type = "F" }) => {
  return getData(payTableData, ["math_data"], [])
    .filter(
      (i) =>
        getData(i, ["SymbolName"]) === type &&
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
                    {array.length - k} -<span>{`${v}`}</span>
                  </div>
                )}
              </Fragment>
            ))}
        </div>
      </div>
    ));
};

export default FeatureSpecialCase;
