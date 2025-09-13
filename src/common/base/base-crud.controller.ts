import { Body, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { FindOptionsWhere, ILike, LessThan } from "typeorm";

export class FindAllDto {
  filters?: Record<string, any>; // ex: { status: "active" }
  search?: string; // termo de busca
  searchFields?: string[]; // campos onde procurar
  limit?: number; // número máximo de registros
  lastId?: number; // para infinite scroll
}

export class BaseCrudController<TService> {
  constructor(protected readonly service: TService) {}

  @Post()
  create(@Body() dto: any) {
    //@ts-ignore
    return this.service.create(dto);
  }

  @Get()
  find(@Query() query) {
    const { search, searchFields, limit = 20, lastId, ...filters } = query;

    // normaliza searchFields
    let searchFieldsArr: string[] = [];
    if (searchFields) {
      if (Array.isArray(searchFields))
        searchFieldsArr = searchFields.map((f) => f.replace(/"/g, "").trim());
      else if (typeof searchFields === "string")
        searchFieldsArr = searchFields
          .split(",")
          .map((f) => f.replace(/"/g, "").trim());
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

    //@ts-ignore
    return this.service.findAll({
      where,
      take: Number(limit),
      order: { id: "DESC" },
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    //@ts-ignore
    return this.service.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: any) {
    //@ts-ignore
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    //@ts-ignore
    return this.service.delete(+id);
  }
}
