import { reactive } from 'vue';

interface AuthState {
  isLoggedIn: boolean;
}

export const auth = reactive<AuthState>({
  isLoggedIn: false
});
