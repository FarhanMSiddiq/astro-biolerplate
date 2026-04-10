import { apiClient } from "../../../lib/apiClient";
import type { Users } from "../../../types/users";

export async function getUser() {
  try {
    const response = await apiClient.get<Users[]>('user/getAll');

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
