import { apiClient } from "../../../lib/apiClient";

export async function changePermissions(userId: number, permissions: number[]) {
  try {
    const response = await apiClient.post(
      `user/changePermission/${userId}`,
      JSON.stringify({ permissions }),
    );

    if (response.status != 200) {
      return {
        status: response.status,
        message: response.data.err.detail,
      };
    }

    return {
      status: 200,
      message: response.data.message,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      status: error.response?.status ?? 400,
      message:
        error.response?.data?.error?.detail ??
        "Failed to change permission user",
    };
  }
}
