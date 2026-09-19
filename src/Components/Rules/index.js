// import styled from "styled-components";
import CommonRule from "./CommonRule";
import Rules24 from "./ExtraRules/Rules24";
import Rules66 from "./ExtraRules/Rules66";
import Rules77 from "./ExtraRules/Rules77";
import Rules121 from "./ExtraRules/Rules121";
import Rules204 from "./ExtraRules/Rules204";
import RuleTA29 from "./ExtraRules/RuleTA29";
import RuleGB5015 from "./ExtraRules/RuleGB5015";
import RuleTA1008 from "./ExtraRules/RuleTA1008";

const RulesSwitch = ({ gameId, propsData }) => {
  switch (gameId) {
    case "24":
      return <Rules24 {...propsData} />;
    case "66":
      return <Rules66 {...propsData} />;
    case "77":
      return <Rules77 {...propsData} />;
    case "121":
      return <Rules121 {...propsData} />;
    case "204":
      return <Rules204 {...propsData} />;
    case "TA29":
      return <RuleTA29 {...propsData} />;
    case "GB5015":
      return <RuleGB5015 {...propsData} />;
    case "TA1008":
      return <RuleTA1008 {...propsData} />;
    default:
      return <CommonRule {...propsData} />;
  }
};
export default RulesSwitch;
