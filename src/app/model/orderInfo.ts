import { UserInfo } from "./userInfo";
import { Table } from "./table";
import { OrderItemInfo } from "./orderItemInfo";

export interface OrderInfo {
    id?: number;
    date: number;
    table: Table;
    status: string; 
    orderItems: OrderItemInfo[];
    waiter: UserInfo
}   