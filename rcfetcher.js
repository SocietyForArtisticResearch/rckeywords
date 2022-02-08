/* these can be replaced with any advanced searches */

let url = "https://www.researchcatalogue.net/portal/search-result?fulltext=&title=&autocomplete=&keyword=&portal=&statusprogress=0&statusprogress=1&statuspublished=0&statuspublished=1&includelimited=0&includelimited=1&includeprivate=0&type_research=research&resulttype=research&format=json&limit=250&page="

let makeUrl = function (number) {
    return url + number;
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

let fetchData = function (url) {
    return fetch(url).then(response => response.json());
}

let range = function (a, b) {
    let bottom = Math.min(a,b);
    let r = Math.abs(b - a);
    return ([...Array(r).keys()]).map(x => x + bottom ) ;
}


let fetchAll = function () {
    
    let jsonPromises = range(0,10).map(makeUrl).map(fetchData) ;
    Promise.all(jsonPromises).then(values => { 
    	console.log(values);
        let flat = values.flat();
        let json = JSON.stringify(flat);
        download('research.json',json);
    });
};

fetchAll();
