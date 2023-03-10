import { CurrencyEuroIcon } from "@heroicons/react/24/solid";
import { Form } from "react-router-dom";

export default function AddExpenseForm() {
  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <Form method="post" className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newExpense">Expense Name</label>
          <input
            type="text"
            name="newExpense"
            id="newExpense"
            placeholder="e.g Transport"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newExpenseAmount">Expense Amount</label>
          <input
            type="number"
            step="0.01"
            name="newExpenseAmount"
            id="newExpenseAmount"
            placeholder="e.g 150€"
            inputMode="decimal"
            required
          />
        </div>
        <input type="hidden" name="_action" value="createExpense"></input>
        <button type="submit" className="btn btn--dark">
          <span>Add New Expense</span>
          <CurrencyEuroIcon width={25} />
        </button>
      </Form>
    </div>
  );
}
