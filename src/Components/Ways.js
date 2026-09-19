import React from "react";
import styled from "styled-components";
// config
import BREAKPOINT from "../config/breakpoint";
import translation from "../config/translation";
import { ImCheckmark, ImCross } from "react-icons/im";
import waysOrLines from "../lib/waysOrLines";
import { useSelector } from "react-redux";
import { getData } from "common-lib/lib";

const WaysWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const BlockRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.windowDimensions.width >= BREAKPOINT ? "row" : "column"};
  & .half {
    width: 100%;
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
  & > div:not(:first-child) {
    margin-top: ${(props) =>
      props.windowDimensions.width >= BREAKPOINT ? "0" : "40px"};
  }
`;

const Ways = ({ helpData, lang, windowDimensions, createContent, gameId }) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  const noHrId = ["155", "76", "95", "GB5032"];
  const isHr = !noHrId.includes(gameId);
  const filterUnderline = (line = "") =>
    !!~line.indexOf("_") ? line.split("_")[0] : line;
  const captionSpecialCase = (line = "", lang = "") => {
    let result = translation["lines"][lang];
    const specialCase = ["9_3", "10_6", "40_3"];
    for (let i = 0; i < specialCase.length; i++) {
      if (line === specialCase[i]) {
        result = translation["winningLines"][lang];
      }
    }
    return result;
  };
  return (
    <>
      {isHr && <hr />}
      {getData(helpData, ["line"]) &&
      waysOrLines(getData(helpData, ["line"])) === "ways" ? (
        <>
          <WaysWrapper>
            <p className="title">
              {getData(helpData, ["line"]).includes("ways")
                ? getData(helpData, ["line"]).includes("richways")
                  ? translation["richways"][lang]
                  : translation["reelways"][lang]
                : getData(helpData, ["line"]).includes("any")
                ? translation[getData(helpData, ["line"])][lang]
                : `${filterUnderline(getData(helpData, ["line"]))} ${
                    translation["ways"][lang]
                  }`}
            </p>
            <div className="rules">
              {getData(helpData, ["line_content", "data"]) && (
                <div
                  dangerouslySetInnerHTML={createContent(
                    getData(helpData, ["line_content", "data"]),
                    gameId,
                    imgsdomain
                  )}
                />
              )}
            </div>
            <BlockRow windowDimensions={windowDimensions}>
              <div className="half m-row">
                <div className="circle correct">
                  <ImCheckmark />
                </div>
                <img
                  className="ways-img max300 m-10 object-fit-contain"
                  alt=""
                  src={`${imgsdomain}/help/admin/slot/line/${getData(helpData, [
                    "line",
                  ])}c.png`}
                />
              </div>
              <div className="half m-row">
                <div className="circle incorrect">
                  <ImCross />
                </div>
                <img
                  className="ways-img max300 m-10 object-fit-contain"
                  alt=""
                  src={`${imgsdomain}/help/admin/slot/line/${getData(helpData, [
                    "line",
                  ])}e.png`}
                />
              </div>
            </BlockRow>
          </WaysWrapper>
        </>
      ) : (
        <>
          <WaysWrapper>
            <p className="title">
              {getData(helpData, ["line"]).split("_")[0]}{" "}
              {getData(helpData, ["line"]) === "1"
                ? translation["line"][lang]
                : captionSpecialCase(getData(helpData, ["line"]), lang)}
            </p>
            <div className="rules">
              {getData(helpData, ["line_content", "data"]) && (
                <div
                  dangerouslySetInnerHTML={createContent(
                    getData(helpData, ["line_content", "data"]),
                    gameId,
                    imgsdomain
                  )}
                />
              )}
            </div>
            <BlockRow className="jcc" windowDimensions={windowDimensions}>
              <div className="w100">
                <img
                  className="object-fit-scale m-w100 object-top"
                  alt=""
                  src={`${imgsdomain}/help/admin/slot/line/${getData(helpData, [
                    "line",
                  ])}.png`}
                />
              </div>
            </BlockRow>
          </WaysWrapper>
        </>
      )}
    </>
  );
};

export default Ways;
