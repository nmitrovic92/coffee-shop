import 'reflect-metadata';
import { Service } from 'typedi';

@Service()
export default class OrderService {
  constructor() {}

  public makeCoffee(): void {
    console.log('makeCoffee');
  }
}
