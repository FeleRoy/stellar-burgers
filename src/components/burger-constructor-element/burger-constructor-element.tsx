import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveСonstructorIngredient,
  deleteСonstructorIngredient
} from '../../services/slices/burgerSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(moveСonstructorIngredient({ index: index, direction: 'DOWN' }));
    };

    const handleMoveUp = () => {
      dispatch(moveСonstructorIngredient({ index: index, direction: 'UP' }));
    };

    const handleClose = () => {
      dispatch(deleteСonstructorIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
