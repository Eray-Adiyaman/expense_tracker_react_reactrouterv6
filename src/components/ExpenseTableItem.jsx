import { formatCurrency, formatDateToLocalString } from "../helpers";

export default function ExpenseTableItem({ expense }) {
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocalString(expense.createdAt)}</td>
    </>
  );
}
