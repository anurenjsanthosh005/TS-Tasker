import axios from "axios";
import type { Task } from "../../types";
import api from "../api";

const API_URL = "/task"

export const addTasks = async (task: Partial<Task>) => {
    try {
      const res = await api.post(API_URL, task);
      return res.data; // The created task from backend
    } catch (err: any) {
      console.error("Error adding task:", err.message || err);
      throw err; // Let caller handle it too
    }
  };

  export const fetchTasks = async () => {
    try {
      const res = await api.get(API_URL);
      return res.data ; // The created task from backend
    } catch (err: any) {
      console.error("Error fetching task:", err.message || err);
      throw err; // Let caller handle it too
    }
  };

  export const updateTask = async (taskId: number, updates: Partial<Task>) => {

    try {
      const res = await api.patch(`${API_URL}/${taskId}`, updates);
      return res.data; // returns updated task
    } catch (err: any) {
      console.error("Error updating task:", err.message || err);
      throw err;
    }
  };

  export const deleteTask = async (taskId: number) => {

    try {
      const res = await api.delete(`${API_URL}/${taskId}`);
      return res.data; // returns updated task
    } catch (err: any) {
      console.error("Error deleting task:", err.message || err);
      throw err;
    }
  };

  export const editTaskApi = async (taskId: number,updates: Partial<Task>) => {

    try {
      const res = await api.put(`${API_URL}/${taskId}`, updates);
      return res.data; // returns updated task
    } catch (err: any) {
      console.error("Error editing task:", err.message || err);
      throw err;
    }
  };