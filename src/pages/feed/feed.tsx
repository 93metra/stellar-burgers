// src/pages/feed/feed.tsx
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
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

  if (!feedsData || !feedsData.orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return <FeedUI orders={feedsData.orders} handleGetFeeds={handleGetFeeds} />;
};
