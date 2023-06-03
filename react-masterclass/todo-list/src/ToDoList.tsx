import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError("");
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To do should be longer");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={toDo} onChange={onChange} placeholder="Write a Todo" />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : ""}
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("toDo")} placeholder="Write a to do" />
        <input {...register("email")} placeholder="Email" />
        <input {...register("firstName")} placeholder="first name" />
        <input {...register("lastName")} placeholder="last name" />
        <input {...register("userName")} placeholder="user name" />
        <input {...register("password")} placeholder="Password" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
