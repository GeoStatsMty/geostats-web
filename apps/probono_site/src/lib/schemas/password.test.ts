import {ZodError} from 'zod';
import {passwordUpdateSchema} from '@/lib/schemas/password.ts';

describe('password update schema', () => {
	const validPassword = {
		currentPassword: 'abc',
		password: '',
	};
	test('parsing valid password update should pass', () => {
		expect(() => passwordUpdateSchema.parse(validPassword)).not.toThrow();
	});
	test('parsing incomplete password update should throw 1', () => {
		expect(() => {
			const {currentPassword, ...rest} = validPassword;
			passwordUpdateSchema.parse(rest);
		}).toThrow(ZodError);
	});
	test('parsing incomplete password update should throw 2', () => {
		expect(() => {
			const {password, ...rest} = validPassword;
			passwordUpdateSchema.parse(rest);
		}).toThrow(ZodError);
	});
	test('parsing empty object should throw', () => {
		expect(() => passwordUpdateSchema.parse({})).toThrow(ZodError);
	});
});
