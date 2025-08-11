import { Application, request, Request } from "express";
import { ParsedUrlQuery } from "querystring";
import { User } from "../../../generated/prisma";

/**
 * @template BodyParam - body params type
 */
interface CustomRequest<
  /**
   * body data
   */
  BodyParam extends object = {},
  /**
   * url parameters
   */
  UrlParam extends ParsedUrlQuery = {},
  /**
   * addtional cookies to set
   */
  AddCookies extends object = {},
  /**
   * req.app.locals
   */
  Locals extends Record<string, unknown> = {},
  /**
   * params like /:id
   */
  Params extends Record<string, string> = {}
> extends Request {
  /**
   * body params
   */
  params: Params;
  body: BodyParam;
  query: UrlParam;
  app: Application & {
    locals: { user?: User } & Locals;
  };
  cookies: { rt: string } & AddCookies;
}

export type { CustomRequest };
