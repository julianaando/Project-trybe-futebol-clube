import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { validLogin, users, invalidEmailLogin, token, invalidPasswordLogin, role } from './mocks/usersMock';
import SequelizeUser from '../database/models/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /login', () => {

  it('Retorna um token quando o login é bem sucedido', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(users[0] as any);
    const { status, body } = await chai.request(app).post('/login').send(validLogin);
    expect(status).to.equal(200);
    expect(body).to.be.deep.eq(token);
  });
  it('Retorna todos os usuários', async () => {
    sinon.stub(SequelizeUser, 'findAll').resolves(users as any);
    const { status, body } = await chai.request(app).get('/login');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(users);
  });
  it('Retorna o usuário pelo id', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(users[0] as any);
    const { status, body } = await chai.request(app).get('/login/1');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(users[0]);
  });
  it('Retorna erro 404 na busca por um id inexistente', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(null as any);
    const { status, body } = await chai.request(app).get('/login/156');
    expect(status).to.be.eq(404);
    expect(body).to.be.deep.eq({ message: 'User 156 not found' });
  });
  it('Retorna o role do usuário logado', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(users[0] as any);
    const { body: { token } } = await chai.request(app).post('/login').send(validLogin);
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer ' + token);
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(role);
  });
  it('Retorna erro 401 para campo não preenchido', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(null as any);
    const { status, body } = await chai.request(app).post('/login').send(invalidEmailLogin);
    expect(status).to.be.eq(400);
    expect(body).to.have.deep.eq({ message: 'All fields must be filled'})
  });
  it('Retorna erro 401 para usuário ou senha incorreta', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(users[0] as any);
    const { status, body } = await chai.request(app).post('/login').send(invalidPasswordLogin);
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password'});
  });
  afterEach(function() { sinon.restore() });
});