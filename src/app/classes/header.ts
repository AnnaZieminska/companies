export enum SortEnum {
  id,
  name,
  city,
  totalIncome,
  averageIncome,
  lastMonthIncome
}

export class Header {
  constructor(
    readonly id: SortEnum,
    public asc: boolean,
    readonly name: string,
    readonly classes: string,
    public isSelected: boolean
  ) {}
}

export const tableHeader: ReadonlyArray<Header> = [
  new Header(SortEnum.id, true, 'Id', 'column-id', true),
  new Header(SortEnum.name, false, 'Name', '', false),
  new Header(SortEnum.city, false, 'City', 'column-details', false),
  new Header(SortEnum.totalIncome, false, 'Total', 'column-details', false),
  new Header(SortEnum.averageIncome, false, 'Average', 'column-details', false),
  new Header(
    SortEnum.lastMonthIncome,
    false,
    'Last month',
    'column-details',
    false
  )
];
