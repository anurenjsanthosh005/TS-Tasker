import React, { useContext, useEffect } from "react";
import TodoCard from "./TodoCard";
import type { Task, TodoListType } from "../../types";
import { fetchTasks } from "../../api/task/tasksApi";
import { useDispatch, useSelector } from "react-redux";
import { setTask } from "../../features/tasks/taskSlice";
import type { RootState } from "../../app/store";
import { useAuth } from "../../context/contextHooks";

function TodoList({filterKey='pending',buttonConfig}:TodoListType) {
  const dispatch = useDispatch();
  const { taskSliceData } = useSelector((state: RootState) => state.tasks);
  const {login} = useAuth()

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks: Task[] = await fetchTasks();
        const filteredTasks: Task[] = tasks.filter((t)=>t.uId ===login?.id && t)
        console.log("fetched tasks:", tasks);
        // 👉 here you’d usually dispatch to Redux or set state
        dispatch(setTask(filteredTasks));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    loadTasks();
  }, []);

  const filteredTasks = taskSliceData.filter((t)=>t.taskState===filterKey)

  return (
    <div className="container max-w-max flex flex-col gap-5">
      {filteredTasks.map((t,index) => (
        <TodoCard task={t} count={index+1} buttonConfig={buttonConfig} key={t.id}/>
      ))}

      {filteredTasks.length === 0 && (
        <div className="text-gray-500 text-xl font-medium mt-5 ml-2">
          {filterKey === "pending" && "Start adding your tasks..."}
          {filterKey === "completed" && "Completed tasks are shown here"}
          {filterKey === "done" && "Finished tasks are shown here"}
        </div>
      )}
    </div>
  );
}

export default TodoList;
