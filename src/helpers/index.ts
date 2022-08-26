import https from 'https';

const getResource = (url: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      response.setEncoding('utf8');
      let body = '';

      response.on('data', data => (body += data));

      response.on('error', error => reject(error));

      response.on('end', () => {
        const isStatusOk =
          response.statusCode &&
          response.statusCode >= 200 &&
          response.statusCode < 300;
        const data = JSON.parse(body);

        resolve({
          data: isStatusOk ? data : {},
          status: response.statusCode as number,
          statusMessage:
            !isStatusOk && data.error ? data.error : response.statusMessage,
        });
      });
    });
  });
};

// eslint-disable-next-line prettier/prettier
export { getResource };
