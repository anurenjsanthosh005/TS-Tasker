import React, { useContext, useEffect } from "react";
import TodoCard, { type ButtonConfig } from "./TodoCard";
import { useTask } from "../../context/contextHooks";
import type { Tasks } from "../../context/TaskContext";


type TodoListPropType = {
  filterKey: "pending" | "completed" | "deleted";
  buttonConfig:ButtonConfig
};

function TodoList({ filterKey,buttonConfig }: TodoListPropType) {
  const { tasks } = useTask();

  const filteredTasks:Tasks[] = tasks.filter((task)=>task.status === filterKey)

  return (
    <div className="container max-w-max flex flex-col gap-5">
      {filteredTasks.map((task, index) => (
        <TodoCard task={task} count={index + 1} key={task.id} buttonConfig={buttonConfig} />
      ))}

      {filteredTasks.length === 0 && (
        <div className="text-gray-500 text-xl font-medium mt-5 ml-2">
          {filterKey === "pending" && "Start adding your tasks..."}
          {filterKey === "completed" && "Completed tasks are shown here"}
          {filterKey === "deleted" && "Deleted tasks are shown here"}
        </div>
      )}
    </div>
  );
}

export default TodoList;
