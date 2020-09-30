import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default {
  input: ["./src/index.ts"],

  output: {
    file: "./dist/index.js",
    format: "iife",
    sourcemap: false,
  },

  plugins: [
    resolve({
      extensions: [".ts"],
    }),

    commonjs({
      sourceMap: false,
      ignoreGlobal: true,
    }),

    typescript(),
  ],
};
