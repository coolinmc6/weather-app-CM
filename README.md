# README

## Introduction
This repo is based off of Stephen Grider's [Modern React and Redux](#) course from Udemy.
The app was built using the create-react-app CLI and its purpose is to run through a slightly more advanced Redux example that utilizes middleware.  See the app in action [here](https://coolinmc6.github.io/weather-app-CM/).

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

- Using my API key, I get a status 200 back with data for the cities that I entered.  I am 
still getting an error around my reducer but that's just because I haven't built a reducer yet.

- Redux-Promise can stop or manipulate actions before they hit reducers.  Redux-Promise looks specifically
for the payload property, if it's a promise, it stops the action entirely and then once the request finishes,
it dispatches an action of the same type.  In other words, it unwraps the promise.
  - stops the action, waits until the promise resolves, and now it sends that to the reducer
- ~8:50 has a diagram of the flow
- Gist => if the action has a promise, it stops the action and waits for the promise to resolve and then
issues a new action through to the reducer

- finished L60
- Add OpenWeather API before starting again

## Lecture 61: Building a List Container
- Good chance to see some ES6 syntax in our new WeatherList container.  This is our `mapStateToProps` function:
```js
// ORIGINAL and easiest to understand
function mapStateToProps(state) {
  return { weather: state.weather };
}

// ES6 v1
function mapStateToProps({ weather }) {
  return { weather: weather };
}
// that weather argument is just us taking the 'weather' property off of state.
// it'd be similar to doing:
const weather = state.weather

// ES6 ultimate version:
function mapStateToProps({weather}) {
  return { weather };
}
// So we are peeling off the weather property of state and because the key and value are the same, we can
// return { weather } and don't need to put { weather: weather }
```
finish L61

## Lecture 62: Mapping Props to Render Helper
- neat DRY tool is defining a constant as such `const name = cityData.city.name` and using that in the curly
braces instead of that long bit of code.

## Lecture 63: Adding Sparklines
- I want to talk about `map()` briefly.  I'm not 100% on it yet but I think it's making more sense.
  - The map() method creates a new array with the results of calling a function for every array element.
  - The map() method calls the provided function once for each element in an array, in order.
  - Map creates an array that is as long as the array that is given to it.  So because we are passing it an 
  array with 40 objects, it's going to return an array with 40 items.  So we are passing it the weather
  object that we just peeled off from state in our mapStateToProps item.  But where did that come from?? Let's
  trace really quickly:
    - rootReducer => so the weather object, which is all of the data that we want, is coming from our 
    rootReducer `/reducers/index.js`. It has one key of 'weather'.  But what IS that?  What is the value of 'weather'?
    - Weather Reducer => `/reducers/reducer_weather.js` is our weather reducer which only cares right now about
    fetching our weather.  It takes two arguments, state and an action, and if the action is FETCH_WEATHER, then
    we add (without mutating) the payload of our action to our state.  But when did we call the action?  Why did the
    reducer get called?  Where did the action come from?
    - fetchWeather action => `/actions/index.js` is our fetchWeather() function which creates actions with the 
    FETCH_WEATHER type.  This is what grabs the data based on the city we enter.  This is what produced the action
    and because actions flow through ALL reducers, it's natural that our weather reducer would eventually see this 
    action.  But WHY did we call this action? What initiated it?
    - onFormSubmit in SearchBar => `/containers/SearchBar.js` contains an input field to enter the city and a submit
    button.  When a user clicks 'Submit', we are calling `this.props.fetchWeather`.  In this container, we mapped our
    fetchWeather action creator to props using `mapDispatchToProps` and then when they click submit, we simply call it
    and pass along the term that they are looking for.
    - So there it is: Our rootReducer has a key called 'weather' which means that our global state has a key called
    weather that we are accessing in our WeatherList container by using mapStateToProps.  That weather key contains
    all the data from our GET request using our Open Weather API.  When the user clicks submit, the action is issued
    and we grab our data.  That weather object, now accessible in our WeatherList container as this.props.weather, is
    mapped over in our `<tbody>`.  We decide to map over it with a function called renderList by calling 
    this.renderWeather. renderWeather has an argument, cityData, which is just all of our weather data for one city
    (because we are using the map function, the function is only getting one object at a time).  So this cityData
    object has a number of things that we want.  We want the city name and based on how the data structured, we
    can grab that by calling `cityName.city.name`. Now, we can talk about mapping some more...inside the cityData
    object is a key 'list' that has many objects (40) in an array that make up the weather stats that we need.  
    So we have to map over the list array and for each one, we want the temperature.  The following code achieves
    that: `const temps = cityData.list.map(weather => weather.main.temp)`.  As we can see, this will most likely be
    extended to humidity and pressure to easily get the other stats we'll need.
  - I'm going to finish the lecture and then discuss map a little further.
- Add Sparklines:
```sh
npm install --save react-sparklines
```
- Importing and building the Sparklines was not too difficult; if time, I will discuss later but it was not anything
too crazy.
- Mapping example:
```js
// starting array
arr = [1,2,3,4,5,6,7,8,9,10]

// create a new array using map function
newArray = arr.map(function(item){ return item > 6 } )
[false, false, false, false, false, false, true, true, true, true]
// It gives me a true/false for each item in the array as to whether it is greater than 6.  Not really what I wanted
// but instructive...map returns the same number of items as the mapped array.


// create a new array using the filter function
newArray2 = arr.filter(function(item) { return item > 6 } )
[7, 8, 9, 10]
// Notice how instead of true/false, it gives me the actual values that are greater than 6 in a new array
```

- install lodash
```sh
npm i --save lodash
```

importing CSS:
```js
import styles from './style/styles.css';
```
- finish L65, start L66 next