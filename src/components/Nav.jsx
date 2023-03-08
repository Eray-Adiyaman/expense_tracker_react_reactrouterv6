import { Form, NavLink } from "react-router-dom";
//Assets
import logomark from "../assets/logomark.svg";
import { TrashIcon } from '@heroicons/react/24/solid'

export default function Nav({ userName }) {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to HomePage">
        <img src={logomark} alt="" height={30} />
        <span>Expense Tracker</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Delete all user data?")) {
              event.preventDefault();
            }
          }}
        >

          <button type="submit" className="btn btn--warning">
            <span>Delete User</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}
