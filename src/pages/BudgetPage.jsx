import { useLoaderData } from "react-router-dom";
import ExpenseItem from "../components/ExpenseItem";
import AddExpenseFormModifyable from "../components/AddExpenseFormModifyable";
import { createExpenseModifyable, deleteItem, getAllMatchingItems } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

//Loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "expenses",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expensesModifyable",
    key: "expenseId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The Budget Does Not Exist!");
  }

  return { budget, expenses };
}


//Actions
export async function budgetAction( { request } ) {
  const data = await request.formData();
  const {_action,...values} = Object.fromEntries(data);

  if (_action === "createExpenseModifyable") {
    try {
      createExpenseModifyable({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        expenseId: values.newExpenseBudget,
      });
      return toast.success("New Expense  Added!");
    } catch {
      throw new Error("There was a problem creating your expense.");
    }
  }


 if (_action === "deleteExpense") {
   try {
     deleteItem({
       key:"expensesModifyable",
       id:values.expenseId, 
     });
     return toast.success("Expense deleted!");
   } catch {
     throw new Error("There was a problem deleting your expense.");
   }
 }

}

export default function BudgetPage() {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span>
      </h1>
      <div className="flex-lg">
        <ExpenseItem expense={budget} showDelete={true} />
        <AddExpenseFormModifyable expenses={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expensesModifyable={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
}
