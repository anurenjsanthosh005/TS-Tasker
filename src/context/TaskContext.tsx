import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useAuth } from "./contextHooks";

export type Tasks = {
  id: number;
  uid: number;
  status: "pending" | "completed" | "deleted";
  taskValue: string;
};

type UpdateTasksPropType = {
  id: number;
  newData: Partial<Tasks>;
};

type TaskContextPropType = {
  onChangeValue: string;
  tasks: Tasks[];
  editTask: Tasks | undefined;
  addTask: () => void;
  setOnChangeValue: React.Dispatch<React.SetStateAction<string>>;
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  setEditTask: React.Dispatch<React.SetStateAction<Tasks | undefined>>;
  editOpen: (id: number) => void;
  editClose: () => void;
  handleComplete: (id: number) => void;
  handleRevert: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export const TaskContext = createContext<TaskContextPropType | undefined>(
  undefined
);
export const TaskProvider = ({ children }: PropsWithChildren) => {
  const { login } = useAuth();
  const [onChangeValue, setOnChangeValue] = useState<string>("");
  const [tasks, setTasks] = useState<Tasks[]>(() => {
    const allTasks = localStorage.getItem("ALL_TASKS");
    return allTasks ? (JSON.parse(allTasks) as Tasks[]) : [];
  });
  const [editTask, setEditTask] = useState<Tasks | undefined>(undefined);

  const addTask = () => {
    if (!onChangeValue.trim() || !login) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        uid: login.uid,
        status: "pending",
        taskValue: onChangeValue,
      },
    ]);
    setOnChangeValue("");
  };

  const updateTasks = ({ id, newData }: UpdateTasksPropType) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...newData } : t))
    );
  };

  const handleComplete = (id: number) => {
    updateTasks({ id, newData: { status: "completed" } });
  };
  const handleRevert = (id: number) => {
    updateTasks({ id, newData: { status: "pending" } });
  };
  const handleDelete = (id: number) => {
    updateTasks({ id, newData: { status: "deleted" } });
  };

  const editOpen = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    setEditTask(task);
  };

  const editClose = () => {
    setEditTask(undefined);
  };
  const handleEdit = (id: number) => {
    updateTasks({ id, newData:{taskValue:onChangeValue} })
    setOnChangeValue('')
    editClose()
  };

  useEffect(() => {
    localStorage.setItem("ALL_TASKS", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setOnChangeValue(editTask?.taskValue ?? "");
  }, [editTask]);

  const taskContextValues = useMemo(
    () => ({
      onChangeValue,
      tasks,
      editTask,
      editOpen,
      editClose,
      setOnChangeValue,
      addTask,
      setTasks,
      setEditTask,
      handleComplete,
      handleRevert,
      handleDelete,
      handleEdit,
    }),
    [onChangeValue, tasks, editTask]
  );
  return (
    <TaskContext.Provider value={taskContextValues}>
      {children}
    </TaskContext.Provider>
  );
};
