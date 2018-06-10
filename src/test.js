const chai = require('chai');
const expect = chai.expect;

const chaiHttp = require('chai-http');
const server = 'http://localhost:8000';

chai.use(chaiHttp);

describe('Unit Tests', function() {

	describe('GET /', function() {
		it('should return 404 status', function() {
			return chai.request(server)
				.get('/')
				.then(res => {
					expect(res).to.have.status(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});
	
	describe('GET /search', function() {
		it('should return 404 status', function() {
			return chai.request(server)
				.get('/search')
				.then(res => {
					expect(res).to.have.status(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});
	
	describe('GET /searchnews', function() {
		this.timeout(10000);
		it('should return all the top stories', function() {
			return chai.request(server)
				.get('/searchnews')
				.then(res => {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body[0]).to.have.property('title');
					expect(res.body[0]).to.have.property('time');
					expect(res.body[0]).to.have.property('type');
					expect(res.body[0]).to.have.property('score');
					expect(res.body[0]).to.have.property('url');
				})
				.catch(err => {
					throw err;
				});
		});
	});
	
	describe('GET /searchnews?query={keyword}', function() {
		this.timeout(10000);
		
		it('should return stories', function() {
			return chai.request(server)
				.get('/searchnews')
				.query({ query: 'tech' }) // /searchnews?query=tech
				.then(res => {
					expect(res).to.have.status(200);
					expect(res).to.be.json;					
					expect(res.body[0]).to.have.property('title');
					expect(res.body[0]).to.have.property('time');
					expect(res.body[0]).to.have.property('type');
					expect(res.body[0]).to.have.property('score');
					expect(res.body[0]).to.have.property('url');
					expect(res.body[0].title.toLowerCase()).to.include('tech');
				})
				.catch(err => {
					throw err;
				});
		});
		
		it('should return empty array for random / non-existing keyword', function() {
			return chai.request(server)
				.get('/searchnews')
				.query({ query: 'asdffgdertret' }) // /searchnews?query=asdffgdertret
				.then(res => {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.be.an('array').that.is.empty;
				})
				.catch(err => {
					throw err;
				});
		});
	});

});