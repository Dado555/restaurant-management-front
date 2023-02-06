import { Item } from './item';
import { Price } from './priceInfo';

export interface MenuItem {
  id: number;
  item: Item;
  price: Price;
  categoryId: number;
  isAlcoholic: boolean;
  type: string;
  imageUrl?: string;
}
