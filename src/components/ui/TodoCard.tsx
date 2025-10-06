import React, { useContext } from "react";
import Button from "./Button";
// import { type Tasks } from "../../context/TaskContext";
import { useTask } from "../../context/contextHooks";
import type { ButtonConfigState, StatusState, Task } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setEditOpen, setOnChangeValue, setTask } from "../../features/tasks/taskSlice";
import { deleteTask, fetchTasks, updateTask } from "../../api/task/tasksApi";

type TodoCardPropTypes = {
  task: Task;
  count: number;
  buttonConfig: ButtonConfigState;
};

function TodoCard({ task, count, buttonConfig }: TodoCardPropTypes) {
  const { taskSliceData } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const buttonClickHandler = async (
    taskId: number,
    clickState: StatusState | "editing"
  ) => {
    switch (clickState) {
      case "completed":
        // handle complete
        try {
          const updatedTask = await updateTask(taskId, {
            taskState: "completed",
          });
          // Replace the task in Redux state
          const newTasks = taskSliceData.map((t) =>
            t.id === taskId ? updatedTask : t
          );
          dispatch(setTask(newTasks));
        } catch (err) {
          console.error("Failed to update task:", err);
        }
        break;
      case "done":
        // handle delete
        try {
          const updatedTask = await updateTask(taskId, { taskState: "done" });
          // Replace the task in Redux state
          const newTasks = taskSliceData.map((t) =>
            t.id === taskId ? updatedTask : t
          );
          dispatch(setTask(newTasks));
        } catch (err) {
          console.error("Failed to update task:", err);
        }
        break;
      case "pending":
        // handle pending
        try {
          const updatedTask = await updateTask(taskId, {
            taskState: "pending",
          });
          // Replace the task in Redux state
          const newTasks = taskSliceData.map((t) =>
            t.id === taskId ? updatedTask : t
          );
          dispatch(setTask(newTasks));
        } catch (err) {
          console.error("Failed to update task:", err);
        }
        break;
      case "deleted":
        // handle delete
        try {

          await deleteTask(taskId);

          const updatedTasks: Task[] = await fetchTasks();
          dispatch(setTask(updatedTasks));

        } catch (err) {
          console.error("Failed to update task:", err);
        }
        break;
      case "editing":
        // handle edit

        try {
        
          dispatch(setEditOpen(taskId))
          dispatch(setOnChangeValue(task.taskValue))

          // const newTasks:Task[] = await editTask(taskId);

          // const updatedTasks: Task[] = await fetchTasks();
          // dispatch(setTask(updatedTasks));

        } catch (err) {
          console.error("Failed to update task:", err);
        }
        break;
    }
  };

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
          <Button onClick={() => buttonClickHandler(task.id, "completed")}>
            <i className="fa-solid fa-check"></i>
          </Button>
        )}
        {buttonConfig.showRedo && (
          <Button onClick={() => buttonClickHandler(task.id, "pending")}>
            <i className="fa-solid fa-clock-rotate-left"></i>
          </Button>
        )}
        {buttonConfig.showDone && (
          <Button onClick={() => buttonClickHandler(task.id, "done")}>
            <i className="fa-solid fa-thumbs-up"></i>{" "}
          </Button>
        )}
        {buttonConfig.showDelete && (
          <Button onClick={() => buttonClickHandler(task.id, "deleted")}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        )}
        {buttonConfig.showEdit && (
          <Button onClick={() => buttonClickHandler(task.id, "editing")}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        )}
      </div>
    </div>
  );
}

export default TodoCard;
