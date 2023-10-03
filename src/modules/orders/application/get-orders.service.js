import { LocalStorageDB } from "@/modules/shared/infrastructure/localstorage-db";

export async function getOrdersService({
  userId
} = {}) {
  const orders = await LocalStorageDB.getData('orders') || [];
  return orders;
}