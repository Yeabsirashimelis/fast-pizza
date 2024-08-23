import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      <App />
    </Provider>
  </React.StrictMode>,
);

/*
              Planning my project
    1, break the desired UI into components
    2, build a static version (no state yet)
    3, think about state management + data flow

    /   MORE ELABORATION
    1,gather application requirements and features
    2,divide the application into pages
          -think about the overall and page-level UI
          -break the desired UI inti components
          -design and build a static version (no state yet)
    3,divide the application into feature categories
          -think about state management + dataflow
    4,decide what libraries to use (technology decisions)

    /
 */

/*
 1,LIST OF REQUIREMENTS
              PROJECT REQUIREMETS FROM THE BUSINESS
      -very simple application, where users can order one or more pizzas from the menu
      -requires no user accounts and no login : users just input their names before using the app
      -the pizza menu can change, so it should be loaded form an API
      -users can add multiple pizzas to cart before ordering 
      -ordering requires just the user's username, phone number, and address
      -if possible, GPS loaction should be provided, to make delivery easier
      -users can mark their order as "priority" for an additional 20% of the cart price
      -orders are made by sending a post request with the order data (user data + selected pizzas) to the API
      -payments are made on delivery, so NO payments processing is neccessary in the app
      -each order will get a unique ID that should be displayed, so the user can later look up their order based on the ID
      -users should be able to make their orders as "priority" order even after it has been placed
      */

/*
       FEATURES + PAGES
    FEATURE CATEGORIES
       1.user - page1
       2.menu -page2
       3.cart -page3
       4.order-page4&5
      */

/*
       NECCESSARY PAGES
        1.home page (/)
        2. pizza menu (/menu)
        3.cart (/cart)
        4.place a new order (order/new)
        5.Looking up an order (/order/:orderID)
       */

/*   STATE MANAGEMENT AND TECHNOLOGY DECISIONS
        1.user - Global UI state (no accounts, so stays in app)
        2.menu - Global remote state (menu is fetched from API)
        3.cart - global UI state
        4.order - global remote state (fetched from API and submitted to API)
        
    -routing  - react router 
    -styling  -  tailwindcss 
    -remote state management  - react router (new way of fetching data righT inside the react router that us worth exploring ("render-as-you-fetch" instead of fetch-on-render). not really state management, as it doesnot persist state)
    -UI state management - REDUX

        */
//AND WE WILL USE FEATURE BASED FILE STRUCTURE

/*
     WHAT IS TAILWIND CSS?
 - a utility first css framework packed with utility classes like flex, text-center, and rotate-90 that can be composed to build any design, directly in your markup (html or jsx)
 - utility-first-css approach : writing tiny classes with one single purpose, and then combining them to builf entire layouts
 - in tailwind, these classs are already written for us. so we are not gonna write a new css, but instead use some of tailwind hundreds of classes

   the good and the bad about tailwind
              THE GOOD
      you don't need to think abt class names
      no jumping between files to write markup and styles
      immediately understand styling in any project that uses tailwind
      tailwind is a design system: many design decisions have been taken for you, which makes UIs looks better and more consistent
      saves a lot of time
      Docs and VS code integration are great - auto completion

               THE BAD
      Markup (html and jsx) looks very unreadable, with lots of class names (you get used to it)
      you have to learn a lt of class names (but after a day os usage you know fundamentals)
      you need to install and set up it in each project
      you are giving up on "vanilla CSS"
      
 */
//TAILWIND IS BEST FOR MOBILE VIEWS SO DO SOME MANIPULATIONS FOR PC USING RESPONSIVE DESIGN WHICH IS ONE OF THE CORE CONCEPTS IN TAILWIND
