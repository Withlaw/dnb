import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function useRouterError() {
  const error = useRouteError();

  let title = "An route Error occured!";
  let message = "Please check the URL correctly.";
  let status = 400;
  let statusText = "Bad Request";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    statusText = error.statusText;
    console.error("router error: ", error.data);
  }

  if (error instanceof Error) {
    title = error.name;
    message = error.message;
    console.error("router error: ", error.stack);
  }

  if (typeof error === "string") {
    message = error;
  }

  return { title, message, status, statusText };
}
