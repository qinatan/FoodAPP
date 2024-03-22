export type User = {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };

export type MenuItem ={
  _id: string; 
  name: string; 
  price: number;
}


export type Restaurant ={
  _id: string; 
  user: string; 
  restaurantName: string; 
  country: string; 
  deliveryPrice: number; 
  estimatedDeliveryTime: number; 
  cuisiens: string[]; 
  menuItems: MenuItem[]; 
  imageUrl: string; 
  lastUpdate: string; 
}