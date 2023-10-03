'use client'
import React from "react";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import { formatDate } from "@/modules/shared/application/format-date";

export function OrdersTable({
  orders = [],
  onAddNewRandomOrder,
}) {
  return (
    <>
      <button onClick={onAddNewRandomOrder}>Add new random order</button>
      <Table aria-label="Main orders table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {(orders || []).map((order, idx) => (
          <TableRow key={`orders-table--row-${order.id || idx}`}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{formatDate(order.dueDate)}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
