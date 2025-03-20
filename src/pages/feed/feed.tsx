import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getOrdersSelector } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersSelector);
  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
