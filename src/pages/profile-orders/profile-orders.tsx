import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { selectOrders, getOrders } from '../../services/slices/orders/orders';
import { useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
