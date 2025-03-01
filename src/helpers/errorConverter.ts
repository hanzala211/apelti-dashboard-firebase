export const errorConverter = (error: unknown) => {
  let message = "An unexpected error occurred";

  if (error instanceof Error) {
    message = error.message;
  }
  return message
}