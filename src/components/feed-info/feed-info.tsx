// src/components/feed-info/feed-info.tsx
import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedsSlice';
import { RootState } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.feeds
  );

  useEffect(() => {
    if (!data && !loading && !error) {
      dispatch(fetchFeeds());
    }
  }, [dispatch, data, loading, error]);

  const orders: TOrder[] = data?.orders || [];
  const feed = data || {};

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
