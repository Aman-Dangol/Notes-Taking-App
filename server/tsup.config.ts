import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  clean: true,
  format: "esm",
  outDir: "dist",
  tsconfig: "./tsconfig.json",
  dts: true,
});
