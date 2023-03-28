module.exports = {
  transform: {
    ".*\\.(vue)$": "@vue/vue3-jest",
    ".*\\.(js)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleFileExtensions: ["js", "vue", "json"],
  setupFilesAfterEnv: ["./test/setupTest.js"],
};
