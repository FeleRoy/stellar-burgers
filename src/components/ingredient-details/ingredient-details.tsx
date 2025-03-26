import { FC, useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import {
  getIngredients,
  getIngredientsSelector
} from '../../services/slices/burgerSlice';
import { useDispatch, useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  // /** TODO: взять переменную из стора */
  const { id } = useParams<'id'>();
  const ingredients = useSelector(getIngredientsSelector);
  const ingredientData = ingredients.find((element) => element._id === id);
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
