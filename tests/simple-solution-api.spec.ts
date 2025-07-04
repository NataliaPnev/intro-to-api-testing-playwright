import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'

const baseURL = 'https://backend.tallinn-learning.ee/test-orders'
const validApiKey = '1234567890123456'
const requestBasicBody = OrderDto.createBasicOrder()

test.describe('Lesson 9', (): void => {
  test('get order with correct id should receive code 200', async ({ request }) => {
    const response = await request.get(`${baseURL}/1`)
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('post order with correct data should receive code 200', async ({ request }) => {
    const requestBody = OrderDto.createOrderWithRandomData()
    const response = await request.post(baseURL, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('get order with orderId 0 should receive code 400', async ({ request }) => {
    const response = await request.get(`${baseURL}/0`)
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
    expect.soft(responseBody.message).toBe('getById.id: must be greater than or equal to 1')
  })

  test('get order with orderId 11 should receive code 400', async ({ request }) => {
    const response = await request.get(`${baseURL}/11`)
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('get order with orderId NULL should receive code 500', async ({ request }) => {
    const response = await request.get(`${baseURL}/`)
    expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })

  test('get order with orderId = test should receive code 400', async ({ request }) => {
    const response = await request.get(`${baseURL}/test`)
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('post order with incorrect data should receive code 415', async ({ request }) => {
    const response = await request.post(baseURL, {
      data: 'test',
    })
    expect.soft(response.status()).toBe(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
  })
})

test.describe('PUT endpoint', () => {
 test('Change order with id 1 should return code 200', async ({ request }) => {
   const response = await request.put(`${baseURL}/1`,
     {
       data: requestBasicBody,
       headers: {api_key: validApiKey},
     },
   )
   expect(response.status()).toBe(StatusCodes.OK)
 })

  test('Change order with id 5 should return code 200', async ({ request }) => {
    const response = await request.put(`${baseURL}/5`,
      {
        data: requestBasicBody,
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('Change order with id 10 should return code 200', async ({ request }) => {
    const response = await request.put(`${baseURL}/10`,
      {
        data: requestBasicBody,
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('Change order with id 0 should return code 400', async ({ request }) => {
    const response = await request.put(`${baseURL}/0`,
      {
        data: requestBasicBody,
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Change order with id 11 should return code 400', async ({ request }) => {
    const response = await request.put(`${baseURL}/11`,
      {
        data: requestBasicBody,
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Change order with id null should return code 405', async ({ request }) => {
    const response = await request.put(`${baseURL}/`,
      {
        data: requestBasicBody,
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Change order with id test should return code 400', async ({ request }) => {
    const response = await request.put(`${baseURL}/test`,
      {
        data: requestBasicBody,
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Change order with incorrect api-key should return code 401', async ({ request }) => {
    const requestHeaders: {api_key: string} = {api_key: '123456789012345'}
    const response = await request.put(`${baseURL}/1`,
      {
        data: requestBasicBody,
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})

test.describe('DELETE endpoint', () => {
  test('Delete order with id 1 should return code 204', async ({ request }) => {
    const response = await request.delete(`${baseURL}/1`,
      {
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })

  test('Delete order with id 5 should return code 204', async ({ request }) => {
    const response = await request.delete(`${baseURL}/5`,
      {
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })

  test('Delete order with id 10 should return code 204', async ({ request }) => {
    const response = await request.delete(`${baseURL}/10`,
      {
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })

  test('Delete order with id 0 should return code 400', async ({ request }) => {
    const response = await request.delete(`${baseURL}/0`,
      {
        headers:  {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Delete order with id 11 should return code 400', async ({ request }) => {
    const response = await request.delete(`${baseURL}/11`,
      {
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Delete order with id null should return code 405', async ({ request }) => {
    const response = await request.delete(`${baseURL}/`,
      {
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Delete order with id test should return code 400', async ({ request }) => {
    const response = await request.delete(`${baseURL}/test`,
      {
        headers: {api_key: validApiKey},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Delete order with incorrect api-key should return code 401', async ({ request }) => {
    const requestHeaders: {api_key: string} = {api_key: '123456789012345'}
    const response = await request.delete(`${baseURL}/1`,
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})

test.describe('GET endpoint', () => {
  test('Get order with correct query should return code 200', async ({ request }) => {
    const response = await request.get(`${baseURL}?username=Natali&password=test123`)
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('Get order with incorrect query (username = null) should return code 500', async ({ request }) => {
    const response = await request.get(
      `${baseURL}?username=&password=test123`)
    expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })

  test('Get order with incorrect query (password = null) should return code 500', async ({ request }) => {
    const response = await request.get(
      `${baseURL}?username=Natali&password=`)
    expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })
})


