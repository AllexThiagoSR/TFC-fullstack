import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { app } from '../app';
import { Response } from 'superagent';
import { login, loginWithInvalidEmail, loginWithInvalidPassword, loginWithouPassword, loginWithoutEmail, user } from './mocks/users.mocks';
import JWTUtils from '../utils/JWTUtils';

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
