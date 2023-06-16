import "./App.css";
import { Signup, Signin, Todo } from "./pages";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components";

const App = () => {
  
  return (
    <div className="App">
      <Routes>
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/todo"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
