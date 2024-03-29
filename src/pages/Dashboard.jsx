//ReactRouter imports
import { Link, useLoaderData } from "react-router-dom";

import Intro from "../components/Intro";
import AddExpenseForm from "../components/AddExpenseForm";
import AddExpenseFormModifyable from "../components/AddExpenseFormModifyable";
import ExpenseItem from "../components/ExpenseItem";
import Table from "../components/Table";
import { toast } from "react-toastify";

//helper functions
import {
  createExpense,
  createExpenseModifyable,
  deleteItem,
  fetchData,
  MockupDelay,
} from "../helpers";

//Loader Funtion
export function dashboardLoader() {
  const userName = fetchData("userName");
  const expenses = fetchData("expenses");
  const expensesModifyable = fetchData("expensesModifyable");
  return { userName, expenses, expensesModifyable };
}

//action
//since intro component has the form and the forms submited to the page they live on ,
//so its submited to here dashboard and will handle the submit action here,
//since its a request the request obj can we destructured here
export async function dashboardAction({ request }) {
  await MockupDelay();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //At New User Submit
  if (_action === "newUser") {
    try {
      // throw new Error("test error")
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("There was an error while creating your account.");
    }
  }

  console.log({ data, request }, values);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
      });
      return toast.success("New Expense Added!");
    } catch {
      throw new Error("There was a problem creating your expense.");
    }
  }

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

export default function Dashboard() {
  const { userName, expenses, expensesModifyable } = useLoaderData();
  //console.log(expensesModifyable);
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome Back,<span className="accent"> {userName}</span>
          </h1>
          <div className="grid-sm">
            {expenses && expenses.length > 0 ? (
              <div className="gird-lg">
                <div className="flex-lg">
                  <AddExpenseForm />
                  <AddExpenseFormModifyable expenses={expenses} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="expenses">
                  {expenses.map((expense) => (
                    <ExpenseItem key={expense.id} expense={expense} />
                  ))}
                </div>
                {expensesModifyable && expensesModifyable.length > 0 && (
                  <div className="grid-md">
                    <h2> Recent Expenses</h2>
                    <Table
                      expensesModifyable={expensesModifyable
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expensesModifyable.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        view all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Be Wise With Your Money and Spendings</p>
                <p>
                  Personal budget tracking is the secret to financial stability.
                  Start your track today.
                </p>
                <AddExpenseForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}
