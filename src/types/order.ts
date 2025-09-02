import { RequestStatusType } from "@enums/request-status-type";

export type Order = {
  id: string;
  location: string;
  area: string;
  serviceType: string;
  supplier: string;
  dateTime: string;
  date: string;
  status: RequestStatusType;
  hasMap: boolean;
};