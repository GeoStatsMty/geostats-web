import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["dist/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: false
});
