import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";

const Todo = () => {
  const token = window.localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_PUBLIC_BACKEND_URL;
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const postTodo = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/todos`,
        { todo: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getTodo();
      setText('')
    } catch (err) {
      console.log(err);
    }
  };

  const getTodo = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // 로그인 여부 검증
    const isLogined = !!window.localStorage.getItem("token");
    if (!isLogined) {
      navigate("/signin");
    } else {
      getTodo();
    }
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ul>
        {todos.length != 0 ?
          todos.map((todo, i) => {
            return (
              <TodoItem key={i} todo={todo} getTodo={getTodo}/>
            );
          }): '목록이 비어 있습니다'}
      </ul>
      <div>
        <input
          todos-testid="new-todo-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button todos-testid="new-todo-add-button" onClick={postTodo}>
          추가
        </button>
      </div>
    </div>
  );
};

export default Todo;
