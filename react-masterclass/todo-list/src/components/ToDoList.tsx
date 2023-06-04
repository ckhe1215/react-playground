import React from "react";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
