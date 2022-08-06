import { NotFoundException } from '@nestjs/common';

class ApplicationNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Application with id ${id} not found`);
  }
}

export default ApplicationNotFoundException;
