import React, { Fragment } from "react";

//lib;
import { getData } from "common-lib/lib";

const FeatureWithPayTable = ({ payTableData, gameId }) => {
  const mathData = getData(payTableData, ["math_data"], [])
    ?.filter(
      (i) =>
        (getData(i, ["SymbolName"]) === "F" ||
          getData(i, ["SymbolName"]) === "SC") &&
        !getData(i, ["SymbolPays"]).every((v) => v === 0)
    )
    ?.slice(0, 1);
  const filterGameIdData = (array = []) => {
    const filter = array.filter((_, k, array) => array.length - k < 7);
    switch (gameId) {
      case "246":
      case "248":
      case "249":
      case "TA52":
      case "TA35":
      case "6007":
      case "TA6007":
      case "TA50":
      case "6027":
        return filter;
      default:
        return array;
    }
  };
  const UpArrow = () => {
    switch (gameId) {
      case "246":
      case "248":
      case "249":
      case "TA52":
      case "TA35":
      case "6007":
      case "TA6007":
      case "TA50":
      case "6027":
        return (
          <span
            style={{
              color: "#fff",
              marginLeft: "0",
              paddingLeft: "3px",
            }}
          >
            ↑
          </span>
        );
      default:
        return <></>;
    }
  };
  return (
    mathData &&
    gameId &&
    mathData?.map((v, k) => (
      <div className="half" key={k}>
        <div className="list">
          {filterGameIdData(
            [].concat(getData(v, ["SymbolPays"], []))?.reverse()
          ).map((v, k, array = getData(v, ["SymbolPays"])) => (
            <Fragment key={k}>
              {v !== 0 && (
                <div key={k}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      color: "#fff",
                      marginLeft: "0",
                    }}
                  >
                    {array.length - k}
                    <span
                      style={{
                        color: "#fff",
                        marginLeft: "0",
                        paddingLeft: "3px",
                      }}
                    >
                      {array.length - k === 6 && <UpArrow />}
                    </span>
                  </span>
                  <span
                    style={{
                      color: "#fff",
                      marginLeft: "0",
                    }}
                  >
                    -
                  </span>
                  <span style={{ marginLeft: "10px" }}>{`${v}X`}</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    ))
  );
};

export default FeatureWithPayTable;
