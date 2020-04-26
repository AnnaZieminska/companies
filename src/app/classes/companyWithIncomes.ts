import { Company } from './company';

export class CompanyWithIncomes extends Company {
  totalIncome: number;
  averageIncome: number;
  lastMonthIncome: number;
}
