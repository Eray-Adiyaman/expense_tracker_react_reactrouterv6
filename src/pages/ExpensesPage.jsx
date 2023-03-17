import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { fetchData } from "../helpers";

//Loader Funtion
export function expensesLoader() {
  const expensesModifyable = fetchData("expensesModifyable");
  return { expensesModifyable };
}

export default function ExpensesPage() {
  const { expensesModifyable } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expensesModifyable && expensesModifyable.length > 0 ? (
        <div>
          <h2>
            Recent Expenses<small> ({expensesModifyable.length} total)</small>
          </h2>
          <Table expensesModifyable={expensesModifyable} />
        </div>
      ) : (
        <p> No Expenses to Show atm.</p>
      )}
    </div>
  );
}
