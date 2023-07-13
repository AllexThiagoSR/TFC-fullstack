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

describe('Tests the teams route', () => {
  let chaiHttpResponse: Response;

  it('GET /teams', async () => {
    const returnTeams = SequelizeTeam.bulkBuild(teams)
    sinon.stub(SequelizeTeam, 'findAll').resolves(returnTeams);
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams);
  });
});
