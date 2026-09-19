import React from "react";
import cx from "classnames";

//lib
import { getData } from "common-lib/lib";

const FeatureImage = ({ rule, gameId, imgsdomain, onLoad, imageLink }) => {
  return (
    <img
      className={cx("object-fit-scale mb20 h100", {
        w100: imageLink !== "F" && imageLink !== "W",
      })}
      alt=""
      onLoad={(e) => onLoad(e)}
      src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
        rule,
        ["icon", "link"]
      )}.png`}
    />
  );
};

export default FeatureImage;
