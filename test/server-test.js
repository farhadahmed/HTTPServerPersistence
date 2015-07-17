var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHTTP);

describe('post', function() {
  it('will post a file to notes directory', function(done) {
    chai.request('http://localhost:3000')
        .post('/')
        .send({"note": "Today was awesome!"})
        .end(function(err, res) {
          expect(err).to.be.null;
          done();
        });
  });
});
