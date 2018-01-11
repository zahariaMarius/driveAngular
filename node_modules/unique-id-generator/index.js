"use strict"

let previous = 0;

module.exports = (opts) => {

    opts = Object.assign({}, {prefix:"", suffix:""}, opts);

    var id = Date.now();

    if (id <= previous) {
        id = ++previous;
    } else {
        previous = id;
    }

    if(previous === Number.MAX_SAFE_INTEGER){previous = 0};

    return opts.prefix + id + opts.suffix;
}
