/* eslint linebreak-style: ["error", "windows"]*/
import expect from 'expect';
import InvertedIndex from '../src/inverted-index';
import valid from '../fixtures/valid.json';
import anothervalid from '../fixtures/anothervalid.json';
import invalid from '../fixtures/invalid.json';
import malformed from '../fixtures/malformed.json';
import empty from '../fixtures/empty.json';

const invertIndex = new InvertedIndex();
describe('When a digitized book supplied as a JSON Array is passed in', () => {
  it('should return true for valid JSON ', () => {
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(true);
  });
  it('should return Book is Empty if an empty book is passed ', () => {
    expect(() => { invertIndex.checkIfArrayIsValid(empty); }).toThrow('Book is Empty');
  });
  it('should return File is Malformed if a Malformed book is passed ', () => {
    expect(() => { invertIndex.checkIfArrayIsValid(malformed); }).toThrow('File is malformed');
  });
  it('should return An Invalid JSON Object if an Invalid JSON array is passed  ', () => {
    expect(() => { invertIndex.checkIfArrayIsValid(invalid); }).toThrow('Invalid JSON Array');
  });
});

describe('When a valid JSON array is passed to createIndex method', () => {
  it('should return a correct index ', () => {
    const fileName = 'book1.json';
    const index = { 'book1.json': { when: [0, 1, 2], we: [0, 1, 2], were: [0, 1, 2], boys: [0], guys: [1, 2] } };
    expect(invertIndex.createIndex(fileName, valid)).toEqual(index);
  });
});

describe('When an index is passed to searchIndex method ', () => {
  it('should return true if a index is passed ', () => {
    const index = { 'book1.json': { when: [0, 1, 2], we: [0, 1, 2], were: [0, 1, 2], boys: [0], guys: [1, 2] } };
    expect(invertIndex.validateIndex(index)).toBe(true);
  });
  it('should return false if an invalid index is passed ', () => {
    // const invertIndex = new InvertedIndex();
    const index = { 'book1.json': { when: { 'book1.json': [0, 1, 2] }, we: [0, 1, 2], were: [0, 1, 2], boys: [0], guys: [1, 2] } };
    expect(invertIndex.validateIndex(index)).toBe(false);
  });
});

describe('When an index, filename and search terms is passed to searchIndex method ', () => {
  it('should return correct search result for array of terms', () => {
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    const results = { a: '-', alice: '', when: [0, 1, 2], we: [0, 1, 2], help: '' };
    const arrayOfTerms = [['a', 'alice'], 'when', 'we', ['help']];
    expect(invertIndex.searchIndex(invertIndex.CreatedIndexObject, 'book1.json', arrayOfTerms)).toEqual(results);
  });
  it('should return correct search result for varied search terms', () => {
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    const results = { 'book1.json': { a: '', alice: '', when: [0, 1, 2], we: [0, 1, 2], help: '' } };
    expect(invertIndex.searchIndex(invertIndex.CreatedIndexObject, 'book1.json', ['a', 'alice'], 'when', 'we', ['help'])).toEqual(results);
  });
});

describe('When an index and search terms is passed to searchIndex method and fileName omitted', () => {
  it('should search through all index', () => {
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    const fileName2 = 'book2.json';
    invertIndex.createIndex(fileName2, anothervalid);
    const arrayOfTerms = [['a', 'alice'], 'when', 'we', ['help']];
    const results = { 'book1.json': { a: '-',
      alice: '',
      when: [0, 1, 2],
      we: [0, 1, 2],
      help: '' },
      'book2.json': { a: '', alice: [1], when: [0, 2], we: [0, 2], help: '' } };
    expect(invertIndex.searchIndex(invertIndex.CreatedIndexObject, arrayOfTerms)).toEqual(results);
  });
});

describe('When an invalid Index is supplied to searchIndex method', () => {
  it('should return an error invalid index', () => {
    const invalidindex = {};
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    expect(invertIndex.validateIndex(invalidindex)).toThrow('Invalid Index');
  });
  it('should return an error invalid index', () => {
    const invalidindex = { book: 'sssffsf' };
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    expect(invertIndex.validateIndex(invalidindex)).toThrow('Invalid Index');
  });
  it('should return an error invalid index', () => {
    const invalidindex = [];
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    expect(invertIndex.validateIndex(invalidindex)).toThrow('Invalid Index');
  });
});

describe('When an invalid term is supplied to searchIndex method', () => {
  it('should return an error invalid term', () => {
    const invalidTerm = [];
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    expect(invertIndex.validateTerms(invalidTerm)).toThrow('Invalid Index');
  });
  it('should return an error invalid term', () => {
    const invalidTerm = [];
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    expect(invertIndex.validateTerms(invalidTerm)).toThrow('Invalid Index');
  });
});
