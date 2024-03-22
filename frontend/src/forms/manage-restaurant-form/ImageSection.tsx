import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useFormContext } from "react-hook-form";

//field is an object reutrned when register an input field using the useForm() or useFieldArray() hook 


const ImageSection = () => {
  const {control, watch} = useFormContext(); 
  const existingImageUrl = watch("imageUrl");

  return(
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Image</h2>
            <FormDescription>Add an image that will displayed on your restaurant listing in the search result</FormDescription>
        </div>
        
        <div className="flex flex-col gap-8 w-[50%]">
            {existingImageUrl &&(
                <AspectRatio ratio ={16/9}>
                    <img src={existingImageUrl} className="rounded-md object-cober h-full w-full"/>
                </AspectRatio>
            )}
            <FormField 
            control = {control}
            name="imageFile"
            render ={({field})=>(
                <FormItem>
                    <FormControl>
                    <Input  className="bg-white" 
                            type="file" 
                            accept=".jpg, .jpeg, .png"
                            onChange={(event)=>field.onChange(event.target.files? event.target.files[0]: null)}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
        </div>
    </div>
  )
}
export default ImageSection;