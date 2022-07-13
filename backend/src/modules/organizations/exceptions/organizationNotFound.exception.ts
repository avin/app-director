import { NotFoundException } from '@nestjs/common';

class OrganizationNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Organization with id ${id} not found`);
  }
}

export default OrganizationNotFoundException;
