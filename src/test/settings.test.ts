import * as assert from 'assert';

import { parse } from '../settings';

suite('Settings Test Suite', () => {

	suite('parse', () => {

		test('Empty string', () => {
			assert.deepStrictEqual(parse(''), 0);
		});

	});
});
