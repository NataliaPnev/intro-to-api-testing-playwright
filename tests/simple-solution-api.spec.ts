import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'

const BASE_URL = 'https://backend.tallinn-learning.ee/test-orders'
const VALID_API_KEY = '1234567890123456'
const REQUEST_BASIC_BODY = OrderDto.createBasicOrder()

test.describe('Lesson 9', (): void => {
  test('get order with correct id should receive code 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/1`)
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('post order with correct data should receive code 200', async ({ request }) => {
    const requestBody = OrderDto.createOrderWithRandomData()
    const response = await request.post(BASE_URL, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('get order with orderId 0 should receive code 400', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/0`)
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
    expect.soft(responseBody.message).toBe('getById.id: must be greater than or equal to 1')
  })

  test('get order with orderId 11 should receive code 400', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/11`)
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('get order with orderId NULL should receive code 500', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`)
    expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })

  test('get order with orderId = test should receive code 400', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/test`)
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('post order with incorrect data should receive code 415', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: 'test',
    })
    expect.soft(response.status()).toBe(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
  })
})

test.describe('PUT endpoint', () => {
 test('Change order with id 1 should return code 200', async ({ request }) => {
   const response = await request.put(`${BASE_URL}/1`,
     {
       data: REQUEST_BASIC_BODY,
       headers: {api_key: VALID_API_KEY},
     },
   )
   expect(response.status()).toBe(StatusCodes.OK)
 })

  test('Change order with id 5 should return code 200', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/5`,
      {
        data: REQUEST_BASIC_BODY,
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('Change order with id 10 should return code 200', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/10`,
      {
        data: REQUEST_BASIC_BODY,
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('Change order with id 0 should return code 400', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/0`,
      {
        data: REQUEST_BASIC_BODY,
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Change order with id 11 should return code 400', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/11`,
      {
        data: REQUEST_BASIC_BODY,
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Change order with id null should return code 405', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/`,
      {
        data: REQUEST_BASIC_BODY,
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Change order with id test should return code 400', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/test`,
      {
        data: REQUEST_BASIC_BODY,
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Change order with incorrect api-key should return code 401', async ({ request }) => {
    const requestHeaders: {api_key: string} = {api_key: '123456789012345'}
    const response = await request.put(`${BASE_URL}/1`,
      {
        data: REQUEST_BASIC_BODY,
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})

test.describe('DELETE endpoint', () => {
  test('Delete order with id 1 should return code 204', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/1`,
      {
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })

  test('Delete order with id 5 should return code 204', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/5`,
      {
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })

  test('Delete order with id 10 should return code 204', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/10`,
      {
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })

  test('Delete order with id 0 should return code 400', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/0`,
      {
        headers:  {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Delete order with id 11 should return code 400', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/11`,
      {
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Delete order with id null should return code 405', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/`,
      {
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Delete order with id test should return code 400', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/test`,
      {
        headers: {api_key: VALID_API_KEY},
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Delete order with incorrect api-key should return code 401', async ({ request }) => {
    const requestHeaders: {api_key: string} = {api_key: '123456789012345'}
    const response = await request.delete(`${BASE_URL}/1`,
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})

test.describe('GET endpoint', () => {
  test('Get order with correct query should return code 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}?username=Natali&password=test123`)
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('Get order with incorrect query (username = null) should return code 500', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}?username=&password=test123`)
    expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })

  test('Get order with incorrect query (password = null) should return code 500', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}?username=Natali&password=`)
    expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })
})


