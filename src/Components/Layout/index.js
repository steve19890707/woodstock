import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import packageJson from "../../../package.json";
import { useDispatch } from "react-redux";
import { setImgsDomain } from "../../reducer/props";
import { getData } from "common-lib/lib";
// components
import LocaleSelector from "../../Components/LocaleSelector";
import BodyContent from "../../Components/BodyContent";
import GameName from "./GameName";
// hooks
import useDeviceOrientation from "../../lib/hooks/useWindowDimensions";
import useGetQuery from "lib/hooks/useGetQuery";
import useOutsideClickAlert from "../../lib/hooks/useOutsideClickAlert";

import { apiGetHelp, apiGetPayTable, apiGetImgsDomain } from "../../api";

const LayoutWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.95);
  & .symbol {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 18px;
    padding-right: 2px;
    color: #ffd542;
    & > img {
      height: 100%;
      object-fit: contain;
    }
  }
  .back-icon {
    position: fixed;
    font-size: 40px;
    bottom: 40px;
    left: 10px;
    cursor: pointer;
  }
  .table,
  .table-ckeditor {
    display: flex;
    align-self: center;
    justify-content: center;
    margin: 30px 0;
    & img {
      width: 50px;
      height: 50px;
      object-fit: scale-down;
    }
    table,
    tbody,
    tr,
    td {
      max-width: 100%;
    }
    td {
      padding: 0.4em;
      min-width: 2em;
      border: 1px solid #6393db;
    }
    td:first-child {
      background-color: #092b5e;
    }
    & > table {
      display: block;
      overflow: auto;
    }
  }
`;
const DefaultMsg = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = () => {
  const { defaultLang, gameId } = useGetQuery();
  const [helpData, setHelpData] = useState({});
  const [payTableData, setPayTableData] = useState({});
  const windowDimensions = useDeviceOrientation();
  const [isMaintain, setIsMaintain] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState(defaultLang);
  const [popupState, setPopupState] = useState(false);
  const [imgdomainIsLoading, setImgdomainIsLoading] = useState(true);
  const popupRef = useRef(null);
  const is168 = process.env.REACT_APP_SITE_TYPE === "168";
  const dispatch = useDispatch();
  useOutsideClickAlert(popupRef, () => {
    setPopupState(false);
  });

  useEffect(() => {
    setLang(defaultLang);
  }, [defaultLang]);

  useEffect(() => {
    apiGetImgsDomain()
      .then((res) => {
        const src = getData(res, ["data", "result"]);
        dispatch(setImgsDomain(src));
        setImgdomainIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [dispatch]);

  useEffect(() => {
    if (gameId && lang) {
      apiGetHelp(gameId, lang)
        .then((res) => {
          if (res.data.error_code === 1706006) {
            setIsMaintain(true);
          }
          if (!res.data.result.edited.some((v) => v === lang)) {
            setLang("en");
          }
          setHelpData(res.data.result);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => console.log(err));

      apiGetPayTable(gameId).then((res) => setPayTableData(res.data.result));
    }
  }, [lang, gameId]);
  return (
    <LayoutWrapper data-version={packageJson.version}>
      {isLoading || imgdomainIsLoading ? (
        <DefaultMsg>Loading...</DefaultMsg>
      ) : !isMaintain ? (
        getData(helpData, ["data"]) && getData(helpData, ["data"]) !== null ? (
          <>
            <BodyContent
              helpData={helpData}
              lang={lang}
              windowDimensions={windowDimensions}
              payTableData={payTableData}
            />
            {!is168 && (
              <LocaleSelector
                gameId={gameId}
                lang={lang}
                popupState={popupState}
                popupRef={popupRef}
                edited={getData(helpData, ["edited"])}
                windowDimensions={windowDimensions}
                setPopupState={setPopupState}
                setLang={setLang}
              />
            )}
            <GameName
              helpData={helpData}
              windowDimensions={windowDimensions}
              lang={lang}
            />
          </>
        ) : (
          <DefaultMsg>Data Not Found</DefaultMsg>
        )
      ) : (
        <DefaultMsg>Maintaining...</DefaultMsg>
      )}
    </LayoutWrapper>
  );
};

export default Layout;
