import { MenuItem } from "./menuItem";

export interface OrderItemInfo {
    id?: number
    orderId?: number
    status: string
    menuItem: MenuItem
    amount: number;
}