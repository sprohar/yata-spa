export interface SortStrategy<TModel> {
  sort(data: TModel[]): TModel[];
}
