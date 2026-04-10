import { apiClient } from "../../../lib/apiClient";

export async function deletePermission(id: string) {
  try {
    const response = await apiClient.delete(`permission/delete/${id}`);

    if (response.status != 200) {
      return {
        status: response.status,
        message: response.data.err.detail,
      };
    }

    return {
      status: 200,
      message: "Permission delete successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      status: error.response?.status ?? 400,
      message: error.response?.data?.error?.detail ?? "Failed to delete user",
    };
  }
}
