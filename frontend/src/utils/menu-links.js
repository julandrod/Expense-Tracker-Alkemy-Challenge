import { IoCreate } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { MdMoneyOff } from "react-icons/md";

const links = [
  { id: 1, text: "Home", path: "/", icon: <AiFillHome /> },
  {
    id: 2,
    text: "Crear transacción",
    path: "/newTransaction",
    icon: <IoCreate />,
  },
  {
    id: 3,
    text: "Ver todos los ingresos",
    path: "/filterTransactions/ingreso",
    icon: <GiMoneyStack />,
  },
  {
    id: 4,
    text: "Ver todos los egresos",
    path: "/filterTransactions/egreso",
    icon: <MdMoneyOff />,
  },
];

export default links;
