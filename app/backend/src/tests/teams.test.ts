import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from '../database/models/SequelizeTeam'
import { app } from '../app';
import { Response } from 'superagent';
import { teams } from './mocks/teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the teams routes', () => {
  let chaiHttpResponse: Response;

  beforeEach(sinon.restore);

  it('GET /teams', async () => {
    const returnTeams = SequelizeTeam.bulkBuild(teams)
    sinon.stub(SequelizeTeam, 'findAll').resolves(returnTeams);
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams);
  });

  it('GET /teams/:id',async () => {
    const returnTeam = SequelizeTeam.build(teams[0]);
    sinon.stub(SequelizeTeam, 'findByPk').resolves(returnTeam);
    chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams[0]);
  });

  it('GET /teams/:id with a inexistent id',async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    chaiHttpResponse = await chai.request(app).get('/teams/999');
    expect(chaiHttpResponse).to.have.status(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Team not found' });
  });
});
