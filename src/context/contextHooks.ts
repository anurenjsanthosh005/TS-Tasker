import { useContext } from "react";
import { AuthContext } from "./Authcontext";
import { TaskContext } from "./TaskContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider, Did you wrap component with the provider?");
  return context;
};

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error("useTask must be used inside TaskProvider, Did you wrap component with the provider?")
  return context
}