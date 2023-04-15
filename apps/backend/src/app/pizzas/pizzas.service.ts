import { Injectable } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { createPizza, getAllPizzas, updatePizza } from '@flying-pizza/firebase-api';

@Injectable()
export class PizzasService {
  create(createPizzaDto: CreatePizzaDto) {
    return createPizza(createPizzaDto);
  }

  findAll() {
    // return `This action returns all pizzas`;
    return getAllPizzas();
  }

  findOne(id: number) {
    return `This action returns a #${id} pizza`;
  }

  update(id: string, updatePizzaDto: UpdatePizzaDto) {
    // debugger;
    return updatePizza(updatePizzaDto);
  }

  remove(id: number) {
    return `This action removes a #${id} pizza`;
  }
}
