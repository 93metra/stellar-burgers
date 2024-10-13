import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders());
  })
  const { orders, loading, error } = useSelector(
    (state) => state.userOrders
  )
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
