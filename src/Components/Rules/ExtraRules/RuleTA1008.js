import React from "react";
import styled from "styled-components";

// hooks
import BREAKPOINT from "../../../config/breakpoint";
//lib
import { useSelector } from "react-redux";
import { getData } from "common-lib/lib";
import { getFeatureIconLink } from "../../../lib/index";

import RuleContentSpecialCase from "../CommonRule/RuleContentSpecialCase";

export const BlockCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & .half {
    display: flex;
    flex-direction: column;
    align-items: center;
    &.m-row {
      flex-direction: ${(props) =>
        props.windowDimensions.width >= BREAKPOINT ? "column" : "row-reverse"};
      justify-content: center;
    }
    & .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      &.correct {
        color: #45fe01;
        border-color: #45fe01;
      }
      &.incorrect {
        color: #f80701;
        border-color: #f80701;
      }
    }
  }
`;

export const Wf = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.img && (props.isHorizontal ? "200px" : "350px")};
  margin: 10px 0;
  & .half {
    display: flex;
    flex-direction: row;
    align-items: center;

    & .pic {
      width: 110px;
      padding: 20px 0;
      margin-right: 10px;
      text-align: center;
      .pay-img {
        width: 110px;
        height: 110px;
        image-rendering: -webkit-optimize-contrast;
      }
    }
    & .list {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      font-size: 24px;
      margin-left: 10px;
      & > div {
        margin: 3px 0;
      }
      & span {
        font-size: 24px;
        color: #ffd542;
        margin-left: 5px;
      }
    }
  }
`;
const Rule = ({
  rule,
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
  const { imageLink } = getFeatureIconLink(rule);
  return (
    <>
      {getData(rule, ["title"]) !== "+" && <hr />}
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
        {imageLink && (
          <RuleContentSpecialCase
            rule={rule}
            gameId={gameId}
            payTableData={payTableData}
            isCurrency={isCurrency}
            currency={currency}
            moneyConvert={moneyConvert}
            denom={denom}
            betLevel={betLevel}
            Wf={Wf}
          />
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
    </>
  );
};

const Rules = (props) => {
  const { helpData } = props;
  console.log(getData(helpData, ["data"]));
  return (
    <>
      {getData(helpData, ["data"]).map((rule, k) => (
        <Rule rule={rule} key={k} {...props} />
      ))}
    </>
  );
};

export default Rules;
