import { Todo } from "../models/Todo.js";

export const createTodo = async (todo) => {
  const newCreatedTodo = new Todo({
    title: todo.title,
    user: todo.user,
    difficulty: todo.difficulty,
    dueDate: todo.dueDate,
  });
  try {
    await newCreatedTodo.save();
    return newCreatedTodo;
  } catch (err) {
    throw Error("Error in creating Todo");
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    return deletedTodo;
  } catch (err) {
    throw Error("Error in deleting Todo");
  }
};

// @ts-ignore
export const updateTodo = async (todoId, todo) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);
    return updatedTodo;
  } catch (err) {
    throw new Error("Error in updating Todo");
  }
};
