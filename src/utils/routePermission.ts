const routePermissions: Record<string, string[]> = {
  "/user": ["can_access_users"],
  "/role": ["can_access_role"],
  "/permission": ["can_access_permission"],
};

export default routePermissions;
