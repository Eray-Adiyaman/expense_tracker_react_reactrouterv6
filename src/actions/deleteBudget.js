import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";

export  function deleteBudget({ params }) {
 
    try {
    deleteItem({
      key: "expenses",
      id: params.id,
    });

    const relatedExpenses = getAllMatchingItems({
        category: "expensesModifyable",
        key: "expenseId",
        value: params.id,
    });

    relatedExpenses.forEach((expenseItem)=>{
        deleteItem({
            key: "expensesModifyable",
            id: expenseItem.id
        })
    });

    toast.success("Budget deleted!")
  } catch (error) {
    throw new Error("There was a problem deleting your budget.");
  }

  return redirect("/");
}
