import { TrashIcon } from "@heroicons/react/24/solid";
import { Link, useFetcher } from "react-router-dom";
import {
  formatCurrency,
  formatDateToLocalString,
  getAllMatchingItems,
} from "../helpers";

export default function ExpenseTableItem({ expense }) {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "expenses",
    key: "id",
    value: expense.expenseId,
  })[0];
 //  console.log(budget, "bdgetss");
 return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocalString(expense.createdAt)}</td>
      <td>
        <Link to={`/budget/${budget.id}`} style={{ "--accent": budget.color }}>
          {" "}
          {budget.name}
        </Link>
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
}
