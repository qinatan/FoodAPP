import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {z} from 'zod'; 

const formSchema = z.object({
    email: z.string().optional(),  
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "addressLine1 is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),
})
type UserFormData = z.infer<typeof formSchema>; 

type Props ={
    onSave:(userProfileData: UserFormData) => void; // indicate onSave is a function that takes argument userProfileData that consist with type UserFormData 
    isLoading: boolean; 
    currentUser: User; 
    }

const UserProfileForm = ({onSave, isLoading, currentUser}: Props) => {
    
    const formObject = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    }); 

    useEffect(()=>{
        formObject.reset(currentUser);
    }, [currentUser, formObject])
    
    return(
        <Form {...formObject}> 
            <form onSubmit= {formObject.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div>
                    <h2 className="text-2xl font-bold"> User Profile Form </h2>
                    <FormDescription>
                        View and change your profile information here 
                    </FormDescription>
      
                </div>
                <FormField control={formObject.control} name="email" render={({field}) =>(
                    <FormItem >
                        <FormLabel> Email </FormLabel>                
                        <FormControl> 
                            <Input {...field} value= {currentUser.email}  disabled className="bg-white"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                />
                <FormField control={formObject.control} name="name" render={({field}) =>(
                    <FormItem>
                        <FormLabel> Name </FormLabel>                
                        <FormControl> 
                            <Input {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                    )}
                />

                <div className="flex flex-col md:flex-row gap-4" >
                    <FormField control={formObject.control} name="addressLine1" render={({field}) =>(
                        <FormItem className="flex-1">
                            <FormLabel> AddressLine1 </FormLabel>                
                            <FormControl> 
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                    />
                    <FormField control={formObject.control} name="city" render={({field}) =>(
                        <FormItem className="flex-1">
                            <FormLabel> City </FormLabel>                
                            <FormControl> 
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                    />
                    <FormField control={formObject.control} name="country" render={({field}) =>(
                        <FormItem className="flex-1">
                            <FormLabel> Country </FormLabel>                
                            <FormControl> 
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                    />
                </div>
                {isLoading ? (<LoadingButton/>) : 
                             (<Button type="submit" className="bg-orange-500">Submit</Button>)}
            </form>
        </Form>)
    }
export default UserProfileForm;