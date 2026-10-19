import { XMLBuilder } from "fast-xml-parser";
import { AppError } from "./AppError.js";
import { response } from "express";

const builder = new XMLBuilder({ format: true });

function resolveFormat(req) {
  const fromQuery = req.query.format;
  if (fromQuery !== undefined) {
    if (fromQuery !== "json" && fromQuery !== "xml") {
      throw new AppError("format must be 'json' or 'xml'", 400);
    }
    return fromQuery;
  }

  return req.accepts(["json", "xml"]) || "json";
}

export function respond(req, res, status, payload, itemName = "item") {
  const format = resolveFormat(req);

  if (format === "xml") {
    const body = { ...payload };
    if (body.data !== undefined) {
      body.data = { [itemName]: body.data }; 
    }
    const xml = builder.build({response : body});
    return res.status(status).type("application/xml").send(xml);
  }

  return res.status(status).json(payload);
}
