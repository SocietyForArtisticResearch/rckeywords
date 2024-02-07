# RC keywords test

This is something to test alternative layouts of RC content.

# TODO

* [ ] Add zoom to detail page
* [ ] Cache problem on detail page
* [ ] Add number of tools on detail page
* [ ] I want to add a bigger amount of results
* [ ] Link back to the tool
      - Add a thumbnail?

## BETAMAP todos

* [ ] make portal a fixed parameter
* [ ] see of issues can be filtered on

# Requirements

* [http-server](https://www.npmjs.com/package/http-server)
(you will need to install npm first)
* [elm](https://guide.elm-lang.org/install/elm.html)

# Building

In a terminal, run 

```bash
sh build.sh
```

This will also copy the latest RC export JSON (internal_research.json). Note that a build will work for 24 hours, because of the timeout on image links. On the deployed version this json file is updated automatically.

You can also do:
```bash 
sh build-elm.sh
```

This will only build elm and not copy the data.


For the fastest performance, there is an optimized build:
```bash
sh build-opt.sh
```

This will make a more compact .js file and apply elm-optimize-level-2 for better perfomance.


# Changing

The main code can be found in src/Main.elm. The important functions for how it looks are:

__Structure:__

Research.elm 

contains all the RC stuff, keyword types, exposition type decoders encoders.

The main type in this application is "research", which contains all the metadata of one exposition, as returned from advanced search.


```elm 
type alias Research
```

this is the shape of the data as it exists in the program 

Note they are not exactly the same thing, so it may be that if some field is missing in the Research type, it can be added by adjusting both the Research type and the Decoder.

__Views:__

```elm 

type View
    = KeywordsView KeywordsViewState
    | SearchView SearchViewState
```

Since we want to support deep-linking, the state of the view should always be reflected in the app url (and the other way around).



# Todo

- Keyword set and keyword abstract can be precalculated by the server now. Properly decode the enriched exposition list and remove all the local stuff. =]

- browse just allows you to see the whole RC, but it is not about searching, it is about choosing a certain layout for all research (by keyword, by date, by portal etc..)
- implement a search interface with the following fields:
    * table view
    * *geographic location* ?
- Add a decoder for User objects from the rc:
[Example json from RC:](https://www.researchcatalogue.net/portal/search-result?fulltext=&name=&keywords=&country=&type_user=user&resulttype=user&modifiedafter=&modifiedbefore=&format=json&limit=25&page=0)


# Changes to RC Front

In an earlier version of this, I tried some adjustments to the front page, which could be useful to actually apply to the real RC:

```CSS
#container-main {
    width: 90%;
}

#elm {
    width : 100%;
}
```

