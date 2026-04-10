import { apiClient } from "../../../lib/apiClient";

export async function deleteRole(id: string) {
  try {
    const response = await apiClient.delete(`role/delete/${id}`);

    if (response.status != 200) {
      return {
        status: response.status,
        message: response.data.err.detail,
      };
    }

    return {
      status: 200,
      message: "Role delete successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      status: error.response?.status ?? 400,
      message: error.response?.data?.error?.detail ?? "Failed to delete user",
    };
  }
}
