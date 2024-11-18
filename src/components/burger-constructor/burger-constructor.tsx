import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectBun,
  selectIngredient
} from '../../services/slices/burgerConstructor';
import {
  selectLoading,
  selectNewOrder,
  newOrder
} from '../../services/slices/newOrder';
import { getUser } from '../../services/slices/authUser';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredient);
  const order = useSelector(selectNewOrder);
  const loading = useSelector(selectLoading);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = loading;

  const orderModalData = order;

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    /*const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];*/
    /*dispatch(newOrder())*/
  };
  const closeOrderModal = () => {};

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
