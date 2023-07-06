importScripts("elm-worker.js")

const app = Elm.Worker.init();

onmessage = function (data) {
  console.log("onmessage, data",data.data);
  app.ports.searchKeyword.send(data.data);
};

app.ports.returnResults.subscribe(function(data) {
	console.log("returning results",data);
    postMessage(data);
});