const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // defaultCommandTimeout: 15000,
    baseUrl: 'https://stg-canary-admin-dashboard.vercel.app/',
    experimentalStudio: true,
    // baseUrl: 'http://localhost:3000/',
    // setupNodeEvents(on, config) {
    //   implement node event listeners here
    // },
    projectId: "evpgjd",
    experimentalSessionAndOrigin:true
  },
  
  "scripts": {
    "start": "node index.js",
    "build": "npm run build",
    "test": "npm run test:unit && npm run test:e2e",
    "test:unit": "jest",
    "test:e2e": "cypress run"
  }
});
