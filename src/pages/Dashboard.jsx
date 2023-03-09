//ReactRouter imports
import { useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";

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
    <>
        {userName ? (<p>{userName}</p>) : <Intro />}
    </>
  )
}
