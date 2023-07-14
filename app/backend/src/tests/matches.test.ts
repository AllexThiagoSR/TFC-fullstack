import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matches } from './mocks/matches.mocks';
import { app } from '../app';

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
});
