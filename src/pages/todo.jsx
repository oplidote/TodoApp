import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { getTodoApi, postTodoApi } from "../lib/customAxios";

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const postTodo = async () => {
    try {
      await postTodoApi(text);
      getTodo();
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  const getTodo = async () => {
    try {
      await getTodoApi().then((res) => {
        setTodos(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ul>
        {todos.length != 0
          ? todos.map((todo, i) => {
              return <TodoItem key={i} todo={todo} getTodo={getTodo} />;
            })
          : "목록이 비어 있습니다"}
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
