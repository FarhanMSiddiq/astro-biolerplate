import { apiClient } from "../../../lib/apiClient";
import type { Role } from "../../../types/role";

export async function checkRole(id: string) {
  try {
    const response = await apiClient.get<Role[]>(`role/roleUsed/${id}`);

    return {
      status: 200,
      message: "Success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: 400,
      message: (error as Error).message,
      data: [],
    };
  }
}
