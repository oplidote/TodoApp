import { useState } from "react";
import { deleteTodoApi, updatedTodoApi } from "../lib/customAxios";

const TodoItem = ({ todo, getTodo }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  
  const deleteTodo = async () => {
    try {
      await deleteTodoApi(todo.id);
      getTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const checkedTodo = async () => {
    try {
      await updatedTodoApi(todo.id, todo.todo, !todo.isCompleted);
      getTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const updatedTodo = async () => {
    try {
      await updatedTodoApi(todo.id, newTodo, todo.isCompleted);
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
              setNewTodo(todo.todo);
              setIsEdit(true);
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
