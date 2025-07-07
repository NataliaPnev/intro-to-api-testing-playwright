import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'
const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
const CorrectDataLogin = LoginDto.createLoginWithCorrectData()

test.describe('Tallinn delivery API tests', () => {
  test('login with correct data and verification auth token', async ({ request }) => {
    console.log('requestBody:', CorrectDataLogin)
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: CorrectDataLogin,
    })
    const jwtValue = await response.text()
    const responseBody = await response.text()
    console.log('response code:', response.status())
    console.log('response body:', responseBody)
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(jwtRegex.test(responseBody)).toBeTruthy()
    expect.soft(jwtValue).toMatch(jwtRegex)
  })

  test('login with incorrect data and verify response code 401', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()
    console.log('requestBody:', requestBody)
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
    expect(responseBody).toBe('')
  })

  test('login with incorrect username type and verify response code 401', async ({ request }) => {
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: {
        username: 12345,
        password: 'password123',
      },
    })
    const responseBody = await response.text()
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
    expect(responseBody).toBe('')
  })

  test('login and create correct order', async ({ request }) => {
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: CorrectDataLogin,
    })
    const jwtValue = await response.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithoutId(),
      headers: {
        Authorization: `Bearer ${jwtValue}`,
      },
    })
    const orderResponseBody = await orderResponse.json()
    console.log('orderResponse status:', orderResponse.status())
    console.log('orderResponse:', orderResponseBody)
    expect.soft(orderResponse.status()).toBe(StatusCodes.OK)
    expect.soft(orderResponseBody.status).toBe('OPEN')
    expect.soft(orderResponseBody.id).toBeDefined()
  })

  test('login with incorrect HTTP method returns error 405', async ({ request }) => {
    const response = await request.get(`${serviceURL}${loginPath}`, {
      data: CorrectDataLogin,
    })
    expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Create order with incorrect courierId type', async ({ request }) => {
     const response = await request.post(`${serviceURL}${loginPath}`, {
      data: CorrectDataLogin,
    })
    const jwtValue = await response.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: {
        status: 'OPEN',
        courierId: 'not-a-number',
        customerName: 'John',
        customerPhone: '1234567890',
        comment: 'Order comment',
        id: 123,
      },
      headers: {
        Authorization: `Bearer ${jwtValue}`,
      },
    })
    const orderResponseBody = await orderResponse.text()
    expect.soft(orderResponse.status()).toBe(StatusCodes.BAD_REQUEST)
    expect.soft(orderResponseBody).toContain('Incorrect query')
  })

  test('create order with incorrect structure returns error 500', async ({ request }) => {
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: CorrectDataLogin,
    })
    const jwtValue = await response.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: {
        status: 'OPEN',
        courierId: 12,
        customerName: 'John',
       // customerPhone: '1234567890', missing phone number
        comment: 'Order comment',
        id: 123,
      },
      headers: {
        Authorization: `Bearer ${jwtValue}`,
      },
    })
    expect.soft(orderResponse.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })
})