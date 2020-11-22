import { ServiceError } from "../models/serviceError";

export const processError = (error: Error) => {
  let statusCode: number = 500;
  let message: string = 'Internal Server Error';
  if (error instanceof ServiceError) {
      statusCode = 404;
      message = error.message;
  }

  return {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message })
  };
};

export const processResponse = (data: any) => {
  return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data)
  };
};