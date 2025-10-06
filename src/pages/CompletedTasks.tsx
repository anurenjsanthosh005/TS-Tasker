import React from "react";
import TodoList from "../components/ui/TodoList";

function CompletedTasks() {
  return (
    <div className="flex flex-col items-start gap-[30px] py-[30px] ml-7">
      <h1 className="text-3xl font-extrabold text-orange-500">COMPLETED TASKS</h1>
      <TodoList
        filterKey="completed"
        buttonConfig={{
          showComplete: false,
          showRedo: true,
          showDelete: false,
          showEdit: false,
          showDone:true
        }}
      />
    </div>
  );
}

export default CompletedTasks;
