import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../app/store";
import {
  setOnChangeValue,
  setAddTask,
  setTask,
  setEditOpen,
  setEditClose,
} from "../../features/tasks/taskSlice";
import { addTasks, editTaskApi, fetchTasks } from "../../api/task/tasksApi";
import { useAuth } from "../../context/contextHooks";
import type { Task } from "../../types";

function Input() {
  const { onChangeValue, editTask, taskSliceData } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch();
  const { login } = useAuth();

  const handleSaveTask = async () => {
    if (!login || onChangeValue === "") return;

    try {
      if (editTask) {
        // update existing task
        await editTaskApi(editTask, {
          taskValue: onChangeValue,
        });

        // Replace in Redux
        const newTasks = await fetchTasks();
        dispatch(setTask(newTasks));
        dispatch(setEditClose());
      } else {
        // add new task
        const newTask = await addTasks({
          uId: login.id,
          taskState: "pending",
          taskValue: onChangeValue,
        });

        dispatch(setAddTask(newTask));
      }

      // clear input
      dispatch(setOnChangeValue(""));
    } catch (err) {
      console.error("Failed to save task:", err);
      alert("Something went wrong!");
    }
  };

  // const handleEditTasks = async (taskId: number) => {
  //   const taskToEdit = taskSliceData.find((t) => t.id === taskId);
  //   if (!taskToEdit) return;

  //   dispatch(setOnChangeValue(taskToEdit.taskValue));

  //   const newTasks = await editTaskApi(taskId, { taskValue: onChangeValue });
  //   console.log("new tasks :", newTasks);

  //   dispatch(setTask(newTasks));
  // };

  return (
    <div className="flex flex-col items-start w-[900px] container">
      <div className=" text-black font-medium flex gap-9 justify-center items-center">
        <input
          type="text"
          value={onChangeValue}
          onChange={({
            target: { value },
          }: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setOnChangeValue(value))
          } //for cleaner code of (e)=>fn(e.target.value)
          placeholder="Add tasks..."
          className="py-2 px-3 w-[700px] rounded-xl border-3 bg-blue-50 border-blue-500 text-black focus:border-black focus:outline-none"
        />
        <button
          className="py-2 px-3 border-3 bg-orange-400 rounded-xl text-white border-black font-extrabold"
          onClick={() => {
            handleSaveTask();
          }}
        >
          {editTask ? "Update" : "Add Task"}
        </button>
      </div>
    </div>
  );
}

export default Input;
