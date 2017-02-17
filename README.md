# README

## Introduction
This repo is based off of Stephen Grider's [Modern React and Redux](#) course from Udemy.
The app was built using the create-react-app CLI and its purpose is to run through a slightly more advanced Redux example that utilizes middleware.

## List of Packages and Associated Commands:
```sh
# Redux => state management
npm install --save redux

# React-Redux => the bindings between React and Redux
npm install --save react-redux

# Redux-Promise => allows Redux to handle API calls
npm install --save redux-promise

# Axios => allows us to make API calls
npm install --save axios


```

## Set-up
- These are the basic steps I followed to build the app:

```sh
create-react-app book_list_CM
npm install --save redux
npm install --save react-redux
```

### Redux Set-up
- Create folders for `/actions`, `/components`, `/containers` and `/reducers`
- Create blank index.js file for `/actions`
- `/containers` can remain blank for now
- Write rootReducer in `/reducers/index.js`
  ```js
  import { combineReducers } from 'redux';

  const rootReducer = combineReducers({

  });

  export default rootReducer;
  ```
  - There are three main things I need to do: (#1) import the combineReducers function, (#2) set my
  rootReducer equal to the result of the combineReducers function that takes in, as its only argument, 
  an object where each key has a value of reducers I include, (#3) export my rootReducer
- import { Provider } from ReactRedux
- import { createStore, applyMiddleware } from 'redux';
- create the store for Redux.  
  - I used Stephen's version because we will be using middleware but I should at least get the link for
  how to add middleware myself
- Wrap my `<App />` component in `<Provider>` tags
- Pass my store into `<Provider>`
- And with that, I believe that I am all set-up.  I am currently getting an error about a valid reducer being passed into my rootReducer but that's okay for now.
- Lastly, I did install Bootstrap:
```sh
npm install react-bootstrap --save
```
  - ...which also required that I include the stylesheet in my index.html file

## Lecture 51: Overview and Planning
- Our app is going to be a weather forecast browser.  Users can search for cities and
the app returns information on temperature, pressure, humidity for each city
- Our components will only be responsible for fetching data, Redux will be fetching all
of our data for us
- **NOTE:** I have notes on most of these lectures already, these notes will primarily
be what I struggled with or wanted to more fully explain
- SearchBar will need to talk to Redux

- Post Lecture 52 => I completed the SearchBar set-up and its ugly as shit...I don't seem
to be bringing in Bootstrap properly.  Maybe I am but I can't explain what it looks so bad
right now.

- L53 => turn SearchBar into a controlled component
  - that means setting component-level state whenever it is changed
- All DOM event handlers like onChange, onClick, onHover, etc. all come along with that
event object...we always get it.
- **REMEMBER:** We have to bind this for onInputChange in the constructor:
`this.onInputChange = this.onInputChange.bind(this);`
  - 'this' which is our instance of search bar has a function called onInputChange
  - bind that function to `this`, which is searchBar, and replace onInputChange with
  this new bound instance of this function
  - OR....Take the existing function, bind it to `this`, and replace the existing function
  with it

- Using the form element allows us to get the free functionality of the user being able 
to hit 'ENTER' and the form can submit

- After finishing Lecture 55, we have signed up for our Open Weather API and have our key,
the SearchBar component has a controlled input and its submit button has been defaulted
out.  We are now set up to start making requests with our API key.

## Lecture 56: Introduction to Middleware
- the API key was added to our actions
- middlewares are functions that take an action and depending on the action's type and
payload (or other factors), the middleware can choose to let the action pass through to
the reducers, it can alter it, it can stop it, console.log it, etc.  
- Middlewares are like the gatekeeper
- Why have middlewares?  They allow you to do some interesting things, I am assuming
something that actions can't or shouldn't do themselves
- Install Redux-Promise

```sh
npm install --save redux-promise
```
- To bring it into our app, we got to our root index.js file `./src/index.js`:
```js
import ReduxPromise from 'redux-promise';

// add 'ReduxPromise' as an argument to our applyMiddleware:
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

```
- To load our weather data, we need to dispatch an action that is responsible for making
that request
- We then installed Axios
```sh
npm insall --save axios
```
- ...and imported it into our action: `import axios from 'axios'`
- A get request in Axios is pretty simple.  Using our `url` variable that we created, 
we simply do `const request = axios.get(url);`
- Finished L57
- Thus far, for most of what I've done, nothing has been too new or complicated.  I did
get some good notes on what middleware even is and I will need to follow more closely
the parts that he discusses that.  I don't quite understand why my app's Bootstrap
styling doesn't seem to be coming through 100% (the button looks off) but the `container`
spacing and input styling has.

- Start on L58











