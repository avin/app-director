import { NotFoundException } from '@nestjs/common';

class OrganizationNotFoundException extends NotFoundException {
  constructor(postId: string) {
    super(`Organization with id ${postId} not found`);
  }
}

export default OrganizationNotFoundException;
