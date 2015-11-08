var ajax = function(url, method, data){
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(method, url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.onload = function () {
            // This is called even on 404 etc
            // so check the status
            if (request.status === 200) {
                // Resolve the promise with the response text
                resolve(request.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(request.response);
            }
        };
        // Handle network errors
        request.onerror = function () {
            reject(request.response);
        };
        data ? request.send(data) : request.send();
    });
};

exports.get = function (url, data) {
    return ajax(url, 'GET', data);
};

exports.post = function (url, data) {
    return ajax(url, 'POST', data);
};

exports.put = function (url, data) {
    return ajax(url, 'PUT', data)
};

exports.del = function (url, data) {
    return ajax(url, 'DELETE', data);
}
