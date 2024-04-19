import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div className="">
      <Appbar />
      <div className="mx-5 mt-11 ">
        <Balance />
        <Users />
      </div>
    </div>
  );
};
