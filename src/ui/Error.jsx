import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError(); //this catches if there is any error occured ass we include the errorElement property in the main route in the app component
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to="-1">Go back</LinkButton>
    </div>
  );
}

export default Error;
