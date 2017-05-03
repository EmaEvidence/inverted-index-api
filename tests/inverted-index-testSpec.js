import expect from 'expect';
import invertedIndex from '../dist/inverted-index';
import valid from '../fixtures/valid.json';
import invalid from '../fixtures/invalid.json';
import malformed from '../fixtures/malformed.json';
import empty from '../fixtures/empty.json';


describe('Test for validity of JSON array supplied as a digitized book', () => {
  it('should return true for valid JSON ', () => {
    const invertIndex = new invertedIndex(valid);
    expect(invertIndex.checkIfArrayIsValid(valid)).toBe(true);
  });
  it('should return Book is Empty ', () => {
    const invertIndex = new invertedIndex(empty);
    expect(invertIndex.checkIfArrayIsValid(empty)).toBe(false);
  });
  it('should return File is Malformed', () => {
    const invertIndex = new invertedIndex(malformed);
    expect(invertIndex.checkIfArrayIsValid(malformed)).toBe(false);
  });
  it('should return An Invalid JSON Array ', () => {
    const invertIndex = new invertedIndex(invalid);
    expect(invertIndex.checkIfArrayIsValid(invalid)).toBe(false);
  });
});
