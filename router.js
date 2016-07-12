function route(pathname, handler, response, postData)
{
    console.log("Route " + pathname);

    pathname = pathname.replace(/\/$/,'');

    if (typeof handler[pathname] === "function"){
        return handler[pathname](response, postData);
    }
    else {
        console.log("Route " + pathname + " not found");
        return "404 not found.";
    }

}

exports.route = route;