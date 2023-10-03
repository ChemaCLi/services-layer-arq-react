import { LocalStorageDB } from "@/modules/shared/infrastructure/localstorage-db";

export async function createOrderService ({
  dueDate,
} = {}) {
  const newOrder = {
    dueDate,
    status: 'pending',
  }

  const orders = await LocalStorageDB.createEntry('orders', newOrder) || [];
  return orders;
}