// jest.config.js
module.exports = {
    testTimeout: 20000,
    collectCoverage: true,
    moduleNameMapper: {
        '@config/(.*)$':  '<rootDir>/dist/config/$1',
        '@controller/(.*)$':  '<rootDir>/dist/controllers/$1',
        '@model/(.*)$':  '<rootDir>/dist/models/$1',
        '@util/(.*)$':  '<rootDir>/dist/utils/$1',
        '@middleware/(.*)$':  '<rootDir>/dist/middlewares/$1',
        '@route/(.*)$':  '<rootDir>/dist/routes/$1',
        '@validator/(.*)$':  '<rootDir>/dist/validators/$1'
    },
    collectCoverageFrom: [
        'dist/**/*.js',
        '!tests/**/*.test.js'
    ],
    coverageReporters: ['html', 'text']
}