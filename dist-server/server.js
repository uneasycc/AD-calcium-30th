"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server/server.ts
var import_http = require("http");
var import_express3 = __toESM(require("express"));

// server/routes/index.ts
var import_express = require("express");
var router = (0, import_express.Router)();
router.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Express + Vite!",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
router.post("/api/data", (req, res) => {
  const requestData = req.body;
  res.json({
    success: true,
    data: requestData,
    receivedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
});
router.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    env: process.env.COZE_PROJECT_ENV,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
var routes_default = router;

// server/vite.ts
var import_express2 = __toESM(require("express"));
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var import_vite2 = require("vite");

// vite.config.ts
var import_vite = require("vite");
var vite_config_default = (0, import_vite.defineConfig)({
  base: "/AD-calcium-30th/",
  build: { outDir: "docs" },
  server: {
    port: 5e3,
    host: "0.0.0.0",
    allowedHosts: true,
    hmr: {
      overlay: true,
      path: "/hot/vite-hmr",
      port: 6e3,
      clientPort: 443,
      timeout: 3e4
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  }
});

// server/vite.ts
var isDev = process.env.COZE_PROJECT_ENV !== "PROD";
async function setupViteMiddleware(app2) {
  const vite = await (0, import_vite2.createServer)({
    ...vite_config_default,
    server: {
      ...vite_config_default.server,
      middlewareMode: true
    },
    appType: "spa"
  });
  app2.use(vite.middlewares);
  console.log("\u{1F680} Vite dev server initialized");
}
function setupStaticServer(app2) {
  const distPath = import_path.default.resolve(process.cwd(), "dist");
  if (!import_fs.default.existsSync(distPath)) {
    console.error('\u274C dist folder not found. Please run "pnpm build" first.');
    process.exit(1);
  }
  app2.use(import_express2.default.static(distPath));
  app2.use((_req, res) => {
    res.sendFile(import_path.default.join(distPath, "index.html"));
  });
  console.log("\u{1F4E6} Serving static files from dist/");
}
async function setupVite(app2) {
  if (isDev) {
    await setupViteMiddleware(app2);
  } else {
    setupStaticServer(app2);
  }
}

// server/server.ts
var isDev2 = process.env.COZE_PROJECT_ENV !== "PROD";
var port = parseInt(process.env.PORT || "5000", 10);
var hostname = process.env.HOSTNAME || "localhost";
var app = (0, import_express3.default)();
var server = (0, import_http.createServer)(app);
async function startServer() {
  if (isDev2) {
    app.use((req, res, next) => {
      const start = Date.now();
      res.on("finish", () => {
        const ms = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${ms}ms`);
      });
      next();
    });
  }
  app.use(import_express3.default.json());
  app.use(import_express3.default.urlencoded({ extended: true }));
  app.use(routes_default);
  await setupVite(app);
  app.use((err, req, res) => {
    console.error("Server error:", err);
    const status = "status" in err ? err.status ?? 500 : 500;
    res.status(status).json({
      error: err.message || "Internal server error"
    });
  });
  server.once("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  });
  server.listen(port, () => {
    console.log(`
\u2728 Server running at http://${hostname}:${port}`);
    console.log(`\u{1F4DD} Environment: ${isDev2 ? "development" : "production"}
`);
  });
  return server;
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
