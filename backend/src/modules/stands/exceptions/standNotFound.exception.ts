import { NotFoundException } from '@nestjs/common';

class StandNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Stand with id ${id} not found`);
  }
}

export default StandNotFoundException;
