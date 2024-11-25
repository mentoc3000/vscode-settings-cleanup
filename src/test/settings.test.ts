import * as assert from 'assert';
import { CommentObject } from 'comment-json';

import { condense, decompose, sortKeys } from '../settings';

function toCommentObject(obj: Record<string, any>): CommentObject {
  return obj as CommentObject;
}

suite('Settings Test Suite', () => {
  suite('decompose', () => {
    test('Empty object', () => {
      let settings = toCommentObject({});
      let result = decompose(settings);
      let expected = {};
      assert.deepStrictEqual(result, expected);
    });

    test('Flat object', () => {
      let settings = toCommentObject({ a: 1, b: 2, c: 3 });
      let result = decompose(settings);
      let expected = { a: 1, b: 2, c: 3 };
      assert.deepStrictEqual(result, expected);
    });

    test('Nested object', () => {
      let settings = toCommentObject({ a: 1, b: { c: 2, d: 3 } });
      let result = decompose(settings);
      let expected = { a: 1, b: { c: 2, d: 3 } };
      assert.deepStrictEqual(result, expected);
    });

    test('Shortened nested object', () => {
      let settings = toCommentObject({ a: 1, 'b.c': 2, 'b.d': 3 });
      let result = decompose(settings);
      let expected = { a: 1, b: { c: 2, d: 3 } };
      assert.deepStrictEqual(result, expected);
    });

    test('Lists', () => {
      let settings = toCommentObject({ a: [1], b: [2, 3, 4], c: [] });
      let result = decompose(settings);
      let expected = { a: [1], b: [2, 3, 4], c: [] };
      assert.deepStrictEqual(result, expected);
    });
  });

  suite('condense', () => {
    test('Empty object', () => {
      let settings = toCommentObject({});
      let result = condense(settings);
      let expected = {};
      assert.deepStrictEqual(result, expected);
    });

    test('Flat object', () => {
      let settings = toCommentObject({ a: 1, b: 2, c: 3 });
      let result = condense(settings);
      let expected = { a: 1, b: 2, c: 3 };
      assert.deepStrictEqual(result, expected);
    });

    test('Nested object', () => {
      let settings = toCommentObject({ a: 1, b: { c: 2, d: 3 } });
      let result = condense(settings);
      let expected = { a: 1, b: { c: 2, d: 3 } };
      assert.deepStrictEqual(result, expected);
    });

    test('Shortened nested object', () => {
      let settings = toCommentObject({ b: { c: 2 } });
      let result = condense(settings);
      let expected = { 'b.c': 2 };
      assert.deepStrictEqual(result, expected);
    });

    test('Shortened deeply nested object', () => {
      let settings = toCommentObject({ a: { b: { c: { d: 2 } } } });
      let result = condense(settings);
      let expected = { 'a.b.c.d': 2 };
      assert.deepStrictEqual(result, expected);
    });

    test('Lists', () => {
      let settings = toCommentObject({ a: [1], b: [2, 3, 4], c: [] });
      let result = condense(settings);
      let expected = { a: [1], b: [2, 3, 4], c: [] };
      assert.deepStrictEqual(result, expected);
    });

    test('Language specific settings', () => {
      let settings = toCommentObject({ '[html]': { editor: { tabSize: 2 } } });
      let result = condense(settings);
      let expected = { '[html]': { 'editor.tabSize': 2 } };
      assert.deepStrictEqual(result, expected);
    });
  });

  suite('sortKeys', () => {
    test('Empty object', () => {
      let settings = toCommentObject({});
      let result = sortKeys(settings);
      let expected = {};
      assert.deepStrictEqual(result, expected);
    });

    test('Flat object', () => {
      let settings = toCommentObject({ b: 2, a: 1, c: 3 });
      let result = sortKeys(settings);
      let expected = { a: 1, b: 2, c: 3 };
      assert.deepStrictEqual(result, expected);
    });

    test('Nested object', () => {
      let settings = toCommentObject({ b: { d: 3, c: 2 }, a: 1 });
      let result = sortKeys(settings);
      let expected = { a: 1, b: { c: 2, d: 3 } };
      assert.deepStrictEqual(result, expected);
    });

    test('Shortened nested object', () => {
      let settings = toCommentObject({ b: { d: 3, c: 2 }, a: 1 });
      let result = sortKeys(settings);
      let expected = { a: 1, b: { c: 2, d: 3 } };
      assert.deepStrictEqual(result, expected);
    });

    test('Lists', () => {
      let settings = toCommentObject({ b: [3, 4, 2], a: [1], c: [] });
      let result = sortKeys(settings);
      let expected = { a: [1], b: [2, 3, 4], c: [] };
      assert.deepStrictEqual(result, expected);
    });
  });

  suite('Style', () => {
    test('Trailing comma', () => {
      let settings = toCommentObject({ a: 1, b: 2, c: 3 });
      let result = condense(settings);
      let expected = { a: 1, b: 2, c: 3 };
      assert.deepStrictEqual(result, expected);
    });
  });
});
