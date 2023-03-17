import { calculateSpentAmount, formatCurrency, formatPercentage } from "../helpers";

export default function ExpenseItem({ expense }) {
  const { id , name ,amount ,color} = expense;
  const spent = calculateSpentAmount(id);
  // console.log(color)
  
    return (
    <div 
      className="expense"
      style={
        {"--accent": color}
      }
    >
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount)} Allocated</p>
        </div>
        <progress max={amount} value={spent}>
            {formatPercentage(spent/amount)}
        </progress>
        <div className="progress-text">
            <small>{formatCurrency(spent)}</small>
            <small>{formatCurrency(amount-spent)} remaining</small>
        </div>
    </div>
  )
}
