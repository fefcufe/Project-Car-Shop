import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { completeCarMock, simpleCarMock } from '../../mocks/carMocks';
import CarController from '../../../controllers/car';
import CarService from '../../../services/car';
import CarModel from '../../../models/cars';


describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request; 

  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(completeCarMock);
    sinon.stub(carService, 'readOne').resolves(completeCarMock);
    sinon.stub(carService, 'read').resolves([completeCarMock]);
    sinon.stub(carService, 'update').resolves(completeCarMock);
    sinon.stub(carService, 'delete').resolves(completeCarMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = simpleCarMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(completeCarMock)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {

      req.params = { id: completeCarMock._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(completeCarMock)).to.be.true;
    });
  });

  describe('Read Car', () => {
    it('Success', async () => {

      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([completeCarMock])).to.be.true;
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      req.body = simpleCarMock;
      req.params = { id: completeCarMock._id };

      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([completeCarMock])).to.be.true;
    });
  });

  describe('Delete Car', () => {
    it('Success', async () => {

      req.params = { id: completeCarMock._id };

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
  
});