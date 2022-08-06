import { NotFoundException } from '@nestjs/common';

class ApplicationCategoryNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`ApplicationCategory with id ${id} not found`);
  }
}

export default ApplicationCategoryNotFoundException;
