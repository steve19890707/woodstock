import React, { useState } from "react";

//lib
import { useSelector } from "react-redux";
import { getFeatureIconLink } from "../../../lib/index";

import FeatureImage from "./FeatureImage";
import Feature from "./Feature";
import SymbolWithPayTable from "../../Common/SymbolWithPayTable";

const RuleContent = ({
  rule,
  gameId,
  payTableData,
  isCurrency,
  currency,
  moneyConvert,
  denom,
  betLevel,
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
        {imageLink === "F" ? (
          <Feature payTableData={payTableData} />
        ) : (
          <SymbolWithPayTable
            rule={rule}
            payTableData={payTableData}
            isCurrency={isCurrency}
            currency={currency}
            moneyConvert={moneyConvert}
            denom={denom}
            betLevel={betLevel}
          />
        )}
      </Wf>
    )
  );
};

export default RuleContent;
