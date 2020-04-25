export class Income {
  date: string | Date;
  value: string;
}

export class IncomeResponse {
  id: number;
  incomes: Income[];
}
