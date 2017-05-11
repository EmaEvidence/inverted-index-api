/* eslint linebreak-style: ["error", "windows"]*/
import expect from 'expect';
import supertest from 'supertest';
import InvertedIndex from '../src/inverted-index';
import valid from '../fixtures/valid.json';
import anothervalid from '../fixtures/anothervalid.json';
import invalid from '../fixtures/invalid.json';
import malformed from '../fixtures/malformed.json';
import empty from '../fixtures/empty.json';
// import app from '../src/route';
import app from './../app';

const api = supertest(app);
const invertIndex = new InvertedIndex();
const index = {
  'book1.json': {
    when: [0, 1, 2],
    we: [0, 1, 2],
    were: [0, 1, 2],
    boys: [0],
    guys: [1, 2]
  }
};

describe('When a digitized book supplied as a JSON Array is passed in', () => {
  it('should return true for valid JSON ', () => {
    expect(InvertedIndex.checkIfArrayIsValid(valid)).toBe(true);
  });
  it('should return Book is Empty if an empty book is passed ', () => {
    expect(() => { InvertedIndex.checkIfArrayIsValid(empty); })
    .toThrow('Book is Empty');
  });
  it('should return File is Malformed if a Malformed book is passed ', () => {
    expect(() => { InvertedIndex.checkIfArrayIsValid(malformed); })
    .toThrow('File is malformed');
  });
  it('should return An Invalid JSON Object if an Invalid JSON array is passed  ', () => {
    expect(() => { InvertedIndex.checkIfArrayIsValid(invalid); })
    .toThrow('Invalid JSON Array');
  });
});

describe('When a valid JSON array is passed to createIndex method', () => {
  it('should return a correct index ', () => {
    const fileName = 'book1.json';
    expect(invertIndex.createIndex(fileName, valid)).toEqual(index);
  });
});

describe('When an index is passed to searchIndex method ', () => {
  it('should return true if a index is passed ', () => {
    expect(invertIndex.validateIndex(index)).toBe(true);
  });
  it('should return false if an invalid index is passed ', () => {
    const wrongIndex = {
      'book1.json': {
        when: {
          'book1.json': [0, 1, 2] },
        we: [0, 1, 2],
        were: [0, 1, 2],
        boys: [0],
        guys: [1, 2]
      }
    };
    expect(invertIndex.validateIndex(wrongIndex)).toBe(false);
  });
});

describe('When 3 parameters are passed to searchIndex', () => {
  it('should return correct search result for array of terms', () => {
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    const results = {
      a: '',
      alice: '',
      when: [0, 1, 2],
      we: [0, 1, 2],
      help: ''
    };
    const arrayOfTerms = [['a', 'alice'], 'when', 'we', ['help']];
    expect(invertIndex.searchIndex(invertIndex.CreatedIndexObject, 'book1.json', arrayOfTerms))
    .toEqual(results);
  });
  it('should return correct search result for varied search terms', () => {
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    const results = {
      'book1.json': {
        a: '',
        alice: '',
        when: [0, 1, 2],
        we: [0, 1, 2],
        help: '' }
    };
    const createdIndex = invertIndex.CreatedIndexObject;
    expect(invertIndex.searchIndex(createdIndex, fileName, ['a', 'alice'], 'when', 'we', ['help']))
    .toEqual(results);
  });
});

describe('When only index and searchterms are passed to searchIndex', () => {
  it('should search through all index', () => {
    const fileName = 'book1.json';
    invertIndex.createIndex(fileName, valid);
    const fileName2 = 'book2.json';
    invertIndex.createIndex(fileName2, anothervalid);
    const arrayOfTerms = [['a', 'alice'], 'when', 'we', ['help']];
    const results = {
      'book1.json': {
        a: '',
        alice: '',
        when: [0, 1, 2],
        we: [0, 1, 2],
        help: '' },
      'book2.json': {
        a: '',
        alice: [1],
        when: [0, 2],
        we: [0, 2],
        help: ''
      }
    };
    expect(invertIndex.searchIndex(invertIndex.CreatedIndexObject, arrayOfTerms))
    .toEqual(results);
  });
});

describe('When an invalid Index is supplied to searchIndex method', () => {
  it('should return false when an empty object is passed', () => {
    expect(InvertedIndex.validateTerms({})).toBe(false);
  });
  it('should return false when an empty array is passed', () => {
    expect(InvertedIndex.validateTerms([])).toBe(false);
  });
});

describe('When a valid term is supplied to searchIndex method', () => {
  it('should return true for valid search terms', () => {
    expect(InvertedIndex.validateTerms(['we', 'men', ['alice', 'ade'], 'man'])).toBe(true);
  });
  it('should return true for valid search terms ', () => {
    expect(InvertedIndex.validateTerms(['we are here'])).toBe(true);
  });
});

describe('create inverted index API endpoint', () => {
  it('responds with the right status code for multiple file', (done) => {
    api.post('/api/v0/create')
        .attach('book', './fixtures/valid.json')
        .attach('book', './fixtures/anothervalid.json')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done(err);
        });
  });

  it('should create an index when valid file is uploaded ', (done) => {
    api.post('/api/v0/create')
     .attach('book', './fixtures/valid.json')
     .attach('book', './fixtures/anothervalid.json')
        .end((err, res) => {
          const result = {
            'valid.json': {
              when: [0, 1, 2],
              we: [0, 1, 2],
              were: [0, 1, 2],
              boys: [0],
              guys: [1, 2]
            },
            'anothervalid.json': {
              when: [0, 2],
              we: [0, 2],
              were: [0, 2],
              boys: [0],
              am: [1],
              alice: [1],
              girls: [2]
            }
          };
          expect(JSON.parse(res.text)).toEqual(result);
          done();
        });
  });

  it('responds with the right status code for single file', (done) => {
    api.post('/api/v0/create')
        .attach('book', './fixtures/valid.json')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done(err);
        });
  });

  it('should return search result when fileName argument is not supplied', (done) => {
    api.post('/api/v0/create')
      .attach('book', './fixtures/anothervalid.json')
      .attach('book', './fixtures/valid.json')
        .end(() => {
          api.post('/api/v0/search')
        .send({
          terms: ['boys', 'we', 'when']
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done(err);
        });
        });
  });

  it('should return result for search when fileName argument is supplied', (done) => {
    api.post('/api/v0/create')
        .attach('book', './fixtures/valid.json')
       .attach('book', './fixtures/anothervalid.json')
        .end(() => {
          api.post('/api/v0/search')
          .send({
            searchTerms: ['we', 'when'],
            fileName: 'valid.json'
          })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            done(err);
          });
        });
  });

  it('type of created index should be object', (done) => {
    api.post('/api/v0/create')
      .attach('book', './fixtures/valid.json')
      .end((err, res) => {
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should give an Error message when empty file is uploaded', (done) => {
    api.post('/api/v0/create')
   .attach('book', './fixtures/empty.json')
      .end((err, res) => {
        expect(res.text).toEqual('Book is Empty');
        done();
      });
  });

  it('should give an Error message when Malformed is uploaded ', (done) => {
    api.post('/api/v0/create')
   .attach('book', './fixtures/malformed.json')
      .end((err, res) => {
        expect(res.text).toEqual('File is malformed');
        done();
      });
  });

  it('should give an Error message when invalid is uploaded ', (done) => {
    api.post('/api/v0/create')
   .attach('book', './fixtures/invalid.json')
      .end((err, res) => {
        expect(res.text).toEqual('Invalid JSON Array');
        done();
      });
  });
  app.close();
});
