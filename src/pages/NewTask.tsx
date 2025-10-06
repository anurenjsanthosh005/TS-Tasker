import React from "react";
import Input from "../components/ui/Input";
import TodoList from "../components/ui/TodoList";
import EditTask from "../components/EditTasks";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

function NewTask() {
  const{editTask} = useSelector((state:RootState)=>state.tasks)
  return (
    <div className="flex flex-col items-start gap-[30px] py-[30px] ml-7">
      <h1 className="text-3xl font-extrabold text-orange-500">TASKS LIST</h1>
      <Input />
      <TodoList
        filterKey="pending"
        buttonConfig={{
          showComplete: true,
          showRedo: false,
          showDelete: false,
          showEdit: true,
          showDone:false
        }}
      />
      {editTask && <EditTask />}
    </div>
  );
}

export default NewTask;
