import supertest from 'supertest';
import app from '../src/inverted-index';

describe('POST/api/create', () => {
  it('file content should be a valid JSON a valid JSON array', (done) => {
    supertest(app)
      .post('/api/create')
      .set('Accept', 'application/json')
      .send({ })
      .expect((res) => {
        res.body = 'Please Upload a non empty JSON Array';
      })
      .expect(200, {
      }, done);
  });
});

describe('POST /api/search', () => {
  it('should respond with json', (done) => {
    supertest(app)
      .post('/api/create')
      .set('Accept', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          res.body = ('Passed');
          done();
        }
      });
  });
});
