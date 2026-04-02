## Ecommerce Website

This is ecommerce website i am building as part of assignment.

### Features Implemented:

1. Signup & Sign in with email and password using firebase Authentication.
2. UI Implementation of Home Screen, Footer, Header, Cart Screen.
3. Cart Management Logic Implemented using React Context API.
4. Filters based on category implemented at API level.
5. Sorting and Filter related to price implemented at client level.

### Observations:

1. Fake APIs auth api, they do have login and basic user management, but when i tried adding user and logging with same user, it didn't worked. So, i moved to firebase authentication.
2. Fake APIs product apis has sorting based on id not price or any other parameter, consider id is something not visible to user, I had implemented sorting and price level filters at client side.
3. Fake APIs do have cart management api, but since there is no linkage between user i am logged in and cart apis of fake APIs i couldn't implement them, so i built at client level using react context api, storing cart information in local storage.
4. Pagination was not supported by api as it only allow limit params but not skip or page.
5. Suddenly 31st March evening fake store api stopped working with 523 origin not found error.
6. Team replaced new endpoint with https://api.escuelajs.co/api/v1, which is working fine.

## API

```
[GET] https://api.escuelajs.co/api/v1/products
[GET] https://api.escuelajs.co/api/v1/products?title=something
[GET] https://api.escuelajs.co/api/v1/products?price_min=100&price_max=200
[GET] https://api.escuelajs.co/api/v1/products?categoryId=1
[GET] https://api.escuelajs.co/api/v1/products?categorySlug=electronics
[GET] https://api.escuelajs.co/api/v1/products?offset=0&limit=10
```

### Setup

(make sure you have any LTS version of node installed in your system)
1. git clone git@github.com:abhijain1705/e-commerce-website-assignment.git
2. npm install
3. npm run dev

## Testing

we have used playwright for basic end-to-end page testing.

1. npx playwright test
2. npx playwright show-report

### Code Structure

src/
 |- components/
 |    |- Header.tsx
 |    |- Footer.tsx
 |    |- ProductCard.tsx
 |    |- CartItem.tsx
 |    |- WIPPage.tsx
 |- pages/
 |    |- Home.tsx
 |    |- Cart.tsx
 |    |- Login.tsx
 |    |- Signup.tsx
 |- auth/
 |    |- firebase.ts
 |    |- AuthContext.tsx
 |    |- ProtectedRoute.tsx
 |- apis/
 |    |- getAllProducts.ts
 |- cart/
 |    |- cartContext.ts


 ### ENV

```
VITE_FIREBASE_API_KEY="",
VITE_FIREBASE_AUTH_DOMAIN="",
VITE_FIREBASE_PROJECT_ID="",
VITE_FIREBASE_STORAGE_BUCKET="",
VITE_FIREBASE_MESSAGING_SENDER_ID="",
VITE_FIREBASE_APP_ID="",
VITE_FIREBASE_MEASUREMENT_ID=""
VITE_PRODUCT_API=""
```

### Meet the Founder
[Abhi Jain](https://github.com/abhijain1705)