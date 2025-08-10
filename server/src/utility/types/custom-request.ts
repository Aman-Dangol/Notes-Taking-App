import { Application, request, Request } from "express";
import { ParsedUrlQuery } from "querystring";
import { User } from "../../../generated/prisma";

/**
 * @template BodyParam - body params type
 */
interface CustomRequest<
  BodyParam extends object = {},
  UrlParam extends ParsedUrlQuery = {},
  AddCookies extends object = {},
  locals extends Record<string, unknown> = {}
> extends Request {
  /**
   * body params
   */
  body: BodyParam;
  query: UrlParam;
  app: Application & {
    locals: { user?: User } & locals;
  };
  cookies: { rt: string } & AddCookies;
}

export type { CustomRequest };
