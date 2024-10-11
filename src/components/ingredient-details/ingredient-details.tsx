import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();

  const ingredients = useSelector((state) => state.ingredients)
    .data as TIngredient[];

  // useEffect(() => {
  //   console.log(ingredients);
  // }, [ingredients]);

  // Use find to get a single ingredient
  const ingredientData = ingredients?.find(
    (ingredient) => ingredient._id === params.id
  );

  // const ingredientData = null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
