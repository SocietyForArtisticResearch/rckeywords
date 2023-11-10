importScripts("elm-worker.js")

const app = Elm.Worker.init();

onmessage = function (data) {
  app.ports.searchQuery.send(data.data);
};

app.ports.returnResults.subscribe(function (data) {
  postMessage(data);
});

app.ports.debug.subscribe(function (data) {
  console.log("error in worker:\n", data);
});