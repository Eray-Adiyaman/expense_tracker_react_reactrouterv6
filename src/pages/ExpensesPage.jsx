import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/Table";
import { deleteItem, fetchData } from "../helpers";

//Loader Funtion
export  async function expensesLoader() {
  const expensesModifyable = fetchData("expensesModifyable");
  return { expensesModifyable };
}

export async function expensesAction( { request } ) {
   const data = await request.formData();
   const {_action,...values} = Object.fromEntries(data);

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
