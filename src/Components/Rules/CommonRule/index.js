import React from "react";
import { getData } from "common-lib/lib";
//components
import Rule from "./Rule";

const CommonRule = (props) => {
  const { helpData } = props;
  return (
    <>
      {getData(helpData, ["data"]).map((rule, k) => (
        <Rule rule={rule} key={k} {...props} />
      ))}
    </>
  );
};

export default CommonRule;
