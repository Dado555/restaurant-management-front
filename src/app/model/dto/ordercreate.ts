import { MenuItem } from "../menuItem";
import { OrderItemInOrderCreate } from "./orderiteminordercreate";

export interface OrderCreate {
    tableId: number;

    waiterId: number;

    orderItems: OrderItemInOrderCreate[];
}