import { Company } from './company';
import { Income } from './income';

export class CompanyWithIncomes extends Company {
  incomes: Income[];
  totalIncome: number;
  averageIncome: number;
  lastMonthIncome: number;
}
