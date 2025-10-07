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
  playStyle: string[];
  rolType: string[];
  image: string;
}

export interface UserCardProps {
  user: User;
  onClick?: (user: User) => void;
  className?: string;
}

export interface UserFilters {
  availability?: string[];
  playStyle?: string[];
  rolType?: string[];
  location?: string;
  ageRange?: {
    min: number;
    max: number;
  };
}
