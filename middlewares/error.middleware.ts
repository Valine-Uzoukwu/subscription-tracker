const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  try {
    let error = { ...err };
    error.Message = err.message || "Internal Server Error";
    console.error(err);

    // Mongoose Bad Object ID
    if (err.name === "CastError") {
      const message = "Resource Not Found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose Duplicate Key
    if (err.code === 11000) {
      const message = "Duplicate Field Value Entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    //Mongoos Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val: any) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  } catch (error) {
    next(error);
  }
};
export default errorMiddleware;

//Create a subscription -> middleware (check for renewal date )-> middleware (check for errors) -> next -> controller (create subscription)
