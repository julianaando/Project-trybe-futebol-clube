import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeams, team } from './mocks/teamsMock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /teams', () => {
  it ('Retorna todos os times', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(allTeams as any);
    const { status, body } = await chai.request(app).get('/teams');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(allTeams);
  });
  it ('Retorna o time pelo id', async () => {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);
    const { status, body }= await chai.request(app).get('/teams/1');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(team);
  });

  afterEach(function() { sinon.restore() });
});
