module.exports = function (api) {
    api.cache(true);
    return {
        presents: ["babel-preset-expo"],
        plugins: [
            [
                "module:react-native-dotenv",
                {
                    moduleName: "@env",
                    path: ".env"
                },
            ],
        ],
    };
}