import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/contextHooks";

function Navbar() {
const {login,userLogout}=useAuth()
  return (
    <div className="w-screen bg-white flex text-black justify-between h-[80px] items-center">
      <div className="flex items-baseline gap-9 ml-6">
        <div className="text-5xl font-extrabold">Tasker</div>
        <div className="text-2xl font-bold flex gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-gray-600"
            }
          >
            TODOS
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-gray-600"
            }
          >
            COMPLETED
          </NavLink>
          <NavLink
            to="/deleted"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-gray-600"
            }
          >
            DELETED
          </NavLink>
        </div>
      </div>
      <h1>{login&&login.username}</h1>
      <button onClick={()=>userLogout()}>
        LOG OUT
      </button>
      <div className="mr-6 flex items-center justify-center text-xl font-extrabold bg-amber-200 w-[45px] h-[45px] rounded-3xl">
        AS
      </div>
    </div>
  );
}

export default Navbar;
