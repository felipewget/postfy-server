import { NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository, FindOneOptions, ObjectLiteral, FindManyOptions } from 'typeorm';

export abstract class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<void> {
    // @todo 
    const account_id = 1;
    const entity = this.repository.create({...data, account_id});

    await this.repository.save(entity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options ?? {});
  }

  async findOne(id: number): Promise<T | null> {
    return await this.repository.findOne({
      //@ts-ignore
      where: { id },
    });
  }

  async findOneOrFail(id: number): Promise<T> {
    const entity = await this.findOne(id);

    if (!entity) {
      throw new NotFoundException(`Entity not found`);
    }

    return entity;
  }

  async findOneBy(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async findOneByOrFail(options: FindOneOptions<T>): Promise<T> {
    const entity = await this.findOneBy(options);

    if (!entity) {
      throw new NotFoundException(`Entity not found`);
    }

    return entity;
  }

  async update(id: number, data: DeepPartial<T>): Promise<T | null> {
    // @todo 
    const account_id = 1;

    //@ts-ignore
    await this.repository.update(id, {...data, account_id});

    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
