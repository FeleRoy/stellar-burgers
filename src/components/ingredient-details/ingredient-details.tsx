import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import {
  getIngredients,
  getIngredientsSelector
} from '../../services/slices/burgerSlice';
import { useDispatch, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<'id'>();
  const ingredients = useSelector(getIngredientsSelector);
  const ingredientData =
    ingredients.find((element) => element._id === id) || undefined;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!ingredients || ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
