import nock from 'nock';
import { createTestIntegration } from '@segment/actions-core';
import Destination from '../../index';

const testDestination = createTestIntegration(Destination)

describe('June.identify', () => {
  it('should work', async () => {
    nock('https://api.june.so/api').post('/identify').reply(200, {})

    const responses = await testDestination.testAction('identify', {
      mapping: { anonymousId: 'my-id', traits: {} },
      settings: { apiKey: 'api-key' }
    })

    expect(responses.length).toBe(1)
    expect(responses[0].status).toBe(200)
    expect(responses[0].data).toMatchObject({})
    expect(responses[0].options.body).toContain('my-id')
    expect(responses[0].options.body).toContain('traits')
  })
})
