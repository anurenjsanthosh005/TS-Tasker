import React from "react";
import Input from "../components/ui/Input";
import TodoList from "../components/ui/TodoList";
import EditTask from "../components/EditTasks";
import { useTask } from "../context/contextHooks";

function NewTask() {
  const {editTask}=useTask()
  return (
    <div className="flex flex-col items-start gap-[30px] py-[30px] ml-7">
      <h1 className="text-3xl font-extrabold text-orange-500">TASKS LIST</h1>
      <Input />
      <TodoList
        filterKey="pending"
        buttonConfig={{
          showComplete: true,
          showRedo: false,
          showDelete: true,
          showEdit: true,
        }}
      />
      {editTask && <EditTask />}
    </div>
  );
}

export default NewTask;
