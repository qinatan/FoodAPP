
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

//udpateUser is a API call that gives all the argument required for onSave() 
//onSave is passed as an functional argument for 


const UserProfilePage = () => {
  const { currentUser } = useGetMyUser(); 
  const {updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();   
  if(!currentUser){
    return<span>Unable to load user profile</span>
  }
  
  return(
  <>
    <UserProfileForm currentUser={currentUser} onSave ={updateUser} isLoading={isUpdateLoading} />
  </>
  )
}
export default UserProfilePage;