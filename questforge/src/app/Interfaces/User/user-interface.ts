export interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  bio: string;
  location: string;
  quote: string;
  availability: string[];
  playStyles: string[];
  rolTypes: string[];
  image: string;
}

export interface UserSearchFilters {
  locations?: string[];   
  rolTypes?: string[];    
  playStyles?: string[]; 
  ages?: number[];        
  genders?: string[];     
}
