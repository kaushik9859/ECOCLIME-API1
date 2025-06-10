const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { generateChatResponse } = require('./geminiService');

describe('generateChatResponse', () => {
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

  it('should return a chat response from Gemini', async () => {
    const prompt = 'Hello!';
    const mockApiResponse = {
      candidates: [
        {
          content: {
            parts: [
              { text: 'Hi there! How can I help you?' }
            ]
          }
        }
      ]
    };

    mock.onPost(/gemini-pro:generateContent/).reply(200, mockApiResponse);

    const result = await generateChatResponse(prompt);

    expect(result).toBe('Hi there! How can I help you?');
  });
});