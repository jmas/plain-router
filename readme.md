# Plain Router

Yet another router implementation that very basic.

## How to use

```js
import Router, { onHashChange } from 'plain-router';

const router = new Router({
    home: '/',
    authSignIn: '/auth/signIn',
    authSignOut: '/auth/signOut',
    userView: '/user/:userId'
});
onHashChange(router, result => {
    console.log(result);
});
```


When you generate a link:
```js
document.getElementById('link1').href = router.uriFor('userView', { userId: 1 }, true);
document.getElementById('link2').href = router.uriFor('authSignOut', {}, true);
```

## Methods of `Router` class
 
### `onstructor(routes)`

* `routes` is map of route name and route pattern:
```js
{
    [ROUTE_NAME]: [URI_PATTERN]
}
```
Routes examples:
```js
const routes = {
   home: '/',
   authSignIn: '/auth/signIn',
   authSignOut: '/auth/signOut',
   userView: '/user/:userId'
};
```

### `dispatch(uri)`

Dispatch a real URI and return object that contain `routeName`, normalized `uri`
(without hash) and parsed `params`.

* `uri` is a URL path. `uri` can contain a hash char at start for easy integration
with `window.location.hash`.

```js
const uri0 = '/';
const uri1 = '/auth/signIn';
const uri2 = '/user/1';
const uri3 = '#/user/1';
```

### `uriFor(routeName, params={}, withHash=false)`

Generate URI for specific route by `routeName` and substitute a params instead route pattern placeholders.

* `routeName` is a route name (key from `routes` object that was passed to `Router` constructor)
* `params` is object, key is a name of route pattern placeholder
* `withHash` is enable hash char as prefix for result URI

```
const uri0 = router.uriFor('home');
const uri1 = router.uriFor('authSignIn');

// route pattern: /user/:userId
// placeholder :userId
const uri2 = router.uriFor('userView', { userId: 1 });
```

## `onHashChange(router, handler, dispatchImmediately=true)` helper

You can use this function to add `hashchange` event handler and pass result of
executing `router.dispatch()` to `handler`.
