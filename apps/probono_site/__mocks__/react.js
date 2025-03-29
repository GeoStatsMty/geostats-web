const react = jest.createMockFromModule('react');

react.cache = function_ => function_;

export default react;
