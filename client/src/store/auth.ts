import { reactive } from 'vue';

interface User {
  id: string | null;
  name: string;
  avatarURL: string;
  description: string;
  email: string;
  // Add other properties as needed
} 

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export const auth = reactive<AuthState>({
  isLoggedIn: false,
  user: null
});
