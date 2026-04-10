import { apiClient } from "../../../lib/apiClient";
import type { Permission } from "../../../types/permission";

export async function getPermission() {
  try {
    const response = await apiClient.get<Permission[]>("permission/getAll");

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
