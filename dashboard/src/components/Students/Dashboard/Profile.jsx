import React from "react";
import { useSelector } from "react-redux";
import Protected from "../../../hooks/useProtected";
import { useNavigate } from "react-router-dom";
import Uploadimage from "../../../assets/Icons/Screenshot 2024-07-17 at 17.57.38.png";

function Profile() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);
  if (!auth) {
    navigate("/login");
  }

  return (
    <div>
      {/* <Protected > */}
      <div className=" profile flex flex-col 800px:flex-row  h-auto items-center  p-2 pt-5">
        {/* for the profile pic */}
        <div className=" w-[170px] h-[170px] ">
          <div className="h-full w-full rounded-full">
            <img className=" rounded-full border-4 border-black" src={auth.avatar?.url || Uploadimage } alt="" />
          </div>
        </div>

        {/* for the profile details */}
        <div className=" w-auto justify-between flex flex-col mt-4 800px:mt-0 items-center 800px:items-start p-2 h-[100px] 800px:pl-10">
          {auth?.name && (
            <div className=" font-semibold text-xl 800px:text-2xl">
              {auth.name}
            </div>
          )}
          <div className=" font-light">{auth?.email}</div>
        </div>
      </div>

      {/* </Protected> */}
    </div>
  );
}

export default Profile;
