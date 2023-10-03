'use client'

import React from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { OrdersTable } from '../modules/orders/infrastructure/orders-table'
import { useService } from '@/modules/shared/application/use-service';
import { getOrdersService } from '@/modules/orders/application/get-orders.service';
import { createOrderService } from '@/modules/orders/application/create-order.service'

export default function Home() {
  const ordersQuery = useService(getOrdersService, { lazy: true, defaultDataValue: [] });

  React.useEffect(() => {
    ordersQuery.fetchQuery();
  }, []);

  const onAddNewRandomOrder = () => {
    const randomFutureDate = new Date(Date.now() + Math.random() * 10000000000).toISOString();
    createOrderService({
      dueDate: randomFutureDate,
    })
    .then(() => ordersQuery.fetchQuery())
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div>
        {
          ordersQuery.loading && (<p>Loading...</p>)
        }
        <OrdersTable orders={ordersQuery.data} onAddNewRandomOrder={onAddNewRandomOrder} />
      </div>
    </main>
  )
}
