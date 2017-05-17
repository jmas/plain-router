export class Router {
    /**
     * @param {Object} routes - `routes` is map of route name and route pattern
     */
    constructor(routes) {
        this._routes = routes;
    }

    /**
     * Dispatch a real URI and return object that contain `routeName`, normalized `uri`
     * (without hash) and parsed `params`.
     * @param {String} uri - is a URL path. `uri` can contain a hash char at start for easy integration with `window.location.hash`.
     * @returns { uri: String, routerName: String, params: Object }
     */
    dispatch(uri) {
        const normalizedUri = (uri ? uri : '/').replace(/^#/, '');
        const routes = this._routes;
        const routesNames = Object.keys(routes);
        for (let i = 0; i < routesNames.length; i++) {
            const routeName = routesNames[i];
            const routePattern = routes[routeName];
            const normalizedRoutePattern = routePattern
                .replace('\/', '\\/')
                .replace(/\:[^\/]+/, () => '([^\/]+)');
            const routeRegEx = new RegExp('^' + normalizedRoutePattern + '(?:\/|)$');
            let matches = null;
            if (matches = normalizedUri.match(routeRegEx)) {
                const paramsHolders = routePattern.match(/\:([^\/]+)/g);
                if (paramsHolders) {
                    const params = paramsHolders.reduce((accum, paramHolder, i) => {
                        accum[paramHolder.substring(1)] = matches[i + 1];
                        return accum;
                    }, {});
                    return {
                        uri: normalizedUri,
                        routeName,
                        params
                    };
                }
                return {
                    uri: normalizedUri,
                    routeName,
                    params: null
                };
            }
        }
        return {
            uri: normalizedUri,
            routeName: null,
            params: null
        };
    }

    /**
     * Generate URI for specific route by `routeName` and substitute a params instead params placeholders.
     * @param {String} routeName - is a route name (key from `routes` object that was passed to `Router` constructor)
     * @param {Object} params - is object, key is a name of route pattern placeholder
     * @param {Boolean=} withHash - is enable hash char as prefix for result URI
     * @returns {String}
     */
    uriFor(routeName, params = {}, withHash = false) {
        const routes = this._routes;
        const routePattern = routes[routeName];
        if (!routePattern) {
            throw Error(`Route with name '${routeName}' is not found.`);
        }
        const paramsHolders = routePattern.match(/\:([^\/]+)/g);
        if (!paramsHolders) {
            return routePattern;
        }
        let uri = routePattern;
        for (let i = 0; i < paramsHolders.length; i++) {
            const holderName = paramsHolders[i].substring(1);
            if (!params[holderName]) {
                throw Error(`Require param with name '${holderName}'.`);
            }
            uri = uri.replace(paramsHolders[i], params[holderName]);
        }
        return (withHash ? '#' : '') + uri;
    }
}

/**
 * You can use this function to add `hashchange` event handler and pass result of
 * executing `router.dispatch()` to `handler`.
 * @param {Router} router - is a `Router` instance
 * @param {Function} handler - is a handler that will be called on each `hashchange` event
 * @param {Boolean=} dispatchImmediately - is flag that indicate that we should call handler after event registeration
 */
export function onHashChange(router, handler, dispatchImmediately = true) {
    if (!window) {
        throw Error('Namespace `window` is not defined. Shold be called from browser environment.');
    }
    window.addEventListener('hashchange', () => {
        handler(router.dispatch(window.location.hash));
    }, false);
    if (dispatchImmediately) {
        handler(router.dispatch(window.location.hash));
    }
}
