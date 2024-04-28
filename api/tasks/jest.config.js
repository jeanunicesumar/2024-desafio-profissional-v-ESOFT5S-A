module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            function: 80,
            lines: 80,
            statements: 80
        }
    },
    testPathIgnorePatterns: ['./dist/*']
}