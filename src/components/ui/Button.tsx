import React, { type PropsWithChildren, type ReactNode } from "react";

type ButtonPropType = {
  children: ReactNode;
  onClick: () => void;
  type?: "hidden" | "";
};

function Button(props: ButtonPropType) {
  const { children, type = "",onClick } = props;
  return (
    <div
      className={`flex justify-center items-center gap-3  ${
        type === "hidden" ? "hidden" : ""
      }`}
    >
      <button
        className={`h-[40px] w-[40px] text-xl bg-orange-400 px-4 rounded-xl border-3 flex justify-center items-center gap-3`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
export default Button;
