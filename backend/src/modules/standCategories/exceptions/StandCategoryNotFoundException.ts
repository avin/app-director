import { NotFoundException } from '@nestjs/common';

class StandCategoryNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`StandCategory with id ${id} not found`);
  }
}

export default StandCategoryNotFoundException;
