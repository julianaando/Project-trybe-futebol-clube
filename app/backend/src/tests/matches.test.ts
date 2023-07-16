import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allMatches, progressFalse, progressTrue } from './mocks/matchesMock';
import SequelizeMatch from '../database/models/SequelizeMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /matches', () => {
  it ('Retorna todos os jogos', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(allMatches);
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
  afterEach(function() { sinon.restore() });
});