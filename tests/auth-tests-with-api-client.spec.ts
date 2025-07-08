import { expect, test } from '@playwright/test'
import { ApiClient } from './api-client'
import { StatusCodes } from 'http-status-codes'

test('login and create order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
})

test('Successful login and delete existing order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
  const response = await apiClient.deleteOrder(orderId)
  const responseBody = await response.ok()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody).toBeTruthy()
  const getResponse = await apiClient.getOrder(orderId)
  expect.soft(getResponse.status()).toBe(StatusCodes.OK)
  const bodyText = await getResponse.text()
  console.log('GET after delete body:', bodyText)
  expect.soft(bodyText).toBe('')
})

test('Successful login and get existing order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
  const response = await apiClient.getOrder(orderId)
  const responseBody = await response.json()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody).toBeDefined()
  expect.soft(responseBody.id).toBe(orderId)
})
