export interface Recipe {
  _id: string;
  name: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  measure: string;
}
