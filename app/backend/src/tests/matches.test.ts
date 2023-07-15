import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matchToCreate, matches } from './mocks/matches.mocks';
import { app } from '../app';
import JWTUtils from '../utils/JWTUtils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the matches routes', () => {
  beforeEach(sinon.restore);

  it('GET /matches', async () => {
    const returnMatches = SequelizeMatch.bulkBuild(matches)
    sinon.stub(SequelizeMatch, 'findAll').resolves(returnMatches);
    const chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matches);
  });

  it('GET /matches internal error', async () => {
    sinon.stub(SequelizeMatch, 'findAll').throws();
    const chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse).to.have.status(500);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Internal server error' });
  });

  it('POST /matches', async () => {
    const match = SequelizeMatch.build(matchToCreate);
    sinon.stub(SequelizeMatch, 'create').resolves(match);
    sinon.stub(JWTUtils.prototype, 'verify').returns({ id: 1, username: 'Admin', role: 'admin' });
    const chaiHttpResponse = await chai
      .request(app).post('/matches').send(matchToCreate).set('Authorization', 'abcsef22');
    expect(chaiHttpResponse).to.have.status(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchToCreate);
  });

  it('POST /matches with a no token', async () => {
    // const match = SequelizeMatch.build(matchToCreate);
    // sinon.stub(SequelizeMatch, 'create').resolves(match);
    const chaiHttpResponse = await chai
      .request(app).post('/matches').send(matchToCreate);
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('POST /matches with invalid token', async () => {
    // const match = SequelizeMatch.build(matchToCreate);
    // sinon.stub(SequelizeMatch, 'create').resolves(match);
    sinon.stub(JWTUtils.prototype, 'verify').throws();
    const chaiHttpResponse = await chai
      .request(app).post('/matches').send(matchToCreate).set('Authorization', 'abcsef22');
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });
});
