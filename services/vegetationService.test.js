const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { getVegetationHealth } = require('./vegetationService');

describe('getVegetationHealth', () => {
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

  it('should return vegetation health data', async () => {
    const location = 'California';
    const mockResponse = {
      health_score: 85,
      health_status: 'Good',
      recommendations: ['Irrigate regularly', 'Monitor pests']
    };

    mock.onPost(/\/analyze$/).reply(200, mockResponse);

    const result = await getVegetationHealth(location);

    expect(result).toEqual({
      score: 85,
      status: 'Good',
      recommendations: ['Irrigate regularly', 'Monitor pests']
    });
  });
});