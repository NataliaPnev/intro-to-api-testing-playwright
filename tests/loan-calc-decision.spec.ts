import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { ApplicantDetailsDto } from './dto/loan-calc-dto'

const baseURL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test.describe('Testing Loan POST endpoints', () => {
  test('post a request with correct data should receive code 200 and negative decision', async ({ request }) => {
    const requestBody = new ApplicantDetailsDto(100, 0, 17, true, 1000, 12)
    const response = await request.post(baseURL, {
      data: requestBody,
    })
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('negative')
  })

  test('post a request with correct data should receive code 200 and positive decision with medium risk', async ({ request }) => {
    const requestBody = ApplicantDetailsDto.differentLoanPeriods(6)
    const response = await request.post(baseURL, {
      data: requestBody,
    })
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('positive')
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  })

  test('post a request with correct data should receive code 200 and positive decision with low risk', async ({ request }) => {
    const requestBody = ApplicantDetailsDto.differentLoanPeriods(12)
    const response = await request.post(baseURL, {
      data: requestBody,
    })
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('positive')
    expect.soft(responseBody.riskLevel).toBe('Low Risk')
  })

  test('post a request with correct data should receive code 200 and positive decision with High risk', async ({ request }) => {
    const requestBody = ApplicantDetailsDto.differentLoanPeriods(3)
    const response = await request.post(baseURL, {
      data: requestBody,
    })
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('positive')
    expect.soft(responseBody.riskLevel).toBe('High Risk')
  })

  test('post a request with debt = -100 should receive code 400', async ({ request }) => {
    const requestBody = new ApplicantDetailsDto(100, -100, 18, true, 1000, 12)
    const response = await request.post(baseURL, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('post a request with income=0 should receive code 400', async ({ request }) => {
    const requestBody = new ApplicantDetailsDto(0, 0, 18, true, 1000, 12)
    const response = await request.post(baseURL, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('post a request with incorrect data should receive code 400', async ({ request }) => {
    const requestBody = new ApplicantDetailsDto(0, 0, -10, false, 1000, 12)
    const response = await request.post(baseURL, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })
})