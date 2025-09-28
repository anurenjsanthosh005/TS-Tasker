import React, { useContext } from "react";
import Button from "./Button";
import { type Tasks } from "../../context/TaskContext";
import { useTask } from "../../context/contextHooks";

export type ButtonConfig = {
  showComplete: boolean;
  showRedo: boolean;
  showDelete: boolean;
  showEdit: boolean;
};

type TodoCardPropTypes = {
  task: Tasks;
  count: number;
  buttonConfig: ButtonConfig;
};

function TodoCard({ task, count, buttonConfig }: TodoCardPropTypes) {
  const { handleComplete, handleDelete, handleRevert, editOpen } = useTask();
  return (
    <div className="container bg-blue-50 flex justify-between px-4 border-3 rounded-xl h-[70px]">
      <div className="flex items-center gap-4 text-xl flex-1 min-w-[800px]">
        <p className="font-extrabold flex-shrink-0">{count}</p>
        <div className="font-medium text-base break-words overflow-hidden mr-5">
          <p className="">{task.taskValue}</p>
        </div>
      </div>
      <div className="flex flex-shrink-0 justify-center items-center gap-3">
        {buttonConfig.showComplete && (
          <Button onClick={() => handleComplete(task.id)}>
            <i className="fa-solid fa-check"></i>
          </Button>
        )}
        {buttonConfig.showRedo && (
          <Button onClick={() => handleRevert(task.id)}>
            <i className="fa-solid fa-clock-rotate-left"></i>
          </Button>
        )}
        {buttonConfig.showDelete && (
          <Button onClick={() => handleDelete(task.id)}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        )}
        {buttonConfig.showEdit && (
          <Button onClick={() => editOpen(task.id)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        )}
      </div>
    </div>
  );
}

export default TodoCard;
