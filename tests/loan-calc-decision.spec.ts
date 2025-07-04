//Testing Loan POST endpoints
import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { ApplicantDetailsDto } from './dto/loan-calc-dto'

const BASE_URL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test.describe('Testing Loan POST endpoints', () => {
  test('post a request with correct data should receive code 200 and negative decision', async ({ request }) => {
    const requestBody = new ApplicantDetailsDto(100, 0, 17, true, 1000, 12)
    const response = await request.post(BASE_URL, {
      data: requestBody,
    })
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('negative')
  })

  test('post a request with correct data should receive code 200 and positive decision with medium risk', async ({ request }) => {
    const requestBody = new ApplicantDetailsDto(20000, 0, 30, true, 500, 6)
    const response = await request.post(BASE_URL, {
      data: requestBody,
    })
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('positive')
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  })

  test('post a request with correct data should receive code 200 and positive decision with low risk', async ({ request }) => {
    const requestBody = new ApplicantDetailsDto(20000, 0, 30, true, 500, 12)
    const response = await request.post(BASE_URL, {
      data: requestBody,
    })
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('positive')
    expect.soft(responseBody.riskLevel).toBe('Low Risk')
  })
})