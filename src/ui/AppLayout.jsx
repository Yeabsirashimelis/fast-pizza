import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

//the parent route
function AppLayout() {
  const navigation = useNavigation(); //is built in hook in the router, used to make a loading indicator in changing across routes/pages
  const isLoading = navigation.state === "loading"; //navigation.state will be loading until any page is fully opened
  //SO WE MUST INCLUDE OT ALWAYS IN THE PARENT COMPONENT (MOST TIMES IN THE LAYOUT COMPONENT) - navigation

  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto] ">
      {isLoading && <Loader />}

      <Header />
      <div className=" overflow-scroll pl-2">
        <main className="mx-auto max-w-3xl ">
          {/* to get the children routes of the applayout */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
