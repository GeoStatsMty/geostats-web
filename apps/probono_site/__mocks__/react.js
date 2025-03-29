const react = jest.createMockFromModule('react');

react.cache = function_ => function_;

module.exports = react;
