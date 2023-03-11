import { CurrencyEuroIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";

export default function AddExpenseForm() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"; // track formdata state with usefecther rrd hook,currently it can be 3 different states as follows "idle","loading","submitting"

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      {
        formRef.current.reset(); // reset form data after submit
        focusRef.current.focus(); // re-set the focus back to first input field after submit
      }
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newExpense">Expense Name</label>
          <input
            type="text"
            name="newExpense"
            id="newExpense"
            placeholder="e.g Transport"
            ref={focusRef}
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
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Add New Expense</span>
              <CurrencyEuroIcon width={25} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}
