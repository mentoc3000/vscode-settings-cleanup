import * as assert from 'assert';

import {foo} from '../io';

suite('IO Test Suit', () => {

	test('Sample test', () => {
		assert.strictEqual(foo(), 'foo');	
	});
});
