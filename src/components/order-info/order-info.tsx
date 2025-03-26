import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredientsSelector,
  getOrderByNumber,
  getSelectedOrderSelector
} from '../../services/slices/burgerSlice';
import { useParams } from 'react-router-dom';
import { getOrdersSelector } from '../../services/slices/feedSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<'number'>();
  const orderData = useSelector(getSelectedOrderSelector);
  const dispatch = useDispatch();

  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);
  useEffect(() => {
    if (number) {
      const orderNumber = parseInt(number, 10);
      if (!isNaN(orderNumber)) {
        dispatch(getOrderByNumber(orderNumber));
      }
    }
  }, []);
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
