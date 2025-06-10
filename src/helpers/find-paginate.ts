import { Request } from "express";
import { FindManyOptions, ILike, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";

const defaultOrderBy = {
    columnName: 'createdAt',
    order: 'desc',
};

export class FindPaginate {
    private repo: Repository<any>;
    private req: Request;
    private options: FindManyOptions<any> = {};
    private data: any[];
    private totalAllData: number;
    private searchables: any;
  
    constructor(repo: Repository<any>, req: Request, searchables?: any, options?: FindManyOptions<any>) {
      this.repo = repo;
      this.req = req;
      this.searchables = searchables;
      this.options = options || {};
    }
  
    where() {
      if (this.searchables) {
        Object.entries(this.searchables).forEach(([key, value]: [string, string]) => {
          if (this.req?.query?.[key]) {
            let valueWhere: any = this.req.query[key];
            if (value.toLowerCase() == 'like') {
              valueWhere = ILike(`%${this.req.query[key]}%`);
            }
            if (value.toLowerCase() == '>=') {
              valueWhere = MoreThanOrEqual(value);
            }
            if (value.toLowerCase() == '>') {
              valueWhere = MoreThan(value);
            }
            if (value.toLowerCase() == '<=') {
              valueWhere = LessThanOrEqual(value);
            }
            if (value.toLowerCase() == '<') {
              valueWhere = LessThan(value);
            }
  
            this.options.where = { ...this.options.where, [key]: valueWhere };
          }
        });
      }
  
      return this;
    }
  
    sort() {
      const sortByColumName: string = (this.req.query?.sort_by_column_name as string) || defaultOrderBy.columnName;
      const sortByOrder: string = (this.req.query?.sort_by_order as string) || defaultOrderBy.order;
  
      this.options.order = { [sortByColumName]: sortByOrder };
  
      return this;
    }
  
    paginate() {
      const page: number = +this.req.query?.page || 1;
      const limit: number = +this.req.query?.limit || 25;
      const skip = (page - 1) * limit;
  
      this.options = {
        ...this.options,
        take: limit,
        skip: skip,
      };
  
      return this;
    }
  
    async run() {
      this.where().sort().paginate();
      const [result, total] = await this.repo.findAndCount(this.options);
      this.data = result;
      this.totalAllData = total;
  
      return this.data;
    }
  
    async build() {
      await this.run();
      const totalAllData = this.totalAllData;
      const totalData = this.data.length;
      const limit = +this.req.query?.limit || 25;
      const totalPage = totalAllData / limit <= 1 ? 1 : Math.ceil(totalAllData / limit);
      const currentPage = +this.req.query?.page || 1;
      const lastPage = totalPage;
      const nextPage = currentPage + 1 > totalPage ? null : currentPage + 1;
      const previousPage = currentPage - 1 <= 0 ? null : currentPage - 1;
      const payload: any[] = this.data;
  
      const body = {
        totalAllData,
        totalData,
        limit,
        totalPage,
        currentPage,
        lastPage,
        nextPage,
        previousPage,
        payload,
      };
      return body;
    }
}