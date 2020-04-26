export class Header {
  id: SortEnum | null;
  asc: boolean;
  name: string;
  classes: string;
  isSelected: boolean;

  private static operators: Header[] = [];

  constructor(
    id: SortEnum,
    asc: boolean,
    name: string,
    classes: string,
    isSelected: boolean
  ) {
    this.id = id;
    this.asc = asc;
    this.name = name;
    this.classes = classes;
    this.isSelected = isSelected;
  }

  public static getAvaliableHeaders(): Header[] {
    Header.operators = new Array<Header>();

    Header.operators.push(
      new Header(SortEnum.id, true, 'Id', 'column-id', true)
    );
    Header.operators.push(new Header(SortEnum.name, false, 'Name', '', false));
    Header.operators.push(
      new Header(SortEnum.city, false, 'City', 'column-details', false)
    );
    Header.operators.push(
      new Header(SortEnum.totalIncome, false, 'Total', 'column-details', false)
    );
    Header.operators.push(
      new Header(
        SortEnum.averageIncome,
        false,
        'Average',
        'column-details',
        false
      )
    );
    Header.operators.push(
      new Header(
        SortEnum.lastMonthIncome,
        false,
        'Last month',
        'column-details',
        false
      )
    );

    return Header.operators;
  }

  public static selectSort(sort: SortEnum) {
    Header.operators.forEach(header => {
      header.isSelected = header.id === sort;
    });
    return Header.operators;
  }
}

export enum SortEnum {
  id,
  name,
  city,
  totalIncome,
  averageIncome,
  lastMonthIncome
}
