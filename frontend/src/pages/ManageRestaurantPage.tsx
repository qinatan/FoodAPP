import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";




const ManageRestaurantPage = () => {
  
  const {createRestuarant, isLoading: isCreateLoading} = useCreateMyRestaurant(); 
  const {updateRestaurant, isLoading: isUpdateLoading} = useUpdateMyRestaurant(); 
  const {restaurant} = useGetMyRestaurant(); 
  const isEditing = !!restaurant;


  return <ManageRestaurantForm 
  restaurant = {restaurant} 
  onSave={isEditing? updateRestaurant : createRestuarant} 
  isLoading={isUpdateLoading || isCreateLoading}/>;
}

export default ManageRestaurantPage;