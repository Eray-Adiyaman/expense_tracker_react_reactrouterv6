import { Form } from "react-router-dom";

import {UserPlusIcon} from "@heroicons/react/24/solid"
import illustration from "../assets/illustration.jpg"

export default function Intro() {
  return (
    <div className="intro">
      <div>
        <h1>
          Be Wise With Your <span className="accent">Money and Spendings</span>
        </h1>
        <p>
            Personal budget tracking is the secret to financial stability. Start your track today.
        </p>
        <Form method="post">
            <input 
            required 
            type="text" 
            name="userName" 
            placeholder="Get started here!"
            aria-label="Your Name"
            autoComplete="given-name"
            />
            <input type="hidden" name="_action" value="newUser"></input>
            <button type="submit" className="btn btn--dark">
                <span>Create Account</span>
                <UserPlusIcon width={20}/>
            </button>
        </Form>
      </div>
      <img src={illustration} alt="Person" width={600} />
    </div>
  );
}
