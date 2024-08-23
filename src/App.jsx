import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";

//this is the modern way of creating routers -  AND THIS WAY ENABLE THE ROUTER FOR DATA FETCHING AND SUBMITTING DATA USING FORMS
// each error element will be bubble up and rendered insstead if the layout. so if we want to render the error with the layout included we must include in the specific component that is prone to errors (like a component which fetches data)
const router = createBrowserRouter([
  {
    //no need to specify the path as it is the LAYOUT ROUTE(found in all the pages), then we pass the routes that are the children of it in the array
    element: <AppLayout />,
    errorElement: <Error />, //this is how we can display error when happened

    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]); // an array of objects in which each object is one route

function App() {
  return <RouterProvider router={router} />; //we pass the created routers as a prop for this library created component
}

export default App;
