import { redirect } from "react-router-dom"
import { toast } from "react-toastify"
import { deleteItem } from "../helpers"

export async function logoutAction(){

    deleteItem({key: "userName"})
    toast.success("Successfully deleted!")
    return redirect("/")
}

