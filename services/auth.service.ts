import { AuthResponse, LoginPayload, LoginResponse } from "@/types/auth";
import { api } from "./api";

class AuthService {
  /**
   * Login user with credentials
   * @param credentials - User login credentials
   * @returns AuthResponse with user data and tokens
   */
  async login(credentials: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await api.post<LoginResponse>(
        "/users/_login",
        credentials,
      );

      // Transform response to match AuthResponse format
      const authResponse: AuthResponse = {
        user: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          gender: response.data.gender,
          photo_url: response.data.photo_url,
          city_id: response.data.city_id,
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
        },
        token: response.data.token,
        refresh_token: response.data.refresh_token,
      };

      return authResponse;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Logout user (optional: call backend to invalidate token)
   */
  async logout(): Promise<void> {
    try {
      // Uncomment if you have logout endpoint
      // await api.post("/auth/logout", {});
    } catch (error) {
      console.error("Logout error:", error);
      // Don't throw error, allow local logout to proceed
    }
  }
}

export const authService = new AuthService();
