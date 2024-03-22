import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import {User} from "@/types";

//configure the base URL for API request 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

//define typescript type 
type CreateUserRequest = {
    auth0Id: string; 
    email: string; 
}
export const useCreateMyUser =() =>{
     const {getAccessTokenSilently} = useAuth0(); 
    // asyn - keyword used to define an asynchronous function that perform operation in the back
    // user is the paramter, CreateUserRequest is the type that user should adhere to  
    const createMyUserRequest = async(user: CreateUserRequest) => {
     
        const accessToken = await getAccessTokenSilently(); 

        //fetch is function helps to make request to other places on the internet, like asking for information from a server 
        //`${API_BASE_URL}/api/my/user` is the URL where the website sending its request 
        //post: the website trying to send information to the server 
        //headers: provide addition information to the server -> specificing the format of the information being sent 
        //body: the acutal information is placed 
        const response = await fetch (`${API_BASE_URL}/api/my/user`, {
            method: "POST", 
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user), 
        }); 
        if(!response.ok){
        throw new Error("Failed to create new user!!");}  
    } 
    //useMutation is a hook that is being called with useCreateMyUserRequest as an argument to sets up and initalize a mutation
    //destructuring assignment to extract specified properties from the object returned by useMutation()
    //mutateAsync is being renamed to createUser -> a function call to trigger the mutation 
    const{mutateAsync: createUser, isLoading, isError, isSuccess,} = useMutation(createMyUserRequest);
        return {createUser, isLoading, isError, isSuccess};
    };

type updateMyUserRequest ={
    name: string; 
    addressLine1: string; 
    city: string; 
    country: string; 
};

export const useUpdateMyUser =() =>{
    const {getAccessTokenSilently, } = useAuth0(); 
    const updateMyUserRequest = async (formData: updateMyUserRequest) =>{
        const accessToken = await getAccessTokenSilently();   
        const response = await fetch(
            `${API_BASE_URL}/api/my/user`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`, 
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(formData), // request body contains formData 
            })
        if (!response.ok){
            throw new Error ("Failed to update user"); 
        }
        return response.json()
    }

    const{mutateAsync: updateUser, isLoading, isSuccess, error, reset} = useMutation(updateMyUserRequest); 
    
    if (isSuccess){
        toast.success("User profile updated!"); 
    }
    if (error){
        toast.error(error.toString());
        reset(); 
    }
    return{updateUser, isLoading};
}

export const useGetMyUser =() =>{
    const{getAccessTokenSilently} = useAuth0(); 
    const getMyUserRequest = async(): Promise<User>=>{
        const accessToken = await getAccessTokenSilently(); 
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET", 
            headers:{
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", 
            }
        });

        if (!response.ok){
            throw new Error("Failed to fetch user!!"); 
        }
        return response.json(); 
    };

    const {data: currentUser, isLoading, error} = useQuery("fetchCurrentUser", getMyUserRequest);    
    if(error){
        toast.error(error.toString()); 
    }
    return{currentUser, isLoading};
};