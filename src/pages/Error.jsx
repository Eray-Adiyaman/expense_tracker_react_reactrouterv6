import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  const navigate = useNavigate();


  return (
    <div className="error">
      <h1>We have a Problem.Whoopsie!</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button onClick={()=> navigate(-1)} className="btn btn--dark">
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          Go back to HomePage
        </Link>
      </div>
    </div>
  );
}
