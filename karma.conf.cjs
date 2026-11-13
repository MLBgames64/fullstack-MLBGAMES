// Configuración de Karma: el "director de orquesta" que abre Chrome y corre las pruebas.
const esModoCI = process.env.CI_MODE === "true";

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],

    // Busca TODAS las pruebas dentro de src/
    files: [
      { pattern: "src/**/*.spec.js", watched: false },
      { pattern: "src/**/*.spec.jsx", watched: false },
    ],

    // Antes de correr, pasa cada prueba por webpack (que traduce JSX con Babel)
    preprocessors: {
      "src/**/*.spec.js": ["webpack"],
      "src/**/*.spec.jsx": ["webpack"],
    },

    webpack: {
      mode: "development",
      devtool: false,
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  ["@babel/preset-react", { runtime: "automatic" }],
                ],
                // Mide la cobertura solo en modo CI, y no cuenta las pruebas ni el helper
                plugins: esModoCI
                  ? [["istanbul", { exclude: ["**/*.spec.js", "**/*.spec.jsx", "src/test/**"] }]]
                  : [],
              },
            },
          },
          { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
      },
    },

    reporters: esModoCI ? ["spec", "coverage"] : ["spec"],

    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "html", subdir: "html" }, { type: "text-summary" }],
    },

    browsers: [esModoCI ? "ChromeHeadlessSinSandbox" : "Chrome"],
    customLaunchers: {
      ChromeHeadlessSinSandbox: { base: "ChromeHeadless", flags: ["--no-sandbox"] },
    },

    singleRun: esModoCI,
    autoWatch: !esModoCI,
    restartOnFileChange: !esModoCI,
  });
};