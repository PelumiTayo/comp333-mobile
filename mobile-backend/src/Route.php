<?php

class Route
{
    /**
     * @var string
     */
    private $uri;
    /**
     * @var string
     */
    private $target;
    public function __construct($uri, $destination)
    {
        $this->uri = $uri;
        $this->target = $destination;
    }

    /**
     * @return string
     */
    function getUri(): string
    {
        return $this->uri;
    }

    /**
     * @return string
     */
    public function getTarget(): string
    {
        return $this->target;
    }
    /**
     * Routes inbound url request to the mapped uri -> target file
     * target destination should be written with a leading backslash('/').
     *
     * @param string $uri The uri to map to a target destination
     * @param string $target directory to a file or a callback function
     * @return Route|null
     */
    public static function add(string $uri, string $target): ?Route
    {
        $callback = $target;
        $route = new Route($uri, $target);

        # Checks the given destination string is not a callback function
        if (!is_callable($callback)) {
            # If given destination path is not a callback function but also does not specify '.php'
            # Append '.php' to the destination path
            if (!strpos($target, '.php')) {
                $target .= '.php';
            }
        }
        # Handles 404 requests
        if ($uri == '/404') {
            include_once $_SERVER["DOCUMENT_ROOT"]."/routes/"."$target";
            exit();
        }

        ####################################################################
        #
        # filter and parse request url
        #
        ####################################################################
        $request_url = filter_var($_SERVER["REQUEST_URI"], FILTER_SANITIZE_URL);

        # Remove any trailing backslashes
        $request_url = rtrim($request_url, '/');

        # tokenize request url by query string operator
        $request_url = strtok($request_url, '?');

        # deconstruct provided target uri
        $route_parts = explode('/', $uri);

        # deconstruct actual url request
        $request_url_parts = explode('/', $request_url);

        # Remove the leading backslash from the target uri
        array_shift($route_parts);

        # Remove the domain part of the url request
        array_shift($request_url_parts);

        if ($route_parts[0] == '' && count($request_url_parts) == 0) { # target uri is empty and request url points to top directory
            if (is_callable ($callback)) { # If callback, execute then return
                call_user_func_array($callback, []);
                return null;
            }
            include_once $_SERVER["DOCUMENT_ROOT"]."/routes/"."$target";  # not a callback, so route uri to target
            return $route;
        }

        # target uri and request uri length do not match
        if (count($route_parts) != count($request_url_parts)) {
            return null;
        }
        ################################################################################################################
        #
        # if an array of callback parameters is given for a callback function, parse the request url for arguments
        #
        ################################################################################################################
        $parameters = [];
        for ($__i__ = 0; $__i__ < count($route_parts); $__i__++) {
            $route_part = $route_parts[$__i__];
            if (preg_match("/^[$]/", $route_part)) {
                $route_part = ltrim($route_part, '$');
                $parameters[] = $request_url_parts[$__i__];
                $$route_part = $request_url_parts[$__i__];
            } else if ($route_parts[$__i__] != $request_url_parts[$__i__]) { # parts of the request url does not match to corresponding target uri
                return null;
            }
        }

        if (is_callable($callback)) { # callback provided instead so call
            call_user_func_array($callback, $parameters);
            return null;
        }
        include_once $_SERVER["DOCUMENT_ROOT"]."/routes/"."$target";
        return $route;
    }

    /**
     * Adds a middleware file to the route
     * middleware files should be placed in '/middleware'
     *
     * @param array|string|null $middleware file name for middleware - should be written without '.php' extension
     * @return void
     */
    public function middleware($middleware = null) {
        $this->route();
    }
}
