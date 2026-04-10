import { defineMiddleware } from "astro:middleware";
import routePermissions from "./utils/routePermission";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  const id = context.cookies.get("id");
  const permission = context.cookies.get("permission");
  const { pathname } = context.url;

  if (pathname.startsWith("/api")) {
    return next();
  }

  if (permission != undefined) {
    const fixPermission = JSON.parse(permission.value);
    const requiredPermissions = Object.entries(routePermissions).find(
      ([route]) => pathname.startsWith(route),
    )?.[1];

    if (requiredPermissions) {
      const hasPermission = requiredPermissions.some((requiredCode) =>
        fixPermission.some(
          (permission: { code: string }) => permission.code === requiredCode,
        ),
      );

      if (!hasPermission) {
        return context.redirect("/access-denied");
      }
    }
  }

  if (id != undefined && pathname == "/") {
    return context.redirect("/user");
  }

  if (id == undefined && pathname != "/") {
    return context.redirect("/");
  }

  return next();
});
