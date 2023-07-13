import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teamsMock from './mocks/teamsMock';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /teams', () => {
  let chaiHttpResponse: Response;

  it ('Retorna todos os times', async () => {
    sinon.stub(SequelizeTeam, 'findOne').resolves(teamsMock as unknown as SequelizeTeam);
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(teamsMock);
  });
  it ('Retorna o time pelo id', async () => {
    sinon.stub(SequelizeTeam, 'findOne').resolves(teamsMock[0] as unknown as SequelizeTeam);
    chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(teamsMock[0]);
  });

  afterEach(function() { sinon.restore() });
});
