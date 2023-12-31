import useRouterError from "@/hooks/use-router-error.tsx";

const ErrorPage = () => {
  let { title, message, status, statusText } = useRouterError();

  if (status === 404) {
    title = "Not Found!";
    message = "Could not find your resource or page.";
  }

  return (
    <div>
      <h1>{`${status} ${statusText}`}</h1>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
