import React, { Fragment } from "react";
import { getData } from "common-lib/lib";

const Feature = ({ payTableData }) => {
  return getData(payTableData, ["math_data"], [])
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
                    {array.length - k} -<span>{`${v}X`}</span>
                  </div>
                )}
              </Fragment>
            ))}
        </div>
      </div>
    ));
};

export default Feature;
