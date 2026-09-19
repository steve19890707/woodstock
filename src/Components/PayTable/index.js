// common
import Normal from "./CommonPaytable/Normal";
import Pair from "./CommonPaytable/Pair";
import Challenge from "./CommonPaytable/Challenge";
// custom
import Table19 from "./CustomPayTable/Table19";
import Table20 from "./CustomPayTable/Table20";
import Table21 from "./CustomPayTable/Table21";
import Table22 from "./CustomPayTable/Table22";
import Table26 from "./CustomPayTable/Table26";
import Table32 from "./CustomPayTable/Table32";
import Table35 from "./CustomPayTable/Table35";
import Table47 from "./CustomPayTable/Table47";
import Table51 from "./CustomPayTable/Table51";
import Table66 from "./CustomPayTable/Table66";
import Table117 from "./CustomPayTable/Table117";
import Table128 from "./CustomPayTable/Table128";
import Table130 from "./CustomPayTable/Table130";
import Table133 from "./CustomPayTable/Table133";
import Table171 from "./CustomPayTable/Table171";
import Table192 from "./CustomPayTable/Table192";
import TableGB3 from "./CustomPayTable/TableGB3";
import TableGB5019 from "./CustomPayTable/TableGB5019";
import TableTA25 from "./CustomPayTable/TableTA25";
import TableTA29 from "./CustomPayTable/TableTA29";
import TableTA33 from "./CustomPayTable/TableTA33";
import TableTA35 from "./CustomPayTable/TableTA35";
import TableTA50 from "./CustomPayTable/TableTA50";
import Table242 from "./CustomPayTable/Table242";
import Table251 from "./CustomPayTable/Table251";
import TableGB16 from "./CustomPayTable/TableGB16";
import Table248 from "./CustomPayTable/Table248";
import Table6007 from "./CustomPayTable/Table6007";
import Table6009 from "./CustomPayTable/Table6009";
import Table6016 from "./CustomPayTable/Table6016";
import Table6018 from "./CustomPayTable/Table6018";
import Table246 from "./CustomPayTable/Table246";
import Table6010 from "./CustomPayTable/Table6010";
import TableTA1011 from "./CustomPayTable/TableTA1011";
import Table6028 from "./CustomPayTable/Table6028";
import Table6029 from "./CustomPayTable/Table6029";

const PayTable = ({ gameId, type, propsData }) => {
  switch (gameId) {
    case "19":
      return <Table19 {...propsData} />;
    case "20":
      return <Table20 {...propsData} />;
    case "21":
      return <Table21 {...propsData} />;
    case "22":
      return <Table22 {...propsData} />;
    case "26":
      return <Table26 {...propsData} />;
    case "32":
      return <Table32 {...propsData} />;
    case "35":
      return <Table35 {...propsData} />;
    case "47":
      return <Table47 {...propsData} />;
    case "51":
      return <Table51 {...propsData} />;
    case "66":
      return <Table66 {...propsData} />;
    case "117":
      return <Table117 {...propsData} />;
    case "128":
      return <Table128 {...propsData} />;
    case "130":
      return <Table130 {...propsData} />;
    case "TA2":
    case "133":
      return <Table133 {...propsData} />;
    case "171":
      return <Table171 {...propsData} />;
    case "192":
      return <Table192 {...propsData} />;
    case "242":
      return <Table242 {...propsData} />;
    case "248":
    case "249":
    case "TA52":
      return <Table248 {...propsData} />;
    case "251":
      return <Table251 {...propsData} />;
    case "GB3":
      return <TableGB3 {...propsData} />;
    case "GB5019":
      return <TableGB5019 {...propsData} />;
    case "GB16":
      return <TableGB16 {...propsData} />;
    case "TA25":
      return <TableTA25 {...propsData} />;
    case "TA29":
      return <TableTA29 {...propsData} />;
    case "TA33":
      return <TableTA33 {...propsData} />;
    case "TA35":
      return <TableTA35 {...propsData} />;
    case "TA50":
      return <TableTA50 {...propsData} />;
    case "6007":
    case "TA6007":
      return <Table6007 {...propsData} />;
    case "6009":
    case "TA6009":
      return <Table6009 {...propsData} />;
    case "6016":
    case "TA6016":
      return <Table6016 {...propsData} />;
    case "6018":
    case "TA6018":
      return <Table6018 {...propsData} />;
    case "246":
    case "6027":
    case "TA6027":
      return <Table246 {...propsData} />;
    case "6028":
      return <Table6028 {...propsData} />;
    case "6029":
    case "TA6029":
      return <Table6029 {...propsData} />;
    case "6010":
    case "TA6010":
      return <Table6010 {...propsData} />;
    case "TA1011":
      return <TableTA1011 {...propsData} />;
    default:
      break;
  }
  switch (type) {
    case "normal":
      return <Normal {...propsData} />;
    case "pair":
      return <Pair {...propsData} />;
    case "challenge":
      return <Challenge {...propsData} />;
    default:
      break;
  }
};
export default PayTable;
