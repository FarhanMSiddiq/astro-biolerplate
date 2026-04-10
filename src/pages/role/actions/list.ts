import { apiClient } from "../../../lib/apiClient";
import type { Role } from "../../../types/role";

export async function getRole() {
  try {
    const response = await apiClient.get<Role[]>("role/getAll");

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
