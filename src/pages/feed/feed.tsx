import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchGetFeedsApi, selectFeed } from '../../services/slices/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeed);

  useEffect(() => {
    dispatch(fetchGetFeedsApi());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchGetFeedsApi());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
