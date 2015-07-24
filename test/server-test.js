var chai = require('chai');
var expect = chai.expect;
var chaiHTTP = require('chai-http');

require('../server');

chai.use(chaiHTTP);

describe('post', function() {
  it('will post a file to notes directory', function(done) {
    chai.request('http://localhost:3000')
        .post('/')
        .send({"note": "Today was awesome!"})
        .end(function(err, res) {
          expect(err).to.eql(null);
          done();
        });
  });
  it('will get note 2 from notes directory', function(done) {
    chai.request('localhost:3000')
        .get('/2')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.message).to.eql('{"note":"Today was awesome!"}');
          done();
        });
  });
  it('will put a file to notes directory', function(done) {
    chai.request('localhost:3000')
        .put('/2')
        .send({"note": "Coding is poetry."})
        .end(function(err, res) {
          expect(err).to.eql(null);
          done();
        });
  });
  it('will get note 2 from notes directory', function(done) {
    chai.request('localhost:3000')
        .get('/2')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.message).to.eql('{"note":"Coding is poetry."}');
          done();
        });
  });
  it('will delete note 2 from notes directory', function(done) {
    chai.request('localhost:3000')
        .delete('/2')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect();
          done();
    });
  });
});
