import { http } from "../../apiClient/httpClient";
import { CommonResponse } from "../../apiClient/response";
import { User, UserSearchFilters } from "../../Interfaces/User/user-interface";
import { BASE_API_URL } from "@/app/Constants/api";
import { LocationFilter, PlayStyleFilter, RolTypeFilter } from "@/app/Interfaces/Board/board-interface";
import { ParamValue, withQuery } from "@/app/Utils/buildQueryOptions";

export class UserCardService {
  static async getAllUsers(): Promise<CommonResponse<User[]>> {
    try {
      const response = await http<User[]>(`${BASE_API_URL}/user-service/users`, {
        method: "GET",
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}


export class LocationService {
  static async getAllLocations(): Promise<CommonResponse<LocationFilter[]>> {
    return http<LocationFilter[]>(`${BASE_API_URL}/user-directory-service/get-all/locations`, {
      method: "GET",
    });
  }
}

export class PlayStyleService {
  static async getAllPlayStyles(): Promise<CommonResponse<PlayStyleFilter[]>> {
    return http<PlayStyleFilter[]>(`${BASE_API_URL}/user-directory-service/get-all/playstyles`, {
      method: "GET",
    });
  }
}

export class RolTypeService {
  static async getAllRolTypes(): Promise<CommonResponse<RolTypeFilter[]>> {
    return http<RolTypeFilter[]>(`${BASE_API_URL}/user-directory-service/get-all/roltypes`, {
      method: "GET",
    });
  }
}

export class UserBoardFilter {
  static async searchUsers(filters: UserSearchFilters = {}): Promise<CommonResponse<User[]>> {
    const url = withQuery(
      `${BASE_API_URL}/user-directory-service/users/filter`,
      filters as unknown as Record<string, ParamValue>,
      { arrayFormat: "repeat", skipNulls: true, encode: true }
    );
    return http<User[]>(url, { method: "GET" });
  }

}

export default UserCardService;
