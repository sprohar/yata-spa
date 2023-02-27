export interface PaginatedList<TModel> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: TModel[];
}
