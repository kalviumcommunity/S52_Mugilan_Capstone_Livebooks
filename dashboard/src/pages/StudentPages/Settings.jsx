import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../../redux/features/auth/authApi";

function Settings() {
  const [logout, setLogout] = useState(false);
  const [logedout] = useLazyLogoutQuery(); // Destructure logout function
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const logoutHandler = async () => {
    await logedout();
    setLogout(true); // Update logout state
    navigate("/login");
  };

  return (
    <div className=" flex h-[97vh] items-center justify-center gap-5">
      <div className=" flex justify-center">
        <div className=" border w-[20vw] h-[40vh]">
          <div className=" py-2 px-4 border cursor-pointer"> Edit Profile </div>
          <div
            className=" py-2 px-4 border cursor-pointer"
            onClick={logoutHandler}
          >
            {" "}
            Log Out{" "}
          </div>
        </div>
      </div>
      <div className=" border w-full h-[90%] "></div>
    </div>
  );
}

export default Settings;
