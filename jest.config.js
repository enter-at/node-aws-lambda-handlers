module.exports = {
    "verbose": true,
    "preset": "ts-jest",
    "testEnvironment": "node",
    "coverageDirectory": "test-reports",
    "roots": [
        "src"
    ],
    "reporters": [
        "default",
        ["jest-junit", {
            "outputDirectory": "test-reports/jest",
            "outputName": "report.xml"
        }]
    ]
};
