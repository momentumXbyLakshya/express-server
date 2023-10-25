import {
  createTodo,
  deleteTodo,
  updateTodo,
} from "../services/todo.services.js";

export const handleCreateTodo = async (req, res) => {
  try {
    const newTodo = await createTodo(req.body);
    res.status(200).json({
      success: true,
      message: "Todo created successfully",
      data: {
        todo: newTodo,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in creating Todo",
    });
  }
};

export const handleDeleteTodo = async (req, res) => {
  try {
    const deletedTodo = await deleteTodo(req.params.id);
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: {
        todo: deletedTodo,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in deleting Todo",
    });
  }
};

export const handleUpdateTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    const updatedTodo = await updateTodo(todoId, req.body);
    res.status(200).json({
      sucesss: true,
      message: "Todo updated successfully",
      data: {
        todo: updatedTodo,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in updating todo",
    });
  }
};
