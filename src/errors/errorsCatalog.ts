export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = { 
  message: string;
  httpStatus: number
};
  
export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 400,
  },
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
};