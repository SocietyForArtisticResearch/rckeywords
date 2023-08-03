# RC keywords test

This is something to test alternative layouts of RC content.

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

For an optimized build, you run
```bash
sh build-opt.sh
```

This will make a more compact .js file and apply elm-optimize-level-2 for better perfomance.


# Changing

The main code can be found in src/Main.elm. The important functions for how it looks are:

__Structure:__

src/Research.elm 

contains all the RC stuff, keyword types, exposition type decoders encoders.

The main type in this application is "research", which contains all the metadata of one exposition, as returned from advanced search.


```elm 
type alias Research
```

this is the shape of the data as it exists in the program 

Note they are not exactly the same thing, so it may be that if some field is missing in the Research type, it can be added by adjusting both the Research type and the Decoder.

__Views:__

The main view of all expositions, dividing it into columns
```elm 
viewList : Model -> Html Msg
```

The display of a single research item, the thumbnail, title and abstract:
```elm 
viewResearch : Research -> Element Msg
```


# Changes to RC Front

```CSS
#container-main {
    width: 90%;
}

#elm {
    width : 100%;
}
```

# Todo

- Bug with search results
- WHy does back and forward not work?

- browse just allows you to see the whole RC, but it is not about searching, it is about choosing a certain layout for all research (by keyword, by date, by portal etc..)
- implement a search interface with the following fields:
    * title, string
    * keywords, autocomplete interface 
        make it clever so that if you select one keyword, it only shows other keywords that will result in results
    * author, name
    * list view
    * portal 
    * *geographic location* ?
- Add a decoder for User objects from the rc:
[Example json from RC:](https://www.researchcatalogue.net/portal/search-result?fulltext=&name=&keywords=&country=&type_user=user&resulttype=user&modifiedafter=&modifiedbefore=&format=json&limit=25&page=0)
- fix alignments etc..



