import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/UsersService';
import { OrganizationsService } from '../../modules/organizations/OrganizationsService';
import { ApplicationsService } from '../../modules/applications/ApplicationsService';
import { StandsService } from '../../modules/stands/StandsService';
import { faker } from '@faker-js/faker';
import { Application } from '../../modules/applications/Application';
import { Organization } from '../../modules/organizations/Organization';
import { sample } from '../../utils/sample';
import { ApplicationCategory } from '../../modules/applicationCategories/ApplicationCategory';
import { ApplicationCategoriesService } from '../../modules/applicationCategories/ApplicationCategoriesService';
import { StandCategoriesService } from '../../modules/standCategories/StandCategoriesService';
import { StandCategory } from '../../modules/standCategories/StandCategory';

@Injectable()
export class FillFakesCommand {
  constructor(
    private readonly usersService: UsersService,
    private readonly applicationCategoriesService: ApplicationCategoriesService,
    private readonly standCategoriesService: StandCategoriesService,
    private readonly organizationsService: OrganizationsService,
    private readonly applicationsService: ApplicationsService,
    private readonly standsService: StandsService,
  ) {}

  @Command({
    command: 'fill-fakes',
    describe: 'Fill DB With fake data',
  })
  async create() {
    await this.usersService.deleteAllUsers();
    await this.applicationCategoriesService.deleteAllApplicationCategories();
    await this.standCategoriesService.deleteAllStandCategories();
    await this.standsService.deleteAllStands();
    await this.organizationsService.deleteAllOrganizations();
    await this.applicationsService.deleteAllApplications();

    await this.createAdminUser();
    await this.createSome(3, this.createRandomUser);
    const applicationCategories = await this.createSome(2, this.createRandomApplicationCategory);
    const standCategories = await this.createSome(3, this.createRandomStandCategory);
    const organizations = await this.createSome(20, this.createRandomOrganization);
    const applications = await this.createSome(20, this.createRandomApplication, applicationCategories);
    await this.createSome(100, this.createRandomStand, standCategories, applications, organizations);

    console.info('Done!');
  }

  async createSome<T extends (...args: any[]) => any>(count: number, createFunction: T, ...args: Parameters<T>) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(await createFunction.apply(this, args));
    }
    return results;
  }

  createAdminUser() {
    return this.usersService.createUser({
      email: 'admin@admin.com',
      fullName: `The Admin`,
      password: 'secretpass',
    });
  }

  createRandomUser() {
    return this.usersService.createUser({
      email: faker.internet.email().toLowerCase(),
      fullName: `${faker.name.findName()} ${faker.name.lastName()}`,
      password: faker.internet.password(),
    });
  }

  createRandomStandCategory() {
    return this.standCategoriesService.createStandCategory({
      title: faker.lorem.word(),
      description: faker.lorem.sentence(3),
    });
  }

  createRandomApplicationCategory() {
    return this.applicationCategoriesService.createApplicationCategory({
      title: faker.lorem.word(),
      description: faker.lorem.sentence(3),
    });
  }

  createRandomOrganization() {
    return this.organizationsService.createOrganization({
      title: faker.company.companyName(),
    });
  }

  createRandomApplication(applicationCategories: ApplicationCategory[]) {
    return this.applicationsService.createApplication({
      title: faker.company.companyName(),
      description: faker.lorem.sentence(),
      applicationCategoryId: sample(applicationCategories).id,
    });
  }

  createRandomStand(standCategories: StandCategory[], applications: Application[], organizations: Organization[]) {
    return this.standsService.createStand({
      title: faker.word.noun(),
      description: faker.lorem.sentence(),
      applicationId: sample(applications).id,
      organizationId: sample(organizations).id,
      standCategoryId: sample(standCategories).id,
    });
  }
}
