import React from "react";
import styled from "styled-components";
import cx from "classnames";
import { useSelector } from "react-redux";
import { sify, tify } from "chinese-conv";
// hooks
import BREAKPOINT from "../config/breakpoint";
// lib
import { zhTwConvReplace } from "../lib";
import { getData } from "common-lib/lib";

import FeatureWild from "./Common/SymbolWithPayTable";
import FeatureScatter from "./Common/SymbolWithPayTableScatter";

const WildFreeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) =>
    props.windowDimensions.width >= BREAKPOINT ? "row" : "column"};
  & .wildfree-rules {
    width: ${(props) => (props.wildFreeCount === 2 ? "80%" : "100%")};
    @media (max-width: 699px) {
      width: 100%;
    }
  }

  & .half {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &.continue {
      margin-top: 0;
    }
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
const Wf = styled.div`
  display: flex;
  justify-content: center;
  height: 140px;
  ${(props) =>
    (props.gameId === "133" || props.gameId === "TA2") &&
    props.isImg === "free_game_feature" &&
    "height:auto;"}
  ${(props) =>
    (props.gameId === "133" || props.gameId === "TA2") &&
    props.isImg === "free_game_feature"
      ? props.windowDimensions.width < 700
        ? "width:100%;"
        : "width:60%;"
      : ""}
  margin: 10px 0;
  & .mw100 {
    max-width: 100%;
  }
  & .mw200px {
    max-width: 200px;
  }
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
        white-space: nowrap;
      }
      & span {
        font-size: 24px;
        color: #ffd542;
        margin-left: 5px;
      }
    }
  }
`;

const WildFree = ({
  helpData,
  windowDimensions,
  createContent,
  gameId,
  payTableData,
  isCurrency,
  moneyConvert,
  denom,
  betLevel,
  currency,
  lang,
}) => {
  const imgsdomain = useSelector((state) => state.props.imgsdomain);
  let wildFreeCount = 0;
  for (let i = 0; i < getData(helpData, ["default_data"]).length; i++) {
    const link = getData(helpData, ["default_data", i, "icon", "link"]);
    if (
      link === "F" ||
      link === "W" ||
      link === "W_S" ||
      link === "super_wild"
    ) {
      wildFreeCount += 1;
    }
  }
  const customClassName = (value, key) => {
    return cx("flex-column aic", {
      continue: getData(value["title"]) === "+",
      w50:
        (wildFreeCount === 2 &&
          (getData(value, ["icon", "link"]) === "F" ||
            getData(value, ["icon", "link"]) === "W" ||
            getData(value, ["icon", "link"]) === "W_S" ||
            getData(value, ["icon", "link"]) === "super_wild") &&
          windowDimensions.width >= 700) ||
        // id 242 特殊排列
        (gameId === "242" && key !== 0 && windowDimensions.width >= 700),
      w100:
        !(
          getData(value, ["icon", "link"]) === "F" ||
          getData(value, ["icon", "link"]) === "W" ||
          getData(value, ["icon", "link"]) === "W_S" ||
          getData(value, ["icon", "link"]) === "super_wild" ||
          // id 242 特殊排列
          (gameId === "242" &&
            getData(value, ["icon", "link"]) === "random_wild")
        ) ||
        // id 242 特殊排列
        (gameId === "242" && key === 0) ||
        wildFreeCount !== 2 ||
        windowDimensions.width < 700,
      "mt-60":
        wildFreeCount === 2 &&
        (getData(helpData, ["default_data", 0]) !== "F" ||
          getData(helpData, ["default_data", 0]) !== "W" ||
          getData(helpData, ["default_data", 0]) !== "W_S" ||
          getData(helpData, ["default_data", 0]) !== "super_wild") &&
        windowDimensions.width >= 700,
    });
  };
  const getTitle = (value) => {
    return (
      getData(value, ["title"]) !== "+" && (
        <p className="title">
          {lang === "zh-tw"
            ? tify(zhTwConvReplace(getData(value, ["title"])))
            : lang === "cn"
            ? sify(getData(value, ["title"]))
            : getData(value, ["title"])}
        </p>
      )
    );
  };
  return (
    <>
      <WildFreeWrapper
        windowDimensions={windowDimensions}
        wildFreeCount={wildFreeCount}
      >
        {getData(helpData, ["default_data"], []).map((v, k) => (
          <div key={k} className={customClassName(v, k)}>
            {getTitle(v)}
            {getData(v, ["icon", "link"]) && (
              <Wf
                wildFreeCount={wildFreeCount}
                isImg={getData(v, ["icon", "link"])}
                gameId={gameId}
                windowDimensions={windowDimensions}
              >
                <img
                  className="h100 object-fit-contain mw200px"
                  alt=""
                  src={`${imgsdomain}/order-detail/common/${gameId}/symbolList/${getData(
                    v,
                    ["icon", "link"]
                  )}.png`}
                />
                {getData(v, ["icon", "link"]) === "F" ||
                (getData(v, ["icon", "link"]) === "W_S" && gameId === "199") ? (
                  <FeatureScatter payTableData={payTableData} gameId={gameId} />
                ) : (
                  <FeatureWild
                    rule={v}
                    payTableData={payTableData}
                    isCurrency={isCurrency}
                    currency={currency}
                    moneyConvert={moneyConvert}
                    denom={denom}
                    betLevel={betLevel}
                  />
                )}
              </Wf>
            )}
            <div className="rules wildfree-rules">
              {Object.keys(helpData).length !== 0 &&
                getData(helpData, ["default_data"]) && (
                  <div
                    dangerouslySetInnerHTML={createContent(
                      getData(v, ["content"]),
                      gameId,
                      imgsdomain
                    )}
                  />
                )}
            </div>
          </div>
        ))}
      </WildFreeWrapper>
    </>
  );
};

export default WildFree;
