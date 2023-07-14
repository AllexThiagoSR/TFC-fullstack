import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser'
import * as bcrypt from 'bcryptjs';
import { app } from '../app';
import { Response } from 'superagent';
import { login, loginWithInvalidEmail, loginWithInvalidPassword, loginWithouPassword, loginWithoutEmail, user } from './mocks/users.mocks';
import JWTUtils from '../utils/JWTUtils';
import Payload from '../Interfaces/Payload';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests the login route', () => {
  let chaiHttpResponse: Response;

  beforeEach(sinon.restore);

  it('POST /login', async () => {
    const returnUser = SequelizeUser.build(user)
    sinon.stub(SequelizeUser, 'findOne').resolves(returnUser);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(JWTUtils.prototype, 'createToken').returns('abcdefg');
    chaiHttpResponse = await chai.request(app).post('/login').send(login);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.have.property('token', 'abcdefg');
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

  it('POST /login with invalid email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginWithInvalidEmail);
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('POST /login with invalid password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginWithInvalidPassword);
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('POST /login with inexistent information', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);
    chaiHttpResponse = await chai.request(app).post('/login').send(login);
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.have.property('message', 'Invalid email or password');
  });
});

describe('Tests the /login/role route', () => {
  let chaiHttpResponse: Response;

  beforeEach(sinon.restore);

  it('GET /login/role', async () => {
    const payload: Payload = { role: 'admin', id: 1, username: 'Admin' };
    sinon.stub(JWTUtils.prototype, 'verify').returns(payload);
    chaiHttpResponse = await chai.request(app).get('/login/role').set('Authorization', 'valid-token');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.have.property('role', 'admin');
  });

  it('GET /login/role without token', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/role');
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.have.property('message', 'Token not found');
  });

  it('GET /login/role with invalid token', async () => {
    sinon.stub(JWTUtils.prototype, 'verify').throws();
    chaiHttpResponse = await chai.request(app).get('/login/role').set('Authorization', 'invalid-token');
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.have.property('message', 'Token must be a valid token');
  });
});
