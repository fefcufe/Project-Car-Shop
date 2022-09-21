import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/errorsCatalog';
import CarModel from '../../../models/cars';
import CarService from '../../../services/car';
import { completeCarMock, simpleCarMock } from '../../mocks/carMocks';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);
    // sempre fazer stubs de uma camada imediatamente anterior a camada que vc esta testando
	before(() => {
		sinon.stub(carModel, 'create').resolves(completeCarMock);
        
        sinon.stub(carModel, 'read')
            .onCall(0).resolves([completeCarMock])
            .onCall(1).resolves();

		sinon.stub(carModel, 'readOne')
        // na primeira vez que for chamado ira retornar o caso de sucesso
			.onCall(0).resolves(completeCarMock).onCall(1).resolves(null); 
        // na segunda vez que for chamado ir'a retornar caso de falha
		     
        sinon.stub(carModel, 'update')
			.onCall(0).resolves(completeCarMock).onCall(1).resolves(null); 

        sinon.stub(carModel, 'delete')
			.onCall(0).resolves(completeCarMock).onCall(1).resolves();  
	})

	after(() => {
		sinon.restore()
	})

	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(simpleCarMock);

			expect(carCreated).to.be.deep.equal(completeCarMock);
		});

		it('invalid body', async () => {
			let error;
			try {
				await carService.create({});
			} catch (err) {
				error = err
			}

			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('ReadOne Car', () => {
		it('Success', async () => {
            // 1 chamada de readOne, caso de sucesso
			const carCreated = await carService.readOne(completeCarMock._id);

			expect(carCreated).to.be.deep.equal(completeCarMock);
		});

		it('Failure', async () => {
			let error;
            try {
                // 2 chamada de readOne, caso de falha
				await carService.readOne(completeCarMock._id);
			} catch (err:any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
		});
	});

    describe('Read Car', () => {
		it('Success', async () => {
			const car = await carService.read();

			expect(car).to.be.deep.equal([completeCarMock]);
		});

		it('Failure', async () => {
			let error;
            try {
				await carService.read();
			} catch (err:any) {
				error = err
			}

            expect(error, 'error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
		});
	});

    describe('Update Car', () => {
		it('Success', async () => {
			const carUpdated = await carService.update(completeCarMock._id, simpleCarMock);

			expect(carUpdated).to.be.deep.equal(completeCarMock);
		});

		it('Failure', async () => {
			let error;
            try {
				await carService.update(completeCarMock._id, simpleCarMock);
			} catch (err:any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
		});
	});


    describe('Delete Car', () => {
		it('Success', async () => {
			const carDeleted = await carService.delete(completeCarMock._id);

			expect(carDeleted).to.be.deep.equal(completeCarMock);
		});

		it('Failure', async () => {
			let error;
            try {
				await carService.delete(completeCarMock._id);
			} catch (err:any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
		});
	});


});