export class ApplicantDetailsDto {
  income: number;
  debt: number;
  age: number;
  employed: boolean;
  loanAmount: number;
  loanPeriod: number;

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income;
    this.debt = debt;
    this.age = age;
    this.employed = employed;
    this.loanAmount = loanAmount;
    this.loanPeriod = loanPeriod;
  }
  // add a method to create the same applicant with different loan periods
  static differentLoanPeriods(loanPeriod:number): ApplicantDetailsDto {
    return new ApplicantDetailsDto(
      20000,
      0,
      30,
      true,
      500,
      loanPeriod,
    )
  }
}