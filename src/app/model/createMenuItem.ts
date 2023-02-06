export interface MenuItemCreate {
  id?: number;
  item: {
    id?: number;
    name?: string;
    ingredients?: string;
    preparationTime?: number;
    description?: string;
  };
  price: {
    id?: number;
    price?: number;
    expense?: number;
  };
  category: {
    id?: number;
    name?: String;
  };
  type?: string;
  isAlcoholic?: boolean;
  imageUrl?: string;
  active?: boolean;
}
