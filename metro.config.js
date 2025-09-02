const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
    // assets
    "@colors": path.resolve(__dirname, "src/assets/colors"),
    "@images": path.resolve(__dirname, "src/assets/images"),
    "@localization": path.resolve(__dirname, "src/assets/localization"),
    "@styles": path.resolve(__dirname, "src/assets/styles"),
    // src
    "@components": path.resolve(__dirname, "src/components"),
    "@context": path.resolve(__dirname, "src/context"),
    "@models": path.resolve(__dirname, "src/models"),
    "@services": path.resolve(__dirname, "src/services"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@types:": path.resolve(__dirname, "src/types"),
    "@enums:": path.resolve(__dirname, "src/enums")
};

module.exports = config;
