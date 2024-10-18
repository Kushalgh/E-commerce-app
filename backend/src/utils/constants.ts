export const MESSAGES = {
  //Orders
  VALIDATION_FAILED: "Validation failed",
  SPECIFIC_PRODUCT_NOT_FOUND: (productId: number) =>
    `Product with ID ${productId} not found`,
  ORDER_CREATED_SUCCESS: "Order created successfully",
  ORDER_UPDATED_SUCCESS: "Order updated successfully",
  ORDER_FETCH_SUCCESS: "Order fetched successfully",
  ORDER_NOT_FOUND: "Order not found",
  FAILED_TO_GET_ORDER: "Failed to get order",
  FAILED_TO_GET_USER_ORDERS: "Failed to get user orders",
  FAILED_TO_UPDATE_ORDER: "Failed to update order",
  FAILED_TO_CREATE_ORDER: "Failed to create order",

  //Products
  PRODUCT_CREATED_SUCCESS: "Product created successfully",
  PRODUCT_UPDATED_SUCCESS: "Product updated successfully",
  PRODUCT_DELETED_SUCCESS: "Product deleted successfully",
  PRODUCT_FETCH_SUCCESS: "Product fetched successfully",
  PRODUCT_NOT_FOUND: "Product not found",
  FAILED_TO_FETCH_PRODUCTS: "Failed to fetch products",
  FAILED_TO_CREATE_PRODUCT: "Failed to create product",
  FAILED_TO_UPDATE_PRODUCT: "Failed to update product",
  FAILED_TO_DELETE_PRODUCT: "Failed to delete product",
  FAILED_TO_FETCH_PRODUCT: "Failed to fetch product",

  //Users
  USER_CREATED_SUCCESS: "User created successfully",
  USER_UPDATED_SUCCESS: "User updated successfully",
  USER_DELETED_SUCCESS: "User deleted successfully",
  USER_FETCH_SUCCESS: "User fetched successfully",
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid credentials",
  FAILED_TO_CREATE_USER: "Failed to create user",
  FAILED_TO_FETCH_USER: "Failed to fetch user",
  FAILED_TO_UPDATE_USER: "Failed to update user",
  FAILED_TO_DELETE_USER: "Failed to delete user",
  LOGIN_SUCCESS: "User logged in successfully",
  REGISTRATION_SUCCESS: "User registered successfully",

  JWT_SECRET_NOT_DEFINED: "JWT_SECRET is not defined in environment variables",
  NO_TOKEN_AUTH_DENIED: "No token, authorization denied",
  TOKEN_INVALID: "Invalid token",

  INTERNAL_SERVER_ERROR: "Internal Server Error",

  REQUEST_SUCCESS: "Request processed successfully.",
  REQUEST_ERROR: "An error occurred while processing your request.",
};
