import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewTask from "./pages/NewTask";
import CompletedTasks from "./pages/CompletedTasks";
import DeletedTasks from "./pages/DeletedTasks";
import MainLayout from "./layouts/MainLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./context/Authcontext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<NewTask />} />
              <Route path="completed" element={<CompletedTasks />} />
              <Route path="deleted" element={<DeletedTasks />} />
            </Route>
            <Route element={<SimpleLayout />}>
              <Route path="login" element={<Login />} />
              {/* <Route path="signup" element={<Signup />} /> */}
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
