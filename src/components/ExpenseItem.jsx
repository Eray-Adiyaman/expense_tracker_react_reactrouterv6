import { Form, Link } from "react-router-dom";
import {
  calculateSpentAmount,
  formatCurrency,
  formatPercentage,
} from "../helpers";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ExpenseItem({ expense, showDelete = false }) {
  const { id, name, amount, color } = expense;
  const spent = calculateSpentAmount(id);
  // console.log(color)

  return (
    <div
      className="expense"
      style={{ "--accent": color, marginTop: 20, marginBottom: 20 }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Allocated</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)}</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form 
          method="post" 
          action="delete"
          onSubmit={(event)=> {
            if(!confirm("Are you sure you want to delete this budget permanently")){
              event.preventDefault();
            }
          } }
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <Link to={`/budget/${id}`} className="btn">
          <span>View Details</span>
          <BanknotesIcon width={24} />
        </Link>
      )}
    </div>
  );
}
