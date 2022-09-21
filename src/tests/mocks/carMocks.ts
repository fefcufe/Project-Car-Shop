import { ICar } from '../../interfaces/ICar';

const completeCarMock:ICar & { _id: string } = {
    _id: "632aff29b590d48601c9ee08",
    model: "Uno da Escada",
    year: 1963,
    color: "red",
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
};

const simpleCarMock:ICar = {
    model: 'Uno da Escada',
    year: 1963,
    color: 'red',
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
};

export { completeCarMock, simpleCarMock };