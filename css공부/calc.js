onmessage = function(evt) {
    for (var i = evt.data; i < 10000000; i++) {
        postMessage(i);
    }
}
