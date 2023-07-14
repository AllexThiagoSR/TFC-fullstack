import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser'
import { app } from '../app';
import { Response } from 'superagent';
import { login, loginWithouPassword, loginWithoutEmail, user } from './mocks/users.mocks';

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

  it('POST /login without email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginWithoutEmail);
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('POST /login without password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginWithouPassword);
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
});
