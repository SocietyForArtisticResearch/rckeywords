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

this will also copy the latest RC export JSON.
Note that a build will work for 24 hours, because of the timeout on image links.

# Changing

The main code can be found in src/Main.elm. The important functions for how it looks are:

__Structure:__

```elm 
entry : Decoder Research
```

this is the translator, it takes the data from the RC and turns it into:

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