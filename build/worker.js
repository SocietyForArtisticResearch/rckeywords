importScripts("elm-worker.js")

const app = Elm.Worker.init();

onmessage = function (query) {
  app.ports.increment.send(query);
};

app.ports.returnResults.subscribe(function(data) {
	console.log("returning results")
    postMessage(data);
});