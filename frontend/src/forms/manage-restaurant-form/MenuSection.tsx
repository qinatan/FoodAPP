import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput";

//fields is a array of current item object user added to menuItems. Each item object has an item name and price 
//append and remove are functions allow to add or delete item object from fields array --> also add <FormField/> dynamically to the UI 

const MenuSection =()  =>{
    const {control} = useFormContext(); 
    const {fields, append,remove } = useFieldArray({
        control, 
        name: "menuItems" 
})

return(
    <div>
        <div>
            <h2 className="text-2xl font-bold">Menu</h2>
            <FormDescription>Create your menu and give each item a name and a price</FormDescription>
        </div>
        <FormField control={control} name= "menuItems" render={()=>(
            <FormItem className="flex flex-col gap-2">
                {fields.map((_, index) =>(
                    <MenuItemInput 
                        index={index}
                        removeMenuItem={()=>remove(index)}
                    />
                ))}
            </FormItem>
        )}/>
        <Button type="button" onClick={()=>append({name: "", price:""})}>
            Add Menu Item 
        </Button>
    </div>
)
}


export default MenuSection;