import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy V1 reference archive + migration scripts: preserved as-is (CommonJS),
    // not part of the V2 app and intentionally exempt from V2 lint rules.
    "archive/**",
    "scripts/migration/**",
  ]),
]);

export default eslintConfig;
