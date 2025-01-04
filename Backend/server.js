import express from "express";
import cors from "cors"
import { v4 as uuidv4 } from "uuid"; // Unique id generator
// import { faker } from "@faker-js/faker"; // fake username generator

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }))
app.use(express.json());

const todos = [];

app.get("/get-all-todos", (request, response) => {
  const message = !todos.length
    ? "Todos container is empty"
    : "Here is All Todos";

  response.send({
    message: message,
    data: todos,
  });
});

app.post("/add-todo", (request, response) => {
  const { todo } = request.body;

  const todoData = {
    todoContent: todo,
    id: String(uuidv4()), // random id generate using uuid package
  };

  if (!todo || todo.trim() === "") {
    return response.status(400).send({ message: "Todo content is required" });
  }

  todos.push(todoData);
  response
    .status(201)
    .send({ message: "Todo added successfully", data: todoData });
});

app.patch("/edit-todo/:id", (request, response) => {
  const { todo } = request.body;
  const { id } = request.params;

  const index = todos.findIndex((todo) => todo.id === id);

  const todoData = {
    todoContent: todo,
    id: id,
  };

  if (index !== -1) {
    if (!todo || todo.trim() === "") {
      return response.status(400).send({ message: "Todo content is required" });
    } else {
      todos[index].todoContent = todo;
      response
        .status(202)
        .send({ todoData: todoData, message: "Todo Edit successfully" });
    }
  } else {
    response.status(404).send("Todo Not Found");
  }
});

app.delete("/delete-todo/:id", (request, response) => {
  const { id } = request.params;
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    response.status(202).send({ message: "Todo Deleted successfully" });
  } else {
    response.status(404).send("Todo Not Found");
  }
});

app.use((request, response) => {
  response.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
