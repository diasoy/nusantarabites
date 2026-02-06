import { storage } from "@/lib/storage";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://nusantara-kuliner-api-bc2bf1eb0905.herokuapp.com/api";

class ApiService {
  /**
   * Get auth token from storage
   */
  private async getAuthToken(): Promise<string | null> {
    try {
      return await storage.getToken();
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  }

  /**
   * Main request method with automatic token injection
   */
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const token = await this.getAuthToken();
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    };


    try {
      const response = await fetch(url, config);

      console.log("📥 Response Status:", response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        console.error("❌ API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });

        if (response.status === 401) {
          throw new Error(
            errorData.message || "Unauthorized - Please login again",
          );
        }

        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const api = new ApiService();
