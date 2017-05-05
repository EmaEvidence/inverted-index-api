/* eslint linebreak-style: ["error", "windows"]*/
import expect from 'expect';
import InvertedIndex from '../dist/inverted-index';
import valid from '../fixtures/valid.json';
import invalid from '../fixtures/invalid.json';
import malformed from '../fixtures/malformed.json';
import empty from '../fixtures/empty.json';


describe('Test for validity of JSON array supplied as a digitized book', () => {
  it('should return true for valid JSON ', () => {
    const invertIndex = new InvertedIndex(valid);
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(true);
  });
  it('should return Book is Empty ', () => {
    const invertIndex = new InvertedIndex('empty.json', empty);
    expect(invertIndex.checkIfArrayIsValid(empty)).toBe(false);
  });
  it('should return File is Malformed', () => {
    const invertIndex = new InvertedIndex(malformed);
    expect(invertIndex.checkIfArrayIsValid(malformed)).toBe(false);
  });
  const invertIndex = new InvertedIndex(invalid);
  it('should return An Invalid JSON Array ', () => {
    expect(invertIndex.checkIfArrayIsValid(invalid)).toBe(false);
  });
});

describe('Test for creation of Index from JSON file', () => {
  it('should return true for valid JSON ', () => {
    const invertIndex = new InvertedIndex(valid);
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(false);
  });
});

describe('Test to check Index created from JSON file is correct', () => {
  it('should return true for valid JSON ', () => {
    const invertIndex = new InvertedIndex(valid);
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(false);
  });
});

describe('Test to check passed in Index for search is valid', () => {
  it('should return true for valid JSON ', () => {
    const invertIndex = new InvertedIndex(valid);
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(false);
  });
});

describe('Test to check returned search Index is correct', () => {
  it('should return true for valid JSON ', () => {
    const invertIndex = new InvertedIndex(valid);
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(false);
  });
});

describe('Test to check if searchIndex can handle an Array of search terms', () => {
  it('should return true for valid JSON ', () => {
    const invertIndex = new InvertedIndex(valid);
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(false);
  });
});

describe('Test to check if searchIndex can handle an varied search terms as Arguments', () => {
  it('should return true for valid JSON ', () => {
    const invertIndex = new InvertedIndex(valid);
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(false);
  });
});

describe('Test to if searchIndex goes through all indexedfiles if a filename/key is not passed', () => {
  it('should return true for valid JSON ', () => {
    const invertIndex = new InvertedIndex(valid);
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(false);
  });
});
