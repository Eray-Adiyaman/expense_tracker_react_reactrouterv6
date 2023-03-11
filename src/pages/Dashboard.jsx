//ReactRouter imports
import { useLoaderData } from "react-router-dom";

import Intro from "../components/Intro";
import AddExpenseForm from "../components/AddExpenseForm";
import { toast } from "react-toastify";

//helper functions
import { createExpense, fetchData, MockupDelay } from "../helpers";

//Loader Funtion
export function dashboardLoader() {
  const userName = fetchData("userName");
  const expenses = fetchData("expenses");

  return { userName, expenses };
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

  if(_action === "createExpense"){
    try{
      createExpense({name: values.newExpense, amount: values.newExpenseAmount})
      return toast.success("New Expense Added!")
    }catch{
      throw new Error("There was a problem creating your expense.")
    }
  }



}

export default function Dashboard() {
  const { userName, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome Back,<span className="accent"> {userName}</span>
          </h1>
          <div className="grid-sm">
            {/* {expenses ? () : () } */}
            <div className="gird-lg">
              <div className="flex-lg">
                <AddExpenseForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}
