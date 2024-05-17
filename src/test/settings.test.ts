import * as assert from 'assert';

import {foo} from '../settings';

suite('IO Test Suit', () => {

	test('Sample test', () => {
		assert.strictEqual(foo(), 'foo');	
	});
});
