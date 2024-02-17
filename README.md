# Gadgets Inventroy Management Client

This is a Gadgets inventory management Frontend project. The goal of this project is to design an electric gadgets management dashboard and manage products and sales. User can login and add products, sale the products, track their sales and view the products with a robust filterring system UI. Dashboard, Sale, Stock, Create User, Users and other pages behave dinamicly according to the logged in user's role. Full application is realtime. It refetch every data in every 10 seconds.

### [Live Site Link](https://gadget-inventory-management.netlify.app/)

## Technology

1.  ReactJS
2.  Redux Toolit
3.  Redux Persist
4.  React Hook Form
5.  React Router Dom
6.  Shadcn UI
7.  Tailwind CSS
8.  Zod
9.  TypeScript
10. Vite

## Run the project in your local mechine

### Requirements

- Node Js (Make sure you have node js installed on your mechine).

### Installation

1. Clone this repo:
   - `git clone https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-fronten-NaZmuZ-SaKiB.git`
2. Install all necessary dependencies:
   - `l2-b2-assignment-6-fronten-NaZmuZ-SaKiB`
   - `npm install` or `yarn`
3. Create a `.env` file in current directory and add following properties:

   - `VITE_BACKEND_URL` = backend server url

4. Run the development server using following command:
   - `npm run dev` or `yarn dev`
5. To build the project run following command:
   - `npm run build` or `yarn build`
6. To run the build version of the project run following command:

   - `npm run start` or `yarn start`

### Routes

- **/** : Dashboard (Dinamic for user roles)
- **/login** : Login page
- **/stock** : Inventory page with Filtering system and pagination (Dinamic for user roles)
- **/sales** : Sales history page with pagination and option for daily, weekly, monthly and yearly sales. (Dinamic for user roles)
- **/add-product** : Add product page
- **/category** : Create new Category and see list of categories
- **/brand** : Create new Brand and see list of brands
- **/checkout** : Create sale page with fully functional cart system
- **/product/:id** : View Single product + Product update page
- **/duplicate-product/:id** : Duplicate existing product page
- **/create-user** `Role: 'admin', 'manager'` : Admin can create new user or new manager. Manager can create new user.
- **/user-management** `Role: admin` : Admin can promote a usre to manager or demote a manager to a user.

### Deployment

1. Build the project.
2. Go to netlify and create an account
3. Select mannual deploy in from the dashboard
4. Upload the dist folder
5. Wait for the build to complete
