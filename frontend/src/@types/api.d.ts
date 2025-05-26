type User = {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
  isActive: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};


interface HeaderProps {
  isLoggedIn: boolean;
  username: string;
  isActive: boolean;
  avatarUrl: string;
}

interface MainCardProps {
  title: string;
  subtitle: string;
  categories: string[];
}

interface HeaderProps {
  isLoggedIn: boolean;
  username: string;
  isActive: boolean;
  avatarUrl?: string;
  onLoginSuccess?: (userData: { username: string; avatarUrl?: string; isActive: boolean }) => void; 
  onLogout: () => void;
}

interface CourseCardProps {
  id: number;
  title: string;
  subtitle: string;
  categories: string[];
}

type TagType = { id: number; name: string };
type Course = {
  id: number;
  title: string;
  description: string;
  tags: TagType[];
  created_at: string;
  updated_at: string;
  image: string;
  teacher: string;
  goals: string[];
};

interface Course {
  id: number;
  title: string;
  description: string;
  tags: { id: number; name: string }[];
  created_at: string;
  updated_at: string;
  teacher?: string;
  goals?: string[];
  image?: string;
}