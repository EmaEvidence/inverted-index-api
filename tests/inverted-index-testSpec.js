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
    const invertIndex = new InvertedIndex(empty);
    expect(invertIndex.checkIfArrayIsValid(empty)).toThrowError('Book is Empty');
  });
  it('should return File is Malformed', () => {
    const invertIndex = new InvertedIndex(malformed);
    expect(invertIndex.checkIfArrayIsValid(malformed)).toThrowError('File is Malformed');
  });
  it('should return An Invalid JSON Array ', () => {
    const invertIndex = new InvertedIndex(invalid);
    expect(invertIndex.checkIfArrayIsValid(invalid)).toThrowError('Invalid JSON Array');
  });
});
