import { OrderInfo } from "./orderInfo";

export interface Table {
    id?: number;
    tableNumber: number;
    numberOfSeats: number;
    sectorName: string;
    sectorId: number,
    positionX: number;
    positionY: number;
    tableWidth: number;
    tableHeight: number;

    orderObj: OrderInfo | undefined;

    pseudoId?: boolean;
    active?: boolean

}