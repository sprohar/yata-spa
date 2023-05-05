export interface ChronoQueryParams {
  skip?: number;
  take?: number;
  startDate?: string;
  endDate?: string;
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
}
