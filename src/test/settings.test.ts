import * as assert from 'assert';

import { parseFile } from '../settings';

suite('Settings Test Suite', () => {

	suite('parse', () => {

		test('Empty string', () => {
			assert.deepStrictEqual(parseFile(''), 0);
		});

	});
});
