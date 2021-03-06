import swagmock from 'swagmock';
import record from './record';

const middlewareFactory = (apiSpec, cliOptions, { recordData = true } = {}) => {
  const specMock = swagmock(apiSpec);

  return async (req, res, next) => {
    if (res.body) {
      next();
      return;
    }

    try {
      const mock = await specMock.responses({
        path: req.path,
        operation: req.method.toLowerCase(),
      });

      const [firstResponse] = (mock && mock.responses && Object.values(mock.responses)) || [];

      if (recordData) {
        record(req, JSON.stringify(firstResponse, null, 2), cliOptions);
      }

      res.body = firstResponse;
    } catch (e) {
      console.error('Failed to generate mock response.', e);
    }

    next();
  };
};

export default middlewareFactory;
