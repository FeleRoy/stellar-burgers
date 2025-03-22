import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getFeeds,
  getIsLoading,
  getOrdersSelector
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };
  if (!orders || !orders.length || isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetFeeds();
      }}
    />
  );
};
