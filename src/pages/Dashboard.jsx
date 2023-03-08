//ReactRouter imports
import { useLoaderData } from "react-router-dom";

//helper functions
import { fetchData } from "../helpers"

//Loader Funtion
export function dashboardLoader(){
    const userName = fetchData("userName");
    return { userName }
}


export default function Dashboard() {

   const {userName} =  useLoaderData()

  return (
    <div>
        <h1>{userName}</h1>
    </div>
  )
}
