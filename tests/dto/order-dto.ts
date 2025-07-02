export class OrderDto {
  status: string;
  courierId: number;
  customerName: string;
  customerPhone: string;
  comment: string;
  id: number | undefined;

  private constructor(
    status: string,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number | undefined,
  ) {
    this.status = status;
    this.courierId = courierId;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
    this.comment = comment;
    this.id = id;
  }
  static createOrderWithRandomData(): OrderDto {
    return new OrderDto ('OPEN',Math.floor(Math.random()*100),'John','+983','test order',Math.floor(Math.random()*100))
  }
  // add a method to create a new instance with orderid = undefined
  static createOrderWithoutId(): OrderDto {
    return new OrderDto(
      'OPEN',
      Math.floor(Math.random() * 100),
      'John Doe',
      '+123456789',
      'Urgent order',
      undefined,
    )
  }
  // add a method to creste a new basic instance like in swagger
  static createBasicOrder(): OrderDto {
    return new OrderDto(
      'OPEN',
      0,
      'string',
      'string',
      'string',
      0,
    )
  }
}