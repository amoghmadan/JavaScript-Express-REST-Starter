/** @type {import('jest')}.Config */
const config = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  verbose: true,
};

module.exports = config;
