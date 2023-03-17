import ExpenseTableItem from "./ExpenseTableItem";

export default function Table({ expensesModifyable }) {
  console.log(expensesModifyable.map((expense) => expense.name));
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date"].map((i, index) => (
              <th key={index}> {i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expensesModifyable.map((expense) => (
            <tr key={expense.id}>{<ExpenseTableItem expense={expense} />}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
