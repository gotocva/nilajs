import { auth, readPM2Logs } from "@log/pm2-viewer";

import userRouter from "./user.routes";

import { expressExceptionHandler } from "@src/exceptions/express.exceptions";
import { webhookHandler } from "@src/ci/github";
import { accessLogViewer } from "@log/access-log-viewer";
import { logViewer } from "@log/viewer";

/**
 * 
 * @param {*} app 
 * @returns 
 */
export const routeLoader = (app) => {

  // user routes injection
  app.use("/user", userRouter)

  // all logs viewer routes injection
  app.get("/logs/:type", auth, logViewer);

  // github ci routes injection
  app.all("/ci/github/webhook", webhookHandler);

  // 404 not found response handler
  app.get("*", function (req, res) {
    return res.errorResponse(404, "Route not found", {})
  });

  // This middleware should be defined after all other route and middleware definitions.
  app.use(expressExceptionHandler)

  return app
}
