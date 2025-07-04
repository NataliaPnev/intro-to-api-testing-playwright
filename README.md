Testing PUT endpoint

|  №  | Name                                           |  Testing data   |
|:---:|:-----------------------------------------------|:---------------:|
|  1  | Successful order change with correct id        |     1,5,10      |
|  2  | Unsuccessful order change with incorrect id    |      0,11       |
|  3  | Unsuccessful order change with id null         |      null       |
|  4  | Unsuccessful order change with invalid id      |     'test'      |
|  5  | Unsuccessful order change with invalid api-key | 123456789012345 |

Testing Delete endpoint

|  №  | Name                                           |  Testing data   |
|:---:|:-----------------------------------------------|:---------------:|
|  1  | Successful order delete with correct id        |     1,5,10      |
|  2  | Unsuccessful order delete with incorrect id    |      0,11       |
|  3  | Unsuccessful order delete with id null         |      null       |
|  4  | Unsuccessful order delete with invalid id      |     'test'      |
|  5  | Unsuccessful order delete with invalid api-key | 123456789012345 |

Testing GET endpoint

|  №  | Name                                          |    Testing data    |
|:---:|:----------------------------------------------|:------------------:|
|  1  | Successful authorisation with correct query   | 'Natali','test123' |
|  2  | Unsuccessful authorisation with null name     |        null        |
|  3  | Unsuccessful authorisation with null password |        null        |

Testing Loan POST endpoints

| № | Name                                                        |      Testing data      |
|:-:|:------------------------------------------------------------|:----------------------:|
| 1 | Getting a negative decision with the correct data           | 100,0,17,true,1000,12  |
| 2 | Getting a positive decision (medium risk) with correct data | 20000,0,30,true,500,6  |
| 3 | Getting a positive decision (low risk) with correct data    | 20000,0,30,true,500,12 |
| 4 | Getting a positive decision (high risk) with correct data   | 20000,0,30,true,500,3  |
| 5 | Unsuccessful request with debt = -100                       | 100, -100, 18, true, 1000, 12  |
| 6 | Unsuccessful request with income = 0                        | 0, 0, 18, true, 1000, 12  |
| 7 | Unsuccessful request with incorrect data                    | 0, 0, -10, false, 1000, 12  |