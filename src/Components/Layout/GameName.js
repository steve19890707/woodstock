import React from "react";
import styled from "styled-components";
import { sify } from "chinese-conv";
import { getData } from "common-lib/lib";

const GameNameWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.colors.bar};
  & p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.barText};
    font-weight: bold;
    text-shadow: 0px 1px 0 rgba(0, 0, 0, 0.38);
  }
`;

const GameName = ({ helpData, windowDimensions, lang }) => {
  return (
    getData(helpData, ["game_title"]) &&
    getData(helpData, ["game_name"]) && (
      <GameNameWrapper windowDimensions={windowDimensions}>
        {getData(helpData, [
          "game_name",
          lang === "zh-tw" ? "tw" : lang.toLowerCase(),
        ]) && (
          <p>
            {lang === "zh-tw"
              ? getData(helpData, ["game_name", "tw"])
              : lang === "cn"
              ? sify(getData(helpData, ["game_name", "cn"]))
              : getData(helpData, ["game_name", lang.toLowerCase()]) ||
                getData(helpData, ["game_name", "en"]) ||
                sify(getData(helpData, ["game_name", "cn"]))}
          </p>
        )}
      </GameNameWrapper>
    )
  );
};

export default GameName;
