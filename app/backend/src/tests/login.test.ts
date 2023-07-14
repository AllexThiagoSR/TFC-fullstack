import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser'
import { app } from '../app';
import { Response } from 'superagent';
import { teams } from './mocks/teams.mocks';
import { login, user } from './mocks/users.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the login route', () => {
  let chaiHttpResponse: Response;

  beforeEach(sinon.restore);

  it('POST /login', async () => {
    const returnUser = SequelizeUser.build(user)
    sinon.stub(SequelizeUser, 'findOne').resolves(returnUser);
    chaiHttpResponse = await chai.request(app).post('/login').send(login);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.have.property('token');
  });
});
