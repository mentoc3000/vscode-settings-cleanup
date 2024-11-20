import * as assert from 'assert';

import { condense, decompose } from '../settings';

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



	suite('condense', () => {

		test('Empty object', () => {
			let settings = {};
			let result = condense(settings);
			let expected = {};
			assert.deepStrictEqual(result, expected);
		});

		test('Flat object', () => {
			let settings = { 'a': 1, 'b': 2, 'c': 3 };
			let result = condense(settings);
			let expected = { 'a': 1, 'b': 2, 'c': 3 };
			assert.deepStrictEqual(result, expected);
		});

		test('Nested object', () => {
			let settings = { 'a': 1, 'b': { 'c': 2, 'd': 3 } };
			let result = condense(settings);
			let expected = { 'a': 1, 'b': { 'c': 2, 'd': 3 } };
			assert.deepStrictEqual(result, expected);
		});

		test('Shortened nested object', () => {
			let settings = {'b': { 'c': 2 } };
			let result = condense(settings);
			let expected = { 'b.c': 2 };
			assert.deepStrictEqual(result, expected);
		});

	});
});
