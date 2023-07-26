import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allMatches, progressFalse, progressTrue, createNewMatch, newMatch, matchUpdated } from './mocks/matchesMock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { token, users, validLogin } from './mocks/usersMock';
import SequelizeUser from '../database/models/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /matches', () => {
  it ('Retorna todos os jogos', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(allMatches);
  });
  it('Retorna o jogo pelo id', async () => {
    sinon.stub(SequelizeMatch, 'findOne').resolves(allMatches[0] as any);
    const { status, body } = await chai.request(app).get('/matches/1');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(allMatches[0]);
  });
  it('Retorna os jogos em andamento', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(progressTrue as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(progressTrue);
  });
  it('Retorna os jogos finalizados', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(progressFalse as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(progressFalse);
  });
  it('Retorna um novo jogo criado', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(users[0] as any);
    const { body: { token } } = await chai.request(app).post('/login').send(validLogin);

    sinon.stub(SequelizeMatch, 'create').resolves(newMatch as any);
    const { status, body } = await chai.request(app)
    .post('/matches')
    .send(createNewMatch)
    .set('Authorization', 'Bearer ' + token)

    expect(status).to.be.eq(201);
    expect(body).to.be.deep.eq(newMatch);
  });
  it('Atualiza um jogo corretamente', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(users[0] as any);
    const { body: { token } } = await chai.request(app).post('/login').send(validLogin);

    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
    const { status, body } = await chai.request(app)
    .patch('/matches/1')
    .send({ homeTeamGoals: 2, awayTeamGoals: 0 })
    .set('Authorization', 'Bearer ' + token)

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(matchUpdated);
  });
  it('Erro 400 ao não atualizar um jogo corretamente', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(users[0] as any);
    const { body: { token } } = await chai.request(app).post('/login').send(validLogin);

    sinon.stub(SequelizeMatch, 'update').resolves(null as any);
    const { status, body } = await chai.request(app)
    .patch('/matches/1')
    .send({ homeTeamGoals: 2 })
    .set('Authorization', 'Bearer ' + token)

    expect(status).to.be.eq(400);
    expect(body).to.be.deep.eq({ message: 'Missing parameters' });
  });
  it('Finaliza um jogo corretamente', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(users[0] as any);
    const { body: { token } } = await chai.request(app).post('/login').send(validLogin);

    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
    const { status, body } = await chai.request(app)
    .patch('/matches/1/finish')
    .set('Authorization', 'Bearer ' + token)

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq({ message: 'Finished' });
  });
  afterEach(function() { sinon.restore() });
});