import { Request } from "express";
import { ParsedUrlQuery } from "querystring";

/**
 * @template BodyParam - body params type
 */
interface CustomRequest<
  BodyParam extends object = {},
  UrlParam extends ParsedUrlQuery = {}
> extends Request {
  /**
   * body params
   */
  body: BodyParam;
  query: UrlParam;
}

export type { CustomRequest };
