export default class Router {
    constructor (routes) {
        this._routes = routes;
    }

    dispatch (uri) {
        const normalizedUri = (uri ? uri: '/').replace(/^#/, '');
        const routes = this._routes;
        const routesNames = Object.keys(routes);
        for (let i=0; i<routesNames.length; i++) {
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

    uriFor (routeName, params={}) {
        const routes = this._routes;
        const routePattern = routes[routeName];
        if (!routePattern) {
            throw new Error(`Route with name '${routeName}' is not found.`);
        }
        const paramsHolders = routePattern.match(/\:([^\/]+)/g);
        if (!paramsHolders) {
            return routePattern;
        }
        let uri = routePattern;
        for (let i=0; i<paramsHolders.length; i++) {
            const holderName = paramsHolders[i].substring(1);
            if (!params[holderName]) {
                throw new Error(`Require param with name '${holderName}'.`);
            }
            uri = uri.replace(paramsHolders[i], params[holderName]);
        }
        return uri;
    }
}

export function onHashChange (router, handler, dispatchImmediately=true) {
    window.addEventListener('hashchange', () => {
        handler(router.dispatch(window.location.hash));
}, false);
    if (dispatchImmediately) {
        handler(router.dispatch(window.location.hash));
    }
}
