//ReactRouter imports
import { useLoaderData } from "react-router-dom";

import Intro from "../components/Intro";
import { toast } from "react-toastify";

//helper functions
import { fetchData } from "../helpers"

//Loader Funtion
export function dashboardLoader(){
    const userName = fetchData("userName");
    return { userName }
}

//action
//since intro component has the form and the forms submited to the page they live on , 
//so its submited to here dashboard and will handle the submit action here,
//since its a request the request obj can we destructured here
export async function dashboardAction({ request }){
 const data = await request.formData();
 const formData = Object.fromEntries(data);
 try {
   localStorage.setItem("userName",JSON.stringify(formData.userName))
   return toast.success(`Welcome, ${formData.userName}`)
 } catch (error) {
  throw new Error("There was an error while creating your account.")
 }
 console.log({data,request},formData)
}


export default function Dashboard() {

   const {userName} =  useLoaderData()

  return (
    <>
        {userName ? (<p>{userName}</p>) : <Intro />}
    </>
  )
}
