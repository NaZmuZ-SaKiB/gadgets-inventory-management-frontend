# Gadgets Inventroy Management Client

This is a **React + Vite + TypeScript** client side project. Here I have used **Redux toolkit** as state management Library. **Shadcn Ui** is used as a UI Library. All the codes are written in **TypeScript**. I have utilized **Eslint** for better linting and **Prettier** for better code formating to make code readable.

## Run the project in your local mechine

### Requirements

- Node Js (Make sure you have node js installed on your mechine).

### Installation

1. Clone this repo:
   - `git clone https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-client-side-NaZmuZ-SaKiB.git`
2. Install all necessary dependencies:
   - `l2b2-full-stack-a5-client-side-NaZmuZ-SaKiB.git`
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

- **/** : Dashboard
- **/login** : Login page
- **/signup** : Login page
- **/stock** : Inventory page
- **/sales** : Sales page
- **/add-product** : Add product page
- **/category** : Category page
- **/brand** : Category page
- **/product/:id** : Single product + Product update page
- **/duplicate-product/:id** : Duplicate product page

### Deployment

1. Build the project.
2. Go to netlify and create an account
3. Select mannual deploy in from the dashboard
4. Upload the dist folder
5. Wait for the build to complete
