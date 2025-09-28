import React from "react";
import { Outlet } from "react-router-dom";

function SimpleLayout() {
  return (
    <div className='bg-blue-200 min-h-screen flex flex-col items-center justify-center'>
      <main >
        <Outlet />
      </main>
    </div>
  );
}

export default SimpleLayout;
