export interface INewMeal {
  name: string;
  description: string;
  calories: number;
}

export interface IMeal {
  id: string;
  name: string;
  description: string;
  calories: number;
}

export interface IMealsAPI {
  [id: string]: IMeal;
}