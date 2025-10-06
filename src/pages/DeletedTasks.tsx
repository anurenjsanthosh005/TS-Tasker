import React from "react";
import TodoList from "../components/ui/TodoList";

function DeletedTasks() {
  return (
    <div className="flex flex-col items-start gap-[30px] py-[30px] ml-7">
      <h1 className="text-3xl font-extrabold text-orange-500">FINISHED TASKS</h1>
      <TodoList
        filterKey="done"
        buttonConfig={{
          showComplete: false,
          showRedo: false,
          showDelete: true,
          showEdit: false,
          showDone:false
        }}
      />
    </div>
  );
}

export default DeletedTasks;
