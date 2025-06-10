const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { detectTopCrops } = require('./cropService');

describe('detectTopCrops', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should return top 3 crops', async () => {
    const location = 'California';
    const mockApiResponse = {
      top_crops: ['Wheat', 'Corn', 'Rice', 'Barley']
    };

    mock.onPost(/\/detect-crops$/).reply(200, mockApiResponse);

    const result = await detectTopCrops(location);

    expect(result).toEqual(['Wheat', 'Corn', 'Rice']);
  });
});