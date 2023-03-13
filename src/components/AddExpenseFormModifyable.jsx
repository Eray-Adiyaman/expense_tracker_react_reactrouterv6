import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

export default function AddExpenseFormModifyable({ expenses }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(()=>{
    if(!isSubmitting){
        formRef.current.reset();

        focusRef.current.focus();
   }
})
  

 


  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add new{" "}
        <span className="accent">
          {expenses.length === 1 &&
            `${expenses.map((expense) => expense.name)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g, Transport"
              ref={focusRef}
              required
            ></input>
          </div>
          <div className="grid-xd">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g, 230"
              required
            ></input>
          </div>
        </div>
        <div className="grid-xs" hidden={expenses.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {expenses
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((expense) => {
                return (
                  <option key={expense.id} value={expense.id}>
                    {expense.name}
                  </option>
                );
              })}
          </select>
          <input type="hidden" name="_action" value="createExpenseModifyable"></input>
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Add Expense</span>
                <PlusCircleIcon width={25} />
              </>
            )}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
