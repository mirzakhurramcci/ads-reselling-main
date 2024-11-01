export const responses = {
  success: 200,
  internalServerError: 101,
  invalidParameters: 104,
};

export const generateError = (responseCode, message) => {
  const err = new Error(message);
  err.responseCode = responseCode;
  throw err;
};
