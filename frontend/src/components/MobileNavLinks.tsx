import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
    const {logout} = useAuth0(); 
  
    return(
    <div className="flex flex-col" >
        <Link to='/user-profile' className=" mb-3 bg-white items-center font-bold  hover: text-orange-500 block" >User Profile</Link>
        <Button className="mb-3 items-center px-3 font-bold hover: bg-gray-500" onClick={()=>logout()} >
            Log Out
        </Button>
    </div>

  )
}

export default MobileNavLinks;