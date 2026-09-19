import React, { useState } from "react";
//lib
import { useSelector } from "react-redux";
import { getFeatureIconLink } from "../../../lib/index";

import FeatureImage from "./FeatureImage";
import FeatureSpecialCase from "./FeatureSpecialCase";
// import SymbolWithPayTable from "../../Common/SymbolWithPayTable";

const RuleContentSpecialCase = ({
  rule,
  gameId,
  payTableData,
  // isCurrency,
  // currency,
  // moneyConvert,
  // denom,
  // betLevel,
  Wf,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const onLoad = (e) => {
    const ratio = e.target.naturalHeight / e.target.naturalWidth;
    if (ratio > 1.2) {
      setIsHorizontal(false);
    }
  };
  const { imageLink } = getFeatureIconLink(rule);
  return (
    imageLink && (
      <Wf img={imageLink} isHorizontal={isHorizontal}>
        <FeatureImage
          rule={rule}
          gameId={gameId}
          imageLink={imageLink}
          imgsdomain={imgsdomain}
          onLoad={onLoad}
        />
        <FeatureSpecialCase payTableData={payTableData} type="F" />
        <FeatureImage
          rule={{ icon: { link: "F1" } }}
          gameId={gameId}
          imageLink={imageLink}
          imgsdomain={imgsdomain}
          onLoad={onLoad}
        />
        <FeatureSpecialCase payTableData={payTableData} type="F1" />
      </Wf>
    )
  );
};

export default RuleContentSpecialCase;
