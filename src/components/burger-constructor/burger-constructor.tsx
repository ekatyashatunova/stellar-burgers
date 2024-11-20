import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  resetConstructor,
  selectBun,
  selectIngredient
} from '../../services/slices/burgerConstructor';
import {
  selectLoading,
  newOrder,
  clearOrder
} from '../../services/slices/newOrder';
import { selectIsAuthenticated } from '../../services/slices/authUser';
import { useNavigate } from 'react-router-dom';
import { selectNewOrder } from '../../services/slices/newOrder';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredient);
  const user = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector(selectLoading);

  const orderModalData = useSelector(selectNewOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    } else {
      const data = [
        constructorItems.bun._id,
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id)
      ];

      dispatch(newOrder(data));
    }
  };
  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

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
