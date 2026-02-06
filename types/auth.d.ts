// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string | null;
  photo_url: string | null;
  city_id: number | null;
  created_at: number;
  updated_at: number;
}

// Auth Request Types
export interface LoginPayload {
  identifier: string;
  password: string;
  role_id: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  role_id: string;
}

// Auth Response Types
export interface LoginResponse {
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string | null;
    photo_url: string | null;
    city_id: number | null;
    token: string;
    refresh_token: string;
    created_at: number;
    updated_at: number;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token: string;
}

// Auth State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Auth Context Types
export interface AuthContextType extends AuthState {
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}
