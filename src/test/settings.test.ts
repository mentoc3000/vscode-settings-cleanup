import * as assert from 'assert';

import { decompose } from '../settings';

suite('Settings Test Suite', () => {

	suite('decompose', () => {

		test('Empty object', () => {
			let settings = {};
			let result = decompose(settings);
			let expected = {};
			assert.deepStrictEqual(result, expected);
		});

		test('Flat object', () => {
			let settings = { 'a': 1, 'b': 2, 'c': 3 };
			let result = decompose(settings);
			let expected = { 'a': 1, 'b': 2, 'c': 3 };
			assert.deepStrictEqual(result, expected);
		});

		test('Nested object', () => {
			let settings = { 'a': 1, 'b': { 'c': 2, 'd': 3 } };
			let result = decompose(settings);
			let expected = { 'a': 1, 'b': { 'c': 2, 'd': 3 } };
			assert.deepStrictEqual(result, expected);
		});

		test('Shortened nested object', () => {
			let settings = { 'a': 1, 'b.c': 2, 'b.d': 3 };
			let result = decompose(settings);
			let expected = { 'a': 1, 'b': { 'c': 2, 'd': 3 } };
			assert.deepStrictEqual(result, expected);
		});

	});
});
