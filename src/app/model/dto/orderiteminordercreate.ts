import { MenuItem } from "../menuItem";

export interface OrderItemInOrderCreate {
    
    menuItemId: number;
    menuItem: MenuItem
    amount: number;
    status: string;
    description: string;
}