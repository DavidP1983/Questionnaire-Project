import type { Config } from "jest";

const config: Config = {
    rootDir: './',
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    maxWorkers: "50%",
    moduleDirectories: ['src', 'node_modules'],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|jpg|png)$': '<rootDir>/test/mocks/fileMock.js',
        '^.+\\.(css|less|scss|sass)$': "identity-obj-proxy",
    },
}

export default config;