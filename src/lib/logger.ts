// Journalisation structurée (JSON) — S2. Sortie compatible collecteurs de logs
// (Vercel log drains, Datadog, Loki…). Un enregistrement = une ligne JSON.
export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogFields { [k: string]: unknown }

export function log(level: LogLevel, msg: string, fields: LogFields = {}): void {
  const record = { ts: new Date().toISOString(), level, msg, ...fields };
  const line = JSON.stringify(record);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = {
  debug: (msg: string, fields?: LogFields) => log("debug", msg, fields),
  info: (msg: string, fields?: LogFields) => log("info", msg, fields),
  warn: (msg: string, fields?: LogFields) => log("warn", msg, fields),
  error: (msg: string, fields?: LogFields) => log("error", msg, fields),
};
