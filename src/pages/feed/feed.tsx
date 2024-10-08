// src/pages/feed/feed.tsx
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedsSlice';
import { RootState } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const { data: feedsData, loading } = useSelector(
    (state: RootState) => state.feeds
  );

  if (loading) {
    return <Preloader />;
  }

  if (!feedsData || !feedsData.orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={feedsData.orders} handleGetFeeds={() => {}} />;
};
