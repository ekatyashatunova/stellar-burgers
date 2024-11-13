import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchGetFeedsApi } from '../../services/slices/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];

  useEffect(() => {
    dispatch(fetchGetFeedsApi());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchGetFeedsApi());
  };

  <FeedUI
    orders={orders}
    handleGetFeeds={() => {
      handleGetFeeds;
    }}
  />;
};
