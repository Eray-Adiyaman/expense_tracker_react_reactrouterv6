//mockup delay
export const MockupDelay = () =>
  new Promise((res) => setTimeout(res, Math.random() * 100));

//rcolor
const generateRandomColor = () => {
  const existingExpenses = fetchData("expenses")?.length ?? 0;
  return `${existingExpenses * 34} 65% 50%`;
};

//Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//create Expense
export const createExpense = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const createExpenseModifyable = ({ name, amount, expenseId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    expenseId: expenseId,
  };

  const existingExpensesModifyable = fetchData("expensesModifyable") ?? [];
  return localStorage.setItem(
    "expensesModifyable",
    JSON.stringify([...existingExpensesModifyable, newItem])
  );
};



//delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

/* total spent*/
export const calculateSpentAmount = (budgetId) =>{
  const expenses = fetchData("expensesModifyable") ?? [];
  const budgetSpent = expenses.reduce((acc,expense)=>{
    if(expense.expenseId !== budgetId) return acc

    //add the current amount to total
    return acc += expense.amount

  },0)
  return budgetSpent;

}

/*Format functions */
export const formatPercentage = (amount) =>{
  return amount.toLocaleString(undefined,{
    style: "percent",
    minimumFractionDigits:0,
    currency: "EUR"
  })

}


export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "EUR"
  })
}


export const formatDateToLocalString = (epoch) => {
 return new Date(epoch).toLocaleDateString();
}