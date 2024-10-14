//src/components/burger-constructor/burger-constructor.tsx
import { FC, useMemo, useCallback } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, resetOrder } from '../../services/slices/ordersSlice';
import { resetConstructor } from '../../services/slices/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { bun, ingredients } = useSelector(state => state.burgerConstructor);
  const isAuthenticated = useSelector((state) => !!state.user.user); // Ensure it's a boolean

  // const orderRequest = useSelector(state => state.orders.loading);
  // const orderModalData = useSelector(state => state.orders.data);
  
  // const orderRequest = false
  // const orderModalData = null

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderRequest = useSelector(state => state.orders.loading);
  const orderModalData = useSelector(state => state.orders.data);

  const constructorItems = {
    bun,
    ingredients
  };

  const ingredientIds = useMemo(() => {
    const ids = ingredients.map(ingredient => ingredient._id);
    if (bun) ids.push(bun._id, bun._id); 
    return ids;
  }, [bun, ingredients]);
  
  // const constructorItems = {
  //   bun: null as TConstructorIngredient | null,
  //   ingredients: []
  // };

  // const orderRequest = false;

  // const orderModalData = null;

  // const onOrderClick = () => {
  //   if (!constructorItems.bun || orderRequest) return;
  // };

  const onOrderClick = useCallback(() => {
    if (!constructorItems.bun || orderRequest) return;

    if (isAuthenticated) {
      dispatch(createOrder(ingredientIds));
    } else {
      navigate('/login');
    }
  }, [constructorItems.bun, orderRequest, ingredientIds, dispatch, isAuthenticated, navigate]);
  
  const closeOrderModal = useCallback(() => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
  }, [dispatch]);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
