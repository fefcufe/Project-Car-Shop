// ./src/tests/unit/models/frame.test.ts
import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/cars';
import { Model } from 'mongoose';
import { completeCarMock, simpleCarMock } from '../../mocks/carMocks';

describe('Car Model', () => {
  const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(completeCarMock);
		sinon.stub(Model, 'findOne').resolves(completeCarMock);
        sinon.stub(Model, 'find').resolves([completeCarMock]);
        sinon.stub(Model, 'findByIdAndUpdate').resolves(completeCarMock);
        sinon.stub(Model, 'findOneAndDelete').resolves(completeCarMock);

	});

	after(() => {
		sinon.restore();
	});

    describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(simpleCarMock);
			expect(newCar).to.be.deep.equal(completeCarMock);
		});
	});

	describe('searching one car', () => {
		it('successfully found', async () => {
			const carsFound = await carModel.readOne("632aff29b590d48601c9ee08");
			expect(carsFound).to.be.deep.equal(completeCarMock);
		});

		it('invalid id', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

    describe('get all cars', () => {
		it('successfully found', async () => {
			const allCars = await carModel.read();
			expect(allCars).to.be.deep.equal([completeCarMock]);
		});
	});

    describe('update car', () => {
		it('successfully updated', async () => {
			const carUpdated = await carModel.update("632aff29b590d48601c9ee08", simpleCarMock);
			expect(carUpdated).to.be.deep.equal(completeCarMock);
		});
        it('invalid id', async () => {
			try {
                await carModel.update("632aff29b590d", simpleCarMock);
            } catch (e: any){
                expect(e.message).to.be.eq('InvalidMongoId');
            }
		});
	});

    describe('delete car', () => {
		it('successfully deleted', async () => {
			const carDeleted = await carModel.delete("632aff29b590d48601c9ee08");
			expect(carDeleted).to.be.deep.equal(completeCarMock);
		});
		it('invalid id', async () => {
			try {
                await carModel.delete("632aff29b590d");
            } catch (e: any){
                expect(e.message).to.be.eq('InvalidMongoId');
            }
		});
	});

});