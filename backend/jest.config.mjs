export default {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["./src/tests"],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    testRegex: ".*\\.test\\.ts$",
    moduleFileExtensions: ["ts", "js", "json", "node"]
}