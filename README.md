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