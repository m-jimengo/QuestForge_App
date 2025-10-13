import { http } from "./httpClient";
import { CommonResponse } from "./response";
import { User } from "../../Interfaces/Board/user-card-interface";

const BASE_URL = "http://localhost:8080/user-service/users";

export class UserCardService {
  static async getAllUsers(): Promise<CommonResponse<User[]>> {
    console.log("📡 UserCardService.getAllUsers called")
    console.log("🔗 BASE_URL:", BASE_URL);
    console.log("🧩 imported http:", http); 

    try {
      const response = await http<User[]>(BASE_URL, { method: "GET" });
      console.log("✅ Response from http:", response); 
      return response;
    } catch (error) {
      console.error("❌ Error calling http:", error);
      throw error;
    }
  }
}

export default UserCardService;
