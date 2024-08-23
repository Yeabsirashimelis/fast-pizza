import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const [withPriority, setWithPriority] = useState(false);

  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData(); //as we give the action to this compoenent on the app.jsx it can get the data returned from the action function using this hook
  //also the most use case of this hook is this to get is there is any error

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex  flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow "
            defaultValue={username}
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 ">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div
          className="relative mb-5 flex flex-col 
        gap-2 sm:flex-row sm:items-center"
        >
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[30px] z-50 sm:top-[-4px] md:top-[2.5px] ">
              <Button
                disabled={isLoadingAddress}
                type="small"
                className="rounded bg-stone-300 p-1"
                onClick={(e) => {
                  e.preventDefault(); //we're preventing the default as this button is found in to the from and dangerously submit the form
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        {addressStatus === "error" && (
          <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 ">
            {errorAddress}
          </p>
        )}

        <div className="items-cnter mb-12 flex gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />

          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="small">
            {isSubmitting
              ? "placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

//to submit data to the api we create an action function after we wrap all the inputs components in the Form built in component of react-router-dom
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your correct phone number. we might need it to contact you ";

  if (Object.keys(errors).length > 0) return errors;

  //if every thing is okay create an order and redirect
  const newOrder = await createOrder(order);
  console.log(newOrder);
  //DON'T overuse this technique unless it is the last option
  store.dispatch(clearCart()); //here we use the store to dispatch an action that when the order is place, the cart must be empty. this is a new method as we can't use hooks outside Components

  return redirect(`/order/${newOrder.id}`); //b/c we cannot use navigate as hooks cannot be used outside of components
}

export default CreateOrder;
