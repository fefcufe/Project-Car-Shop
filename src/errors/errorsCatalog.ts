export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = { 
  message: string;
  httpStatus: number
};
  
// aqui o tipo do catálogo
export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
  
};
  
export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Bad request',
    httpStatus: 400,
  },
};