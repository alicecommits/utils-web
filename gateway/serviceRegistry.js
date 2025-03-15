const fs = require("fs");
const path = require("path");
const SERVICES_DIR = path.join(__dirname, "../services");

function registerServices(app) {
  // Read all service directories
  const services = fs
    .readdirSync(SERVICES_DIR)
    .filter((file) => fs.statSync(path.join(SERVICES_DIR, file)).isDirectory());

  console.log(`Found ${services.length} services to register`);

  // Register each service's routes
  services.forEach((serviceName) => {
    try {
      const servicePath = path.join(SERVICES_DIR, serviceName);
      const routesPath = path.join(servicePath, "backend/routes.js");

      if (fs.existsSync(routesPath)) {
        const routes = require(routesPath);

        // Mount services routes on /api/{service-name}
        app.use(`/api/${serviceName.replace("-service", "")}`, routes);

        // Serve static files for this service
        const frontendPath = path.join(servicePath, "frontend");
        if (fs.existsSync(frontendPath)) {
          app.use(
            `/${serviceName.replace("-service", "")}`,
            express.static(frontendPath)
          );
        }
        console.log(`Registered service: ${serviceName}`);
      }
    } catch (err) {
      console.error(`Failed to register service ${serviceName}: `, err);
    }
  });
}

module.exports = { registerServices };
