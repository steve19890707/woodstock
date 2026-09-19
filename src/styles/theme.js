import BREAKPOINT from "../config/breakpoint";
import themeColors from "./colors";

const theme = {
  palette: {},
  bodyContentlayout: (props) => {
    return `
    .caution-hr {
      margin: 80px 0 40px;
    }
    hr {
      margin: 80px 0;
      border-color: ${themeColors.hr};
    }
    .number {
      color: #ffff1a;
      margin: 0 5px;
    }
    .cautions {
      font-size: 16px;
      color: ${themeColors.cautions};
      line-height: 28px;
    }
    .half .list span.money {
      font-size: ${
        props.isMoneyOver6 ? (props.isMoneyOver7 ? "16px" : "18px") : "20px"
      };
      display: inline-flex;
      align-items: center;
      margin-left: 5px;
    }
    .title {
      font-size: 28px;
      color: ${themeColors.title};
      margin-bottom: 20px;
      font-weight: bold;
    }
    .flex-column {
      display: flex;
      flex-direction: column;
    }

    .jcc {
      justify-content: center;
    }
    .aic {
      align-items: center;
    }
    .ways-img {
      width: 50%;
      @media (max-width: 666px) {
        width: 70%;
      }
    }
    .w50 {
      width: 50%;
      /* &:not(:nth-child(1)):not(:nth-child(2)) {
        margin-top: 60px;
      } */
    }
    .mt-60 {
      margin-top: 60px;
    }
    .bigSymbol {
      transform: scale(1.2);
    }
    .mobileSize {
      padding-right: 20px;
      box-sizing: border-box;
    }
    .max130 {
      max-width: 130px;
    }
    .h100px {
      height: 100px;
    }
    .h150px {
      height: 150px;
    }
    .h100 {
      height: 100%;
    }
    .w100px {
      width: 100px;
    }
    .w150px {
      width: 150px;
    }
    .max300 {
      max-width: 300px;
    }
    .my-10 {
      margin: 10px 0;
    }
    .m-10 {
      margin: 10px;
    }
    .mb20 {
      margin-bottom: 20px;
    }
    .object-fit-contain {
      object-fit: contain;
    }
    .object-fit-scale {
      object-fit: scale-down;
    }
    .object-fit-cover {
      object-fit: cover;
    }
    .object-top {
      object-position: top;
    }
    .w100 {
      width: 100%;
      &:not(:first-child) {
        margin-top: 60px;
      }
      &.continue {
        margin-top: 0;
      }
    }
    .w70 {
      width: 70%;
    }
    .m-w100 {
      max-width: 100%;
      @media (max-width: 666px) {
        width: 100%;
      }
    }
    .rules {
      text-align: left;
      margin-bottom: 20px;
      & .num {
        color: #ffff00;
      }
      p {
        position: relative;
        font-size: ${
          props.windowDimensions.width >= BREAKPOINT ? "20px" : "16px"
        };
        line-height: 50px;
        padding-left: 20px;
        margin-bottom: 10px;
        /* height:40px; */
        -moz-text-size-adjust: none;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
        & img {
          object-fit: scale-down;
          /* width: 40px; */
          max-height: 50px;
          vertical-align: middle;
          /* margin: 0 3px; */
        }
        &::before {
          content: "◆";
          font-size: 14px;
          vertical-align: middle;
          position: absolute;
          left: 0px;
          height: 50px;
          display: flex;
          align-items: center;
        }
        &.indent {
          margin-left: 20px;
          &::before {
            content: "";
          }
        }
        &.no-dot {
          &::before {
            content: "";
          }
        }
        &.img-text {
          text-align: center;
          margin-bottom: 20px;
          padding-left: 0;
          &::before {
            content: "";
          }
        }
        &.highlight {
          text-align: center;
          margin-bottom: 20px;
          padding-left: 0;
          font-size: 28px;
          &::before {
            content: "";
          }
        }
      }
    }
  `;
  },
  colors: themeColors,
};

export default theme;
