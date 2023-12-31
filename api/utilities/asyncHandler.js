import { ApiError } from "./ApiError.js";

export const asyncHandler = (requestHandler) => (req, res) => {
  Promise.resolve(requestHandler(req, res)).catch((err) => {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode || 500).json(err);
    } else {
      return res.status(500).json({
        message: "Unexpected error occured",
      });
    }
  });
};
