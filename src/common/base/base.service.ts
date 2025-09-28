import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  Repository,
  FindOneOptions,
  ObjectLiteral,
  FindManyOptions,
  LessThan,
  ILike,
  FindOptionsOrder,
} from 'typeorm';

export abstract class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<void> {
    // @todo
    const entity = this.repository.create({ ...data });

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
    //@ts-ignore
    await this.repository.update(id, { ...data });

    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async list(query) {
    let { search, searchFields, limit = 20, lastId, relations, ...filters } = query;

    relations = relations ?? [];

    // normaliza searchFields
    let searchFieldsArr: string[] = [];
    if (searchFields) {
      if (Array.isArray(searchFields))
        searchFieldsArr = searchFields.map((f) => f.replace(/"/g, '').trim());
      else if (typeof searchFields === 'string')
        searchFieldsArr = searchFields
          .split(',')
          .map((f) => f.replace(/"/g, '').trim());
    }

    const baseFilters: any = { ...filters };

    if (baseFilters.client_id) {
      baseFilters.client = { id: Number(baseFilters.client_id) };
      delete baseFilters.client_id;
    }

    if (lastId) baseFilters.id = LessThan(lastId);

    const where =
      search && searchFieldsArr.length
        ? searchFieldsArr.map((field) => ({
            ...baseFilters,
            [field]: ILike(`%${search}%`),
          }))
        : [baseFilters];

    const order: FindOptionsOrder<any> = { id: 'DESC' };

    //@ts-ignore
    return this.repository.find({
      relations,
      where,
      take: Number(limit),
      order
    });
  }
}
