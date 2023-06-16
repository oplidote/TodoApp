import axios from "axios";
import { useState } from "react";

const TodoItem = ({ todo, getTodo }) => {
  const token = window.localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_PUBLIC_BACKEND_URL;

  const [isEdit, setIsEdit] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const deleteTodo = async () => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/todos/${todo.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const checkedTodo = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/todos/${todo.id}`,
        {
          todo: todo.todo,
          isCompleted: !todo.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const updatedTodo = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/todos/${todo.id}`,
        { todo: newTodo, isCompleted: todo.isCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getTodo();
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <li
      key={todo.id}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <input
          type="checkbox"
          onChange={checkedTodo}
          checked={todo.isCompleted}
        />
        <label>
          {isEdit ? (
            <input
              type="text"
              value={newTodo}
              data-testid="modify-input"
              onChange={(e) => {
                setNewTodo(e.target.value);
              }}
            />
          ) : (
            <span>{todo.todo}</span>
          )}
        </label>
      </div>
      {isEdit ? (
        <div>
          <button data-testid="submit-button" onClick={updatedTodo}>
            제출
          </button>
          <button
            data-testid="cancel-button"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            취소
          </button>
        </div>
      ) : (
        <div>
          <button
            todos-testid="modify-button"
            onClick={() => {
              setIsEdit(true);
              setNewTodo(todo.todo);
            }}
          >
            수정
          </button>
          <button todos-testid="delete-button" onClick={deleteTodo}>
            삭제
          </button>
        </div>
      )}
    </li>
  );
};
export default TodoItem;
