(function (scope) {
    "use strict";
    function F(arity, fun, wrapper) {
        wrapper.a = arity;
        wrapper.f = fun;
        return wrapper;
    }
    function F2(fun) {
        var curried = function (a) {
            return function (b) {
                return fun(a, b);
            };
        };
        curried.a2 = fun;
        return curried;
    }
    function F3(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return fun(a, b, c);
                };
            };
        };
        curried.a3 =
            fun;
        return curried;
    }
    function F4(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return fun(a, b, c, d);
                    };
                };
            };
        };
        curried.a4 = fun;
        return curried;
    }
    function F5(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return fun(a, b, c, d, e);
                        };
                    };
                };
            };
        };
        curried.a5 = fun;
        return curried;
    }
    function F6(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return fun(a, b, c, d, e, f);
                            };
                        };
                    };
                };
            };
        };
        curried.a6 = fun;
        return curried;
    }
    function F7(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) { return fun(a, b, c, d, e, f, g); };
                            };
                        };
                    };
                };
            };
        };
        curried.
            a7 = fun;
        return curried;
    }
    function F8(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return fun(a, b, c, d, e, f, g, h);
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        curried.a8 = fun;
        return curried;
    }
    function F9(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return function (i) {
                                            return fun(a, b, c, d, e, f, g, h, i);
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        curried
            .a9 = fun;
        return curried;
    }
    function A2(fun, a, b) {
        return fun.a2 ? fun.a2(a, b) : fun(a)(b);
    }
    function A3(fun, a, b, c) {
        return fun.a3 ? fun.a3(a, b, c) : fun(a)(b)(c);
    }
    function A4(fun, a, b, c, d) {
        return fun.a4 ? fun.a4(a, b, c, d) : fun(a)(b)(c)(d);
    }
    function A5(fun, a, b, c, d, e) {
        return fun.a5 ? fun.a5(a, b, c, d, e)
            : fun(a)(b)(c)(d)(e);
    }
    function A6(fun, a, b, c, d, e, f) {
        return fun.a6 ? fun.a6(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
    }
    function A7(fun, a, b, c, d, e, f, g) {
        return fun.a7 ? fun.a7(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
    }
    function A8(fun, a, b, c, d, e, f, g, h) {
        return fun.a8 ? fun.a8(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
    }
    function A9(fun, a, b, c, d, e, f, g, h, i) {
        return fun.a9 ? fun.a9(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
    }
    var _JsArray_empty = [];
    function _JsArray_singleton(value) {
        return [value];
    }
    function _JsArray_length(array) {
        return array.length;
    }
    var _JsArray_initialize_fn = function (size, offset, func) {
        var result = new Array(size);
        for (var i = 0; i < size; i++) {
            result[i] = func(offset + i);
        }
        return result;
    }, _JsArray_initialize = F3(_JsArray_initialize_fn);
    var _JsArray_initializeFromList_fn = function (max, ls) {
        var result = new Array(max);
        for (var i = 0; i < max && ls.b; i++) {
            result[i] = ls.a;
            ls = ls.b;
        }
        result.length = i;
        return _Utils_Tuple2(result, ls);
    }, _JsArray_initializeFromList = F2(_JsArray_initializeFromList_fn);
    var _JsArray_unsafeGet_fn = function (index, array) {
        return array[index];
    }, _JsArray_unsafeGet = F2(_JsArray_unsafeGet_fn);
    var _JsArray_unsafeSet_fn = function (index, value, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = array[i];
        }
        result[index] = value;
        return result;
    }, _JsArray_unsafeSet = F3(_JsArray_unsafeSet_fn);
    var _JsArray_push_fn = function (value, array) {
        var length = array.length;
        var result = new Array(length + 1);
        for (var i = 0; i < length; i++) {
            result[i] = array[i];
        }
        result[length] = value;
        return result;
    }, _JsArray_push = F2(_JsArray_push_fn);
    var _JsArray_foldl_fn = function (func, acc, array) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            acc = A2(func, array[i], acc);
        }
        return acc;
    }, _JsArray_foldl_fn_unwrapped = function (func, acc, array) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            acc = func(array[i], acc);
        }
        return acc;
    }, _JsArray_foldl = F3(_JsArray_foldl_fn);
    var _JsArray_foldr_fn = function (func, acc, array) {
        for (var i = array.length - 1; i >= 0; i--) {
            acc = A2(func, array[i], acc);
        }
        return acc;
    }, _JsArray_foldr_fn_unwrapped = function (func, acc, array) {
        for (var i = array.length - 1; i >= 0; i--) {
            acc = func(array[i], acc);
        }
        return acc;
    }, _JsArray_foldr = F3(_JsArray_foldr_fn);
    var _JsArray_map_fn = function (func, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = func(array[i]);
        }
        return result;
    }, _JsArray_map = F2(_JsArray_map_fn);
    var _JsArray_indexedMap_fn = function (func, offset, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = A2(func, offset + i, array[i]);
        }
        return result;
    }, _JsArray_indexedMap_fn_unwrapped = function (func, offset, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = func(offset + i, array[i]);
        }
        return result;
    }, _JsArray_indexedMap = F3(_JsArray_indexedMap_fn);
    var _JsArray_slice_fn = function (from, to, array) {
        return array.slice(from, to);
    }, _JsArray_slice = F3(_JsArray_slice_fn);
    var _JsArray_appendN_fn = function (n, dest, source) {
        var destLen = dest.length;
        var itemsToCopy = n - destLen;
        if (itemsToCopy > source.length) {
            itemsToCopy = source.length;
        }
        var size = destLen + itemsToCopy;
        var result = new Array(size);
        for (var i = 0; i < destLen; i++) {
            result[i] = dest[i];
        }
        for (var i = 0; i < itemsToCopy; i++) {
            result[i + destLen] = source[i];
        }
        return result;
    }, _JsArray_appendN = F3(_JsArray_appendN_fn);
    var _Debug_log_fn = function (tag, value) {
        return value;
    }, _Debug_log = F2(_Debug_log_fn);
    var _Debug_log_UNUSED_fn = function (tag, value) {
        console.log(tag + ": " + _Debug_toString(value));
        return value;
    }, _Debug_log_UNUSED = F2(_Debug_log_UNUSED_fn);
    function _Debug_todo(moduleName, region) {
        return function (message) {
            _Debug_crash(8, moduleName, region, message);
        };
    }
    function _Debug_todoCase(moduleName, region, value) {
        return function (message) {
            _Debug_crash(9, moduleName, region, value, message);
        };
    }
    function _Debug_toString(value) {
        return "<internals>";
    }
    function _Debug_toString_UNUSED(value) {
        return _Debug_toAnsiString(false, value);
    }
    function _Debug_toAnsiString(ansi, value) {
        if (typeof value === "function") {
            return _Debug_internalColor(ansi, "<function>");
        }
        if (typeof value === "boolean") {
            return _Debug_ctorColor(ansi, value ? "True" : "False");
        }
        if (typeof value === "number") {
            return _Debug_numberColor(ansi, value + "");
        }
        if (value instanceof String) {
            return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
        }
        if (typeof value === "string") {
            return _Debug_stringColor(ansi, "\"" + _Debug_addSlashes(value, false) + "\"");
        }
        if (typeof value === "object" && "$" in value) {
            var tag = value.$;
            if (typeof tag === "number") {
                return _Debug_internalColor(ansi, "<internals>");
            }
            if (tag[0] === "#") {
                var output = [];
                for (var k in value) {
                    if (k === "$")
                        continue;
                    output.push(_Debug_toAnsiString(ansi, value[k]));
                }
                return "(" + output.join(",") + ")";
            }
            if (tag === "Set_elm_builtin") {
                return _Debug_ctorColor(ansi, "Set")
                    + _Debug_fadeColor(ansi, ".fromList") + " "
                    + _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
            }
            if (tag === "RBNode_elm_builtin" || tag === "RBEmpty_elm_builtin") {
                return _Debug_ctorColor(ansi, "Dict")
                    + _Debug_fadeColor(ansi, ".fromList") + " "
                    + _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
            }
            if (tag === "Array_elm_builtin") {
                return _Debug_ctorColor(ansi, "Array")
                    + _Debug_fadeColor(ansi, ".fromList") + " "
                    + _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
            }
            if (tag === "::" || tag === "[]") {
                var output = "[";
                value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b);
                for (; value.b; value = value.b) {
                    output += "," + _Debug_toAnsiString(ansi, value.a);
                }
                return output + "]";
            }
            var output = "";
            for (var i in value) {
                if (i === "$")
                    continue;
                var str = _Debug_toAnsiString(ansi, value[i]);
                var c0 = str[0];
                var parenless = c0 === "{" || c0 === "(" || c0 === "[" || c0 === "<" || c0 === "\"" || str.indexOf(" ") < 0;
                output += " " + (parenless ? str : "(" + str + ")");
            }
            return _Debug_ctorColor(ansi, tag) + output;
        }
        if (typeof DataView === "function" && value instanceof DataView) {
            return _Debug_stringColor(ansi, "<" + value.byteLength + " bytes>");
        }
        if (typeof File !== "undefined" && value instanceof File) {
            return _Debug_internalColor(ansi, "<" + value.name + ">");
        }
        if (typeof value === "object") {
            var output = [];
            for (var key in value) {
                var field = key[0] === "_" ? key.slice(1) : key;
                output.push(_Debug_fadeColor(ansi, field) + " = " + _Debug_toAnsiString(ansi, value[key]));
            }
            if (output.length === 0) {
                return "{}";
            }
            return "{ " + output.join(", ") + " }";
        }
        return _Debug_internalColor(ansi, "<internals>");
    }
    function _Debug_addSlashes(str, isChar) {
        var s = str
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/\t/g, "\\t")
            .replace(/\r/g, "\\r")
            .replace(/\v/g, "\\v")
            .replace(/\0/g, "\\0");
        if (isChar) {
            return s.replace(/\'/g, "\\'");
        }
        else {
            return s.replace(/\"/g, "\\\"");
        }
    }
    function _Debug_ctorColor(ansi, string) {
        return ansi ? "\u001B[96m" + string + "\u001B[0m" : string;
    }
    function _Debug_numberColor(ansi, string) {
        return ansi ? "\u001B[95m" + string + "\u001B[0m" : string;
    }
    function _Debug_stringColor(ansi, string) {
        return ansi ? "\u001B[93m" + string + "\u001B[0m" : string;
    }
    function _Debug_charColor(ansi, string) {
        return ansi ? "\u001B[92m" + string + "\u001B[0m" : string;
    }
    function _Debug_fadeColor(ansi, string) {
        return ansi ? "\u001B[37m" + string + "\u001B[0m" : string;
    }
    function _Debug_internalColor(ansi, string) {
        return ansi ? "\u001B[36m" + string + "\u001B[0m" : string;
    }
    function _Debug_toHexDigit(n) {
        return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
    }
    function _Debug_crash(identifier) {
        throw new Error("https://github.com/elm/core/blob/1.0.0/hints/" + identifier + ".md");
    }
    function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4) {
        switch (identifier) {
            case 0:
                throw new Error("What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById(\"elm-node\")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.");
            case 1:
                throw new Error("Browser.application programs cannot handle URLs like this:\n\n    " + document.location.href + "\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.");
            case 2:
                var jsonErrorString = fact1;
                throw new Error("Problem with the flags given to your Elm program on initialization.\n\n" + jsonErrorString);
            case 3:
                var portName = fact1;
                throw new Error("There can only be one port named `" + portName + "`, but your program has multiple.");
            case 4:
                var portName = fact1;
                var problem = fact2;
                throw new Error("Trying to send an unexpected type of value through port `" + portName + "`:\n" + problem);
            case 5:
                throw new Error("Trying to use `(==)` on functions.\nThere is no way to know if functions are \"the same\" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.");
            case 6:
                var moduleName = fact1;
                throw new Error("Your page is loading multiple Elm scripts with a module named " + moduleName + ". Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!");
            case 8:
                var moduleName = fact1;
                var region = fact2;
                var message = fact3;
                throw new Error("TODO in module `" + moduleName + "` " + _Debug_regionToString(region) + "\n\n" + message);
            case 9:
                var moduleName = fact1;
                var region = fact2;
                var value = fact3;
                var message = fact4;
                throw new Error("TODO in module `" + moduleName + "` from the `case` expression "
                    + _Debug_regionToString(region) + "\n\nIt received the following value:\n\n    "
                    + _Debug_toString(value).replace("\n", "\n    ")
                    + "\n\nBut the branch that handles it says:\n\n    " + message.replace("\n", "\n    "));
            case 10:
                throw new Error("Bug in https://github.com/elm/virtual-dom/issues");
            case 11:
                throw new Error("Cannot perform mod 0. Division by zero error.");
        }
    }
    function _Debug_regionToString(region) {
        if (region.a3.ao === region.bl.ao) {
            return "on line " + region.a3.ao;
        }
        return "on lines " + region.a3.ao + " through " + region.bl.ao;
    }
    function _Utils_eq(x, y) {
        for (var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack); isEqual && (pair = stack.pop()); isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)) { }
        return isEqual;
    }
    function _Utils_eqHelp(x, y, depth, stack) {
        if (x === y) {
            return true;
        }
        if (typeof x !== "object" || x === null || y === null) {
            typeof x === "function" && _Debug_crash(5);
            return false;
        }
        if (depth > 100) {
            stack.push(_Utils_Tuple2(x, y));
            return true;
        }
        if (x.$ < 0) {
            x = $elm$core$Dict$toList(x);
            y = $elm$core$Dict$toList(y);
        }
        for (var key in x) {
            if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack)) {
                return false;
            }
        }
        return true;
    }
    var _Utils_equal = F2(_Utils_eq);
    var _Utils_notEqual_fn = function (a, b) { return !_Utils_eq(a, b); }, _Utils_notEqual = F2(_Utils_notEqual_fn);
    function _Utils_cmp(x, y, ord) {
        if (typeof x !== "object") {
            return x === y ? 0 : x < y ? -1 : 1;
        }
        if (typeof x.$ === "undefined") {
            return (ord = _Utils_cmp(x.a, y.a))
                ? ord
                : (ord = _Utils_cmp(x.b, y.b))
                    ? ord
                    : _Utils_cmp(x.c, y.c);
        }
        for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) { }
        return ord || (x.b ? 1 : y.b ? -1 : 0);
    }
    var _Utils_lt_fn = function (a, b) { return _Utils_cmp(a, b) < 0; }, _Utils_lt = F2(_Utils_lt_fn);
    var _Utils_le_fn = function (a, b) { return _Utils_cmp(a, b) < 1; }, _Utils_le = F2(_Utils_le_fn);
    var _Utils_gt_fn = function (a, b) { return _Utils_cmp(a, b) > 0; }, _Utils_gt = F2(_Utils_gt_fn);
    var _Utils_ge_fn = function (a, b) { return _Utils_cmp(a, b) >= 0; }, _Utils_ge = F2(_Utils_ge_fn);
    var _Utils_compare_fn = function (x, y) {
        var n = _Utils_cmp(x, y);
        return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
    }, _Utils_compare = F2(_Utils_compare_fn);
    var _Utils_Tuple0 = 0;
    var _Utils_Tuple0_UNUSED = { $: "#0" };
    function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
    function _Utils_Tuple2_UNUSED(a, b) { return { $: "#2", a: a, b: b }; }
    function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
    function _Utils_Tuple3_UNUSED(a, b, c) { return { $: "#3", a: a, b: b, c: c }; }
    function _Utils_chr(c) { return c; }
    function _Utils_chr_UNUSED(c) { return new String(c); }
    function _Utils_update(oldRecord, updatedFields) {
        var newRecord = {};
        for (var key in oldRecord) {
            newRecord[key] = oldRecord[key];
        }
        for (var key in updatedFields) {
            newRecord[key] = updatedFields[key];
        }
        return newRecord;
    }
    var _Utils_append = F2(_Utils_ap);
    function _Utils_ap(xs, ys) {
        if (typeof xs === "string") {
            return xs + ys;
        }
        if (!xs.b) {
            return ys;
        }
        var root = _List_Cons(xs.a, ys);
        xs = xs.b;
        for (var curr = root; xs.b; xs = xs.b) {
            curr = curr.b = _List_Cons(xs.a, ys);
        }
        return root;
    }
    var _List_Nil = { $: 0, a: null, b: null };
    var _List_Nil_UNUSED = { $: "[]" };
    function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
    function _List_Cons_UNUSED(hd, tl) { return { $: "::", a: hd, b: tl }; }
    var _List_cons = F2(_List_Cons);
    function _List_fromArray(arr) {
        var out = _List_Nil;
        for (var i = arr.length; i--;) {
            out = _List_Cons(arr[i], out);
        }
        return out;
    }
    function _List_toArray(xs) {
        for (var out = []; xs.b; xs = xs.b) {
            out.push(xs.a);
        }
        return out;
    }
    var _List_map2_fn = function (f, xs, ys) {
        for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) {
            arr.push(A2(f, xs.a, ys.a));
        }
        return _List_fromArray(arr);
    }, _List_map2_fn_unwrapped = function (f, xs, ys) {
        for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) {
            arr.push(f(xs.a, ys.a));
        }
        return _List_fromArray(arr);
    }, _List_map2 = F3(_List_map2_fn);
    var _List_map3_fn = function (f, xs, ys, zs) {
        for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(A3(f, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map3_fn_unwrapped = function (f, xs, ys, zs) {
        for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(f(xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map3 = F4(_List_map3_fn);
    var _List_map4_fn = function (f, ws, xs, ys, zs) {
        for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map4_fn_unwrapped = function (f, ws, xs, ys, zs) {
        for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(f(ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map4 = F5(_List_map4_fn);
    var _List_map5_fn = function (f, vs, ws, xs, ys, zs) {
        for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map5_fn_unwrapped = function (f, vs, ws, xs, ys, zs) {
        for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) {
            arr.push(f(vs.a, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map5 = F6(_List_map5_fn);
    var _List_sortBy_fn = function (f, xs) {
        return _List_fromArray(_List_toArray(xs).sort(function (a, b) {
            return _Utils_cmp(f(a), f(b));
        }));
    }, _List_sortBy = F2(_List_sortBy_fn);
    var _List_sortWith_fn = function (f, xs) {
        return _List_fromArray(_List_toArray(xs).sort(function (a, b) {
            var ord = A2(f, a, b);
            return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
        }));
    }, _List_sortWith_fn_unwrapped = function (f, xs) {
        return _List_fromArray(_List_toArray(xs).sort(function (a, b) {
            var ord = f(a, b);
            return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
        }));
    }, _List_sortWith = F2(_List_sortWith_fn);
    var _Basics_add_fn = function (a, b) { return a + b; }, _Basics_add = F2(_Basics_add_fn);
    var _Basics_sub_fn = function (a, b) { return a - b; }, _Basics_sub = F2(_Basics_sub_fn);
    var _Basics_mul_fn = function (a, b) { return a * b; }, _Basics_mul = F2(_Basics_mul_fn);
    var _Basics_fdiv_fn = function (a, b) { return a / b; }, _Basics_fdiv = F2(_Basics_fdiv_fn);
    var _Basics_idiv_fn = function (a, b) { return (a / b) | 0; }, _Basics_idiv = F2(_Basics_idiv_fn);
    var _Basics_pow_fn = Math.pow, _Basics_pow = F2(_Basics_pow_fn);
    var _Basics_remainderBy_fn = function (b, a) { return a % b; }, _Basics_remainderBy = F2(_Basics_remainderBy_fn);
    var _Basics_modBy_fn = function (modulus, x) {
        var answer = x % modulus;
        return modulus === 0
            ? _Debug_crash(11)
            :
                ((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
                    ? answer + modulus
                    : answer;
    }, _Basics_modBy = F2(_Basics_modBy_fn);
    var _Basics_pi = Math.PI;
    var _Basics_e = Math.E;
    var _Basics_cos = Math.cos;
    var _Basics_sin = Math.sin;
    var _Basics_tan = Math.tan;
    var _Basics_acos = Math.acos;
    var _Basics_asin = Math.asin;
    var _Basics_atan = Math.atan;
    var _Basics_atan2_fn = Math.atan2, _Basics_atan2 = F2(_Basics_atan2_fn);
    function _Basics_toFloat(x) { return x; }
    function _Basics_truncate(n) { return n | 0; }
    function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }
    var _Basics_ceiling = Math.ceil;
    var _Basics_floor = Math.floor;
    var _Basics_round = Math.round;
    var _Basics_sqrt = Math.sqrt;
    var _Basics_log = Math.log;
    var _Basics_isNaN = isNaN;
    function _Basics_not(bool) { return !bool; }
    var _Basics_and_fn = function (a, b) { return a && b; }, _Basics_and = F2(_Basics_and_fn);
    var _Basics_or_fn = function (a, b) { return a || b; }, _Basics_or = F2(_Basics_or_fn);
    var _Basics_xor_fn = function (a, b) { return a !== b; }, _Basics_xor = F2(_Basics_xor_fn);
    var _String_cons_fn = function (chr, str) {
        return chr + str;
    }, _String_cons = F2(_String_cons_fn);
    function _String_uncons(string) {
        var word = string.charCodeAt(0);
        return !isNaN(word)
            ? $elm$core$Maybe$Just(55296 <= word && word <= 56319
                ? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
                : _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1)))
            : $elm$core$Maybe$Nothing;
    }
    var _String_append_fn = function (a, b) {
        return a + b;
    }, _String_append = F2(_String_append_fn);
    function _String_length(str) {
        return str.length;
    }
    var _String_map_fn = function (func, string) {
        var len = string.length;
        var array = new Array(len);
        var i = 0;
        while (i < len) {
            var word = string.charCodeAt(i);
            if (55296 <= word && word <= 56319) {
                array[i] = func(_Utils_chr(string[i] + string[i + 1]));
                i += 2;
                continue;
            }
            array[i] = func(_Utils_chr(string[i]));
            i++;
        }
        return array.join("");
    }, _String_map = F2(_String_map_fn);
    var _String_filter_fn = function (isGood, str) {
        var arr = [];
        var len = str.length;
        var i = 0;
        while (i < len) {
            var char = str[i];
            var word = str.charCodeAt(i);
            i++;
            if (55296 <= word && word <= 56319) {
                char += str[i];
                i++;
            }
            if (isGood(_Utils_chr(char))) {
                arr.push(char);
            }
        }
        return arr.join("");
    }, _String_filter = F2(_String_filter_fn);
    function _String_reverse(str) {
        var len = str.length;
        var arr = new Array(len);
        var i = 0;
        while (i < len) {
            var word = str.charCodeAt(i);
            if (55296 <= word && word <= 56319) {
                arr[len - i] = str[i + 1];
                i++;
                arr[len - i] = str[i - 1];
                i++;
            }
            else {
                arr[len - i] = str[i];
                i++;
            }
        }
        return arr.join("");
    }
    var _String_foldl_fn = function (func, state, string) {
        var len = string.length;
        var i = 0;
        while (i < len) {
            var char = string[i];
            var word = string.charCodeAt(i);
            i++;
            if (55296 <= word && word <= 56319) {
                char += string[i];
                i++;
            }
            state = A2(func, _Utils_chr(char), state);
        }
        return state;
    }, _String_foldl_fn_unwrapped = function (func, state, string) {
        var len = string.length;
        var i = 0;
        while (i < len) {
            var char = string[i];
            var word = string.charCodeAt(i);
            i++;
            if (55296 <= word && word <= 56319) {
                char += string[i];
                i++;
            }
            state = func(_Utils_chr(char), state);
        }
        return state;
    }, _String_foldl = F3(_String_foldl_fn);
    var _String_foldr_fn = function (func, state, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            state = A2(func, _Utils_chr(char), state);
        }
        return state;
    }, _String_foldr_fn_unwrapped = function (func, state, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            state = func(_Utils_chr(char), state);
        }
        return state;
    }, _String_foldr = F3(_String_foldr_fn);
    var _String_split_fn = function (sep, str) {
        return str.split(sep);
    }, _String_split = F2(_String_split_fn);
    var _String_join_fn = function (sep, strs) {
        return strs.join(sep);
    }, _String_join = F2(_String_join_fn);
    var _String_slice_fn = function (start, end, str) {
        return str.slice(start, end);
    }, _String_slice = F3(_String_slice_fn);
    function _String_trim(str) {
        return str.trim();
    }
    function _String_trimLeft(str) {
        return str.replace(/^\s+/, "");
    }
    function _String_trimRight(str) {
        return str.replace(/\s+$/, "");
    }
    function _String_words(str) {
        return _List_fromArray(str.trim().split(/\s+/g));
    }
    function _String_lines(str) {
        return _List_fromArray(str.split(/\r\n|\r|\n/g));
    }
    function _String_toUpper(str) {
        return str.toUpperCase();
    }
    function _String_toLower(str) {
        return str.toLowerCase();
    }
    var _String_any_fn = function (isGood, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            if (isGood(_Utils_chr(char))) {
                return true;
            }
        }
        return false;
    }, _String_any = F2(_String_any_fn);
    var _String_all_fn = function (isGood, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            if (!isGood(_Utils_chr(char))) {
                return false;
            }
        }
        return true;
    }, _String_all = F2(_String_all_fn);
    var _String_contains_fn = function (sub, str) {
        return str.indexOf(sub) > -1;
    }, _String_contains = F2(_String_contains_fn);
    var _String_startsWith_fn = function (sub, str) {
        return str.indexOf(sub) === 0;
    }, _String_startsWith = F2(_String_startsWith_fn);
    var _String_endsWith_fn = function (sub, str) {
        return str.length >= sub.length &&
            str.lastIndexOf(sub) === str.length - sub.length;
    }, _String_endsWith = F2(_String_endsWith_fn);
    var _String_indexes_fn = function (sub, str) {
        var subLen = sub.length;
        if (subLen < 1) {
            return _List_Nil;
        }
        var i = 0;
        var is = [];
        while ((i = str.indexOf(sub, i)) > -1) {
            is.push(i);
            i = i + subLen;
        }
        return _List_fromArray(is);
    }, _String_indexes = F2(_String_indexes_fn);
    function _String_fromNumber(number) {
        return number + "";
    }
    function _String_toInt(str) {
        var total = 0;
        var code0 = str.charCodeAt(0);
        var start = code0 == 43 || code0 == 45 ? 1 : 0;
        for (var i = start; i < str.length; ++i) {
            var code = str.charCodeAt(i);
            if (code < 48 || 57 < code) {
                return $elm$core$Maybe$Nothing;
            }
            total = 10 * total + code - 48;
        }
        return i == start
            ? $elm$core$Maybe$Nothing
            : $elm$core$Maybe$Just(code0 == 45 ? -total : total);
    }
    function _String_toFloat(s) {
        if (s.length === 0 || /[\sxbo]/.test(s)) {
            return $elm$core$Maybe$Nothing;
        }
        var n = +s;
        return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
    }
    function _String_fromList(chars) {
        return _List_toArray(chars).join("");
    }
    function _Char_toCode(char) {
        var code = char.charCodeAt(0);
        if (55296 <= code && code <= 56319) {
            return (code - 55296) * 1024 + char.charCodeAt(1) - 56320 + 65536;
        }
        return code;
    }
    function _Char_fromCode(code) {
        return _Utils_chr((code < 0 || 1114111 < code)
            ? "\uFFFD"
            :
                (code <= 65535)
                    ? String.fromCharCode(code)
                    :
                        (code -= 65536,
                            String.fromCharCode(Math.floor(code / 1024) + 55296, code % 1024 + 56320)));
    }
    function _Char_toUpper(char) {
        return _Utils_chr(char.toUpperCase());
    }
    function _Char_toLower(char) {
        return _Utils_chr(char.toLowerCase());
    }
    function _Char_toLocaleUpper(char) {
        return _Utils_chr(char.toLocaleUpperCase());
    }
    function _Char_toLocaleLower(char) {
        return _Utils_chr(char.toLocaleLowerCase());
    }
    function _Json_succeed(msg) {
        return {
            $: 0,
            a: msg
        };
    }
    function _Json_fail(msg) {
        return {
            $: 1,
            a: msg
        };
    }
    function _Json_decodePrim(decoder) {
        return { $: 2, b: decoder };
    }
    var _Json_decodeInt = _Json_decodePrim(function (value) {
        return (typeof value !== "number")
            ? _Json_expecting("an INT", value)
            :
                (-2147483647 < value && value < 2147483647 && (value | 0) === value)
                    ? $elm$core$Result$Ok(value)
                    :
                        (isFinite(value) && !(value % 1))
                            ? $elm$core$Result$Ok(value)
                            : _Json_expecting("an INT", value);
    });
    var _Json_decodeBool = _Json_decodePrim(function (value) {
        return (typeof value === "boolean")
            ? $elm$core$Result$Ok(value)
            : _Json_expecting("a BOOL", value);
    });
    var _Json_decodeFloat = _Json_decodePrim(function (value) {
        return (typeof value === "number")
            ? $elm$core$Result$Ok(value)
            : _Json_expecting("a FLOAT", value);
    });
    var _Json_decodeValue = _Json_decodePrim(function (value) {
        return $elm$core$Result$Ok(_Json_wrap(value));
    });
    var _Json_decodeString = _Json_decodePrim(function (value) {
        return (typeof value === "string")
            ? $elm$core$Result$Ok(value)
            : (value instanceof String)
                ? $elm$core$Result$Ok(value + "")
                : _Json_expecting("a STRING", value);
    });
    function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
    function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }
    function _Json_decodeNull(value) { return { $: 5, c: value }; }
    var _Json_decodeField_fn = function (field, decoder) {
        return {
            $: 6,
            d: field,
            b: decoder
        };
    }, _Json_decodeField = F2(_Json_decodeField_fn);
    var _Json_decodeIndex_fn = function (index, decoder) {
        return {
            $: 7,
            e: index,
            b: decoder
        };
    }, _Json_decodeIndex = F2(_Json_decodeIndex_fn);
    function _Json_decodeKeyValuePairs(decoder) {
        return {
            $: 8,
            b: decoder
        };
    }
    function _Json_mapMany(f, decoders) {
        return {
            $: 9,
            f: f,
            g: decoders
        };
    }
    var _Json_andThen_fn = function (callback, decoder) {
        return {
            $: 10,
            b: decoder,
            h: callback
        };
    }, _Json_andThen = F2(_Json_andThen_fn);
    function _Json_oneOf(decoders) {
        return {
            $: 11,
            g: decoders
        };
    }
    var _Json_map1_fn = function (f, d1) {
        return _Json_mapMany(f, [d1]);
    }, _Json_map1 = F2(_Json_map1_fn);
    var _Json_map2_fn = function (f, d1, d2) {
        return _Json_mapMany(f, [d1, d2]);
    }, _Json_map2 = F3(_Json_map2_fn);
    var _Json_map3_fn = function (f, d1, d2, d3) {
        return _Json_mapMany(f, [d1, d2, d3]);
    }, _Json_map3 = F4(_Json_map3_fn);
    var _Json_map4_fn = function (f, d1, d2, d3, d4) {
        return _Json_mapMany(f, [d1, d2, d3, d4]);
    }, _Json_map4 = F5(_Json_map4_fn);
    var _Json_map5_fn = function (f, d1, d2, d3, d4, d5) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
    }, _Json_map5 = F6(_Json_map5_fn);
    var _Json_map6_fn = function (f, d1, d2, d3, d4, d5, d6) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
    }, _Json_map6 = F7(_Json_map6_fn);
    var _Json_map7_fn = function (f, d1, d2, d3, d4, d5, d6, d7) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
    }, _Json_map7 = F8(_Json_map7_fn);
    var _Json_map8_fn = function (f, d1, d2, d3, d4, d5, d6, d7, d8) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
    }, _Json_map8 = F9(_Json_map8_fn);
    var _Json_runOnString_fn = function (decoder, string) {
        try {
            var value = JSON.parse(string);
            return _Json_runHelp(decoder, value);
        }
        catch (e) {
            return $elm$core$Result$Err($elm$json$Json$Decode$Failure_fn("This is not valid JSON! " + e.message, _Json_wrap(string)));
        }
    }, _Json_runOnString = F2(_Json_runOnString_fn);
    var _Json_run_fn = function (decoder, value) {
        return _Json_runHelp(decoder, _Json_unwrap(value));
    }, _Json_run = F2(_Json_run_fn);
    function _Json_runHelp(decoder, value) {
        switch (decoder.$) {
            case 2:
                return decoder.b(value);
            case 5:
                return (value === null)
                    ? $elm$core$Result$Ok(decoder.c)
                    : _Json_expecting("null", value);
            case 3:
                if (!_Json_isArray(value)) {
                    return _Json_expecting("a LIST", value);
                }
                return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);
            case 4:
                if (!_Json_isArray(value)) {
                    return _Json_expecting("an ARRAY", value);
                }
                return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);
            case 6:
                var field = decoder.d;
                if (typeof value !== "object" || value === null || !(field in value)) {
                    return _Json_expecting("an OBJECT with a field named `" + field + "`", value);
                }
                var result = _Json_runHelp(decoder.b, value[field]);
                return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err($elm$json$Json$Decode$Field_fn(field, result.a));
            case 7:
                var index = decoder.e;
                if (!_Json_isArray(value)) {
                    return _Json_expecting("an ARRAY", value);
                }
                if (index >= value.length) {
                    return _Json_expecting("a LONGER array. Need index " + index + " but only see " + value.length + " entries", value);
                }
                var result = _Json_runHelp(decoder.b, value[index]);
                return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err($elm$json$Json$Decode$Index_fn(index, result.a));
            case 8:
                if (typeof value !== "object" || value === null || _Json_isArray(value)) {
                    return _Json_expecting("an OBJECT", value);
                }
                var keyValuePairs = _List_Nil;
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        var result = _Json_runHelp(decoder.b, value[key]);
                        if (!$elm$core$Result$isOk(result)) {
                            return $elm$core$Result$Err($elm$json$Json$Decode$Field_fn(key, result.a));
                        }
                        keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
                    }
                }
                return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));
            case 9:
                var answer = decoder.f;
                var decoders = decoder.g;
                for (var i = 0; i < decoders.length; i++) {
                    var result = _Json_runHelp(decoders[i], value);
                    if (!$elm$core$Result$isOk(result)) {
                        return result;
                    }
                    answer = answer(result.a);
                }
                return $elm$core$Result$Ok(answer);
            case 10:
                var result = _Json_runHelp(decoder.b, value);
                return (!$elm$core$Result$isOk(result))
                    ? result
                    : _Json_runHelp(decoder.h(result.a), value);
            case 11:
                var errors = _List_Nil;
                for (var temp = decoder.g; temp.b; temp = temp.b) {
                    var result = _Json_runHelp(temp.a, value);
                    if ($elm$core$Result$isOk(result)) {
                        return result;
                    }
                    errors = _List_Cons(result.a, errors);
                }
                return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));
            case 1:
                return $elm$core$Result$Err($elm$json$Json$Decode$Failure_fn(decoder.a, _Json_wrap(value)));
            case 0:
                return $elm$core$Result$Ok(decoder.a);
        }
    }
    function _Json_runArrayDecoder(decoder, value, toElmValue) {
        var len = value.length;
        var array = new Array(len);
        for (var i = 0; i < len; i++) {
            var result = _Json_runHelp(decoder, value[i]);
            if (!$elm$core$Result$isOk(result)) {
                return $elm$core$Result$Err($elm$json$Json$Decode$Index_fn(i, result.a));
            }
            array[i] = result.a;
        }
        return $elm$core$Result$Ok(toElmValue(array));
    }
    function _Json_isArray(value) {
        return Array.isArray(value) || (typeof FileList !== "undefined" && value instanceof FileList);
    }
    function _Json_toElmArray(array) {
        return $elm$core$Array$initialize_fn(array.length, function (i) { return array[i]; });
    }
    function _Json_expecting(type, value) {
        return $elm$core$Result$Err($elm$json$Json$Decode$Failure_fn("Expecting " + type, _Json_wrap(value)));
    }
    function _Json_equality(x, y) {
        if (x === y) {
            return true;
        }
        if (x.$ !== y.$) {
            return false;
        }
        switch (x.$) {
            case 0:
            case 1:
                return x.a === y.a;
            case 2:
                return x.b === y.b;
            case 5:
                return x.c === y.c;
            case 3:
            case 4:
            case 8:
                return _Json_equality(x.b, y.b);
            case 6:
                return x.d === y.d && _Json_equality(x.b, y.b);
            case 7:
                return x.e === y.e && _Json_equality(x.b, y.b);
            case 9:
                return x.f === y.f && _Json_listEquality(x.g, y.g);
            case 10:
                return x.h === y.h && _Json_equality(x.b, y.b);
            case 11:
                return _Json_listEquality(x.g, y.g);
        }
    }
    function _Json_listEquality(aDecoders, bDecoders) {
        var len = aDecoders.length;
        if (len !== bDecoders.length) {
            return false;
        }
        for (var i = 0; i < len; i++) {
            if (!_Json_equality(aDecoders[i], bDecoders[i])) {
                return false;
            }
        }
        return true;
    }
    var _Json_encode_fn = function (indentLevel, value) {
        return JSON.stringify(_Json_unwrap(value), null, indentLevel) + "";
    }, _Json_encode = F2(_Json_encode_fn);
    function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
    function _Json_unwrap_UNUSED(value) { return value.a; }
    function _Json_wrap(value) { return value; }
    function _Json_unwrap(value) { return value; }
    function _Json_emptyArray() { return []; }
    function _Json_emptyObject() { return {}; }
    var _Json_addField_fn = function (key, value, object) {
        object[key] = _Json_unwrap(value);
        return object;
    }, _Json_addField = F3(_Json_addField_fn);
    function _Json_addEntry(func) {
        return F2(function (entry, array) {
            array.push(_Json_unwrap(func(entry)));
            return array;
        });
    }
    var _Json_encodeNull = _Json_wrap(null);
    function _Scheduler_succeed(value) {
        return {
            $: 0,
            a: value
        };
    }
    function _Scheduler_fail(error) {
        return {
            $: 1,
            a: error
        };
    }
    function _Scheduler_binding(callback) {
        return {
            $: 2,
            b: callback,
            c: null
        };
    }
    var _Scheduler_andThen_fn = function (callback, task) {
        return {
            $: 3,
            b: callback,
            d: task
        };
    }, _Scheduler_andThen = F2(_Scheduler_andThen_fn);
    var _Scheduler_onError_fn = function (callback, task) {
        return {
            $: 4,
            b: callback,
            d: task
        };
    }, _Scheduler_onError = F2(_Scheduler_onError_fn);
    function _Scheduler_receive(callback) {
        return {
            $: 5,
            b: callback
        };
    }
    var _Scheduler_guid = 0;
    function _Scheduler_rawSpawn(task) {
        var proc = {
            $: 0,
            e: _Scheduler_guid++,
            f: task,
            g: null,
            h: []
        };
        _Scheduler_enqueue(proc);
        return proc;
    }
    function _Scheduler_spawn(task) {
        return _Scheduler_binding(function (callback) {
            callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
        });
    }
    function _Scheduler_rawSend(proc, msg) {
        proc.h.push(msg);
        _Scheduler_enqueue(proc);
    }
    var _Scheduler_send_fn = function (proc, msg) {
        return _Scheduler_binding(function (callback) {
            _Scheduler_rawSend(proc, msg);
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }, _Scheduler_send = F2(_Scheduler_send_fn);
    function _Scheduler_kill(proc) {
        return _Scheduler_binding(function (callback) {
            var task = proc.f;
            if (task.$ === 2 && task.c) {
                task.c();
            }
            proc.f = null;
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }
    var _Scheduler_working = false;
    var _Scheduler_queue = [];
    function _Scheduler_enqueue(proc) {
        _Scheduler_queue.push(proc);
        if (_Scheduler_working) {
            return;
        }
        _Scheduler_working = true;
        while (proc = _Scheduler_queue.shift()) {
            _Scheduler_step(proc);
        }
        _Scheduler_working = false;
    }
    function _Scheduler_step(proc) {
        while (proc.f) {
            var rootTag = proc.f.$;
            if (rootTag === 0 || rootTag === 1) {
                while (proc.g && proc.g.$ !== rootTag) {
                    proc.g = proc.g.i;
                }
                if (!proc.g) {
                    return;
                }
                proc.f = proc.g.b(proc.f.a);
                proc.g = proc.g.i;
            }
            else if (rootTag === 2) {
                proc.f.c = proc.f.b(function (newRoot) {
                    proc.f = newRoot;
                    _Scheduler_enqueue(proc);
                });
                return;
            }
            else if (rootTag === 5) {
                if (proc.h.length === 0) {
                    return;
                }
                proc.f = proc.f.b(proc.h.shift());
            }
            else {
                proc.g = {
                    $: rootTag === 3 ? 0 : 1,
                    b: proc.f.b,
                    i: proc.g
                };
                proc.f = proc.f.d;
            }
        }
    }
    function _Process_sleep(time) {
        return _Scheduler_binding(function (callback) {
            var id = setTimeout(function () {
                callback(_Scheduler_succeed(_Utils_Tuple0));
            }, time);
            return function () { clearTimeout(id); };
        });
    }
    var _Platform_worker_fn = function (impl, flagDecoder, debugMetadata, args) {
        return _Platform_initialize(flagDecoder, args, impl.c4, impl.d6, impl.dN, function () { return function () { }; });
    }, _Platform_worker = F4(_Platform_worker_fn);
    function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder) {
        var result = _Json_run_fn(flagDecoder, _Json_wrap(args ? args["flags"] : undefined));
        $elm$core$Result$isOk(result) || _Debug_crash(2);
        var managers = {};
        var initPair = init(result.a);
        var model = initPair.a;
        var stepper = stepperBuilder(sendToApp, model);
        var ports = _Platform_setupEffects(managers, sendToApp);
        function sendToApp(msg, viewMetadata) {
            var pair = A2(update, msg, model);
            stepper(model = pair.a, viewMetadata);
            _Platform_enqueueEffects(managers, pair.b, subscriptions(model));
        }
        _Platform_enqueueEffects(managers, initPair.b, subscriptions(model));
        return ports ? { ports: ports } : {};
    }
    var _Platform_preload;
    function _Platform_registerPreload(url) {
        _Platform_preload.add(url);
    }
    var _Platform_effectManagers = {};
    function _Platform_setupEffects(managers, sendToApp) {
        var ports;
        for (var key in _Platform_effectManagers) {
            var manager = _Platform_effectManagers[key];
            if (manager.a) {
                ports = ports || {};
                ports[key] = manager.a(key, sendToApp);
            }
            managers[key] = _Platform_instantiateManager(manager, sendToApp);
        }
        return ports;
    }
    function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap) {
        return {
            b: init,
            c: onEffects,
            d: onSelfMsg,
            e: cmdMap,
            f: subMap
        };
    }
    function _Platform_instantiateManager(info, sendToApp) {
        var router = {
            g: sendToApp,
            h: undefined
        };
        var onEffects = info.c;
        var onSelfMsg = info.d;
        var cmdMap = info.e;
        var subMap = info.f;
        function loop(state) {
            return _Scheduler_andThen_fn(loop, _Scheduler_receive(function (msg) {
                var value = msg.a;
                if (msg.$ === 0) {
                    return A3(onSelfMsg, router, value, state);
                }
                return cmdMap && subMap
                    ? A4(onEffects, router, value.i, value.j, state)
                    : A3(onEffects, router, cmdMap ? value.i : value.j, state);
            }));
        }
        return router.h = _Scheduler_rawSpawn(_Scheduler_andThen_fn(loop, info.b));
    }
    var _Platform_sendToApp_fn = function (router, msg) {
        return _Scheduler_binding(function (callback) {
            router.g(msg);
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }, _Platform_sendToApp = F2(_Platform_sendToApp_fn);
    var _Platform_sendToSelf_fn = function (router, msg) {
        return _Scheduler_send_fn(router.h, {
            $: 0,
            a: msg
        });
    }, _Platform_sendToSelf = F2(_Platform_sendToSelf_fn);
    function _Platform_leaf(home) {
        return function (value) {
            return {
                $: 1,
                k: home,
                l: value
            };
        };
    }
    function _Platform_batch(list) {
        return {
            $: 2,
            m: list
        };
    }
    var _Platform_map_fn = function (tagger, bag) {
        return {
            $: 3,
            n: tagger,
            o: bag
        };
    }, _Platform_map = F2(_Platform_map_fn);
    var _Platform_effectsQueue = [];
    var _Platform_effectsActive = false;
    function _Platform_enqueueEffects(managers, cmdBag, subBag) {
        _Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });
        if (_Platform_effectsActive)
            return;
        _Platform_effectsActive = true;
        for (var fx; fx = _Platform_effectsQueue.shift();) {
            _Platform_dispatchEffects(fx.p, fx.q, fx.r);
        }
        _Platform_effectsActive = false;
    }
    function _Platform_dispatchEffects(managers, cmdBag, subBag) {
        var effectsDict = {};
        _Platform_gatherEffects(true, cmdBag, effectsDict, null);
        _Platform_gatherEffects(false, subBag, effectsDict, null);
        for (var home in managers) {
            _Scheduler_rawSend(managers[home], {
                $: "fx",
                a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
            });
        }
    }
    function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers) {
        switch (bag.$) {
            case 1:
                var home = bag.k;
                var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
                effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
                return;
            case 2:
                for (var list = bag.m; list.b; list = list.b) {
                    _Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
                }
                return;
            case 3:
                _Platform_gatherEffects(isCmd, bag.o, effectsDict, {
                    s: bag.n,
                    t: taggers
                });
                return;
        }
    }
    function _Platform_toEffect(isCmd, home, taggers, value) {
        function applyTaggers(x) {
            for (var temp = taggers; temp; temp = temp.t) {
                x = temp.s(x);
            }
            return x;
        }
        var map = isCmd
            ? _Platform_effectManagers[home].e
            : _Platform_effectManagers[home].f;
        return A2(map, applyTaggers, value);
    }
    function _Platform_insert(isCmd, newEffect, effects) {
        effects = effects || { i: _List_Nil, j: _List_Nil };
        isCmd
            ? (effects.i = _List_Cons(newEffect, effects.i))
            : (effects.j = _List_Cons(newEffect, effects.j));
        return effects;
    }
    function _Platform_checkPortName(name) {
        if (_Platform_effectManagers[name]) {
            _Debug_crash(3, name);
        }
    }
    function _Platform_outgoingPort(name, converter) {
        _Platform_checkPortName(name);
        _Platform_effectManagers[name] = {
            e: _Platform_outgoingPortMap,
            u: converter,
            a: _Platform_setupOutgoingPort
        };
        return _Platform_leaf(name);
    }
    var _Platform_outgoingPortMap_fn = function (tagger, value) { return value; }, _Platform_outgoingPortMap = F2(_Platform_outgoingPortMap_fn);
    function _Platform_setupOutgoingPort(name) {
        var subs = [];
        var converter = _Platform_effectManagers[name].u;
        var init = _Process_sleep(0);
        _Platform_effectManagers[name].b = init;
        _Platform_effectManagers[name].c = F3(function (router, cmdList, state) {
            for (; cmdList.b; cmdList = cmdList.b) {
                var currentSubs = subs;
                var value = _Json_unwrap(converter(cmdList.a));
                for (var i = 0; i < currentSubs.length; i++) {
                    currentSubs[i](value);
                }
            }
            return init;
        });
        function subscribe(callback) {
            subs.push(callback);
        }
        function unsubscribe(callback) {
            subs = subs.slice();
            var index = subs.indexOf(callback);
            if (index >= 0) {
                subs.splice(index, 1);
            }
        }
        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };
    }
    function _Platform_incomingPort(name, converter) {
        _Platform_checkPortName(name);
        _Platform_effectManagers[name] = {
            f: _Platform_incomingPortMap,
            u: converter,
            a: _Platform_setupIncomingPort
        };
        return _Platform_leaf(name);
    }
    var _Platform_incomingPortMap_fn = function (tagger, finalTagger) {
        return function (value) {
            return tagger(finalTagger(value));
        };
    }, _Platform_incomingPortMap = F2(_Platform_incomingPortMap_fn);
    function _Platform_setupIncomingPort(name, sendToApp) {
        var subs = _List_Nil;
        var converter = _Platform_effectManagers[name].u;
        var init = _Scheduler_succeed(null);
        _Platform_effectManagers[name].b = init;
        _Platform_effectManagers[name].c = F3(function (router, subList, state) {
            subs = subList;
            return init;
        });
        function send(incomingValue) {
            var result = _Json_run_fn(converter, _Json_wrap(incomingValue));
            $elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);
            var value = result.a;
            for (var temp = subs; temp.b; temp = temp.b) {
                sendToApp(temp.a(value));
            }
        }
        return { send: send };
    }
    function _Platform_export(exports) {
        scope["Elm"]
            ? _Platform_mergeExportsProd(scope["Elm"], exports)
            : scope["Elm"] = exports;
    }
    function _Platform_mergeExportsProd(obj, exports) {
        for (var name in exports) {
            (name in obj)
                ? (name == "init")
                    ? _Debug_crash(6)
                    : _Platform_mergeExportsProd(obj[name], exports[name])
                : (obj[name] = exports[name]);
        }
    }
    function _Platform_export_UNUSED(exports) {
        scope["Elm"]
            ? _Platform_mergeExportsDebug("Elm", scope["Elm"], exports)
            : scope["Elm"] = exports;
    }
    function _Platform_mergeExportsDebug(moduleName, obj, exports) {
        for (var name in exports) {
            (name in obj)
                ? (name == "init")
                    ? _Debug_crash(6, moduleName)
                    : _Platform_mergeExportsDebug(moduleName + "." + name, obj[name], exports[name])
                : (obj[name] = exports[name]);
        }
    }
    var _VirtualDom_divertHrefToApp;
    var _VirtualDom_doc = typeof document !== "undefined" ? document : {};
    function _VirtualDom_appendChild(parent, child) {
        parent.appendChild(child);
    }
    var _VirtualDom_init_fn = function (virtualNode, flagDecoder, debugMetadata, args) {
        var node = args["node"];
        node.parentNode.replaceChild(_VirtualDom_render(virtualNode, function () { }), node);
        return {};
    }, _VirtualDom_init = F4(_VirtualDom_init_fn);
    function _VirtualDom_text(string) {
        return {
            $: 0,
            a: string
        };
    }
    var _VirtualDom_nodeNS_fn = function (namespace, tag) {
        return F2(function (factList, kidList) {
            for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) {
                var kid = kidList.a;
                descendantsCount += (kid.b || 0);
                kids.push(kid);
            }
            descendantsCount += kids.length;
            return {
                $: 1,
                c: tag,
                d: _VirtualDom_organizeFacts(factList),
                e: kids,
                f: namespace,
                b: descendantsCount
            };
        });
    }, _VirtualDom_nodeNS = F2(_VirtualDom_nodeNS_fn);
    var _VirtualDom_node_a0 = undefined, _VirtualDom_node = _VirtualDom_nodeNS(_VirtualDom_node_a0);
    var _VirtualDom_keyedNodeNS_fn = function (namespace, tag) {
        return F2(function (factList, kidList) {
            for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) {
                var kid = kidList.a;
                descendantsCount += (kid.b.b || 0);
                kids.push(kid);
            }
            descendantsCount += kids.length;
            return {
                $: 2,
                c: tag,
                d: _VirtualDom_organizeFacts(factList),
                e: kids,
                f: namespace,
                b: descendantsCount
            };
        });
    }, _VirtualDom_keyedNodeNS = F2(_VirtualDom_keyedNodeNS_fn);
    var _VirtualDom_keyedNode_a0 = undefined, _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(_VirtualDom_keyedNode_a0);
    function _VirtualDom_custom(factList, model, render, diff) {
        return {
            $: 3,
            d: _VirtualDom_organizeFacts(factList),
            g: model,
            h: render,
            i: diff
        };
    }
    var _VirtualDom_map_fn = function (tagger, node) {
        return {
            $: 4,
            j: tagger,
            k: node,
            b: 1 + (node.b || 0)
        };
    }, _VirtualDom_map = F2(_VirtualDom_map_fn);
    function _VirtualDom_thunk(refs, thunk) {
        return {
            $: 5,
            l: refs,
            m: thunk,
            k: undefined
        };
    }
    var _VirtualDom_lazy_fn = function (func, a) {
        return _VirtualDom_thunk([func, a], function () {
            return func(a);
        });
    }, _VirtualDom_lazy = F2(_VirtualDom_lazy_fn);
    var _VirtualDom_lazy2_fn = function (func, a, b) {
        return _VirtualDom_thunk([func, a, b], function () {
            return A2(func, a, b);
        });
    }, _VirtualDom_lazy2_fn_unwrapped = function (func, a, b) {
        return _VirtualDom_thunk([func, a, b], function () {
            return func(a, b);
        });
    }, _VirtualDom_lazy2 = F3(_VirtualDom_lazy2_fn);
    var _VirtualDom_lazy3_fn = function (func, a, b, c) {
        return _VirtualDom_thunk([func, a, b, c], function () {
            return A3(func, a, b, c);
        });
    }, _VirtualDom_lazy3_fn_unwrapped = function (func, a, b, c) {
        return _VirtualDom_thunk([func, a, b, c], function () {
            return func(a, b, c);
        });
    }, _VirtualDom_lazy3 = F4(_VirtualDom_lazy3_fn);
    var _VirtualDom_lazy4_fn = function (func, a, b, c, d) {
        return _VirtualDom_thunk([func, a, b, c, d], function () {
            return A4(func, a, b, c, d);
        });
    }, _VirtualDom_lazy4_fn_unwrapped = function (func, a, b, c, d) {
        return _VirtualDom_thunk([func, a, b, c, d], function () {
            return func(a, b, c, d);
        });
    }, _VirtualDom_lazy4 = F5(_VirtualDom_lazy4_fn);
    var _VirtualDom_lazy5_fn = function (func, a, b, c, d, e) {
        return _VirtualDom_thunk([func, a, b, c, d, e], function () {
            return A5(func, a, b, c, d, e);
        });
    }, _VirtualDom_lazy5_fn_unwrapped = function (func, a, b, c, d, e) {
        return _VirtualDom_thunk([func, a, b, c, d, e], function () {
            return func(a, b, c, d, e);
        });
    }, _VirtualDom_lazy5 = F6(_VirtualDom_lazy5_fn);
    var _VirtualDom_lazy6_fn = function (func, a, b, c, d, e, f) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f], function () {
            return A6(func, a, b, c, d, e, f);
        });
    }, _VirtualDom_lazy6_fn_unwrapped = function (func, a, b, c, d, e, f) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f], function () {
            return func(a, b, c, d, e, f);
        });
    }, _VirtualDom_lazy6 = F7(_VirtualDom_lazy6_fn);
    var _VirtualDom_lazy7_fn = function (func, a, b, c, d, e, f, g) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function () {
            return A7(func, a, b, c, d, e, f, g);
        });
    }, _VirtualDom_lazy7_fn_unwrapped = function (func, a, b, c, d, e, f, g) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function () {
            return func(a, b, c, d, e, f, g);
        });
    }, _VirtualDom_lazy7 = F8(_VirtualDom_lazy7_fn);
    var _VirtualDom_lazy8_fn = function (func, a, b, c, d, e, f, g, h) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function () {
            return A8(func, a, b, c, d, e, f, g, h);
        });
    }, _VirtualDom_lazy8_fn_unwrapped = function (func, a, b, c, d, e, f, g, h) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function () {
            return func(a, b, c, d, e, f, g, h);
        });
    }, _VirtualDom_lazy8 = F9(_VirtualDom_lazy8_fn);
    var _VirtualDom_on_fn = function (key, handler) {
        return {
            $: "a0",
            n: key,
            o: handler
        };
    }, _VirtualDom_on = F2(_VirtualDom_on_fn);
    var _VirtualDom_style_fn = function (key, value) {
        return {
            $: "a1",
            n: key,
            o: value
        };
    }, _VirtualDom_style = F2(_VirtualDom_style_fn);
    var _VirtualDom_property_fn = function (key, value) {
        return {
            $: "a2",
            n: key,
            o: value
        };
    }, _VirtualDom_property = F2(_VirtualDom_property_fn);
    var _VirtualDom_attribute_fn = function (key, value) {
        return {
            $: "a3",
            n: key,
            o: value
        };
    }, _VirtualDom_attribute = F2(_VirtualDom_attribute_fn);
    var _VirtualDom_attributeNS_fn = function (namespace, key, value) {
        return {
            $: "a4",
            n: key,
            o: { f: namespace, o: value }
        };
    }, _VirtualDom_attributeNS = F3(_VirtualDom_attributeNS_fn);
    function _VirtualDom_noScript(tag) {
        return tag == "script" ? "p" : tag;
    }
    function _VirtualDom_noOnOrFormAction(key) {
        return /^(on|formAction$)/i.test(key) ? "data-" + key : key;
    }
    function _VirtualDom_noInnerHtmlOrFormAction(key) {
        return key == "innerHTML" || key == "formAction" ? "data-" + key : key;
    }
    function _VirtualDom_noJavaScriptUri(value) {
        return /^javascript:/i.test(value.replace(/\s/g, "")) ? "" : value;
    }
    function _VirtualDom_noJavaScriptUri_UNUSED(value) {
        return /^javascript:/i.test(value.replace(/\s/g, ""))
            ? "javascript:alert(\"This is an XSS vector. Please use ports or web components instead.\")"
            : value;
    }
    function _VirtualDom_noJavaScriptOrHtmlUri(value) {
        return /^\s*(javascript:|data:text\/html)/i.test(value) ? "" : value;
    }
    function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value) {
        return /^\s*(javascript:|data:text\/html)/i.test(value)
            ? "javascript:alert(\"This is an XSS vector. Please use ports or web components instead.\")"
            : value;
    }
    var _VirtualDom_mapAttribute_fn = function (func, attr) {
        return (attr.$ === "a0")
            ? _VirtualDom_on_fn(attr.n, _VirtualDom_mapHandler(func, attr.o)) : attr;
    }, _VirtualDom_mapAttribute = F2(_VirtualDom_mapAttribute_fn);
    function _VirtualDom_mapHandler(func, handler) {
        var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);
        return {
            $: handler.$,
            a: !tag
                ? _Json_map1_fn(func, handler.a) : _Json_map2_fn(tag < 3
                ? _VirtualDom_mapEventTuple
                : _VirtualDom_mapEventRecord, $elm$json$Json$Decode$succeed(func), handler.a)
        };
    }
    var _VirtualDom_mapEventTuple_fn = function (func, tuple) {
        return _Utils_Tuple2(func(tuple.a), tuple.b);
    }, _VirtualDom_mapEventTuple = F2(_VirtualDom_mapEventTuple_fn);
    var _VirtualDom_mapEventRecord_fn = function (func, record) {
        return {
            K: func(record.K),
            a4: record.a4,
            a$: record.a$
        };
    }, _VirtualDom_mapEventRecord = F2(_VirtualDom_mapEventRecord_fn);
    function _VirtualDom_organizeFacts(factList) {
        for (var facts = {}; factList.b; factList = factList.b) {
            var entry = factList.a;
            var tag = entry.$;
            var key = entry.n;
            var value = entry.o;
            if (tag === "a2") {
                (key === "className")
                    ? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
                    : facts[key] = _Json_unwrap(value);
                continue;
            }
            var subFacts = facts[tag] || (facts[tag] = {});
            (tag === "a3" && key === "class")
                ? _VirtualDom_addClass(subFacts, key, value)
                : subFacts[key] = value;
        }
        return facts;
    }
    function _VirtualDom_addClass(object, key, newClass) {
        var classes = object[key];
        object[key] = classes ? classes + " " + newClass : newClass;
    }
    function _VirtualDom_render(vNode, eventNode) {
        var tag = vNode.$;
        if (tag === 5) {
            return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
        }
        if (tag === 0) {
            return _VirtualDom_doc.createTextNode(vNode.a);
        }
        if (tag === 4) {
            var subNode = vNode.k;
            var tagger = vNode.j;
            while (subNode.$ === 4) {
                typeof tagger !== "object"
                    ? tagger = [tagger, subNode.j]
                    : tagger.push(subNode.j);
                subNode = subNode.k;
            }
            var subEventRoot = { j: tagger, p: eventNode };
            var domNode = _VirtualDom_render(subNode, subEventRoot);
            domNode.elm_event_node_ref = subEventRoot;
            return domNode;
        }
        if (tag === 3) {
            var domNode = vNode.h(vNode.g);
            _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
            return domNode;
        }
        var domNode = vNode.f
            ? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
            : _VirtualDom_doc.createElement(vNode.c);
        if (_VirtualDom_divertHrefToApp && vNode.c == "a") {
            domNode.addEventListener("click", _VirtualDom_divertHrefToApp(domNode));
        }
        _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
        for (var kids = vNode.e, i = 0; i < kids.length; i++) {
            _VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
        }
        return domNode;
    }
    function _VirtualDom_applyFacts(domNode, eventNode, facts) {
        for (var key in facts) {
            var value = facts[key];
            key === "a1"
                ? _VirtualDom_applyStyles(domNode, value)
                :
                    key === "a0"
                        ? _VirtualDom_applyEvents(domNode, eventNode, value)
                        :
                            key === "a3"
                                ? _VirtualDom_applyAttrs(domNode, value)
                                :
                                    key === "a4"
                                        ? _VirtualDom_applyAttrsNS(domNode, value)
                                        :
                                            ((key !== "value" && key !== "checked") || domNode[key] !== value) && (domNode[key] = value);
        }
    }
    function _VirtualDom_applyStyles(domNode, styles) {
        var domNodeStyle = domNode.style;
        for (var key in styles) {
            domNodeStyle[key] = styles[key];
        }
    }
    function _VirtualDom_applyAttrs(domNode, attrs) {
        for (var key in attrs) {
            var value = attrs[key];
            typeof value !== "undefined"
                ? domNode.setAttribute(key, value)
                : domNode.removeAttribute(key);
        }
    }
    function _VirtualDom_applyAttrsNS(domNode, nsAttrs) {
        for (var key in nsAttrs) {
            var pair = nsAttrs[key];
            var namespace = pair.f;
            var value = pair.o;
            typeof value !== "undefined"
                ? domNode.setAttributeNS(namespace, key, value)
                : domNode.removeAttributeNS(namespace, key);
        }
    }
    function _VirtualDom_applyEvents(domNode, eventNode, events) {
        var allCallbacks = domNode.elmFs || (domNode.elmFs = {});
        for (var key in events) {
            var newHandler = events[key];
            var oldCallback = allCallbacks[key];
            if (!newHandler) {
                domNode.removeEventListener(key, oldCallback);
                allCallbacks[key] = undefined;
                continue;
            }
            if (oldCallback) {
                var oldHandler = oldCallback.q;
                if (oldHandler.$ === newHandler.$) {
                    oldCallback.q = newHandler;
                    continue;
                }
                domNode.removeEventListener(key, oldCallback);
            }
            oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
            domNode.addEventListener(key, oldCallback, _VirtualDom_passiveSupported
                && { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 });
            allCallbacks[key] = oldCallback;
        }
    }
    var _VirtualDom_passiveSupported;
    try {
        window.addEventListener("t", null, Object.defineProperty({}, "passive", {
            get: function () { _VirtualDom_passiveSupported = true; }
        }));
    }
    catch (e) { }
    function _VirtualDom_makeCallback(eventNode, initialHandler) {
        function callback(event) {
            var handler = callback.q;
            var result = _Json_runHelp(handler.a, event);
            if (!$elm$core$Result$isOk(result)) {
                return;
            }
            var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);
            var value = result.a;
            var message = !tag ? value : tag < 3 ? value.a : value.K;
            var stopPropagation = tag == 1 ? value.b : tag == 3 && value.a4;
            var currentEventNode = (stopPropagation && event.stopPropagation(),
                (tag == 2 ? value.b : tag == 3 && value.a$) && event.preventDefault(),
                eventNode);
            var tagger;
            var i;
            while (tagger = currentEventNode.j) {
                if (typeof tagger == "function") {
                    message = tagger(message);
                }
                else {
                    for (var i = tagger.length; i--;) {
                        message = tagger[i](message);
                    }
                }
                currentEventNode = currentEventNode.p;
            }
            currentEventNode(message, stopPropagation);
        }
        callback.q = initialHandler;
        return callback;
    }
    function _VirtualDom_equalEvents(x, y) {
        return x.$ == y.$ && _Json_equality(x.a, y.a);
    }
    function _VirtualDom_diff(x, y) {
        var patches = [];
        _VirtualDom_diffHelp(x, y, patches, 0);
        return patches;
    }
    function _VirtualDom_pushPatch(patches, type, index, data) {
        var patch = {
            $: type,
            r: index,
            s: data,
            t: undefined,
            u: undefined
        };
        patches.push(patch);
        return patch;
    }
    function _VirtualDom_diffHelp(x, y, patches, index) {
        if (x === y) {
            return;
        }
        var xType = x.$;
        var yType = y.$;
        if (xType !== yType) {
            if (xType === 1 && yType === 2) {
                y = _VirtualDom_dekey(y);
                yType = 1;
            }
            else {
                _VirtualDom_pushPatch(patches, 0, index, y);
                return;
            }
        }
        switch (yType) {
            case 5:
                var xRefs = x.l;
                var yRefs = y.l;
                var i = xRefs.length;
                var same = i === yRefs.length;
                while (same && i--) {
                    same = xRefs[i] === yRefs[i];
                }
                if (same) {
                    y.k = x.k;
                    return;
                }
                y.k = y.m();
                var subPatches = [];
                _VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
                subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
                return;
            case 4:
                var xTaggers = x.j;
                var yTaggers = y.j;
                var nesting = false;
                var xSubNode = x.k;
                while (xSubNode.$ === 4) {
                    nesting = true;
                    typeof xTaggers !== "object"
                        ? xTaggers = [xTaggers, xSubNode.j]
                        : xTaggers.push(xSubNode.j);
                    xSubNode = xSubNode.k;
                }
                var ySubNode = y.k;
                while (ySubNode.$ === 4) {
                    nesting = true;
                    typeof yTaggers !== "object"
                        ? yTaggers = [yTaggers, ySubNode.j]
                        : yTaggers.push(ySubNode.j);
                    ySubNode = ySubNode.k;
                }
                if (nesting && xTaggers.length !== yTaggers.length) {
                    _VirtualDom_pushPatch(patches, 0, index, y);
                    return;
                }
                if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers) {
                    _VirtualDom_pushPatch(patches, 2, index, yTaggers);
                }
                _VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
                return;
            case 0:
                if (x.a !== y.a) {
                    _VirtualDom_pushPatch(patches, 3, index, y.a);
                }
                return;
            case 1:
                _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
                return;
            case 2:
                _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
                return;
            case 3:
                if (x.h !== y.h) {
                    _VirtualDom_pushPatch(patches, 0, index, y);
                    return;
                }
                var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
                factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);
                var patch = y.i(x.g, y.g);
                patch && _VirtualDom_pushPatch(patches, 5, index, patch);
                return;
        }
    }
    function _VirtualDom_pairwiseRefEqual(as, bs) {
        for (var i = 0; i < as.length; i++) {
            if (as[i] !== bs[i]) {
                return false;
            }
        }
        return true;
    }
    function _VirtualDom_diffNodes(x, y, patches, index, diffKids) {
        if (x.c !== y.c || x.f !== y.f) {
            _VirtualDom_pushPatch(patches, 0, index, y);
            return;
        }
        var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
        factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);
        diffKids(x, y, patches, index);
    }
    function _VirtualDom_diffFacts(x, y, category) {
        var diff;
        for (var xKey in x) {
            if (xKey === "a1" || xKey === "a0" || xKey === "a3" || xKey === "a4") {
                var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
                if (subDiff) {
                    diff = diff || {};
                    diff[xKey] = subDiff;
                }
                continue;
            }
            if (!(xKey in y)) {
                diff = diff || {};
                diff[xKey] =
                    !category
                        ? (typeof x[xKey] === "string" ? "" : null)
                        :
                            (category === "a1")
                                ? ""
                                :
                                    (category === "a0" || category === "a3")
                                        ? undefined
                                        :
                                            { f: x[xKey].f, o: undefined };
                continue;
            }
            var xValue = x[xKey];
            var yValue = y[xKey];
            if (xValue === yValue && xKey !== "value" && xKey !== "checked"
                || category === "a0" && _VirtualDom_equalEvents(xValue, yValue)) {
                continue;
            }
            diff = diff || {};
            diff[xKey] = yValue;
        }
        for (var yKey in y) {
            if (!(yKey in x)) {
                diff = diff || {};
                diff[yKey] = y[yKey];
            }
        }
        return diff;
    }
    function _VirtualDom_diffKids(xParent, yParent, patches, index) {
        var xKids = xParent.e;
        var yKids = yParent.e;
        var xLen = xKids.length;
        var yLen = yKids.length;
        if (xLen > yLen) {
            _VirtualDom_pushPatch(patches, 6, index, {
                v: yLen,
                i: xLen - yLen
            });
        }
        else if (xLen < yLen) {
            _VirtualDom_pushPatch(patches, 7, index, {
                v: xLen,
                e: yKids
            });
        }
        for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++) {
            var xKid = xKids[i];
            _VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
            index += xKid.b || 0;
        }
    }
    function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex) {
        var localPatches = [];
        var changes = {};
        var inserts = [];
        var xKids = xParent.e;
        var yKids = yParent.e;
        var xLen = xKids.length;
        var yLen = yKids.length;
        var xIndex = 0;
        var yIndex = 0;
        var index = rootIndex;
        while (xIndex < xLen && yIndex < yLen) {
            var x = xKids[xIndex];
            var y = yKids[yIndex];
            var xKey = x.a;
            var yKey = y.a;
            var xNode = x.b;
            var yNode = y.b;
            var newMatch = undefined;
            var oldMatch = undefined;
            if (xKey === yKey) {
                index++;
                _VirtualDom_diffHelp(xNode, yNode, localPatches, index);
                index += xNode.b || 0;
                xIndex++;
                yIndex++;
                continue;
            }
            var xNext = xKids[xIndex + 1];
            var yNext = yKids[yIndex + 1];
            if (xNext) {
                var xNextKey = xNext.a;
                var xNextNode = xNext.b;
                oldMatch = yKey === xNextKey;
            }
            if (yNext) {
                var yNextKey = yNext.a;
                var yNextNode = yNext.b;
                newMatch = xKey === yNextKey;
            }
            if (newMatch && oldMatch) {
                index++;
                _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
                _VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
                index += xNode.b || 0;
                index++;
                _VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
                index += xNextNode.b || 0;
                xIndex += 2;
                yIndex += 2;
                continue;
            }
            if (newMatch) {
                index++;
                _VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
                _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
                index += xNode.b || 0;
                xIndex += 1;
                yIndex += 2;
                continue;
            }
            if (oldMatch) {
                index++;
                _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
                index += xNode.b || 0;
                index++;
                _VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
                index += xNextNode.b || 0;
                xIndex += 2;
                yIndex += 1;
                continue;
            }
            if (xNext && xNextKey === yNextKey) {
                index++;
                _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
                _VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
                index += xNode.b || 0;
                index++;
                _VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
                index += xNextNode.b || 0;
                xIndex += 2;
                yIndex += 2;
                continue;
            }
            break;
        }
        while (xIndex < xLen) {
            index++;
            var x = xKids[xIndex];
            var xNode = x.b;
            _VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
            index += xNode.b || 0;
            xIndex++;
        }
        while (yIndex < yLen) {
            var endInserts = endInserts || [];
            var y = yKids[yIndex];
            _VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
            yIndex++;
        }
        if (localPatches.length > 0 || inserts.length > 0 || endInserts) {
            _VirtualDom_pushPatch(patches, 8, rootIndex, {
                w: localPatches,
                x: inserts,
                y: endInserts
            });
        }
    }
    var _VirtualDom_POSTFIX = "_elmW6BL";
    function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts) {
        var entry = changes[key];
        if (!entry) {
            entry = {
                c: 0,
                z: vnode,
                r: yIndex,
                s: undefined
            };
            inserts.push({ r: yIndex, A: entry });
            changes[key] = entry;
            return;
        }
        if (entry.c === 1) {
            inserts.push({ r: yIndex, A: entry });
            entry.c = 2;
            var subPatches = [];
            _VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
            entry.r = yIndex;
            entry.s.s = {
                w: subPatches,
                A: entry
            };
            return;
        }
        _VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
    }
    function _VirtualDom_removeNode(changes, localPatches, key, vnode, index) {
        var entry = changes[key];
        if (!entry) {
            var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);
            changes[key] = {
                c: 1,
                z: vnode,
                r: index,
                s: patch
            };
            return;
        }
        if (entry.c === 0) {
            entry.c = 2;
            var subPatches = [];
            _VirtualDom_diffHelp(vnode, entry.z, subPatches, index);
            _VirtualDom_pushPatch(localPatches, 9, index, {
                w: subPatches,
                A: entry
            });
            return;
        }
        _VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
    }
    function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode) {
        _VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
    }
    function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode) {
        var patch = patches[i];
        var index = patch.r;
        while (index === low) {
            var patchType = patch.$;
            if (patchType === 1) {
                _VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
            }
            else if (patchType === 8) {
                patch.t = domNode;
                patch.u = eventNode;
                var subPatches = patch.s.w;
                if (subPatches.length > 0) {
                    _VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
                }
            }
            else if (patchType === 9) {
                patch.t = domNode;
                patch.u = eventNode;
                var data = patch.s;
                if (data) {
                    data.A.s = domNode;
                    var subPatches = data.w;
                    if (subPatches.length > 0) {
                        _VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
                    }
                }
            }
            else {
                patch.t = domNode;
                patch.u = eventNode;
            }
            i++;
            if (!(patch = patches[i]) || (index = patch.r) > high) {
                return i;
            }
        }
        var tag = vNode.$;
        if (tag === 4) {
            var subNode = vNode.k;
            while (subNode.$ === 4) {
                subNode = subNode.k;
            }
            return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
        }
        var vKids = vNode.e;
        var childNodes = domNode.childNodes;
        for (var j = 0; j < vKids.length; j++) {
            low++;
            var vKid = tag === 1 ? vKids[j] : vKids[j].b;
            var nextLow = low + (vKid.b || 0);
            if (low <= index && index <= nextLow) {
                i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
                if (!(patch = patches[i]) || (index = patch.r) > high) {
                    return i;
                }
            }
            low = nextLow;
        }
        return i;
    }
    function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode) {
        if (patches.length === 0) {
            return rootDomNode;
        }
        _VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
        return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
    }
    function _VirtualDom_applyPatchesHelp(rootDomNode, patches) {
        for (var i = 0; i < patches.length; i++) {
            var patch = patches[i];
            var localDomNode = patch.t;
            var newNode = _VirtualDom_applyPatch(localDomNode, patch);
            if (localDomNode === rootDomNode) {
                rootDomNode = newNode;
            }
        }
        return rootDomNode;
    }
    function _VirtualDom_applyPatch(domNode, patch) {
        switch (patch.$) {
            case 0:
                return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);
            case 4:
                _VirtualDom_applyFacts(domNode, patch.u, patch.s);
                return domNode;
            case 3:
                domNode.replaceData(0, domNode.length, patch.s);
                return domNode;
            case 1:
                return _VirtualDom_applyPatchesHelp(domNode, patch.s);
            case 2:
                if (domNode.elm_event_node_ref) {
                    domNode.elm_event_node_ref.j = patch.s;
                }
                else {
                    domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
                }
                return domNode;
            case 6:
                var data = patch.s;
                for (var i = 0; i < data.i; i++) {
                    domNode.removeChild(domNode.childNodes[data.v]);
                }
                return domNode;
            case 7:
                var data = patch.s;
                var kids = data.e;
                var i = data.v;
                var theEnd = domNode.childNodes[i];
                for (; i < kids.length; i++) {
                    domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
                }
                return domNode;
            case 9:
                var data = patch.s;
                if (!data) {
                    domNode.parentNode.removeChild(domNode);
                    return domNode;
                }
                var entry = data.A;
                if (typeof entry.r !== "undefined") {
                    domNode.parentNode.removeChild(domNode);
                }
                entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
                return domNode;
            case 8:
                return _VirtualDom_applyPatchReorder(domNode, patch);
            case 5:
                return patch.s(domNode);
            default:
                _Debug_crash(10);
        }
    }
    function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode) {
        var parentNode = domNode.parentNode;
        var newNode = _VirtualDom_render(vNode, eventNode);
        if (!newNode.elm_event_node_ref) {
            newNode.elm_event_node_ref = domNode.elm_event_node_ref;
        }
        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode);
        }
        return newNode;
    }
    function _VirtualDom_applyPatchReorder(domNode, patch) {
        var data = patch.s;
        var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);
        domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);
        var inserts = data.x;
        for (var i = 0; i < inserts.length; i++) {
            var insert = inserts[i];
            var entry = insert.A;
            var node = entry.c === 2
                ? entry.s
                : _VirtualDom_render(entry.z, patch.u);
            domNode.insertBefore(node, domNode.childNodes[insert.r]);
        }
        if (frag) {
            _VirtualDom_appendChild(domNode, frag);
        }
        return domNode;
    }
    function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch) {
        if (!endInserts) {
            return;
        }
        var frag = _VirtualDom_doc.createDocumentFragment();
        for (var i = 0; i < endInserts.length; i++) {
            var insert = endInserts[i];
            var entry = insert.A;
            _VirtualDom_appendChild(frag, entry.c === 2
                ? entry.s
                : _VirtualDom_render(entry.z, patch.u));
        }
        return frag;
    }
    function _VirtualDom_virtualize(node) {
        if (node.nodeType === 3) {
            return _VirtualDom_text(node.textContent);
        }
        if (node.nodeType !== 1) {
            return _VirtualDom_text("");
        }
        var attrList = _List_Nil;
        var attrs = node.attributes;
        for (var i = attrs.length; i--;) {
            var attr = attrs[i];
            var name = attr.name;
            var value = attr.value;
            attrList = _List_Cons(_VirtualDom_attribute_fn(name, value), attrList);
        }
        var tag = node.tagName.toLowerCase();
        var kidList = _List_Nil;
        var kids = node.childNodes;
        for (var i = kids.length; i--;) {
            kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
        }
        return A3(_VirtualDom_node, tag, attrList, kidList);
    }
    function _VirtualDom_dekey(keyedNode) {
        var keyedKids = keyedNode.e;
        var len = keyedKids.length;
        var kids = new Array(len);
        for (var i = 0; i < len; i++) {
            kids[i] = keyedKids[i].b;
        }
        return {
            $: 1,
            c: keyedNode.c,
            d: keyedNode.d,
            e: kids,
            f: keyedNode.f,
            b: keyedNode.b
        };
    }
    var _Debugger_element;
    var _Browser_element = _Debugger_element || F4(function (impl, flagDecoder, debugMetadata, args) {
        return _Platform_initialize(flagDecoder, args, impl.c4, impl.d6, impl.dN, function (sendToApp, initialModel) {
            var view = impl.B;
            var domNode = args["node"];
            var currNode = _VirtualDom_virtualize(domNode);
            return _Browser_makeAnimator(initialModel, function (model) {
                var nextNode = view(model);
                var patches = _VirtualDom_diff(currNode, nextNode);
                domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
                currNode = nextNode;
            });
        });
    });
    var _Debugger_document;
    var _Browser_document = _Debugger_document || F4(function (impl, flagDecoder, debugMetadata, args) {
        return _Platform_initialize(flagDecoder, args, impl.c4, impl.d6, impl.dN, function (sendToApp, initialModel) {
            var divertHrefToApp = impl.a2 && impl.a2(sendToApp);
            var view = impl.B;
            var title = _VirtualDom_doc.title;
            var bodyNode = _VirtualDom_doc.body;
            var currNode = _VirtualDom_virtualize(bodyNode);
            return _Browser_makeAnimator(initialModel, function (model) {
                _VirtualDom_divertHrefToApp = divertHrefToApp;
                var doc = view(model);
                var nextNode = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "body")(_List_Nil)(doc.cy);
                var patches = _VirtualDom_diff(currNode, nextNode);
                bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
                currNode = nextNode;
                _VirtualDom_divertHrefToApp = 0;
                (title !== doc.as) && (_VirtualDom_doc.title = title = doc.as);
            });
        });
    });
    var _Browser_cancelAnimationFrame = typeof cancelAnimationFrame !== "undefined"
        ? cancelAnimationFrame
        : function (id) { clearTimeout(id); };
    var _Browser_requestAnimationFrame = typeof requestAnimationFrame !== "undefined"
        ? requestAnimationFrame
        : function (callback) { return setTimeout(callback, 1000 / 60); };
    function _Browser_makeAnimator(model, draw) {
        draw(model);
        var state = 0;
        function updateIfNeeded() {
            state = state === 1
                ? 0
                : (_Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1);
        }
        return function (nextModel, isSync) {
            model = nextModel;
            isSync
                ? (draw(model),
                    state === 2 && (state = 1))
                : (state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
                    state = 2);
        };
    }
    function _Browser_application(impl) {
        var onUrlChange = impl.dk;
        var onUrlRequest = impl.dl;
        var key = function () { key.a(onUrlChange(_Browser_getUrl())); };
        return _Browser_document({
            a2: function (sendToApp) {
                key.a = sendToApp;
                _Browser_window.addEventListener("popstate", key);
                _Browser_window.navigator.userAgent.indexOf("Trident") < 0 || _Browser_window.addEventListener("hashchange", key);
                return F2(function (domNode, event) {
                    if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute("download")) {
                        event.preventDefault();
                        var href = domNode.href;
                        var curr = _Browser_getUrl();
                        var next = $elm$url$Url$fromString(href).a;
                        sendToApp(onUrlRequest((next
                            && curr.bS === next.bS
                            && curr.bx === next.bx
                            && curr.bO.a === next.bO.a)
                            ? $elm$browser$Browser$Internal(next)
                            : $elm$browser$Browser$External(href)));
                    }
                });
            },
            c4: function (flags) {
                return A3(impl.c4, flags, _Browser_getUrl(), key);
            },
            B: impl.B,
            d6: impl.d6,
            dN: impl.dN
        });
    }
    function _Browser_getUrl() {
        return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
    }
    var _Browser_go_fn = function (key, n) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function () {
            n && history.go(n);
            key();
        }));
    }, _Browser_go = F2(_Browser_go_fn);
    var _Browser_pushUrl_fn = function (key, url) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function () {
            history.pushState({}, "", url);
            key();
        }));
    }, _Browser_pushUrl = F2(_Browser_pushUrl_fn);
    var _Browser_replaceUrl_fn = function (key, url) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function () {
            history.replaceState({}, "", url);
            key();
        }));
    }, _Browser_replaceUrl = F2(_Browser_replaceUrl_fn);
    var _Browser_fakeNode = { addEventListener: function () { }, removeEventListener: function () { } };
    var _Browser_doc = typeof document !== "undefined" ? document : _Browser_fakeNode;
    var _Browser_window = typeof window !== "undefined" ? window : _Browser_fakeNode;
    var _Browser_on_fn = function (node, eventName, sendToSelf) {
        return _Scheduler_spawn(_Scheduler_binding(function (callback) {
            function handler(event) { _Scheduler_rawSpawn(sendToSelf(event)); }
            node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
            return function () { node.removeEventListener(eventName, handler); };
        }));
    }, _Browser_on = F3(_Browser_on_fn);
    var _Browser_decodeEvent_fn = function (decoder, event) {
        var result = _Json_runHelp(decoder, event);
        return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
    }, _Browser_decodeEvent = F2(_Browser_decodeEvent_fn);
    function _Browser_visibilityInfo() {
        return (typeof _VirtualDom_doc.hidden !== "undefined")
            ? { c_: "hidden", cI: "visibilitychange" }
            :
                (typeof _VirtualDom_doc.mozHidden !== "undefined")
                    ? { c_: "mozHidden", cI: "mozvisibilitychange" }
                    :
                        (typeof _VirtualDom_doc.msHidden !== "undefined")
                            ? { c_: "msHidden", cI: "msvisibilitychange" }
                            :
                                (typeof _VirtualDom_doc.webkitHidden !== "undefined")
                                    ? { c_: "webkitHidden", cI: "webkitvisibilitychange" }
                                    : { c_: "hidden", cI: "visibilitychange" };
    }
    function _Browser_rAF() {
        return _Scheduler_binding(function (callback) {
            var id = _Browser_requestAnimationFrame(function () {
                callback(_Scheduler_succeed(Date.now()));
            });
            return function () {
                _Browser_cancelAnimationFrame(id);
            };
        });
    }
    function _Browser_now() {
        return _Scheduler_binding(function (callback) {
            callback(_Scheduler_succeed(Date.now()));
        });
    }
    function _Browser_withNode(id, doStuff) {
        return _Scheduler_binding(function (callback) {
            _Browser_requestAnimationFrame(function () {
                var node = document.getElementById(id);
                callback(node
                    ? _Scheduler_succeed(doStuff(node))
                    : _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id)));
            });
        });
    }
    function _Browser_withWindow(doStuff) {
        return _Scheduler_binding(function (callback) {
            _Browser_requestAnimationFrame(function () {
                callback(_Scheduler_succeed(doStuff()));
            });
        });
    }
    var _Browser_call_fn = function (functionName, id) {
        return _Browser_withNode(id, function (node) {
            node[functionName]();
            return _Utils_Tuple0;
        });
    }, _Browser_call = F2(_Browser_call_fn);
    function _Browser_getViewport() {
        return {
            b_: _Browser_getScene(),
            ca: {
                cd: _Browser_window.pageXOffset,
                ce: _Browser_window.pageYOffset,
                a6: _Browser_doc.documentElement.clientWidth,
                aU: _Browser_doc.documentElement.clientHeight
            }
        };
    }
    function _Browser_getScene() {
        var body = _Browser_doc.body;
        var elem = _Browser_doc.documentElement;
        return {
            a6: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
            aU: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
        };
    }
    var _Browser_setViewport_fn = function (x, y) {
        return _Browser_withWindow(function () {
            _Browser_window.scroll(x, y);
            return _Utils_Tuple0;
        });
    }, _Browser_setViewport = F2(_Browser_setViewport_fn);
    function _Browser_getViewportOf(id) {
        return _Browser_withNode(id, function (node) {
            return {
                b_: {
                    a6: node.scrollWidth,
                    aU: node.scrollHeight
                },
                ca: {
                    cd: node.scrollLeft,
                    ce: node.scrollTop,
                    a6: node.clientWidth,
                    aU: node.clientHeight
                }
            };
        });
    }
    var _Browser_setViewportOf_fn = function (id, x, y) {
        return _Browser_withNode(id, function (node) {
            node.scrollLeft = x;
            node.scrollTop = y;
            return _Utils_Tuple0;
        });
    }, _Browser_setViewportOf = F3(_Browser_setViewportOf_fn);
    function _Browser_getElement(id) {
        return _Browser_withNode(id, function (node) {
            var rect = node.getBoundingClientRect();
            var x = _Browser_window.pageXOffset;
            var y = _Browser_window.pageYOffset;
            return {
                b_: _Browser_getScene(),
                ca: {
                    cd: x,
                    ce: y,
                    a6: _Browser_doc.documentElement.clientWidth,
                    aU: _Browser_doc.documentElement.clientHeight
                },
                cT: {
                    cd: x + rect.left,
                    ce: y + rect.top,
                    a6: rect.width,
                    aU: rect.height
                }
            };
        });
    }
    function _Browser_reload(skipCache) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function (callback) {
            _VirtualDom_doc.location.reload(skipCache);
        }));
    }
    function _Browser_load(url) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function (callback) {
            try {
                _Browser_window.location = url;
            }
            catch (err) {
                _VirtualDom_doc.location.reload(false);
            }
        }));
    }
    var _Http_toTask_fn = function (router, toTask, request) {
        return _Scheduler_binding(function (callback) {
            function done(response) {
                callback(toTask(request.cU.a(response)));
            }
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("error", function () { done($elm$http$Http$NetworkError_); });
            xhr.addEventListener("timeout", function () { done($elm$http$Http$Timeout_); });
            xhr.addEventListener("load", function () { done(_Http_toResponse(request.cU.b, xhr)); });
            $elm$core$Maybe$isJust(request.b5) && _Http_track(router, xhr, request.b5.a);
            try {
                xhr.open(request.de, request.f, true);
            }
            catch (e) {
                return done($elm$http$Http$BadUrl_(request.f));
            }
            _Http_configureRequest(xhr, request);
            request.cy.a && xhr.setRequestHeader("Content-Type", request.cy.a);
            xhr.send(request.cy.b);
            return function () { xhr.c = true; xhr.abort(); };
        });
    }, _Http_toTask = F3(_Http_toTask_fn);
    function _Http_configureRequest(xhr, request) {
        for (var headers = request.bt; headers.b; headers = headers.b) {
            xhr.setRequestHeader(headers.a.a, headers.a.b);
        }
        xhr.timeout = request.d1.a || 0;
        xhr.responseType = request.cU.d;
        xhr.withCredentials = request.cq;
    }
    function _Http_toResponse(toBody, xhr) {
        return A2(200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_, _Http_toMetadata(xhr), toBody(xhr.response));
    }
    function _Http_toMetadata(xhr) {
        return {
            f: xhr.responseURL,
            dH: xhr.status,
            dI: xhr.statusText,
            bt: _Http_parseHeaders(xhr.getAllResponseHeaders())
        };
    }
    function _Http_parseHeaders(rawHeaders) {
        if (!rawHeaders) {
            return $elm$core$Dict$empty;
        }
        var headers = $elm$core$Dict$empty;
        var headerPairs = rawHeaders.split("\r\n");
        for (var i = headerPairs.length; i--;) {
            var headerPair = headerPairs[i];
            var index = headerPair.indexOf(": ");
            if (index > 0) {
                var key = headerPair.substring(0, index);
                var value = headerPair.substring(index + 2);
                headers = $elm$core$Dict$update_fn(key, function (oldValue) {
                    return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
                        ? value + ", " + oldValue.a
                        : value);
                }, headers);
            }
        }
        return headers;
    }
    var _Http_expect_fn = function (type, toBody, toValue) {
        return {
            $: 0,
            d: type,
            b: toBody,
            a: toValue
        };
    }, _Http_expect = F3(_Http_expect_fn);
    var _Http_mapExpect_fn = function (func, expect) {
        return {
            $: 0,
            d: expect.d,
            b: expect.b,
            a: function (x) { return func(expect.a(x)); }
        };
    }, _Http_mapExpect = F2(_Http_mapExpect_fn);
    function _Http_toDataView(arrayBuffer) {
        return new DataView(arrayBuffer);
    }
    var _Http_emptyBody = { $: 0 };
    var _Http_pair_fn = function (a, b) { return { $: 0, a: a, b: b }; }, _Http_pair = F2(_Http_pair_fn);
    function _Http_toFormData(parts) {
        for (var formData = new FormData(); parts.b; parts = parts.b) {
            var part = parts.a;
            formData.append(part.a, part.b);
        }
        return formData;
    }
    var _Http_bytesToBlob_fn = function (mime, bytes) {
        return new Blob([bytes], { type: mime });
    }, _Http_bytesToBlob = F2(_Http_bytesToBlob_fn);
    function _Http_track(router, xhr, tracker) {
        xhr.upload.addEventListener("progress", function (event) {
            if (xhr.c) {
                return;
            }
            _Scheduler_rawSpawn(_Platform_sendToSelf_fn(router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
                dA: event.loaded,
                b1: event.total
            }))));
        });
        xhr.addEventListener("progress", function (event) {
            if (xhr.c) {
                return;
            }
            _Scheduler_rawSpawn(_Platform_sendToSelf_fn(router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
                dr: event.loaded,
                b1: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
            }))));
        });
    }
    function _Url_percentEncode(string) {
        return encodeURIComponent(string);
    }
    function _Url_percentDecode(string) {
        try {
            return $elm$core$Maybe$Just(decodeURIComponent(string));
        }
        catch (e) {
            return $elm$core$Maybe$Nothing;
        }
    }
    var _Bitwise_and_fn = function (a, b) {
        return a & b;
    }, _Bitwise_and = F2(_Bitwise_and_fn);
    var _Bitwise_or_fn = function (a, b) {
        return a | b;
    }, _Bitwise_or = F2(_Bitwise_or_fn);
    var _Bitwise_xor_fn = function (a, b) {
        return a ^ b;
    }, _Bitwise_xor = F2(_Bitwise_xor_fn);
    function _Bitwise_complement(a) {
        return ~a;
    }
    ;
    var _Bitwise_shiftLeftBy_fn = function (offset, a) {
        return a << offset;
    }, _Bitwise_shiftLeftBy = F2(_Bitwise_shiftLeftBy_fn);
    var _Bitwise_shiftRightBy_fn = function (offset, a) {
        return a >> offset;
    }, _Bitwise_shiftRightBy = F2(_Bitwise_shiftRightBy_fn);
    var _Bitwise_shiftRightZfBy_fn = function (offset, a) {
        return a >>> offset;
    }, _Bitwise_shiftRightZfBy = F2(_Bitwise_shiftRightZfBy_fn);
    var _Parser_isSubString_fn = function (smallString, offset, row, col, bigString) {
        var smallLength = smallString.length;
        var isGood = offset + smallLength <= bigString.length;
        for (var i = 0; isGood && i < smallLength;) {
            var code = bigString.charCodeAt(offset);
            isGood =
                smallString[i++] === bigString[offset++]
                    && (code === 10
                        ? (row++, col = 1)
                        : (col++, (code & 63488) === 55296 ? smallString[i++] === bigString[offset++] : 1));
        }
        return _Utils_Tuple3(isGood ? offset : -1, row, col);
    }, _Parser_isSubString = F5(_Parser_isSubString_fn);
    var _Parser_isSubChar_fn = function (predicate, offset, string) {
        return (string.length <= offset
            ? -1
            :
                (string.charCodeAt(offset) & 63488) === 55296
                    ? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
                    :
                        (predicate(_Utils_chr(string[offset]))
                            ? ((string[offset] === "\n") ? -2 : (offset + 1))
                            : -1));
    }, _Parser_isSubChar = F3(_Parser_isSubChar_fn);
    var _Parser_isAsciiCode_fn = function (code, offset, string) {
        return string.charCodeAt(offset) === code;
    }, _Parser_isAsciiCode = F3(_Parser_isAsciiCode_fn);
    var _Parser_chompBase10_fn = function (offset, string) {
        for (; offset < string.length; offset++) {
            var code = string.charCodeAt(offset);
            if (code < 48 || 57 < code) {
                return offset;
            }
        }
        return offset;
    }, _Parser_chompBase10 = F2(_Parser_chompBase10_fn);
    var _Parser_consumeBase_fn = function (base, offset, string) {
        for (var total = 0; offset < string.length; offset++) {
            var digit = string.charCodeAt(offset) - 48;
            if (digit < 0 || base <= digit)
                break;
            total = base * total + digit;
        }
        return _Utils_Tuple2(offset, total);
    }, _Parser_consumeBase = F3(_Parser_consumeBase_fn);
    var _Parser_consumeBase16_fn = function (offset, string) {
        for (var total = 0; offset < string.length; offset++) {
            var code = string.charCodeAt(offset);
            if (48 <= code && code <= 57) {
                total = 16 * total + code - 48;
            }
            else if (65 <= code && code <= 70) {
                total = 16 * total + code - 55;
            }
            else if (97 <= code && code <= 102) {
                total = 16 * total + code - 87;
            }
            else {
                break;
            }
        }
        return _Utils_Tuple2(offset, total);
    }, _Parser_consumeBase16 = F2(_Parser_consumeBase16_fn);
    var _Parser_findSubString_fn = function (smallString, offset, row, col, bigString) {
        var newOffset = bigString.indexOf(smallString, offset);
        var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;
        while (offset < target) {
            var code = bigString.charCodeAt(offset++);
            code === 10
                ? (col = 1, row++)
                : (col++, (code & 63488) === 55296 && offset++);
        }
        return _Utils_Tuple3(newOffset, row, col);
    }, _Parser_findSubString = F5(_Parser_findSubString_fn);
    var $author$project$Main$LinkClicked = function (a) {
        return { $: 4, a: a };
    };
    var $author$project$Main$UrlChanged = function (a) {
        return { $: 3, a: a };
    };
    var $elm$core$List$cons = _List_cons;
    var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
    var $elm$core$Array$foldr_fn = function (func, baseCase, _v0) {
        var tree = _v0.c;
        var tail = _v0.d;
        var helper = F2(function (node, acc) {
            if (!node.$) {
                var subTree = node.a;
                return _JsArray_foldr_fn(helper, acc, subTree);
            }
            else {
                var values = node.a;
                return _JsArray_foldr_fn(func, acc, values);
            }
        });
        return _JsArray_foldr_fn(helper, _JsArray_foldr_fn(func, baseCase, tail), tree);
    }, $elm$core$Array$foldr = F3($elm$core$Array$foldr_fn);
    var $elm$core$Array$toList = function (array) {
        return $elm$core$Array$foldr_fn($elm$core$List$cons, _List_Nil, array);
    };
    var $elm$core$Dict$foldr_fn = function (func, acc, t) {
        foldr: while (true) {
            if (t.$ === -2) {
                return acc;
            }
            else {
                var key = t.b;
                var value = t.c;
                var left = t.d;
                var right = t.e;
                var $temp$func = func, $temp$acc = A3(func, key, value, $elm$core$Dict$foldr_fn(func, acc, right)), $temp$t = left;
                func = $temp$func;
                acc = $temp$acc;
                t = $temp$t;
                continue foldr;
            }
        }
    }, $elm$core$Dict$foldr_fn_unwrapped = function (func, acc, t) {
        foldr: while (true) {
            if (t.$ === -2) {
                return acc;
            }
            else {
                var key = t.b;
                var value = t.c;
                var left = t.d;
                var right = t.e;
                var $temp$func = func, $temp$acc = func(key, value, $elm$core$Dict$foldr_fn_unwrapped(func, acc, right)), $temp$t = left;
                func = $temp$func;
                acc = $temp$acc;
                t = $temp$t;
                continue foldr;
            }
        }
    }, $elm$core$Dict$foldr = F3($elm$core$Dict$foldr_fn);
    var $elm$core$Dict$toList = function (dict) {
        return $elm$core$Dict$foldr_fn_unwrapped(function (key, value, list) {
            return _List_Cons(_Utils_Tuple2(key, value), list);
        }, _List_Nil, dict);
    };
    var $elm$core$Dict$keys = function (dict) {
        return $elm$core$Dict$foldr_fn_unwrapped(function (key, value, keyList) {
            return _List_Cons(key, keyList);
        }, _List_Nil, dict);
    };
    var $elm$core$Set$toList = function (_v0) {
        var dict = _v0;
        return $elm$core$Dict$keys(dict);
    };
    var $elm$core$Basics$EQ = 1;
    var $elm$core$Basics$GT = 2;
    var $elm$core$Basics$LT = 0;
    var $elm$core$Result$Err = function (a) {
        return { $: 1, a: a };
    };
    var $elm$json$Json$Decode$Failure_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $elm$json$Json$Decode$Failure = F2($elm$json$Json$Decode$Failure_fn);
    var $elm$json$Json$Decode$Field_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$json$Json$Decode$Field = F2($elm$json$Json$Decode$Field_fn);
    var $elm$json$Json$Decode$Index_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $elm$json$Json$Decode$Index = F2($elm$json$Json$Decode$Index_fn);
    var $elm$core$Result$Ok = function (a) {
        return { $: 0, a: a };
    };
    var $elm$json$Json$Decode$OneOf = function (a) {
        return { $: 2, a: a };
    };
    var $elm$core$Basics$False = 1;
    var $elm$core$Basics$add = _Basics_add;
    var $elm$core$Maybe$Just = function (a) { return { $: 0, a: a }; };
    var $elm$core$Maybe$Nothing = { $: 1, a: null };
    var $elm$core$String$all = _String_all;
    var $elm$core$Basics$and = _Basics_and;
    var $elm$core$Basics$append = _Utils_append;
    var $elm$json$Json$Encode$encode = _Json_encode;
    var $elm$core$String$fromInt = _String_fromNumber;
    var $elm$core$String$join_fn = function (sep, chunks) {
        return _String_join_fn(sep, _List_toArray(chunks));
    }, $elm$core$String$join = F2($elm$core$String$join_fn);
    var $elm$core$String$split_fn = function (sep, string) {
        return _List_fromArray(_String_split_fn(sep, string));
    }, $elm$core$String$split = F2($elm$core$String$split_fn);
    var $elm$json$Json$Decode$indent = function (str) {
        return $elm$core$String$join_fn("\n    ", $elm$core$String$split_fn("\n", str));
    };
    var $elm$core$List$foldl_fn = function (func, acc, list) {
        foldl: while (true) {
            if (!list.b) {
                return acc;
            }
            else {
                var x = list.a;
                var xs = list.b;
                var $temp$func = func, $temp$acc = A2(func, x, acc), $temp$list = xs;
                func = $temp$func;
                acc = $temp$acc;
                list = $temp$list;
                continue foldl;
            }
        }
    }, $elm$core$List$foldl_fn_unwrapped = function (func, acc, list) {
        foldl: while (true) {
            if (!list.b) {
                return acc;
            }
            else {
                var x = list.a;
                var xs = list.b;
                var $temp$func = func, $temp$acc = func(x, acc), $temp$list = xs;
                func = $temp$func;
                acc = $temp$acc;
                list = $temp$list;
                continue foldl;
            }
        }
    }, $elm$core$List$foldl = F3($elm$core$List$foldl_fn);
    var $elm$core$List$length = function (xs) {
        return $elm$core$List$foldl_fn_unwrapped(function (_v0, i) {
            return i + 1;
        }, 0, xs);
    };
    var $elm$core$List$map2 = _List_map2;
    var $elm$core$Basics$le = _Utils_le;
    var $elm$core$Basics$sub = _Basics_sub;
    var $elm$core$List$rangeHelp_fn = function (lo, hi, list) {
        rangeHelp: while (true) {
            if (_Utils_cmp(lo, hi) < 1) {
                var $temp$lo = lo, $temp$hi = hi - 1, $temp$list = _List_Cons(hi, list);
                lo = $temp$lo;
                hi = $temp$hi;
                list = $temp$list;
                continue rangeHelp;
            }
            else {
                return list;
            }
        }
    }, $elm$core$List$rangeHelp = F3($elm$core$List$rangeHelp_fn);
    var $elm$core$List$range_fn = function (lo, hi) {
        return $elm$core$List$rangeHelp_fn(lo, hi, _List_Nil);
    }, $elm$core$List$range = F2($elm$core$List$range_fn);
    var $elm$core$List$indexedMap_fn = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (var i = 0; xs.b; i++, xs = xs.b) {
            var next = _List_Cons(A2(f, i, xs.a), _List_Nil);
            end.b = next;
            end = next;
        }
        return tmp.b;
    }, $elm$core$List$indexedMap_fn_unwrapped = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (var i = 0; xs.b; i++, xs = xs.b) {
            var next = _List_Cons(f(i, xs.a), _List_Nil);
            end.b = next;
            end = next;
        }
        return tmp.b;
    }, $elm$core$List$indexedMap = F2($elm$core$List$indexedMap_fn);
    var $elm$core$Char$toCode = _Char_toCode;
    var $elm$core$Char$isLower = function (_char) {
        var code = $elm$core$Char$toCode(_char);
        return (97 <= code) && (code <= 122);
    };
    var $elm$core$Char$isUpper = function (_char) {
        var code = $elm$core$Char$toCode(_char);
        return (code <= 90) && (65 <= code);
    };
    var $elm$core$Basics$or = _Basics_or;
    var $elm$core$Char$isAlpha = function (_char) {
        return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
    };
    var $elm$core$Char$isDigit = function (_char) {
        var code = $elm$core$Char$toCode(_char);
        return (code <= 57) && (48 <= code);
    };
    var $elm$core$Char$isAlphaNum = function (_char) {
        return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
    };
    var $elm$core$List$reverse = function (list) {
        return $elm$core$List$foldl_fn($elm$core$List$cons, _List_Nil, list);
    };
    var $elm$core$String$uncons = _String_uncons;
    var $elm$json$Json$Decode$errorOneOf_fn = function (i, error) {
        return "\n\n(" + ($elm$core$String$fromInt(i + 1) + (") " + $elm$json$Json$Decode$indent($elm$json$Json$Decode$errorToString(error))));
    }, $elm$json$Json$Decode$errorOneOf = F2($elm$json$Json$Decode$errorOneOf_fn);
    var $elm$json$Json$Decode$errorToString = function (error) {
        return $elm$json$Json$Decode$errorToStringHelp_fn(error, _List_Nil);
    };
    var $elm$json$Json$Decode$errorToStringHelp_fn = function (error, context) {
        errorToStringHelp: while (true) {
            switch (error.$) {
                case 0:
                    var f = error.a;
                    var err = error.b;
                    var isSimple = function () {
                        var _v1 = $elm$core$String$uncons(f);
                        if (_v1.$ === 1) {
                            return false;
                        }
                        else {
                            var _v2 = _v1.a;
                            var _char = _v2.a;
                            var rest = _v2.b;
                            return $elm$core$Char$isAlpha(_char) && _String_all_fn($elm$core$Char$isAlphaNum, rest);
                        }
                    }();
                    var fieldName = isSimple ? ("." + f) : ("['" + (f + "']"));
                    var $temp$error = err, $temp$context = _List_Cons(fieldName, context);
                    error = $temp$error;
                    context = $temp$context;
                    continue errorToStringHelp;
                case 1:
                    var i = error.a;
                    var err = error.b;
                    var indexName = "[" + ($elm$core$String$fromInt(i) + "]");
                    var $temp$error = err, $temp$context = _List_Cons(indexName, context);
                    error = $temp$error;
                    context = $temp$context;
                    continue errorToStringHelp;
                case 2:
                    var errors = error.a;
                    if (!errors.b) {
                        return "Ran into a Json.Decode.oneOf with no possibilities" + function () {
                            if (!context.b) {
                                return "!";
                            }
                            else {
                                return " at json" + $elm$core$String$join_fn("", $elm$core$List$reverse(context));
                            }
                        }();
                    }
                    else {
                        if (!errors.b.b) {
                            var err = errors.a;
                            var $temp$error = err, $temp$context = context;
                            error = $temp$error;
                            context = $temp$context;
                            continue errorToStringHelp;
                        }
                        else {
                            var starter = function () {
                                if (!context.b) {
                                    return "Json.Decode.oneOf";
                                }
                                else {
                                    return "The Json.Decode.oneOf at json" + $elm$core$String$join_fn("", $elm$core$List$reverse(context));
                                }
                            }();
                            var introduction = starter + (" failed in the following " + ($elm$core$String$fromInt($elm$core$List$length(errors)) + " ways:"));
                            return $elm$core$String$join_fn("\n\n", _List_Cons(introduction, $elm$core$List$indexedMap_fn($elm$json$Json$Decode$errorOneOf, errors)));
                        }
                    }
                default:
                    var msg = error.a;
                    var json = error.b;
                    var introduction = function () {
                        if (!context.b) {
                            return "Problem with the given value:\n\n";
                        }
                        else {
                            return "Problem with the value at json" + ($elm$core$String$join_fn("", $elm$core$List$reverse(context)) + ":\n\n    ");
                        }
                    }();
                    return introduction + ($elm$json$Json$Decode$indent(_Json_encode_fn(4, json)) + ("\n\n" + msg));
            }
        }
    }, $elm$json$Json$Decode$errorToStringHelp = F2($elm$json$Json$Decode$errorToStringHelp_fn);
    var $elm$core$Array$branchFactor = 32;
    var $elm$core$Array$Array_elm_builtin_fn = function (a, b, c, d) {
        return { $: 0, a: a, b: b, c: c, d: d };
    }, $elm$core$Array$Array_elm_builtin = F4($elm$core$Array$Array_elm_builtin_fn);
    var $elm$core$Elm$JsArray$empty = _JsArray_empty;
    var $elm$core$Basics$ceiling = _Basics_ceiling;
    var $elm$core$Basics$fdiv = _Basics_fdiv;
    var $elm$core$Basics$logBase_fn = function (base, number) {
        return _Basics_log(number) / _Basics_log(base);
    }, $elm$core$Basics$logBase = F2($elm$core$Basics$logBase_fn);
    var $elm$core$Basics$toFloat = _Basics_toFloat;
    var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling($elm$core$Basics$logBase_fn(2, $elm$core$Array$branchFactor));
    var $elm$core$Array$empty = $elm$core$Array$Array_elm_builtin_fn(0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
    var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
    var $elm$core$Array$Leaf = function (a) {
        return { $: 1, a: a };
    };
    var $elm$core$Basics$apL_fn = function (f, x) {
        return f(x);
    }, $elm$core$Basics$apL = F2($elm$core$Basics$apL_fn);
    var $elm$core$Basics$apR_fn = function (x, f) {
        return f(x);
    }, $elm$core$Basics$apR = F2($elm$core$Basics$apR_fn);
    var $elm$core$Basics$eq = _Utils_equal;
    var $elm$core$Basics$floor = _Basics_floor;
    var $elm$core$Elm$JsArray$length = _JsArray_length;
    var $elm$core$Basics$gt = _Utils_gt;
    var $elm$core$Basics$max_fn = function (x, y) {
        return (_Utils_cmp(x, y) > 0) ? x : y;
    }, $elm$core$Basics$max = F2($elm$core$Basics$max_fn);
    var $elm$core$Basics$mul = _Basics_mul;
    var $elm$core$Array$SubTree = function (a) {
        return { $: 0, a: a };
    };
    var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
    var $elm$core$Array$compressNodes_fn = function (nodes, acc) {
        compressNodes: while (true) {
            var _v0 = _JsArray_initializeFromList_fn($elm$core$Array$branchFactor, nodes);
            var node = _v0.a;
            var remainingNodes = _v0.b;
            var newAcc = _List_Cons($elm$core$Array$SubTree(node), acc);
            if (!remainingNodes.b) {
                return $elm$core$List$reverse(newAcc);
            }
            else {
                var $temp$nodes = remainingNodes, $temp$acc = newAcc;
                nodes = $temp$nodes;
                acc = $temp$acc;
                continue compressNodes;
            }
        }
    }, $elm$core$Array$compressNodes = F2($elm$core$Array$compressNodes_fn);
    var $elm$core$Tuple$first = function (_v0) {
        var x = _v0.a;
        return x;
    };
    var $elm$core$Array$treeFromBuilder_fn = function (nodeList, nodeListSize) {
        treeFromBuilder: while (true) {
            var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
            if (newNodeSize === 1) {
                return _JsArray_initializeFromList_fn($elm$core$Array$branchFactor, nodeList).a;
            }
            else {
                var $temp$nodeList = $elm$core$Array$compressNodes_fn(nodeList, _List_Nil), $temp$nodeListSize = newNodeSize;
                nodeList = $temp$nodeList;
                nodeListSize = $temp$nodeListSize;
                continue treeFromBuilder;
            }
        }
    }, $elm$core$Array$treeFromBuilder = F2($elm$core$Array$treeFromBuilder_fn);
    var $elm$core$Array$builderToArray_fn = function (reverseNodeList, builder) {
        if (!builder.i) {
            return $elm$core$Array$Array_elm_builtin_fn($elm$core$Elm$JsArray$length(builder.k), $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, builder.k);
        }
        else {
            var treeLen = builder.i * $elm$core$Array$branchFactor;
            var depth = $elm$core$Basics$floor($elm$core$Basics$logBase_fn($elm$core$Array$branchFactor, treeLen - 1));
            var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.l) : builder.l;
            var tree = $elm$core$Array$treeFromBuilder_fn(correctNodeList, builder.i);
            return $elm$core$Array$Array_elm_builtin_fn($elm$core$Elm$JsArray$length(builder.k) + treeLen, $elm$core$Basics$max_fn(5, depth * $elm$core$Array$shiftStep), tree, builder.k);
        }
    }, $elm$core$Array$builderToArray = F2($elm$core$Array$builderToArray_fn);
    var $elm$core$Basics$idiv = _Basics_idiv;
    var $elm$core$Basics$lt = _Utils_lt;
    var $elm$core$Array$initializeHelp_fn = function (fn, fromIndex, len, nodeList, tail) {
        initializeHelp: while (true) {
            if (fromIndex < 0) {
                return $elm$core$Array$builderToArray_fn(false, { l: nodeList, i: (len / $elm$core$Array$branchFactor) | 0, k: tail });
            }
            else {
                var leaf = $elm$core$Array$Leaf(_JsArray_initialize_fn($elm$core$Array$branchFactor, fromIndex, fn));
                var $temp$fn = fn, $temp$fromIndex = fromIndex - $elm$core$Array$branchFactor, $temp$len = len, $temp$nodeList = _List_Cons(leaf, nodeList), $temp$tail = tail;
                fn = $temp$fn;
                fromIndex = $temp$fromIndex;
                len = $temp$len;
                nodeList = $temp$nodeList;
                tail = $temp$tail;
                continue initializeHelp;
            }
        }
    }, $elm$core$Array$initializeHelp = F5($elm$core$Array$initializeHelp_fn);
    var $elm$core$Basics$remainderBy = _Basics_remainderBy;
    var $elm$core$Array$initialize_fn = function (len, fn) {
        if (len <= 0) {
            return $elm$core$Array$empty;
        }
        else {
            var tailLen = len % $elm$core$Array$branchFactor;
            var tail = _JsArray_initialize_fn(tailLen, len - tailLen, fn);
            var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
            return $elm$core$Array$initializeHelp_fn(fn, initialFromIndex, len, _List_Nil, tail);
        }
    }, $elm$core$Array$initialize = F2($elm$core$Array$initialize_fn);
    var $elm$core$Basics$True = 0;
    var $elm$core$Result$isOk = function (result) {
        if (!result.$) {
            return true;
        }
        else {
            return false;
        }
    };
    var $elm$json$Json$Decode$andThen = _Json_andThen;
    var $elm$json$Json$Decode$map = _Json_map1;
    var $elm$json$Json$Decode$map2 = _Json_map2;
    var $elm$json$Json$Decode$succeed = _Json_succeed;
    var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
        switch (handler.$) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 2;
            default:
                return 3;
        }
    };
    var $elm$browser$Browser$External = function (a) {
        return { $: 1, a: a };
    };
    var $elm$browser$Browser$Internal = function (a) {
        return { $: 0, a: a };
    };
    var $elm$core$Basics$identity = function (x) {
        return x;
    };
    var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
    var $elm$url$Url$Http = 0;
    var $elm$url$Url$Https = 1;
    var $elm$url$Url$Url_fn = function (protocol, host, port_, path, query, fragment) {
        return { bq: fragment, bx: host, dp: path, bO: port_, bS: protocol, ag: query };
    }, $elm$url$Url$Url = F6($elm$url$Url$Url_fn);
    var $elm$core$String$contains = _String_contains;
    var $elm$core$String$length = _String_length;
    var $elm$core$String$slice = _String_slice;
    var $elm$core$String$dropLeft_fn = function (n, string) {
        return (n < 1) ? string : _String_slice_fn(n, $elm$core$String$length(string), string);
    }, $elm$core$String$dropLeft = F2($elm$core$String$dropLeft_fn);
    var $elm$core$String$indexes = _String_indexes;
    var $elm$core$String$isEmpty = function (string) {
        return string === "";
    };
    var $elm$core$String$left_fn = function (n, string) {
        return (n < 1) ? "" : _String_slice_fn(0, n, string);
    }, $elm$core$String$left = F2($elm$core$String$left_fn);
    var $elm$core$String$toInt = _String_toInt;
    var $elm$url$Url$chompBeforePath_fn = function (protocol, path, params, frag, str) {
        if ($elm$core$String$isEmpty(str) || _String_contains_fn("@", str)) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var _v0 = _String_indexes_fn(":", str);
            if (!_v0.b) {
                return $elm$core$Maybe$Just($elm$url$Url$Url_fn(protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
            }
            else {
                if (!_v0.b.b) {
                    var i = _v0.a;
                    var _v1 = $elm$core$String$toInt($elm$core$String$dropLeft_fn(i + 1, str));
                    if (_v1.$ === 1) {
                        return $elm$core$Maybe$Nothing;
                    }
                    else {
                        var port_ = _v1;
                        return $elm$core$Maybe$Just($elm$url$Url$Url_fn(protocol, $elm$core$String$left_fn(i, str), port_, path, params, frag));
                    }
                }
                else {
                    return $elm$core$Maybe$Nothing;
                }
            }
        }
    }, $elm$url$Url$chompBeforePath = F5($elm$url$Url$chompBeforePath_fn);
    var $elm$url$Url$chompBeforeQuery_fn = function (protocol, params, frag, str) {
        if ($elm$core$String$isEmpty(str)) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var _v0 = _String_indexes_fn("/", str);
            if (!_v0.b) {
                return $elm$url$Url$chompBeforePath_fn(protocol, "/", params, frag, str);
            }
            else {
                var i = _v0.a;
                return $elm$url$Url$chompBeforePath_fn(protocol, $elm$core$String$dropLeft_fn(i, str), params, frag, $elm$core$String$left_fn(i, str));
            }
        }
    }, $elm$url$Url$chompBeforeQuery = F4($elm$url$Url$chompBeforeQuery_fn);
    var $elm$url$Url$chompBeforeFragment_fn = function (protocol, frag, str) {
        if ($elm$core$String$isEmpty(str)) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var _v0 = _String_indexes_fn("?", str);
            if (!_v0.b) {
                return $elm$url$Url$chompBeforeQuery_fn(protocol, $elm$core$Maybe$Nothing, frag, str);
            }
            else {
                var i = _v0.a;
                return $elm$url$Url$chompBeforeQuery_fn(protocol, $elm$core$Maybe$Just($elm$core$String$dropLeft_fn(i + 1, str)), frag, $elm$core$String$left_fn(i, str));
            }
        }
    }, $elm$url$Url$chompBeforeFragment = F3($elm$url$Url$chompBeforeFragment_fn);
    var $elm$url$Url$chompAfterProtocol_fn = function (protocol, str) {
        if ($elm$core$String$isEmpty(str)) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var _v0 = _String_indexes_fn("#", str);
            if (!_v0.b) {
                return $elm$url$Url$chompBeforeFragment_fn(protocol, $elm$core$Maybe$Nothing, str);
            }
            else {
                var i = _v0.a;
                return $elm$url$Url$chompBeforeFragment_fn(protocol, $elm$core$Maybe$Just($elm$core$String$dropLeft_fn(i + 1, str)), $elm$core$String$left_fn(i, str));
            }
        }
    }, $elm$url$Url$chompAfterProtocol = F2($elm$url$Url$chompAfterProtocol_fn);
    var $elm$core$String$startsWith = _String_startsWith;
    var $elm$url$Url$fromString = function (str) {
        return _String_startsWith_fn("http://", str) ? $elm$url$Url$chompAfterProtocol_fn(0, $elm$core$String$dropLeft_fn(7, str)) : (_String_startsWith_fn("https://", str) ? $elm$url$Url$chompAfterProtocol_fn(1, $elm$core$String$dropLeft_fn(8, str)) : $elm$core$Maybe$Nothing);
    };
    var $elm$core$Basics$never = function (_v0) {
        never: while (true) {
            var nvr = _v0;
            var $temp$_v0 = nvr;
            _v0 = $temp$_v0;
            continue never;
        }
    };
    var $elm$core$Task$Perform = $elm$core$Basics$identity;
    var $elm$core$Task$succeed = _Scheduler_succeed;
    var $elm$core$Task$init = $elm$core$Task$succeed(0);
    var $elm$core$List$foldrHelper_fn = function (fn, acc, ctr, ls) {
        if (!ls.b) {
            return acc;
        }
        else {
            var a = ls.a;
            var r1 = ls.b;
            if (!r1.b) {
                return A2(fn, a, acc);
            }
            else {
                var b = r1.a;
                var r2 = r1.b;
                if (!r2.b) {
                    return A2(fn, a, A2(fn, b, acc));
                }
                else {
                    var c = r2.a;
                    var r3 = r2.b;
                    if (!r3.b) {
                        return A2(fn, a, A2(fn, b, A2(fn, c, acc)));
                    }
                    else {
                        var d = r3.a;
                        var r4 = r3.b;
                        var res = (ctr > 500) ? $elm$core$List$foldl_fn(fn, acc, $elm$core$List$reverse(r4)) : $elm$core$List$foldrHelper_fn(fn, acc, ctr + 1, r4);
                        return A2(fn, a, A2(fn, b, A2(fn, c, A2(fn, d, res))));
                    }
                }
            }
        }
    }, $elm$core$List$foldrHelper_fn_unwrapped = function (fn, acc, ctr, ls) {
        if (!ls.b) {
            return acc;
        }
        else {
            var a = ls.a;
            var r1 = ls.b;
            if (!r1.b) {
                return fn(a, acc);
            }
            else {
                var b = r1.a;
                var r2 = r1.b;
                if (!r2.b) {
                    return fn(a, fn(b, acc));
                }
                else {
                    var c = r2.a;
                    var r3 = r2.b;
                    if (!r3.b) {
                        return fn(a, fn(b, fn(c, acc)));
                    }
                    else {
                        var d = r3.a;
                        var r4 = r3.b;
                        var res = (ctr > 500) ? $elm$core$List$foldl_fn_unwrapped(fn, acc, $elm$core$List$reverse(r4)) : $elm$core$List$foldrHelper_fn_unwrapped(fn, acc, ctr + 1, r4);
                        return fn(a, fn(b, fn(c, fn(d, res))));
                    }
                }
            }
        }
    }, $elm$core$List$foldrHelper = F4($elm$core$List$foldrHelper_fn);
    var $elm$core$List$foldr_fn = function (fn, acc, ls) {
        return $elm$core$List$foldrHelper_fn(fn, acc, 0, ls);
    }, $elm$core$List$foldr = F3($elm$core$List$foldr_fn);
    var $elm$core$List$map_fn = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; xs.b; xs
            = xs.b) {
            var next = _List_Cons(f(xs.a), _List_Nil);
            end.b = next;
            end = next;
        }
        return tmp.b;
    }, $elm$core$List$map = F2($elm$core$List$map_fn);
    var $elm$core$Task$andThen = _Scheduler_andThen;
    var $elm$core$Task$map_fn = function (func, taskA) {
        return _Scheduler_andThen_fn(function (a) {
            return $elm$core$Task$succeed(func(a));
        }, taskA);
    }, $elm$core$Task$map = F2($elm$core$Task$map_fn);
    var $elm$core$Task$map2_fn = function (func, taskA, taskB) {
        return _Scheduler_andThen_fn(function (a) {
            return _Scheduler_andThen_fn(function (b) {
                return $elm$core$Task$succeed(A2(func, a, b));
            }, taskB);
        }, taskA);
    }, $elm$core$Task$map2_fn_unwrapped = function (func, taskA, taskB) {
        return _Scheduler_andThen_fn(function (a) {
            return _Scheduler_andThen_fn(function (b) {
                return $elm$core$Task$succeed(func(a, b));
            }, taskB);
        }, taskA);
    }, $elm$core$Task$map2 = F3($elm$core$Task$map2_fn);
    var $elm$core$Task$sequence = function (tasks) {
        return $elm$core$List$foldr_fn($elm$core$Task$map2($elm$core$List$cons), $elm$core$Task$succeed(_List_Nil), tasks);
    };
    var $elm$core$Platform$sendToApp = _Platform_sendToApp;
    var $elm$core$Task$spawnCmd_fn = function (router, _v0) {
        var task = _v0;
        return _Scheduler_spawn(_Scheduler_andThen_fn($elm$core$Platform$sendToApp(router), task));
    }, $elm$core$Task$spawnCmd = F2($elm$core$Task$spawnCmd_fn);
    var $elm$core$Task$onEffects_fn = function (router, commands, state) {
        return $elm$core$Task$map_fn(function (_v0) {
            return 0;
        }, $elm$core$Task$sequence($elm$core$List$map_fn($elm$core$Task$spawnCmd(router), commands)));
    }, $elm$core$Task$onEffects = F3($elm$core$Task$onEffects_fn);
    var $elm$core$Task$onSelfMsg_fn = function (_v0, _v1, _v2) {
        return $elm$core$Task$succeed(0);
    }, $elm$core$Task$onSelfMsg = F3($elm$core$Task$onSelfMsg_fn);
    var $elm$core$Task$cmdMap_fn = function (tagger, _v0) {
        var task = _v0;
        return $elm$core$Task$map_fn(tagger, task);
    }, $elm$core$Task$cmdMap = F2($elm$core$Task$cmdMap_fn);
    _Platform_effectManagers["Task"] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
    var $elm$core$Task$command = _Platform_leaf("Task");
    var $elm$core$Task$perform_fn = function (toMessage, task) {
        return $elm$core$Task$command($elm$core$Task$map_fn(toMessage, task));
    }, $elm$core$Task$perform = F2($elm$core$Task$perform_fn);
    var $elm$browser$Browser$application = _Browser_application;
    var $elm$json$Json$Decode$field = _Json_decodeField;
    var $author$project$Main$GotResearch = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$Main$KeywordMainView = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$Main$KeywordsView = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$Main$RandomKeyword = 2;
    var $author$project$Main$Author = $elm$core$Basics$identity;
    var $author$project$Main$InProgress = 0;
    var $author$project$Main$Published = 1;
    var $author$project$Main$Research = function (id) {
        return function (title) {
            return function (keywords) {
                return function (created) {
                    return function (author) {
                        return function (issueId) {
                            return function (publicationStatus) {
                                return function (publication) {
                                    return function (thumbnail) {
                                        return function (_abstract) {
                                            return function (defaultPage) {
                                                return { bb: _abstract, aa: author, aD: created, ad: defaultPage, an: id, bC: issueId, v: keywords, bT: publication, aG: publicationStatus, aq: thumbnail, as: title };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    var $author$project$Main$Undecided = 2;
    var $elm_community$json_extra$Json$Decode$Extra$andMap_a0 = $elm$core$Basics$apR, $elm_community$json_extra$Json$Decode$Extra$andMap = $elm$json$Json$Decode$map2($elm_community$json_extra$Json$Decode$Extra$andMap_a0);
    var $author$project$Main$calcStatus = function (research) {
        var _v0 = research.aG;
        if (!_v0) {
            return 0;
        }
        else {
            var _v1 = research.bC;
            if (!_v1.$) {
                return 1;
            }
            else {
                return 1;
            }
        }
    };
    var $elm$json$Json$Decode$int = _Json_decodeInt;
    var $elm$json$Json$Decode$list = _Json_decodeList;
    var $elm$json$Json$Decode$oneOf = _Json_oneOf;
    var $elm$json$Json$Decode$maybe = function (decoder) {
        return $elm$json$Json$Decode$oneOf(_List_fromArray([
            _Json_map1_fn($elm$core$Maybe$Just, decoder),
            $elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
        ]));
    };
    var $elm$json$Json$Decode$string = _Json_decodeString;
    var $author$project$Main$entry = function () {
        var statusFromString = function (statusString) {
            switch (statusString) {
                case "published":
                    return 1;
                case "progress":
                    return 0;
                default:
                    return 2;
            }
        };
        var researchPublicationStatus = function (research) {
            return _Utils_update(research, {
                aG: $author$project$Main$calcStatus(research)
            });
        };
        var author = function () {
            var makeAuthor = F2(function (id, name) {
                return { an: id, T: name };
            });
            return _Json_map2_fn(makeAuthor, _Json_decodeField_fn("id", $elm$json$Json$Decode$int), _Json_decodeField_fn("name", $elm$json$Json$Decode$string));
        }();
        return _Json_map1_fn(researchPublicationStatus, _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("default-page", $elm$json$Json$Decode$string), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, $elm$json$Json$Decode$maybe(_Json_decodeField_fn("abstract", $elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, $elm$json$Json$Decode$maybe(_Json_decodeField_fn("thumb", $elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, $elm$json$Json$Decode$maybe(_Json_decodeField_fn("published", $elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_map1_fn(statusFromString, _Json_decodeField_fn("status", $elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, $elm$json$Json$Decode$maybe(_Json_decodeField_fn("issue", _Json_decodeField_fn("id", $elm$json$Json$Decode$int))), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("author", author), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("created", $elm$json$Json$Decode$string), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("keywords", $elm$json$Json$Decode$list($elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("title", $elm$json$Json$Decode$string), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("id", $elm$json$Json$Decode$int), $elm$json$Json$Decode$succeed($author$project$Main$Research)))))))))))));
    }();
    var $author$project$Main$decodeResearch = $elm$json$Json$Decode$list($author$project$Main$entry);
    var $elm$core$Dict$RBEmpty_elm_builtin = { $: -2 };
    var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
    var $author$project$Main$KeywordSet = $elm$core$Basics$identity;
    var $author$project$Main$emptyKeywordSet = $elm$core$Dict$empty;
    var $elm$json$Json$Decode$decodeString = _Json_runOnString;
    var $elm$http$Http$BadStatus__fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $elm$http$Http$BadStatus_ = F2($elm$http$Http$BadStatus__fn);
    var $elm$http$Http$BadUrl_ = function (a) {
        return { $: 0, a: a };
    };
    var $elm$http$Http$GoodStatus__fn = function (a, b) {
        return { $: 4, a: a, b: b };
    }, $elm$http$Http$GoodStatus_ = F2($elm$http$Http$GoodStatus__fn);
    var $elm$http$Http$NetworkError_ = { $: 2 };
    var $elm$http$Http$Receiving = function (a) {
        return { $: 1, a: a };
    };
    var $elm$http$Http$Sending = function (a) {
        return { $: 0, a: a };
    };
    var $elm$http$Http$Timeout_ = { $: 1 };
    var $elm$core$Maybe$isJust = function (maybe) {
        if (!maybe.$) {
            return true;
        }
        else {
            return false;
        }
    };
    var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
    var $elm$core$Basics$compare = _Utils_compare;
    var $elm$core$Dict$get_fn = function (targetKey, dict) {
        get: while (true) {
            if (dict.$ === -2) {
                return $elm$core$Maybe$Nothing;
            }
            else {
                var key = dict.b;
                var value = dict.c;
                var left = dict.d;
                var right = dict.e;
                var _v1 = _Utils_compare_fn(targetKey, key);
                switch (_v1) {
                    case 0:
                        var $temp$targetKey = targetKey, $temp$dict = left;
                        targetKey = $temp$targetKey;
                        dict = $temp$dict;
                        continue get;
                    case 1:
                        return $elm$core$Maybe$Just(value);
                    default:
                        var $temp$targetKey = targetKey, $temp$dict = right;
                        targetKey = $temp$targetKey;
                        dict = $temp$dict;
                        continue get;
                }
            }
        }
    }, $elm$core$Dict$get = F2($elm$core$Dict$get_fn);
    var $elm$core$Dict$Black = 1;
    var $elm$core$Dict$RBNode_elm_builtin_fn = function (a, b, c, d, e) {
        return { $: -1, a: a, b: b, c: c, d: d, e: e };
    }, $elm$core$Dict$RBNode_elm_builtin = F5($elm$core$Dict$RBNode_elm_builtin_fn);
    var $elm$core$Dict$Red = 0;
    var $elm$core$Dict$balance_fn = function (color, key, value, left, right) {
        if ((right.$ === -1) && (!right.a)) {
            var _v1 = right.a;
            var rK = right.b;
            var rV = right.c;
            var rLeft = right.d;
            var rRight = right.e;
            if ((left.$ === -1) && (!left.a)) {
                var _v3 = left.a;
                var lK = left.b;
                var lV = left.c;
                var lLeft = left.d;
                var lRight = left.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, $elm$core$Dict$RBNode_elm_builtin_fn(1, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(1, rK, rV, rLeft, rRight));
            }
            else {
                return $elm$core$Dict$RBNode_elm_builtin_fn(color, rK, rV, $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, left, rLeft), rRight);
            }
        }
        else {
            if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
                var _v5 = left.a;
                var lK = left.b;
                var lV = left.c;
                var _v6 = left.d;
                var _v7 = _v6.a;
                var llK = _v6.b;
                var llV = _v6.c;
                var llLeft = _v6.d;
                var llRight = _v6.e;
                var lRight = left.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, $elm$core$Dict$RBNode_elm_builtin_fn(1, llK, llV, llLeft, llRight), $elm$core$Dict$RBNode_elm_builtin_fn(1, key, value, lRight, right));
            }
            else {
                return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, left, right);
            }
        }
    }, $elm$core$Dict$balance = F5($elm$core$Dict$balance_fn);
    var $elm$core$Dict$insertHelp_fn = function (key, value, dict) {
        if (dict.$ === -2) {
            return $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
        }
        else {
            var nColor = dict.a;
            var nKey = dict.b;
            var nValue = dict.c;
            var nLeft = dict.d;
            var nRight = dict.e;
            var _v1 = _Utils_compare_fn(key, nKey);
            switch (_v1) {
                case 0:
                    return $elm$core$Dict$balance_fn(nColor, nKey, nValue, $elm$core$Dict$insertHelp_fn(key, value, nLeft), nRight);
                case 1:
                    return $elm$core$Dict$RBNode_elm_builtin_fn(nColor, nKey, value, nLeft, nRight);
                default:
                    return $elm$core$Dict$balance_fn(nColor, nKey, nValue, nLeft, $elm$core$Dict$insertHelp_fn(key, value, nRight));
            }
        }
    }, $elm$core$Dict$insertHelp = F3($elm$core$Dict$insertHelp_fn);
    var $elm$core$Dict$insert_fn = function (key, value, dict) {
        var _v0 = $elm$core$Dict$insertHelp_fn(key, value, dict);
        if ((_v0.$ === -1) && (!_v0.a)) {
            var _v1 = _v0.a;
            var k = _v0.b;
            var v = _v0.c;
            var l = _v0.d;
            var r = _v0.e;
            return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, l, r);
        }
        else {
            var x = _v0;
            return x;
        }
    }, $elm$core$Dict$insert = F3($elm$core$Dict$insert_fn);
    var $elm$core$Dict$getMin = function (dict) {
        getMin: while (true) {
            if ((dict.$ === -1) && (dict.d.$ === -1)) {
                var left = dict.d;
                var $temp$dict = left;
                dict = $temp$dict;
                continue getMin;
            }
            else {
                return dict;
            }
        }
    };
    var $elm$core$Dict$moveRedLeft = function (dict) {
        if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
            if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
                var clr = dict.a;
                var k = dict.b;
                var v = dict.c;
                var _v1 = dict.d;
                var lClr = _v1.a;
                var lK = _v1.b;
                var lV = _v1.c;
                var lLeft = _v1.d;
                var lRight = _v1.e;
                var _v2 = dict.e;
                var rClr = _v2.a;
                var rK = _v2.b;
                var rV = _v2.c;
                var rLeft = _v2.d;
                var _v3 = rLeft.a;
                var rlK = rLeft.b;
                var rlV = rLeft.c;
                var rlL = rLeft.d;
                var rlR = rLeft.e;
                var rRight = _v2.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, rlK, rlV, $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), rlL), $elm$core$Dict$RBNode_elm_builtin_fn(1, rK, rV, rlR, rRight));
            }
            else {
                var clr = dict.a;
                var k = dict.b;
                var v = dict.c;
                var _v4 = dict.d;
                var lClr = _v4.a;
                var lK = _v4.b;
                var lV = _v4.c;
                var lLeft = _v4.d;
                var lRight = _v4.e;
                var _v5 = dict.e;
                var rClr = _v5.a;
                var rK = _v5.b;
                var rV = _v5.c;
                var rLeft = _v5.d;
                var rRight = _v5.e;
                if (clr === 1) {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight));
                }
                else {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight));
                }
            }
        }
        else {
            return dict;
        }
    };
    var $elm$core$Dict$moveRedRight = function (dict) {
        if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
            if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
                var clr = dict.a;
                var k = dict.b;
                var v = dict.c;
                var _v1 = dict.d;
                var lClr = _v1.a;
                var lK = _v1.b;
                var lV = _v1.c;
                var _v2 = _v1.d;
                var _v3 = _v2.a;
                var llK = _v2.b;
                var llV = _v2.c;
                var llLeft = _v2.d;
                var llRight = _v2.e;
                var lRight = _v1.e;
                var _v4 = dict.e;
                var rClr = _v4.a;
                var rK = _v4.b;
                var rV = _v4.c;
                var rLeft = _v4.d;
                var rRight = _v4.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, $elm$core$Dict$RBNode_elm_builtin_fn(1, llK, llV, llLeft, llRight), $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, lRight, $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight)));
            }
            else {
                var clr = dict.a;
                var k = dict.b;
                var v = dict.c;
                var _v5 = dict.d;
                var lClr = _v5.a;
                var lK = _v5.b;
                var lV = _v5.c;
                var lLeft = _v5.d;
                var lRight = _v5.e;
                var _v6 = dict.e;
                var rClr = _v6.a;
                var rK = _v6.b;
                var rV = _v6.c;
                var rLeft = _v6.d;
                var rRight = _v6.e;
                if (clr === 1) {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight));
                }
                else {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(0, rK, rV, rLeft, rRight));
                }
            }
        }
        else {
            return dict;
        }
    };
    var $elm$core$Dict$removeHelpPrepEQGT_fn = function (targetKey, dict, color, key, value, left, right) {
        if ((left.$ === -1) && (!left.a)) {
            var _v1 = left.a;
            var lK = left.b;
            var lV = left.c;
            var lLeft = left.d;
            var lRight = left.e;
            return $elm$core$Dict$RBNode_elm_builtin_fn(color, lK, lV, lLeft, $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, lRight, right));
        }
        else {
            _v2$2: while (true) {
                if ((right.$ === -1) && (right.a === 1)) {
                    if (right.d.$ === -1) {
                        if (right.d.a === 1) {
                            var _v3 = right.a;
                            var _v4 = right.d;
                            var _v5 = _v4.a;
                            return $elm$core$Dict$moveRedRight(dict);
                        }
                        else {
                            break _v2$2;
                        }
                    }
                    else {
                        var _v6 = right.a;
                        var _v7 = right.d;
                        return $elm$core$Dict$moveRedRight(dict);
                    }
                }
                else {
                    break _v2$2;
                }
            }
            return dict;
        }
    }, $elm$core$Dict$removeHelpPrepEQGT = F7($elm$core$Dict$removeHelpPrepEQGT_fn);
    var $elm$core$Dict$removeMin = function (dict) {
        if ((dict.$ === -1) && (dict.d.$ === -1)) {
            var color = dict.a;
            var key = dict.b;
            var value = dict.c;
            var left = dict.d;
            var lColor = left.a;
            var lLeft = left.d;
            var right = dict.e;
            if (lColor === 1) {
                if ((lLeft.$ === -1) && (!lLeft.a)) {
                    var _v3 = lLeft.a;
                    return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, $elm$core$Dict$removeMin(left), right);
                }
                else {
                    var _v4 = $elm$core$Dict$moveRedLeft(dict);
                    if (_v4.$ === -1) {
                        var nColor = _v4.a;
                        var nKey = _v4.b;
                        var nValue = _v4.c;
                        var nLeft = _v4.d;
                        var nRight = _v4.e;
                        return $elm$core$Dict$balance_fn(nColor, nKey, nValue, $elm$core$Dict$removeMin(nLeft), nRight);
                    }
                    else {
                        return $elm$core$Dict$RBEmpty_elm_builtin;
                    }
                }
            }
            else {
                return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, $elm$core$Dict$removeMin(left), right);
            }
        }
        else {
            return $elm$core$Dict$RBEmpty_elm_builtin;
        }
    };
    var $elm$core$Dict$removeHelp_fn = function (targetKey, dict) {
        if (dict.$ === -2) {
            return $elm$core$Dict$RBEmpty_elm_builtin;
        }
        else {
            var color = dict.a;
            var key = dict.b;
            var value = dict.c;
            var left = dict.d;
            var right = dict.e;
            if (_Utils_cmp(targetKey, key) < 0) {
                if ((left.$ === -1) && (left.a === 1)) {
                    var _v4 = left.a;
                    var lLeft = left.d;
                    if ((lLeft.$ === -1) && (!lLeft.a)) {
                        var _v6 = lLeft.a;
                        return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, $elm$core$Dict$removeHelp_fn(targetKey, left), right);
                    }
                    else {
                        var _v7 = $elm$core$Dict$moveRedLeft(dict);
                        if (_v7.$ === -1) {
                            var nColor = _v7.a;
                            var nKey = _v7.b;
                            var nValue = _v7.c;
                            var nLeft = _v7.d;
                            var nRight = _v7.e;
                            return $elm$core$Dict$balance_fn(nColor, nKey, nValue, $elm$core$Dict$removeHelp_fn(targetKey, nLeft), nRight);
                        }
                        else {
                            return $elm$core$Dict$RBEmpty_elm_builtin;
                        }
                    }
                }
                else {
                    return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, $elm$core$Dict$removeHelp_fn(targetKey, left), right);
                }
            }
            else {
                return $elm$core$Dict$removeHelpEQGT_fn(targetKey, $elm$core$Dict$removeHelpPrepEQGT_fn(targetKey, dict, color, key, value, left, right));
            }
        }
    }, $elm$core$Dict$removeHelp = F2($elm$core$Dict$removeHelp_fn);
    var $elm$core$Dict$removeHelpEQGT_fn = function (targetKey, dict) {
        if (dict.$ === -1) {
            var color = dict.a;
            var key = dict.b;
            var value = dict.c;
            var left = dict.d;
            var right = dict.e;
            if (_Utils_eq(targetKey, key)) {
                var _v1 = $elm$core$Dict$getMin(right);
                if (_v1.$ === -1) {
                    var minKey = _v1.b;
                    var minValue = _v1.c;
                    return $elm$core$Dict$balance_fn(color, minKey, minValue, left, $elm$core$Dict$removeMin(right));
                }
                else {
                    return $elm$core$Dict$RBEmpty_elm_builtin;
                }
            }
            else {
                return $elm$core$Dict$balance_fn(color, key, value, left, $elm$core$Dict$removeHelp_fn(targetKey, right));
            }
        }
        else {
            return $elm$core$Dict$RBEmpty_elm_builtin;
        }
    }, $elm$core$Dict$removeHelpEQGT = F2($elm$core$Dict$removeHelpEQGT_fn);
    var $elm$core$Dict$remove_fn = function (key, dict) {
        var _v0 = $elm$core$Dict$removeHelp_fn(key, dict);
        if ((_v0.$ === -1) && (!_v0.a)) {
            var _v1 = _v0.a;
            var k = _v0.b;
            var v = _v0.c;
            var l = _v0.d;
            var r = _v0.e;
            return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, l, r);
        }
        else {
            var x = _v0;
            return x;
        }
    }, $elm$core$Dict$remove = F2($elm$core$Dict$remove_fn);
    var $elm$core$Dict$update_fn = function (targetKey, alter, dictionary) {
        var _v0 = alter($elm$core$Dict$get_fn(targetKey, dictionary));
        if (!_v0.$) {
            var value = _v0.a;
            return $elm$core$Dict$insert_fn(targetKey, value, dictionary);
        }
        else {
            return $elm$core$Dict$remove_fn(targetKey, dictionary);
        }
    }, $elm$core$Dict$update = F3($elm$core$Dict$update_fn);
    var $elm$core$Basics$composeR_fn = function (f, g, x) {
        return g(f(x));
    }, $elm$core$Basics$composeR = F3($elm$core$Basics$composeR_fn);
    var $elm$http$Http$expectStringResponse_fn = function (toMsg, toResult) {
        return _Http_expect_fn("", $elm$core$Basics$identity, A2($elm$core$Basics$composeR, toResult, toMsg));
    }, $elm$http$Http$expectStringResponse = F2($elm$http$Http$expectStringResponse_fn);
    var $elm$core$Result$mapError_fn = function (f, result) {
        if (!result.$) {
            var v = result.a;
            return $elm$core$Result$Ok(v);
        }
        else {
            var e = result.a;
            return $elm$core$Result$Err(f(e));
        }
    }, $elm$core$Result$mapError = F2($elm$core$Result$mapError_fn);
    var $elm$http$Http$BadBody = function (a) {
        return { $: 4, a: a };
    };
    var $elm$http$Http$BadStatus = function (a) {
        return { $: 3, a: a };
    };
    var $elm$http$Http$BadUrl = function (a) {
        return { $: 0, a: a };
    };
    var $elm$http$Http$NetworkError = { $: 2 };
    var $elm$http$Http$Timeout = { $: 1 };
    var $elm$http$Http$resolve_fn = function (toResult, response) {
        switch (response.$) {
            case 0:
                var url = response.a;
                return $elm$core$Result$Err($elm$http$Http$BadUrl(url));
            case 1:
                return $elm$core$Result$Err($elm$http$Http$Timeout);
            case 2:
                return $elm$core$Result$Err($elm$http$Http$NetworkError);
            case 3:
                var metadata = response.a;
                return $elm$core$Result$Err($elm$http$Http$BadStatus(metadata.dH));
            default:
                var body = response.b;
                return $elm$core$Result$mapError_fn($elm$http$Http$BadBody, toResult(body));
        }
    }, $elm$http$Http$resolve = F2($elm$http$Http$resolve_fn);
    var $elm$http$Http$expectJson_fn = function (toMsg, decoder) {
        return $elm$http$Http$expectStringResponse_fn(toMsg, $elm$http$Http$resolve(function (string) {
            return $elm$core$Result$mapError_fn($elm$json$Json$Decode$errorToString, _Json_runOnString_fn(decoder, string));
        }));
    }, $elm$http$Http$expectJson = F2($elm$http$Http$expectJson_fn);
    var $elm$http$Http$emptyBody = _Http_emptyBody;
    var $elm$http$Http$Request = function (a) {
        return { $: 1, a: a };
    };
    var $elm$http$Http$State_fn = function (reqs, subs) {
        return { bV: reqs, b3: subs };
    }, $elm$http$Http$State = F2($elm$http$Http$State_fn);
    var $elm$http$Http$init = $elm$core$Task$succeed($elm$http$Http$State_fn($elm$core$Dict$empty, _List_Nil));
    var $elm$core$Process$kill = _Scheduler_kill;
    var $elm$core$Process$spawn = _Scheduler_spawn;
    var $elm$http$Http$updateReqs_fn = function (router, cmds, reqs) {
        updateReqs: while (true) {
            if (!cmds.b) {
                return $elm$core$Task$succeed(reqs);
            }
            else {
                var cmd = cmds.a;
                var otherCmds = cmds.b;
                if (!cmd.$) {
                    var tracker = cmd.a;
                    var _v2 = $elm$core$Dict$get_fn(tracker, reqs);
                    if (_v2.$ === 1) {
                        var $temp$router = router, $temp$cmds = otherCmds, $temp$reqs = reqs;
                        router = $temp$router;
                        cmds = $temp$cmds;
                        reqs = $temp$reqs;
                        continue updateReqs;
                    }
                    else {
                        var pid = _v2.a;
                        return _Scheduler_andThen_fn(function (_v3) {
                            return $elm$http$Http$updateReqs_fn(router, otherCmds, $elm$core$Dict$remove_fn(tracker, reqs));
                        }, $elm$core$Process$kill(pid));
                    }
                }
                else {
                    var req = cmd.a;
                    return _Scheduler_andThen_fn(function (pid) {
                        var _v4 = req.b5;
                        if (_v4.$ === 1) {
                            return $elm$http$Http$updateReqs_fn(router, otherCmds, reqs);
                        }
                        else {
                            var tracker = _v4.a;
                            return $elm$http$Http$updateReqs_fn(router, otherCmds, $elm$core$Dict$insert_fn(tracker, pid, reqs));
                        }
                    }, $elm$core$Process$spawn(_Http_toTask_fn(router, $elm$core$Platform$sendToApp(router), req)));
                }
            }
        }
    }, $elm$http$Http$updateReqs = F3($elm$http$Http$updateReqs_fn);
    var $elm$http$Http$onEffects_fn = function (router, cmds, subs, state) {
        return _Scheduler_andThen_fn(function (reqs) {
            return $elm$core$Task$succeed($elm$http$Http$State_fn(reqs, subs));
        }, $elm$http$Http$updateReqs_fn(router, cmds, state.bV));
    }, $elm$http$Http$onEffects = F4($elm$http$Http$onEffects_fn);
    var $elm$core$List$maybeCons_fn = function (f, mx, xs) {
        var _v0 = f(mx);
        if (!_v0.$) {
            var x = _v0.a;
            return _List_Cons(x, xs);
        }
        else {
            return xs;
        }
    }, $elm$core$List$maybeCons = F3($elm$core$List$maybeCons_fn);
    var $elm$core$List$filterMap_fn = function (f, xs) {
        return $elm$core$List$foldr_fn($elm$core$List$maybeCons(f), _List_Nil, xs);
    }, $elm$core$List$filterMap = F2($elm$core$List$filterMap_fn);
    var $elm$http$Http$maybeSend_fn = function (router, desiredTracker, progress, _v0) {
        var actualTracker = _v0.a;
        var toMsg = _v0.b;
        return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(_Platform_sendToApp_fn(router, toMsg(progress))) : $elm$core$Maybe$Nothing;
    }, $elm$http$Http$maybeSend = F4($elm$http$Http$maybeSend_fn);
    var $elm$http$Http$onSelfMsg_fn = function (router, _v0, state) {
        var tracker = _v0.a;
        var progress = _v0.b;
        return _Scheduler_andThen_fn(function (_v1) {
            return $elm$core$Task$succeed(state);
        }, $elm$core$Task$sequence($elm$core$List$filterMap_fn(A3($elm$http$Http$maybeSend, router, tracker, progress), state.b3)));
    }, $elm$http$Http$onSelfMsg = F3($elm$http$Http$onSelfMsg_fn);
    var $elm$http$Http$Cancel = function (a) {
        return { $: 0, a: a };
    };
    var $elm$http$Http$cmdMap_fn = function (func, cmd) {
        if (!cmd.$) {
            var tracker = cmd.a;
            return $elm$http$Http$Cancel(tracker);
        }
        else {
            var r = cmd.a;
            return $elm$http$Http$Request({
                cq: r.cq,
                cy: r.cy,
                cU: _Http_mapExpect_fn(func, r.cU),
                bt: r.bt,
                de: r.de,
                d1: r.d1,
                b5: r.b5,
                f: r.f
            });
        }
    }, $elm$http$Http$cmdMap = F2($elm$http$Http$cmdMap_fn);
    var $elm$http$Http$MySub_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$http$Http$MySub = F2($elm$http$Http$MySub_fn);
    var $elm$http$Http$subMap_fn = function (func, _v0) {
        var tracker = _v0.a;
        var toMsg = _v0.b;
        return $elm$http$Http$MySub_fn(tracker, A2($elm$core$Basics$composeR, toMsg, func));
    }, $elm$http$Http$subMap = F2($elm$http$Http$subMap_fn);
    _Platform_effectManagers["Http"] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
    var $elm$http$Http$command = _Platform_leaf("Http");
    var $elm$http$Http$subscription = _Platform_leaf("Http");
    var $elm$http$Http$request = function (r) {
        return $elm$http$Http$command($elm$http$Http$Request({ cq: false, cy: r.cy, cU: r.cU, bt: r.bt, de: r.de, d1: r.d1, b5: r.b5, f: r.f }));
    };
    var $elm$http$Http$get = function (r) {
        return $elm$http$Http$request({ cy: $elm$http$Http$emptyBody, cU: r.cU, bt: _List_Nil, de: "GET", d1: $elm$core$Maybe$Nothing, b5: $elm$core$Maybe$Nothing, f: r.f });
    };
    var $author$project$Main$ByUse = 0;
    var $author$project$Main$KeywordDetail = function (a) {
        return { $: 1, a: a };
    };
    var $author$project$Main$Large = 3;
    var $author$project$Main$ListView = function (a) {
        return { $: 1, a: a };
    };
    var $author$project$Main$ListViewMain = 0;
    var $author$project$Main$Medium = 2;
    var $author$project$Main$Micro = 0;
    var $author$project$Main$NewestFirst = 2;
    var $author$project$Main$OldestFirst = 1;
    var $author$project$Main$Random = 0;
    var $author$project$Main$ScreenView_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $author$project$Main$ScreenView = F2($author$project$Main$ScreenView_fn);
    var $author$project$Main$Small = 1;
    var $elm$core$Maybe$andThen_fn = function (callback, maybeValue) {
        if (!maybeValue.$) {
            var value = maybeValue.a;
            return callback(value);
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    }, $elm$core$Maybe$andThen = F2($elm$core$Maybe$andThen_fn);
    var $author$project$Main$find_fn = function (keywordStr, _v0) {
        var dict = _v0;
        return $elm$core$Dict$get_fn(keywordStr, dict);
    }, $author$project$Main$find = F2($author$project$Main$find_fn);
    var $elm$core$List$head = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return $elm$core$Maybe$Just(x);
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $author$project$Main$Alphabetical = 1;
    var $author$project$Main$sortingFromString = function (str) {
        switch (str) {
            case "ByUse":
                return 0;
            case "Alphabetical":
                return 1;
            case "Random":
                return 2;
            default:
                return 0;
        }
    };
    var $elm$core$Maybe$withDefault_fn = function (_default, maybe) {
        if (!maybe.$) {
            var value = maybe.a;
            return value;
        }
        else {
            return _default;
        }
    }, $elm$core$Maybe$withDefault = F2($elm$core$Maybe$withDefault_fn);
    var $author$project$Main$handleUrl_fn = function (url, model) {
        var _v0 = url.dp;
        _v0$4: while (true) {
            if (_v0.b) {
                if (_v0.b.b) {
                    if ((_v0.a === "keywords") && (!_v0.b.b.b)) {
                        var _v1 = _v0.b;
                        var keywordAsString = _v1.a;
                        var _v2 = $author$project$Main$find_fn(keywordAsString, model.v);
                        if (!_v2.$) {
                            var kw = _v2.a;
                            return _Utils_update(model, {
                                B: $author$project$Main$KeywordsView($author$project$Main$KeywordDetail(kw))
                            });
                        }
                        else {
                            return _Utils_update(model, {
                                B: $author$project$Main$KeywordsView($author$project$Main$KeywordMainView(0))
                            });
                        }
                    }
                    else {
                        break _v0$4;
                    }
                }
                else {
                    switch (_v0.a) {
                        case "keywords":
                            var sorting = $author$project$Main$sortingFromString($elm$core$Maybe$withDefault_fn("ByUse", $elm$core$Maybe$andThen_fn($elm$core$List$head, $elm$core$Dict$get_fn("sorting", url.aH))));
                            return _Utils_update(model, {
                                B: $author$project$Main$KeywordsView($author$project$Main$KeywordMainView(sorting))
                            });
                        case "screenshots":
                            var zoom = function () {
                                var _v7 = $elm$core$Dict$get_fn("zoom", url.aH);
                                _v7$4: while (true) {
                                    if (((!_v7.$) && _v7.a.b) && (!_v7.a.b.b)) {
                                        switch (_v7.a.a) {
                                            case "micro":
                                                var _v8 = _v7.a;
                                                return 0;
                                            case "small":
                                                var _v9 = _v7.a;
                                                return 1;
                                            case "medium":
                                                var _v10 = _v7.a;
                                                return 2;
                                            case "large":
                                                var _v11 = _v7.a;
                                                return 3;
                                            default:
                                                break _v7$4;
                                        }
                                    }
                                    else {
                                        break _v7$4;
                                    }
                                }
                                return 2;
                            }();
                            var sorting = function () {
                                var _v3 = $elm$core$Dict$get_fn("sorting", url.aH);
                                _v3$3: while (true) {
                                    if (((!_v3.$) && _v3.a.b) && (!_v3.a.b.b)) {
                                        switch (_v3.a.a) {
                                            case "random":
                                                var _v4 = _v3.a;
                                                return 0;
                                            case "oldestfirst":
                                                var _v5 = _v3.a;
                                                return 1;
                                            case "newestfirst":
                                                var _v6 = _v3.a;
                                                return 2;
                                            default:
                                                break _v3$3;
                                        }
                                    }
                                    else {
                                        break _v3$3;
                                    }
                                }
                                return 0;
                            }();
                            return _Utils_update(model, {
                                B: $author$project$Main$ScreenView_fn(zoom, sorting)
                            });
                        case "list":
                            var q = function () {
                                var _v12 = $elm$core$Dict$get_fn("q", url.aH);
                                if (((!_v12.$) && _v12.a.b) && (!_v12.a.b.b)) {
                                    var _v13 = _v12.a;
                                    var qstr = _v13.a;
                                    return qstr;
                                }
                                else {
                                    return "";
                                }
                            }();
                            return _Utils_update(model, {
                                ag: q,
                                B: $author$project$Main$ListView(0)
                            });
                        default:
                            break _v0$4;
                    }
                }
            }
            else {
                break _v0$4;
            }
        }
        return model;
    }, $author$project$Main$handleUrl = F2($author$project$Main$handleUrl_fn);
    var $elm$core$Maybe$map_fn = function (f, maybe) {
        if (!maybe.$) {
            var value = maybe.a;
            return $elm$core$Maybe$Just(f(value));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    }, $elm$core$Maybe$map = F2($elm$core$Maybe$map_fn);
    var $elm$url$Url$percentDecode = _Url_percentDecode;
    var $lydell$elm_app_url$AppUrl$percentDecode = function (string) {
        return $elm$core$Maybe$withDefault_fn(string, $elm$url$Url$percentDecode(string));
    };
    var $lydell$elm_app_url$AppUrl$trimLeadingSlash = function (string) {
        return _String_startsWith_fn("/", string) ? $elm$core$String$dropLeft_fn(1, string) : string;
    };
    var $elm$core$Basics$negate = function (n) {
        return -n;
    };
    var $elm$core$String$dropRight_fn = function (n, string) {
        return (n < 1) ? string : _String_slice_fn(0, -n, string);
    }, $elm$core$String$dropRight = F2($elm$core$String$dropRight_fn);
    var $elm$core$String$endsWith = _String_endsWith;
    var $lydell$elm_app_url$AppUrl$trimTrailingSlash = function (string) {
        return _String_endsWith_fn("/", string) ? $elm$core$String$dropRight_fn(1, string) : string;
    };
    var $lydell$elm_app_url$AppUrl$parsePath = function (path) {
        var trimmed = $lydell$elm_app_url$AppUrl$trimTrailingSlash($lydell$elm_app_url$AppUrl$trimLeadingSlash(path));
        return $elm$core$String$isEmpty(trimmed) ? _List_Nil : $elm$core$List$map_fn($lydell$elm_app_url$AppUrl$percentDecode, $elm$core$String$split_fn("/", trimmed));
    };
    var $lydell$elm_app_url$AppUrl$insert_fn = function (value, maybeList) {
        return $elm$core$Maybe$Just(_List_Cons(value, $elm$core$Maybe$withDefault_fn(_List_Nil, maybeList)));
    }, $lydell$elm_app_url$AppUrl$insert = F2($lydell$elm_app_url$AppUrl$insert_fn);
    var $elm$core$String$replace_fn = function (before, after, string) {
        return $elm$core$String$join_fn(after, $elm$core$String$split_fn(before, string));
    }, $elm$core$String$replace = F3($elm$core$String$replace_fn);
    var $lydell$elm_app_url$AppUrl$queryParameterDecode_a0 = A2($elm$core$String$replace, "+", " "), $lydell$elm_app_url$AppUrl$queryParameterDecode_a1 = $lydell$elm_app_url$AppUrl$percentDecode, $lydell$elm_app_url$AppUrl$queryParameterDecode = A2($elm$core$Basics$composeR, $lydell$elm_app_url$AppUrl$queryParameterDecode_a0, $lydell$elm_app_url$AppUrl$queryParameterDecode_a1);
    var $lydell$elm_app_url$AppUrl$parseQueryParameter_fn = function (segment, queryParameters) {
        var _v0 = $elm$core$String$split_fn("=", segment);
        if (!_v0.b) {
            return queryParameters;
        }
        else {
            if ((_v0.a === "") && (!_v0.b.b)) {
                return queryParameters;
            }
            else {
                var rawKey = _v0.a;
                var rest = _v0.b;
                return $elm$core$Dict$update_fn($elm$core$Basics$composeR_fn($lydell$elm_app_url$AppUrl$queryParameterDecode_a0, $lydell$elm_app_url$AppUrl$queryParameterDecode_a1, rawKey), $lydell$elm_app_url$AppUrl$insert($elm$core$Basics$composeR_fn($lydell$elm_app_url$AppUrl$queryParameterDecode_a0, $lydell$elm_app_url$AppUrl$queryParameterDecode_a1, $elm$core$String$join_fn("=", rest))), queryParameters);
            }
        }
    }, $lydell$elm_app_url$AppUrl$parseQueryParameter = F2($lydell$elm_app_url$AppUrl$parseQueryParameter_fn);
    var $lydell$elm_app_url$AppUrl$parseQueryParameters_a0 = $elm$core$String$split("&"), $lydell$elm_app_url$AppUrl$parseQueryParameters_a1 = A2($elm$core$List$foldr, $lydell$elm_app_url$AppUrl$parseQueryParameter, $elm$core$Dict$empty), $lydell$elm_app_url$AppUrl$parseQueryParameters = A2($elm$core$Basics$composeR, $lydell$elm_app_url$AppUrl$parseQueryParameters_a0, $lydell$elm_app_url$AppUrl$parseQueryParameters_a1);
    var $lydell$elm_app_url$AppUrl$fromUrl = function (url) {
        return {
            bq: $elm$core$Maybe$map_fn($lydell$elm_app_url$AppUrl$percentDecode, url.bq),
            dp: $lydell$elm_app_url$AppUrl$parsePath(url.dp),
            aH: $elm$core$Maybe$withDefault_fn($elm$core$Dict$empty, $elm$core$Maybe$map_fn($lydell$elm_app_url$AppUrl$parseQueryParameters, url.ag))
        };
    };
    var $elm$url$Url$addPort_fn = function (maybePort, starter) {
        if (maybePort.$ === 1) {
            return starter;
        }
        else {
            var port_ = maybePort.a;
            return starter + (":" + $elm$core$String$fromInt(port_));
        }
    }, $elm$url$Url$addPort = F2($elm$url$Url$addPort_fn);
    var $elm$url$Url$addPrefixed_fn = function (prefix, maybeSegment, starter) {
        if (maybeSegment.$ === 1) {
            return starter;
        }
        else {
            var segment = maybeSegment.a;
            return _Utils_ap(starter, _Utils_ap(prefix, segment));
        }
    }, $elm$url$Url$addPrefixed = F3($elm$url$Url$addPrefixed_fn);
    var $elm$url$Url$toString = function (url) {
        var http = function () {
            var _v0 = url.bS;
            if (!_v0) {
                return "http://";
            }
            else {
                return "https://";
            }
        }();
        return $elm$url$Url$addPrefixed_fn("#", url.bq, $elm$url$Url$addPrefixed_fn("?", url.ag, _Utils_ap($elm$url$Url$addPort_fn(url.bO, _Utils_ap(http, url.bx)), url.dp)));
    };
    var $author$project$Main$urlWhereFragmentIsPath = function (url) {
        var warnMaybe = function (m) {
            if (m.$ === 1) {
                return m;
            }
            else {
                var something = m.a;
                return $elm$core$Maybe$Just(something);
            }
        };
        return $lydell$elm_app_url$AppUrl$fromUrl($elm$core$Maybe$withDefault_fn(url, warnMaybe($elm$url$Url$fromString($elm$core$String$replace_fn("/#", "", $elm$url$Url$toString(url))))));
    };
    var $author$project$Main$init_fn = function (_v0, url, key) {
        var width = _v0.a6;
        var height = _v0.aU;
        var initUrl = $author$project$Main$urlWhereFragmentIsPath(url);
        return _Utils_Tuple2($author$project$Main$handleUrl_fn(initUrl, {
            aX: key,
            v: $author$project$Main$emptyKeywordSet,
            F: 8,
            ag: "",
            Y: _List_Nil,
            aI: $elm$core$Dict$empty,
            aK: { bs: height, a5: width },
            f: initUrl,
            B: $author$project$Main$KeywordsView($author$project$Main$KeywordMainView(2))
        }), $elm$http$Http$get({
            cU: $elm$http$Http$expectJson_fn($author$project$Main$GotResearch, $author$project$Main$decodeResearch),
            f: "internal_research.json"
        }));
    }, $author$project$Main$init = F3($author$project$Main$init_fn);
    var $elm$core$Platform$Sub$batch = _Platform_batch;
    var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
    var $author$project$Main$subscriptions = function (_v0) {
        return $elm$core$Platform$Sub$none;
    };
    var $author$project$Main$Keyword = $elm$core$Basics$identity;
    var $author$project$Main$newKey = function (str) {
        return { am: 1, T: str };
    };
    var $author$project$Main$use = function (_v0) {
        var kw = _v0;
        return _Utils_update(kw, { am: kw.am + 1 });
    };
    var $author$project$Main$insert_fn = function (k, _v0) {
        var dict = _v0;
        var result = $elm$core$Dict$get_fn(k, dict);
        if (!result.$) {
            var kw = result.a;
            return $elm$core$Dict$insert_fn(kw.T, $author$project$Main$use(kw), dict);
        }
        else {
            return $elm$core$Dict$insert_fn(k, $author$project$Main$newKey(k), dict);
        }
    }, $author$project$Main$insert = F2($author$project$Main$insert_fn);
    var $author$project$Main$keywordSet = function (researchlist) {
        return $elm$core$List$foldr_fn(F2(function (research, set) {
            return $elm$core$List$foldr_fn($author$project$Main$insert, set, research.v);
        }), $author$project$Main$emptyKeywordSet, researchlist);
    };
    var $elm$browser$Browser$Navigation$load = _Browser_load;
    var $elm$core$Platform$Cmd$batch = _Platform_batch;
    var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
    var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
    var $author$project$Main$reverseKeywordDict = function (research) {
        var addExpToKeyword = F3(function (exposition, keyword, currentDict) {
            return $elm$core$Dict$update_fn(keyword, function (value) {
                if (value.$ === 1) {
                    return $elm$core$Maybe$Just(_List_fromArray([exposition]));
                }
                else {
                    var lst = value.a;
                    return $elm$core$Maybe$Just(_List_Cons(exposition, lst));
                }
            }, currentDict);
        });
        var addResearchToDict = F2(function (exp, currentDict) {
            return $elm$core$List$foldl_fn(addExpToKeyword(exp), currentDict, exp.v);
        });
        return $elm$core$List$foldl_fn(addResearchToDict, $elm$core$Dict$empty, research);
    };
    var $author$project$Main$update_fn = function (msg, model) {
        switch (msg.$) {
            case 0:
                var result = msg.a;
                if (!result.$) {
                    var lst = result.a;
                    var reverseDict = $author$project$Main$reverseKeywordDict(lst);
                    var ks = $author$project$Main$keywordSet(lst);
                    return _Utils_Tuple2(_Utils_update(model, { v: ks, Y: lst, aI: reverseDict }), $elm$core$Platform$Cmd$none);
                }
                else {
                    return _Utils_Tuple2(_Utils_update(model, { Y: _List_Nil }), $elm$core$Platform$Cmd$none);
                }
            case 1:
                var q = msg.a;
                return _Utils_Tuple2(_Utils_update(model, { ag: q }), $elm$core$Platform$Cmd$none);
            case 2:
                return _Utils_Tuple2(_Utils_update(model, { F: model.F + 16 }), $elm$core$Platform$Cmd$none);
            case 3:
                var url = msg.a;
                return _Utils_Tuple2(_Utils_update(model, {
                    f: $author$project$Main$urlWhereFragmentIsPath(url)
                }), $elm$core$Platform$Cmd$none);
            default:
                var urlRequest = msg.a;
                if (!urlRequest.$) {
                    var url = urlRequest.a;
                    return _Utils_Tuple2($author$project$Main$handleUrl_fn($author$project$Main$urlWhereFragmentIsPath(url), model), _Browser_pushUrl_fn(model.aX, $elm$url$Url$toString(url)));
                }
                else {
                    var url = urlRequest.a;
                    return _Utils_Tuple2(model, $elm$browser$Browser$Navigation$load(url));
                }
        }
    }, $author$project$Main$update = F2($author$project$Main$update_fn);
    var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
    var $mdgriffith$elm_ui$Internal$Model$asColumn = 1;
    var $mdgriffith$elm_ui$Internal$Style$classes = { cg: "a", aM: "atv", ci: "ab", cj: "cx", ck: "cy", cl: "acb", cm: "accx", cn: "accy", co: "acr", bd: "al", be: "ar", cp: "at", aN: "ah", aO: "av", cs: "s", cw: "bh", cx: "b", cz: "w7", cB: "bd", cC: "bdt", aw: "bn", cD: "bs", ax: "cpe", cJ: "cp", cK: "cpx", cL: "cpy", I: "c", az: "ctr", aA: "cb", aB: "ccx", J: "ccy", al: "cl", aC: "cr", cM: "ct", cO: "cptr", cP: "ctxt", cX: "fcs", bp: "focus-within", cY: "fs", cZ: "g", aT: "hbh", aV: "hc", bu: "he", aW: "hf", bv: "hfp", c$: "hv", c1: "ic", c3: "fr", aF: "lbl", c5: "iml", c6: "imlf", c7: "imlp", c8: "implw", c9: "it", db: "i", bE: "lnk", af: "nb", bH: "notxt", dh: "ol", dj: "or", V: "oq", dn: "oh", bL: "pg", bM: "p", $7: "ppe", du: "ui", bZ: "r", dw: "sb", dx: "sbx", dy: "sby", dz: "sbt", dC: "e", dD: "cap", dE: "sev", dL: "sk", dO: "t", dP: "tc", dQ: "w8", dR: "w2", dS: "w9", dT: "tj", aL: "tja", dU: "tl", dV: "w3", dW: "w5", dX: "w4", dY: "tr", dZ: "w6", d_: "w1", d$: "tun", b7: "ts", Z: "clr", d5: "u", a7: "wc", cb: "we", a8: "wf", cc: "wfp", ba: "wrp" };
    var $mdgriffith$elm_ui$Internal$Model$Generic = { $: 0 };
    var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
    var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = { $: 0 };
    var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.cs + (" " + $mdgriffith$elm_ui$Internal$Style$classes.I);
    var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.cs + (" " + $mdgriffith$elm_ui$Internal$Style$classes.cZ);
    var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.cs + (" " + $mdgriffith$elm_ui$Internal$Style$classes.bL);
    var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.cs + (" " + $mdgriffith$elm_ui$Internal$Style$classes.bM);
    var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.cs + (" " + $mdgriffith$elm_ui$Internal$Style$classes.bZ);
    var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.cs + (" " + $mdgriffith$elm_ui$Internal$Style$classes.dC);
    var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
        switch (context) {
            case 0:
                return $mdgriffith$elm_ui$Internal$Model$rowClass;
            case 1:
                return $mdgriffith$elm_ui$Internal$Model$columnClass;
            case 2:
                return $mdgriffith$elm_ui$Internal$Model$singleClass;
            case 3:
                return $mdgriffith$elm_ui$Internal$Model$gridClass;
            case 4:
                return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
            default:
                return $mdgriffith$elm_ui$Internal$Model$pageClass;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = { $: 0 };
    var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$addChildren_fn = function (existing, nearbyChildren) {
        switch (nearbyChildren.$) {
            case 0:
                return existing;
            case 1:
                var behind = nearbyChildren.a;
                return _Utils_ap(behind, existing);
            case 2:
                var inFront = nearbyChildren.a;
                return _Utils_ap(existing, inFront);
            default:
                var behind = nearbyChildren.a;
                var inFront = nearbyChildren.b;
                return _Utils_ap(behind, _Utils_ap(existing, inFront));
        }
    }, $mdgriffith$elm_ui$Internal$Model$addChildren = F2($mdgriffith$elm_ui$Internal$Model$addChildren_fn);
    var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren_fn = function (key, existing, nearbyChildren) {
        switch (nearbyChildren.$) {
            case 0:
                return existing;
            case 1:
                var behind = nearbyChildren.a;
                return _Utils_ap($elm$core$List$map_fn(function (x) {
                    return _Utils_Tuple2(key, x);
                }, behind), existing);
            case 2:
                var inFront = nearbyChildren.a;
                return _Utils_ap(existing, $elm$core$List$map_fn(function (x) {
                    return _Utils_Tuple2(key, x);
                }, inFront));
            default:
                var behind = nearbyChildren.a;
                var inFront = nearbyChildren.b;
                return _Utils_ap($elm$core$List$map_fn(function (x) {
                    return _Utils_Tuple2(key, x);
                }, behind), _Utils_ap(existing, $elm$core$List$map_fn(function (x) {
                    return _Utils_Tuple2(key, x);
                }, inFront)));
        }
    }, $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren_fn);
    var $mdgriffith$elm_ui$Internal$Model$AsEl = 2;
    var $mdgriffith$elm_ui$Internal$Model$asEl = 2;
    var $mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
    var $mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
    var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
        return { $: 1, a: a };
    };
    var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
    var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
        return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
    };
    var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
    var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
    var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
    var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
    var $elm$json$Json$Encode$string = _Json_wrap;
    var $elm$html$Html$Attributes$stringProperty_fn = function (key, string) {
        return _VirtualDom_property_fn(key, $elm$json$Json$Encode$string(string));
    }, $elm$html$Html$Attributes$stringProperty = F2($elm$html$Html$Attributes$stringProperty_fn);
    var $elm$html$Html$Attributes$class_a0 = "className", $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty($elm$html$Html$Attributes$class_a0);
    var $elm$html$Html$div = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "div"), $elm$html$Html$div_fn = $elm$html$Html$div.a2;
    var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
    var $elm$core$Set$empty = $elm$core$Dict$empty;
    var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
        switch (x.$) {
            case 0:
                var px = x.a;
                return $elm$core$String$fromInt(px) + "px";
            case 1:
                return "auto";
            case 2:
                var i = x.a;
                return $elm$core$String$fromInt(i) + "fr";
            case 3:
                var min = x.a;
                var len = x.b;
                return "min" + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
            default:
                var max = x.a;
                var len = x.b;
                return "max" + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
        }
    };
    var $elm$core$Tuple$second = function (_v0) {
        var y = _v0.b;
        return y;
    };
    var $elm$core$Basics$round = _Basics_round;
    var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
        return $elm$core$String$fromInt($elm$core$Basics$round(x * 255));
    };
    var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
        switch (transform.$) {
            case 0:
                return $elm$core$Maybe$Nothing;
            case 1:
                var _v1 = transform.a;
                var x = _v1.a;
                var y = _v1.b;
                var z = _v1.c;
                return $elm$core$Maybe$Just("mv-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ("-" + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
            default:
                var _v2 = transform.a;
                var tx = _v2.a;
                var ty = _v2.b;
                var tz = _v2.c;
                var _v3 = transform.b;
                var sx = _v3.a;
                var sy = _v3.b;
                var sz = _v3.c;
                var _v4 = transform.c;
                var ox = _v4.a;
                var oy = _v4.b;
                var oz = _v4.c;
                var angle = transform.d;
                return $elm$core$Maybe$Just("tfrm-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ("-" + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
        switch (style.$) {
            case 13:
                var name = style.a;
                return name;
            case 12:
                var name = style.a;
                var o = style.b;
                return name;
            case 0:
                var _class = style.a;
                return _class;
            case 1:
                var name = style.a;
                return name;
            case 2:
                var i = style.a;
                return "font-size-" + $elm$core$String$fromInt(i);
            case 3:
                var _class = style.a;
                return _class;
            case 4:
                var _class = style.a;
                return _class;
            case 5:
                var cls = style.a;
                var x = style.b;
                var y = style.c;
                return cls;
            case 7:
                var cls = style.a;
                var top = style.b;
                var right = style.c;
                var bottom = style.d;
                var left = style.e;
                return cls;
            case 6:
                var cls = style.a;
                var top = style.b;
                var right = style.c;
                var bottom = style.d;
                var left = style.e;
                return cls;
            case 8:
                var template = style.a;
                return "grid-rows-" + ($elm$core$String$join_fn("-", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$lengthClassName, template.dv)) + ("-cols-" + ($elm$core$String$join_fn("-", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$lengthClassName, template.C)) + ("-space-x-" + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.dF.a) + ("-space-y-" + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.dF.b)))))));
            case 9:
                var pos = style.a;
                return "gp grid-pos-" + ($elm$core$String$fromInt(pos.bZ) + ("-" + ($elm$core$String$fromInt(pos.bj) + ("-" + ($elm$core$String$fromInt(pos.a6) + ("-" + $elm$core$String$fromInt(pos.aU)))))));
            case 11:
                var selector = style.a;
                var subStyle = style.b;
                var name = function () {
                    switch (selector) {
                        case 0:
                            return "fs";
                        case 1:
                            return "hv";
                        default:
                            return "act";
                    }
                }();
                return $elm$core$String$join_fn(" ", $elm$core$List$map_fn(function (sty) {
                    var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
                    if (_v1 === "") {
                        return "";
                    }
                    else {
                        var styleName = _v1;
                        return styleName + ("-" + name);
                    }
                }, subStyle));
            default:
                var x = style.a;
                return $elm$core$Maybe$withDefault_fn("", $mdgriffith$elm_ui$Internal$Model$transformClass(x));
        }
    };
    var $elm$core$Set$insert_fn = function (key, _v0) {
        var dict = _v0;
        return $elm$core$Dict$insert_fn(key, 0, dict);
    }, $elm$core$Set$insert = F2($elm$core$Set$insert_fn);
    var $elm$core$Dict$member_fn = function (key, dict) {
        var _v0 = $elm$core$Dict$get_fn(key, dict);
        if (!_v0.$) {
            return true;
        }
        else {
            return false;
        }
    }, $elm$core$Dict$member = F2($elm$core$Dict$member_fn);
    var $elm$core$Set$member_fn = function (key, _v0) {
        var dict = _v0;
        return $elm$core$Dict$member_fn(key, dict);
    }, $elm$core$Set$member = F2($elm$core$Set$member_fn);
    var $mdgriffith$elm_ui$Internal$Model$reduceStyles_fn = function (style, nevermind) {
        var cache = nevermind.a;
        var existing = nevermind.b;
        var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
        return $elm$core$Set$member_fn(styleName, cache) ? nevermind : _Utils_Tuple2($elm$core$Set$insert_fn(styleName, cache), _List_Cons(style, existing));
    }, $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2($mdgriffith$elm_ui$Internal$Model$reduceStyles_fn);
    var $mdgriffith$elm_ui$Internal$Model$Property_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Property = F2($mdgriffith$elm_ui$Internal$Model$Property_fn);
    var $mdgriffith$elm_ui$Internal$Model$Style_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Style = F2($mdgriffith$elm_ui$Internal$Model$Style_fn);
    var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
        return "." + c;
    };
    var $elm$core$String$fromFloat = _String_fromNumber;
    var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
        var red = _v0.a;
        var green = _v0.b;
        var blue = _v0.c;
        var alpha = _v0.d;
        return "rgba(" + ($elm$core$String$fromInt($elm$core$Basics$round(red * 255)) + (("," + $elm$core$String$fromInt($elm$core$Basics$round(green * 255))) + (("," + $elm$core$String$fromInt($elm$core$Basics$round(blue * 255))) + ("," + ($elm$core$String$fromFloat(alpha) + ")")))));
    };
    var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
        return $elm$core$String$join_fn(" ", $elm$core$List$filterMap_fn($elm$core$Basics$identity, _List_fromArray([
            shadow.bA ? $elm$core$Maybe$Just("inset") : $elm$core$Maybe$Nothing,
            $elm$core$Maybe$Just($elm$core$String$fromFloat(shadow.b.a) + "px"),
            $elm$core$Maybe$Just($elm$core$String$fromFloat(shadow.b.b) + "px"),
            $elm$core$Maybe$Just($elm$core$String$fromFloat(shadow.ab) + "px"),
            $elm$core$Maybe$Just($elm$core$String$fromFloat(shadow.b1) + "px"),
            $elm$core$Maybe$Just($mdgriffith$elm_ui$Internal$Model$formatColor(shadow.ac))
        ])));
    };
    var $elm$core$Tuple$mapFirst_fn = function (func, _v0) {
        var x = _v0.a;
        var y = _v0.b;
        return _Utils_Tuple2(func(x), y);
    }, $elm$core$Tuple$mapFirst = F2($elm$core$Tuple$mapFirst_fn);
    var $elm$core$Tuple$mapSecond_fn = function (func, _v0) {
        var x = _v0.a;
        var y = _v0.b;
        return _Utils_Tuple2(x, func(y));
    }, $elm$core$Tuple$mapSecond = F2($elm$core$Tuple$mapSecond_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
        return _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$Style_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bp) + ":focus-within", $elm$core$List$filterMap_fn($elm$core$Basics$identity, _List_fromArray([
                $elm$core$Maybe$map_fn(function (color) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("border-color", $mdgriffith$elm_ui$Internal$Model$formatColor(color));
                }, focus.cA),
                $elm$core$Maybe$map_fn(function (color) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("background-color", $mdgriffith$elm_ui$Internal$Model$formatColor(color));
                }, focus.cu),
                $elm$core$Maybe$map_fn(function (shadow) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("box-shadow", $mdgriffith$elm_ui$Internal$Model$formatBoxShadow({
                        ab: shadow.ab,
                        ac: shadow.ac,
                        bA: false,
                        b: $elm$core$Tuple$mapSecond_fn($elm$core$Basics$toFloat, $elm$core$Tuple$mapFirst_fn($elm$core$Basics$toFloat, shadow.b)),
                        b1: shadow.b1
                    }));
                }, focus.dB),
                $elm$core$Maybe$Just($mdgriffith$elm_ui$Internal$Model$Property_fn("outline", "none"))
            ]))),
            $mdgriffith$elm_ui$Internal$Model$Style_fn(($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs) + ":focus .focusable, ") + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs) + ".focusable:focus, ") + (".ui-slide-bar:focus + " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs) + " .focusable-thumb"))), $elm$core$List$filterMap_fn($elm$core$Basics$identity, _List_fromArray([
                $elm$core$Maybe$map_fn(function (color) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("border-color", $mdgriffith$elm_ui$Internal$Model$formatColor(color));
                }, focus.cA),
                $elm$core$Maybe$map_fn(function (color) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("background-color", $mdgriffith$elm_ui$Internal$Model$formatColor(color));
                }, focus.cu),
                $elm$core$Maybe$map_fn(function (shadow) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("box-shadow", $mdgriffith$elm_ui$Internal$Model$formatBoxShadow({
                        ab: shadow.ab,
                        ac: shadow.ac,
                        bA: false,
                        b: $elm$core$Tuple$mapSecond_fn($elm$core$Basics$toFloat, $elm$core$Tuple$mapFirst_fn($elm$core$Basics$toFloat, shadow.b)),
                        b1: shadow.b1
                    }));
                }, focus.dB),
                $elm$core$Maybe$Just($mdgriffith$elm_ui$Internal$Model$Property_fn("outline", "none"))
            ])))
        ]);
    };
    var $elm$virtual_dom$VirtualDom$node = function (tag) {
        return _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, _VirtualDom_noScript(tag));
    };
    var $elm$virtual_dom$VirtualDom$property_fn = function (key, value) {
        return _VirtualDom_property_fn(_VirtualDom_noInnerHtmlOrFormAction(key), _VirtualDom_noJavaScriptOrHtmlUri(value));
    }, $elm$virtual_dom$VirtualDom$property = F2($elm$virtual_dom$VirtualDom$property_fn);
    var $mdgriffith$elm_ui$Internal$Style$AllChildren_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$AllChildren = F2($mdgriffith$elm_ui$Internal$Style$AllChildren_fn);
    var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
        return { $: 6, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Style$Child_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Child = F2($mdgriffith$elm_ui$Internal$Style$Child_fn);
    var $mdgriffith$elm_ui$Internal$Style$Class_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Class = F2($mdgriffith$elm_ui$Internal$Style$Class_fn);
    var $mdgriffith$elm_ui$Internal$Style$Descriptor_fn = function (a, b) {
        return { $: 4, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Descriptor = F2($mdgriffith$elm_ui$Internal$Style$Descriptor_fn);
    var $mdgriffith$elm_ui$Internal$Style$Left = 3;
    var $mdgriffith$elm_ui$Internal$Style$Prop_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Prop = F2($mdgriffith$elm_ui$Internal$Style$Prop_fn);
    var $mdgriffith$elm_ui$Internal$Style$Right = 2;
    var $mdgriffith$elm_ui$Internal$Style$Self = $elm$core$Basics$identity;
    var $mdgriffith$elm_ui$Internal$Style$Supports_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Supports = F2($mdgriffith$elm_ui$Internal$Style$Supports_fn);
    var $mdgriffith$elm_ui$Internal$Style$Content = $elm$core$Basics$identity;
    var $mdgriffith$elm_ui$Internal$Style$Bottom = 1;
    var $mdgriffith$elm_ui$Internal$Style$CenterX = 4;
    var $mdgriffith$elm_ui$Internal$Style$CenterY = 5;
    var $mdgriffith$elm_ui$Internal$Style$Top = 0;
    var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray([0, 1, 2, 3, 4, 5]);
    var $elm$core$List$append_fn = function (xs, ys) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; xs.b; xs = xs.b) {
            var next = _List_Cons(xs.a, _List_Nil);
            end.b = next;
            end = next;
        }
        end.b = ys;
        return tmp.b;
    }, $elm$core$List$append = F2($elm$core$List$append_fn);
    var $elm$core$List$concat = function (lists) {
        if (!lists.b) {
            return _List_Nil;
        }
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; lists.b.b; lists = lists.b) {
            var xs = lists.a;
            for (; xs.b; xs = xs.b) {
                var next = _List_Cons(xs.a, _List_Nil);
                end.b = next;
                end = next;
            }
        }
        end.b = lists.a;
        return tmp.b;
    };
    var $elm$core$List$concatMap_fn = function (f, lists) {
        if (!lists.b) {
            return _List_Nil;
        }
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; lists.b.
            b; lists = lists.b) {
            var xs = f(lists.a);
            for (; xs.b; xs = xs.b) {
                var next = _List_Cons(xs.a, _List_Nil);
                end.b = next;
                end = next;
            }
        }
        end.b = f(lists.a);
        return tmp.b;
    }, $elm$core$List$concatMap = F2($elm$core$List$concatMap_fn);
    var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
        switch (desc) {
            case 0:
                var _v1 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cM);
            case 1:
                var _v2 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aA);
            case 2:
                var _v3 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aC);
            case 3:
                var _v4 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.al);
            case 4:
                var _v5 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aB);
            default:
                var _v6 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.J);
        }
    };
    var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
        switch (desc) {
            case 0:
                var _v1 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cp);
            case 1:
                var _v2 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ci);
            case 2:
                var _v3 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.be);
            case 3:
                var _v4 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bd);
            case 4:
                var _v5 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cj);
            default:
                var _v6 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ck);
        }
    };
    var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
        var createDescription = function (alignment) {
            var _v0 = values(alignment);
            var content = _v0.a;
            var indiv = _v0.b;
            return _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$contentName(alignment), content),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$selfName(alignment), indiv)
                ]))
            ]);
        };
        return $mdgriffith$elm_ui$Internal$Style$Batch($elm$core$List$concatMap_fn(createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
    };
    var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray([
        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
        $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "column"),
        $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre"),
        $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aT), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "0"),
            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cw), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "-1")
            ]))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dz), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dO), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aW), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a8), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "auto !important")
                ]))
            ]))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aV), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "auto")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aW), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "100000")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a8), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cc), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a7), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
        ])),
        $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
            switch (alignment) {
                case 0:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-start")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "0 !important")
                    ]));
                case 1:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-end")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "0 !important")
                    ]));
                case 2:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-end")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-end")
                    ]));
                case 3:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-start")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
                    ]));
                case 4:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "center")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "center")
                    ]));
                default:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto")
                        ]))
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important")
                    ]));
            }
        })
    ]);
    var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
        var createDescription = function (alignment) {
            return _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$selfName(alignment), values(alignment))
                ]))
            ]);
        };
        return $mdgriffith$elm_ui$Internal$Style$Batch($elm$core$List$concatMap_fn(createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
    };
    var $mdgriffith$elm_ui$Internal$Style$Above = 0;
    var $mdgriffith$elm_ui$Internal$Style$Behind = 5;
    var $mdgriffith$elm_ui$Internal$Style$Below = 1;
    var $mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
    var $mdgriffith$elm_ui$Internal$Style$OnRight = 2;
    var $mdgriffith$elm_ui$Internal$Style$Within = 4;
    var $mdgriffith$elm_ui$Internal$Style$locations = function () {
        var loc = 0;
        var _v0 = function () {
            switch (loc) {
                case 0:
                    return 0;
                case 1:
                    return 0;
                case 2:
                    return 0;
                case 3:
                    return 0;
                case 4:
                    return 0;
                default:
                    return 0;
            }
        }();
        return _List_fromArray([0, 1, 2, 3, 4, 5]);
    }();
    var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray([
        $mdgriffith$elm_ui$Internal$Style$Class_fn("html,body", _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("padding", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn(_Utils_ap($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs), _Utils_ap($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC), $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c1))), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "block"),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aW), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Child_fn("img", _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("max-height", "100%"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("object-fit", "cover")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a8), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Child_fn("img", _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("max-width", "100%"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("object-fit", "cover")
                ]))
            ]))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs) + ":focus", _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("outline", "none")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.du), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "auto"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("min-height", "100%"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "0"),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn(_Utils_ap($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs), $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aW)), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aW), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c3), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.af), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "fixed"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20")
                ]))
            ]))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.af), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "relative"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("border", "none"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "row"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto"),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC), $mdgriffith$elm_ui$Internal$Style$elDescription),
            $mdgriffith$elm_ui$Internal$Style$Batch(function (fn) {
                return $elm$core$List$map_fn(fn, $mdgriffith$elm_ui$Internal$Style$locations);
            }(function (loc) {
                switch (loc) {
                    case 0:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cg), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("bottom", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aW), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "auto")
                            ])),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a8), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
                            ])),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                    case 1:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cx), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("bottom", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ])),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aW), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "auto")
                            ]))
                        ]));
                    case 2:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dj), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                    case 3:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dh), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("right", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                    case 4:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c3), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                    default:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cw), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                }
            }))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "relative"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("border", "none"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "row"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("resize", "none"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-feature-settings", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("box-sizing", "border-box"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("padding", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-width", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-style", "solid"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-size", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("color", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-family", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("line-height", "1"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration", "none"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-style", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ba), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-wrap", "wrap")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bH), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("-moz-user-select", "none"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("-webkit-user-select", "none"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("-ms-user-select", "none"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("user-select", "none")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cO), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("cursor", "pointer")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cP), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("cursor", "text")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.$7), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none !important")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ax), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto !important")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.Z), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.V), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.c$, $mdgriffith$elm_ui$Internal$Style$classes.Z)) + ":hover", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.c$, $mdgriffith$elm_ui$Internal$Style$classes.V)) + ":hover", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.cX, $mdgriffith$elm_ui$Internal$Style$classes.Z)) + ":focus", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.cX, $mdgriffith$elm_ui$Internal$Style$classes.V)) + ":focus", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.aM, $mdgriffith$elm_ui$Internal$Style$classes.Z)) + ":active", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.aM, $mdgriffith$elm_ui$Internal$Style$classes.V)) + ":active", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b7), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("transition", $elm$core$String$join_fn(", ", $elm$core$List$map_fn(function (x) {
                    return x + " 160ms";
                }, _List_fromArray(["transform", "opacity", "filter", "background-color", "color", "font-size"]))))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dw), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dx), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-x", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bZ), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "1")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dy), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-y", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.I), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "1")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "1")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cJ), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow", "hidden")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cK), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-x", "hidden")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cL), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-y", "hidden")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a7), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "auto")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aw), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-width", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cB), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-style", "dashed")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cC), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-style", "dotted")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cD), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-style", "solid")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dO), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline-block")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c9), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("line-height", "1.05"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("background", "transparent"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "inherit")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC), $mdgriffith$elm_ui$Internal$Style$elDescription),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bZ), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "row"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "0%"),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cb), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bE), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aW), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "stretch !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bv), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "stretch !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a8), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "100000")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.az), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "stretch")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("u:first-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.co, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:first-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.cm, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cj), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-left", "auto !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:last-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.cm, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cj), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-right", "auto !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:only-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.cm, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ck), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:last-of-type." + ($mdgriffith$elm_ui$Internal$Style$classes.cm + " ~ u"), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("u:first-of-type." + ($mdgriffith$elm_ui$Internal$Style$classes.co + (" ~ s." + $mdgriffith$elm_ui$Internal$Style$classes.cm)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-start")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
                            ]));
                        case 1:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-end")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-end")
                            ]));
                        case 2:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-end")
                            ]), _List_Nil);
                        case 3:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-start")
                            ]), _List_Nil);
                        case 4:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "center")
                            ]), _List_Nil);
                        default:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "center")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "center")
                            ]));
                    }
                }),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dE), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "space-between")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aF), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "baseline")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.I), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "column"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "0px"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("min-height", "min-content"),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bu), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aW), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "100000")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a8), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cc), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a7), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("u:first-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.cl, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:first-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.cn, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ck), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "0 !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:last-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.cn, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ck), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "0 !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:only-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.cn, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ck), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:last-of-type." + ($mdgriffith$elm_ui$Internal$Style$classes.cn + " ~ u"), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("u:first-of-type." + ($mdgriffith$elm_ui$Internal$Style$classes.cl + (" ~ s." + $mdgriffith$elm_ui$Internal$Style$classes.cn)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-start")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto")
                            ]));
                        case 1:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-end")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto")
                            ]));
                        case 2:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-end")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-end")
                            ]));
                        case 3:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-start")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
                            ]));
                        case 4:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "center")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "center")
                            ]));
                        default:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "center")
                            ]), _List_Nil);
                    }
                }),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.az), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "stretch !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dE), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "space-between")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cZ), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "-ms-grid"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn(".gp", _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Supports_fn(_Utils_Tuple2("display", "grid"), _List_fromArray([
                    _Utils_Tuple2("display", "grid")
                ])),
                $mdgriffith$elm_ui$Internal$Style$gridAlignments(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-start")
                            ]);
                        case 1:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-end")
                            ]);
                        case 2:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-end")
                            ]);
                        case 3:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-start")
                            ]);
                        case 4:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "center")
                            ]);
                        default:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "center")
                            ]);
                    }
                })
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bL), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "block"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs + ":first-child"), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs + ($mdgriffith$elm_ui$Internal$Style$selfName(3) + (":first-child + ." + $mdgriffith$elm_ui$Internal$Style$classes.cs))), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs + ($mdgriffith$elm_ui$Internal$Style$selfName(2) + (":first-child + ." + $mdgriffith$elm_ui$Internal$Style$classes.cs))), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        case 1:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        case 2:
                            return _Utils_Tuple2(_List_Nil, _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("float", "right"),
                                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn("::after", _List_fromArray([
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("content", "\"\""),
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "table"),
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("clear", "both")
                                ]))
                            ]));
                        case 3:
                            return _Utils_Tuple2(_List_Nil, _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("float", "left"),
                                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn("::after", _List_fromArray([
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("content", "\"\""),
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "table"),
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("clear", "both")
                                ]))
                            ]));
                        case 4:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        default:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                    }
                })
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c5), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre-wrap !important"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("background-color", "transparent")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c8), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c7), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre-wrap !important"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("cursor", "text"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c6), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre-wrap !important"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("color", "transparent")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bM), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "block"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "normal"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-wrap", "break-word"),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aT), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "0"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cw), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "-1")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$AllChildren_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dO), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "normal")
                ])),
                $mdgriffith$elm_ui$Internal$Style$AllChildren_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bM), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline"),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn("::after", _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("content", "none")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn("::before", _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("content", "none")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$AllChildren_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "normal"),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cb), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline-block")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c3), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cw), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cg), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cx), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dj), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dh), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dO), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "normal")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bZ), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.I), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline-flex")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cZ), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline-grid")
                ])),
                $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        case 1:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        case 2:
                            return _Utils_Tuple2(_List_Nil, _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("float", "right")
                            ]));
                        case 3:
                            return _Utils_Tuple2(_List_Nil, _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("float", "left")
                            ]));
                        case 4:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        default:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                    }
                })
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn(".hidden", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "none")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d_), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "100")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dR), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "200")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dV), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "300")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dX), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "400")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dW), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "500")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dZ), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "600")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cz), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "700")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dQ), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "800")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "900")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.db), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-style", "italic")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dL), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration", "line-through")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d5), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration", "underline"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration-skip-ink", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration-skip", "ink")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn(_Utils_ap($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d5), $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dL)), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration", "line-through underline"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration-skip-ink", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration-skip", "ink")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d$), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-style", "normal")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dT), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "justify")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aL), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "justify-all")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dP), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "center")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dY), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "right")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dU), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "left")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn(".modal", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "fixed"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none")
            ]))
        ]))
    ]);
    var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
        return _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Class_fn(".v-" + _var, _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-feature-settings", "\"" + (_var + "\""))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Class_fn(".v-" + (_var + "-off"), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-feature-settings", "\"" + (_var + "\" 0"))
            ]))
        ]);
    };
    var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(_List_fromArray([
        $elm$core$List$map_fn(function (x) {
            return $mdgriffith$elm_ui$Internal$Style$Class_fn(".border-" + $elm$core$String$fromInt(x), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-width", $elm$core$String$fromInt(x) + "px")
            ]));
        }, $elm$core$List$range_fn(0, 6)),
        $elm$core$List$map_fn(function (i) {
            return $mdgriffith$elm_ui$Internal$Style$Class_fn(".font-size-" + $elm$core$String$fromInt(i), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-size", $elm$core$String$fromInt(i) + "px")
            ]));
        }, $elm$core$List$range_fn(8, 32)),
        $elm$core$List$map_fn(function (i) {
            return $mdgriffith$elm_ui$Internal$Style$Class_fn(".p-" + $elm$core$String$fromInt(i), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("padding", $elm$core$String$fromInt(i) + "px")
            ]));
        }, $elm$core$List$range_fn(0, 24)),
        _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Class_fn(".v-smcp", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-variant", "small-caps")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Class_fn(".v-smcp-off", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-variant", "normal")
            ]))
        ]),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("zero"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("onum"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("liga"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("dlig"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("ordn"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("tnum"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("afrc"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("frac")
    ]));
    var $mdgriffith$elm_ui$Internal$Style$explainer = "\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > ." + ($mdgriffith$elm_ui$Internal$Style$classes.cs + (" {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > ." + ($mdgriffith$elm_ui$Internal$Style$classes.cs + " {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n")));
    var $mdgriffith$elm_ui$Internal$Style$inputTextReset = "\ninput[type=\"search\"],\ninput[type=\"search\"]::-webkit-search-decoration,\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-results-button,\ninput[type=\"search\"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n";
    var $mdgriffith$elm_ui$Internal$Style$sliderReset = "\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n";
    var $mdgriffith$elm_ui$Internal$Style$thumbReset = "\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n";
    var $mdgriffith$elm_ui$Internal$Style$trackReset = "\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n";
    var $mdgriffith$elm_ui$Internal$Style$overrides = "@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {" + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bZ) + (" > " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs) + (" { flex-basis: auto !important; } " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bZ) + (" > " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.az) + (" { flex-basis: auto !important; }}" + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
    var $elm$core$String$concat = function (strings) {
        return $elm$core$String$join_fn("", strings);
    };
    var $mdgriffith$elm_ui$Internal$Style$Intermediate = $elm$core$Basics$identity;
    var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn = function (selector, closing) {
        return { ay: closing, n: _List_Nil, M: _List_Nil, z: selector };
    }, $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn);
    var $mdgriffith$elm_ui$Internal$Style$renderRules_fn = function (_v0, rulesToRender) {
        var parent = _v0;
        var generateIntermediates = F2(function (rule, rendered) {
            switch (rule.$) {
                case 0:
                    var name = rule.a;
                    var val = rule.b;
                    return _Utils_update(rendered, {
                        M: _List_Cons(_Utils_Tuple2(name, val), rendered.M)
                    });
                case 3:
                    var _v2 = rule.a;
                    var prop = _v2.a;
                    var value = _v2.b;
                    var props = rule.b;
                    return _Utils_update(rendered, {
                        n: _List_Cons({ ay: "\n}", n: _List_Nil, M: props, z: "@supports (" + (prop + (":" + (value + (") {" + parent.z)))) }, rendered.n)
                    });
                case 5:
                    var selector = rule.a;
                    var adjRules = rule.b;
                    return _Utils_update(rendered, {
                        n: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(parent.z + (" + " + selector), ""), adjRules), rendered.n)
                    });
                case 1:
                    var child = rule.a;
                    var childRules = rule.b;
                    return _Utils_update(rendered, {
                        n: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(parent.z + (" > " + child), ""), childRules), rendered.n)
                    });
                case 2:
                    var child = rule.a;
                    var childRules = rule.b;
                    return _Utils_update(rendered, {
                        n: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(parent.z + (" " + child), ""), childRules), rendered.n)
                    });
                case 4:
                    var descriptor = rule.a;
                    var descriptorRules = rule.b;
                    return _Utils_update(rendered, {
                        n: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(_Utils_ap(parent.z, descriptor), ""), descriptorRules), rendered.n)
                    });
                default:
                    var batched = rule.a;
                    return _Utils_update(rendered, {
                        n: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(parent.z, ""), batched), rendered.n)
                    });
            }
        });
        return $elm$core$List$foldr_fn(generateIntermediates, parent, rulesToRender);
    }, $mdgriffith$elm_ui$Internal$Style$renderRules = F2($mdgriffith$elm_ui$Internal$Style$renderRules_fn);
    var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
        var renderValues = function (values) {
            return $elm$core$String$concat($elm$core$List$map_fn(function (_v3) {
                var x = _v3.a;
                var y = _v3.b;
                return x + (":" + (y + ";"));
            }, values));
        };
        var renderClass = function (rule) {
            var _v2 = rule.M;
            if (!_v2.b) {
                return "";
            }
            else {
                return rule.z + ("{" + (renderValues(rule.M) + (rule.ay + "}")));
            }
        };
        var renderIntermediate = function (_v0) {
            var rule = _v0;
            return _Utils_ap(renderClass(rule), $elm$core$String$concat($elm$core$List$map_fn(renderIntermediate, rule.n)));
        };
        return $elm$core$String$concat($elm$core$List$map_fn(renderIntermediate, $elm$core$List$foldr_fn(F2(function (_v1, existing) {
            var name = _v1.a;
            var styleRules = _v1.b;
            return _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(name, ""), styleRules), existing);
        }), _List_Nil, styleClasses)));
    };
    var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap($mdgriffith$elm_ui$Internal$Style$overrides, $mdgriffith$elm_ui$Internal$Style$renderCompact(_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
    var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
    var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
        var _v0 = opts.df;
        switch (_v0) {
            case 0:
                return A3($elm$virtual_dom$VirtualDom$node, "div", _List_Nil, _List_fromArray([
                    A3($elm$virtual_dom$VirtualDom$node, "style", _List_Nil, _List_fromArray([
                        $elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
                    ]))
                ]));
            case 1:
                return $elm$virtual_dom$VirtualDom$text("");
            default:
                return A3($elm$virtual_dom$VirtualDom$node, "elm-ui-static-rules", _List_fromArray([
                    $elm$virtual_dom$VirtualDom$property_fn("rules", $elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
                ]), _List_Nil);
        }
    };
    var $elm$json$Json$Encode$list_fn = function (func, entries) {
        return _Json_wrap($elm$core$List$foldl_fn(_Json_addEntry(func), _Json_emptyArray(0), entries));
    }, $elm$json$Json$Encode$list = F2($elm$json$Json$Encode$list_fn);
    var $elm$json$Json$Encode$object = function (pairs) {
        return _Json_wrap($elm$core$List$foldl_fn_unwrapped(function (_v0, obj) {
            var k = _v0.a;
            var v = _v0.b;
            return _Json_addField_fn(k, v, obj);
        }, _Json_emptyObject(0), pairs));
    };
    var $elm$core$List$any_fn = function (isOkay, list) {
        any: while (true) {
            if (!list.b) {
                return false;
            }
            else {
                var x = list.a;
                var xs = list.b;
                if (isOkay(x)) {
                    return true;
                }
                else {
                    var $temp$isOkay = isOkay, $temp$list = xs;
                    isOkay = $temp$isOkay;
                    list = $temp$list;
                    continue any;
                }
            }
        }
    }, $elm$core$List$any = F2($elm$core$List$any_fn);
    var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
        switch (font.$) {
            case 0:
                return "serif";
            case 1:
                return "sans-serif";
            case 2:
                return "monospace";
            case 3:
                var name = font.a;
                return "\"" + (name + "\"");
            case 4:
                var name = font.a;
                var url = font.b;
                return "\"" + (name + "\"");
            default:
                var name = font.a.T;
                return "\"" + (name + "\"");
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
        switch (_var.$) {
            case 0:
                var name = _var.a;
                return name === "smcp";
            case 1:
                var name = _var.a;
                return false;
            default:
                var name = _var.a;
                var index = _var.b;
                return (name === "smcp") && (index === 1);
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
        if (typeface.$ === 5) {
            var font = typeface.a;
            return $elm$core$List$any_fn($mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.b8);
        }
        else {
            return false;
        }
    };
    var $elm$core$Basics$min_fn = function (x, y) {
        return (_Utils_cmp(x, y) < 0) ? x : y;
    }, $elm$core$Basics$min = F2($elm$core$Basics$min_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderProps_fn = function (force, _v0, existing) {
        var key = _v0.a;
        var val = _v0.b;
        return force ? (existing + ("\n  " + (key + (": " + (val + " !important;"))))) : (existing + ("\n  " + (key + (": " + (val + ";")))));
    }, $mdgriffith$elm_ui$Internal$Model$renderProps = F3($mdgriffith$elm_ui$Internal$Model$renderProps_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderStyle_fn = function (options, maybePseudo, selector, props) {
        if (maybePseudo.$ === 1) {
            return _List_fromArray([
                selector + ("{" + ($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(false), "", props) + "\n}"))
            ]);
        }
        else {
            var pseudo = maybePseudo.a;
            switch (pseudo) {
                case 1:
                    var _v2 = options.c$;
                    switch (_v2) {
                        case 0:
                            return _List_Nil;
                        case 2:
                            return _List_fromArray([
                                selector + ("-hv {" + ($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(true), "", props) + "\n}"))
                            ]);
                        default:
                            return _List_fromArray([
                                selector + ("-hv:hover {" + ($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(false), "", props) + "\n}"))
                            ]);
                    }
                case 0:
                    var renderedProps = $elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(false), "", props);
                    return _List_fromArray([
                        selector + ("-fs:focus {" + (renderedProps + "\n}")),
                        ("." + ($mdgriffith$elm_ui$Internal$Style$classes.cs + (":focus " + (selector + "-fs  {")))) + (renderedProps + "\n}"),
                        (selector + "-fs:focus-within {") + (renderedProps + "\n}"),
                        (".ui-slide-bar:focus + " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs) + (" .focusable-thumb" + (selector + "-fs {")))) + (renderedProps + "\n}")
                    ]);
                default:
                    return _List_fromArray([
                        selector + ("-act:active {" + ($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(false), "", props) + "\n}"))
                    ]);
            }
        }
    }, $mdgriffith$elm_ui$Internal$Model$renderStyle = F4($mdgriffith$elm_ui$Internal$Model$renderStyle_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
        switch (_var.$) {
            case 0:
                var name = _var.a;
                return "\"" + (name + "\"");
            case 1:
                var name = _var.a;
                return "\"" + (name + "\" 0");
            default:
                var name = _var.a;
                var index = _var.b;
                return "\"" + (name + ("\" " + $elm$core$String$fromInt(index)));
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
        if (typeface.$ === 5) {
            var font = typeface.a;
            return $elm$core$Maybe$Just($elm$core$String$join_fn(", ", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$renderVariant, font.b8)));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
        switch (transform.$) {
            case 0:
                return $elm$core$Maybe$Nothing;
            case 1:
                var _v1 = transform.a;
                var x = _v1.a;
                var y = _v1.b;
                var z = _v1.c;
                return $elm$core$Maybe$Just("translate3d(" + ($elm$core$String$fromFloat(x) + ("px, " + ($elm$core$String$fromFloat(y) + ("px, " + ($elm$core$String$fromFloat(z) + "px)"))))));
            default:
                var _v2 = transform.a;
                var tx = _v2.a;
                var ty = _v2.b;
                var tz = _v2.c;
                var _v3 = transform.b;
                var sx = _v3.a;
                var sy = _v3.b;
                var sz = _v3.c;
                var _v4 = transform.c;
                var ox = _v4.a;
                var oy = _v4.b;
                var oz = _v4.c;
                var angle = transform.d;
                var translate = "translate3d(" + ($elm$core$String$fromFloat(tx) + ("px, " + ($elm$core$String$fromFloat(ty) + ("px, " + ($elm$core$String$fromFloat(tz) + "px)")))));
                var scale = "scale3d(" + ($elm$core$String$fromFloat(sx) + (", " + ($elm$core$String$fromFloat(sy) + (", " + ($elm$core$String$fromFloat(sz) + ")")))));
                var rotate = "rotate3d(" + ($elm$core$String$fromFloat(ox) + (", " + ($elm$core$String$fromFloat(oy) + (", " + ($elm$core$String$fromFloat(oz) + (", " + ($elm$core$String$fromFloat(angle) + "rad)")))))));
                return $elm$core$Maybe$Just(translate + (" " + (scale + (" " + rotate))));
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn = function (options, rule, maybePseudo) {
        switch (rule.$) {
            case 0:
                var selector = rule.a;
                var props = rule.b;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, selector, props);
            case 13:
                var name = rule.a;
                var prop = rule.b;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + name, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("box-shadow", prop)
                ]));
            case 12:
                var name = rule.a;
                var transparency = rule.b;
                var opacity = $elm$core$Basics$max_fn(0, $elm$core$Basics$min_fn(1, 1 - transparency));
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + name, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("opacity", $elm$core$String$fromFloat(opacity))
                ]));
            case 2:
                var i = rule.a;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, ".font-size-" + $elm$core$String$fromInt(i), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("font-size", $elm$core$String$fromInt(i) + "px")
                ]));
            case 1:
                var name = rule.a;
                var typefaces = rule.b;
                var features = $elm$core$String$join_fn(", ", $elm$core$List$filterMap_fn($mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
                var families = _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("font-family", $elm$core$String$join_fn(", ", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("font-feature-settings", features),
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("font-variant", $elm$core$List$any_fn($mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? "small-caps" : "normal")
                ]);
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + name, families);
            case 3:
                var _class = rule.a;
                var prop = rule.b;
                var val = rule.c;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + _class, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn(prop, val)
                ]));
            case 4:
                var _class = rule.a;
                var prop = rule.b;
                var color = rule.c;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + _class, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn(prop, $mdgriffith$elm_ui$Internal$Model$formatColor(color))
                ]));
            case 5:
                var cls = rule.a;
                var x = rule.b;
                var y = rule.c;
                var yPx = $elm$core$String$fromInt(y) + "px";
                var xPx = $elm$core$String$fromInt(x) + "px";
                var single = "." + $mdgriffith$elm_ui$Internal$Style$classes.dC;
                var row = "." + $mdgriffith$elm_ui$Internal$Style$classes.bZ;
                var wrappedRow = "." + ($mdgriffith$elm_ui$Internal$Style$classes.ba + row);
                var right = "." + $mdgriffith$elm_ui$Internal$Style$classes.be;
                var paragraph = "." + $mdgriffith$elm_ui$Internal$Style$classes.bM;
                var page = "." + $mdgriffith$elm_ui$Internal$Style$classes.bL;
                var left = "." + $mdgriffith$elm_ui$Internal$Style$classes.bd;
                var halfY = $elm$core$String$fromFloat(y / 2) + "px";
                var halfX = $elm$core$String$fromFloat(x / 2) + "px";
                var column = "." + $mdgriffith$elm_ui$Internal$Style$classes.I;
                var _class = "." + cls;
                var any = "." + $mdgriffith$elm_ui$Internal$Style$classes.cs;
                return $elm$core$List$concat(_List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (row + (" > " + (any + (" + " + any)))), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-left", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (wrappedRow + (" > " + any)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin", halfY + (" " + halfX))
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (column + (" > " + (any + (" + " + any)))), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-top", yPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (page + (" > " + (any + (" + " + any)))), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-top", yPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (page + (" > " + left)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-right", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (page + (" > " + right)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-left", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _Utils_ap(_class, paragraph), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("line-height", "calc(1em + " + ($elm$core$String$fromInt(y) + "px)"))
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "textarea" + (any + _class), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("line-height", "calc(1em + " + ($elm$core$String$fromInt(y) + "px)")),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("height", "calc(100% + " + ($elm$core$String$fromInt(y) + "px)"))
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (paragraph + (" > " + left)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-right", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (paragraph + (" > " + right)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-left", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (paragraph + "::after"), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("content", "''"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("display", "block"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("height", "0"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("width", "0"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-top", $elm$core$String$fromInt((-1) * ((y / 2) | 0)) + "px")
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (paragraph + "::before"), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("content", "''"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("display", "block"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("height", "0"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("width", "0"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-bottom", $elm$core$String$fromInt((-1) * ((y / 2) | 0)) + "px")
                    ]))
                ]));
            case 7:
                var cls = rule.a;
                var top = rule.b;
                var right = rule.c;
                var bottom = rule.d;
                var left = rule.e;
                var _class = "." + cls;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("padding", $elm$core$String$fromFloat(top) + ("px " + ($elm$core$String$fromFloat(right) + ("px " + ($elm$core$String$fromFloat(bottom) + ("px " + ($elm$core$String$fromFloat(left) + "px")))))))
                ]));
            case 6:
                var cls = rule.a;
                var top = rule.b;
                var right = rule.c;
                var bottom = rule.d;
                var left = rule.e;
                var _class = "." + cls;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("border-width", $elm$core$String$fromInt(top) + ("px " + ($elm$core$String$fromInt(right) + ("px " + ($elm$core$String$fromInt(bottom) + ("px " + ($elm$core$String$fromInt(left) + "px")))))))
                ]));
            case 8:
                var template = rule.a;
                var toGridLengthHelper = F3(function (minimum, maximum, x) {
                    toGridLengthHelper: while (true) {
                        switch (x.$) {
                            case 0:
                                var px = x.a;
                                return $elm$core$String$fromInt(px) + "px";
                            case 1:
                                var _v2 = _Utils_Tuple2(minimum, maximum);
                                if (_v2.a.$ === 1) {
                                    if (_v2.b.$ === 1) {
                                        var _v3 = _v2.a;
                                        var _v4 = _v2.b;
                                        return "max-content";
                                    }
                                    else {
                                        var _v6 = _v2.a;
                                        var maxSize = _v2.b.a;
                                        return "minmax(max-content, " + ($elm$core$String$fromInt(maxSize) + "px)");
                                    }
                                }
                                else {
                                    if (_v2.b.$ === 1) {
                                        var minSize = _v2.a.a;
                                        var _v5 = _v2.b;
                                        return "minmax(" + ($elm$core$String$fromInt(minSize) + ("px, " + "max-content)"));
                                    }
                                    else {
                                        var minSize = _v2.a.a;
                                        var maxSize = _v2.b.a;
                                        return "minmax(" + ($elm$core$String$fromInt(minSize) + ("px, " + ($elm$core$String$fromInt(maxSize) + "px)")));
                                    }
                                }
                            case 2:
                                var i = x.a;
                                var _v7 = _Utils_Tuple2(minimum, maximum);
                                if (_v7.a.$ === 1) {
                                    if (_v7.b.$ === 1) {
                                        var _v8 = _v7.a;
                                        var _v9 = _v7.b;
                                        return $elm$core$String$fromInt(i) + "fr";
                                    }
                                    else {
                                        var _v11 = _v7.a;
                                        var maxSize = _v7.b.a;
                                        return "minmax(max-content, " + ($elm$core$String$fromInt(maxSize) + "px)");
                                    }
                                }
                                else {
                                    if (_v7.b.$ === 1) {
                                        var minSize = _v7.a.a;
                                        var _v10 = _v7.b;
                                        return "minmax(" + ($elm$core$String$fromInt(minSize) + ("px, " + ($elm$core$String$fromInt(i) + ("fr" + "fr)"))));
                                    }
                                    else {
                                        var minSize = _v7.a.a;
                                        var maxSize = _v7.b.a;
                                        return "minmax(" + ($elm$core$String$fromInt(minSize) + ("px, " + ($elm$core$String$fromInt(maxSize) + "px)")));
                                    }
                                }
                            case 3:
                                var m = x.a;
                                var len = x.b;
                                var $temp$minimum = $elm$core$Maybe$Just(m), $temp$maximum = maximum, $temp$x = len;
                                minimum = $temp$minimum;
                                maximum = $temp$maximum;
                                x = $temp$x;
                                continue toGridLengthHelper;
                            default:
                                var m = x.a;
                                var len = x.b;
                                var $temp$minimum = minimum, $temp$maximum = $elm$core$Maybe$Just(m), $temp$x = len;
                                minimum = $temp$minimum;
                                maximum = $temp$maximum;
                                x = $temp$x;
                                continue toGridLengthHelper;
                        }
                    }
                });
                var toGridLength = function (x) {
                    return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
                };
                var xSpacing = toGridLength(template.dF.a);
                var ySpacing = toGridLength(template.dF.b);
                var rows = function (x) {
                    return "grid-template-rows: " + (x + ";");
                }($elm$core$String$join_fn(" ", $elm$core$List$map_fn(toGridLength, template.dv)));
                var msRows = function (x) {
                    return "-ms-grid-rows: " + (x + ";");
                }($elm$core$String$join_fn(ySpacing, $elm$core$List$map_fn(toGridLength, template.C)));
                var msColumns = function (x) {
                    return "-ms-grid-columns: " + (x + ";");
                }($elm$core$String$join_fn(ySpacing, $elm$core$List$map_fn(toGridLength, template.C)));
                var gapY = "grid-row-gap:" + (toGridLength(template.dF.b) + ";");
                var gapX = "grid-column-gap:" + (toGridLength(template.dF.a) + ";");
                var columns = function (x) {
                    return "grid-template-columns: " + (x + ";");
                }($elm$core$String$join_fn(" ", $elm$core$List$map_fn(toGridLength, template.C)));
                var _class = ".grid-rows-" + ($elm$core$String$join_fn("-", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$lengthClassName, template.dv)) + ("-cols-" + ($elm$core$String$join_fn("-", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$lengthClassName, template.C)) + ("-space-x-" + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.dF.a) + ("-space-y-" + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.dF.b)))))));
                var modernGrid = _class + ("{" + (columns + (rows + (gapX + (gapY + "}")))));
                var supports = "@supports (display:grid) {" + (modernGrid + "}");
                var base = _class + ("{" + (msColumns + (msRows + "}")));
                return _List_fromArray([base, supports]);
            case 9:
                var position = rule.a;
                var msPosition = $elm$core$String$join_fn(" ", _List_fromArray([
                    "-ms-grid-row: " + ($elm$core$String$fromInt(position.bZ) + ";"),
                    "-ms-grid-row-span: " + ($elm$core$String$fromInt(position.aU) + ";"),
                    "-ms-grid-column: " + ($elm$core$String$fromInt(position.bj) + ";"),
                    "-ms-grid-column-span: " + ($elm$core$String$fromInt(position.a6) + ";")
                ]));
                var modernPosition = $elm$core$String$join_fn(" ", _List_fromArray([
                    "grid-row: " + ($elm$core$String$fromInt(position.bZ) + (" / " + ($elm$core$String$fromInt(position.bZ + position.aU) + ";"))),
                    "grid-column: " + ($elm$core$String$fromInt(position.bj) + (" / " + ($elm$core$String$fromInt(position.bj + position.a6) + ";")))
                ]));
                var _class = ".grid-pos-" + ($elm$core$String$fromInt(position.bZ) + ("-" + ($elm$core$String$fromInt(position.bj) + ("-" + ($elm$core$String$fromInt(position.a6) + ("-" + $elm$core$String$fromInt(position.aU)))))));
                var modernGrid = _class + ("{" + (modernPosition + "}"));
                var supports = "@supports (display:grid) {" + (modernGrid + "}");
                var base = _class + ("{" + (msPosition + "}"));
                return _List_fromArray([base, supports]);
            case 11:
                var _class = rule.a;
                var styles = rule.b;
                var renderPseudoRule = function (style) {
                    return $mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn(options, style, $elm$core$Maybe$Just(_class));
                };
                return $elm$core$List$concatMap_fn(renderPseudoRule, styles);
            default:
                var transform = rule.a;
                var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
                var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
                var _v12 = _Utils_Tuple2(_class, val);
                if ((!_v12.a.$) && (!_v12.b.$)) {
                    var cls = _v12.a.a;
                    var v = _v12.b.a;
                    return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + cls, _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("transform", v)
                    ]));
                }
                else {
                    return _List_Nil;
                }
        }
    }, $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3($mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn);
    var $mdgriffith$elm_ui$Internal$Model$encodeStyles_fn = function (options, stylesheet) {
        return $elm$json$Json$Encode$object($elm$core$List$map_fn(function (style) {
            var styled = $mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn(options, style, $elm$core$Maybe$Nothing);
            return _Utils_Tuple2($mdgriffith$elm_ui$Internal$Model$getStyleName(style), $elm$json$Json$Encode$list_fn($elm$json$Json$Encode$string, styled));
        }, stylesheet));
    }, $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2($mdgriffith$elm_ui$Internal$Model$encodeStyles_fn);
    var $mdgriffith$elm_ui$Internal$Model$bracket_fn = function (selector, rules) {
        var renderPair = function (_v0) {
            var name = _v0.a;
            var val = _v0.b;
            return name + (": " + (val + ";"));
        };
        return selector + (" {" + ($elm$core$String$join_fn("", $elm$core$List$map_fn(renderPair, rules)) + "}"));
    }, $mdgriffith$elm_ui$Internal$Model$bracket = F2($mdgriffith$elm_ui$Internal$Model$bracket_fn);
    var $mdgriffith$elm_ui$Internal$Model$fontRule_fn = function (name, modifier, _v0) {
        var parentAdj = _v0.a;
        var textAdjustment = _v0.b;
        return _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$bracket_fn("." + (name + ("." + (modifier + (", " + ("." + (name + (" ." + modifier))))))), parentAdj),
            $mdgriffith$elm_ui$Internal$Model$bracket_fn("." + (name + ("." + (modifier + ("> ." + ($mdgriffith$elm_ui$Internal$Style$classes.dO + (", ." + (name + (" ." + (modifier + (" > ." + $mdgriffith$elm_ui$Internal$Style$classes.dO)))))))))), textAdjustment)
        ]);
    }, $mdgriffith$elm_ui$Internal$Model$fontRule = F3($mdgriffith$elm_ui$Internal$Model$fontRule_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule_fn = function (fontToAdjust, _v0, otherFontName) {
        var full = _v0.a;
        var capital = _v0.b;
        var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (" ." + fontToAdjust));
        return $elm$core$String$join_fn(" ", _Utils_ap($mdgriffith$elm_ui$Internal$Model$fontRule_fn(name, $mdgriffith$elm_ui$Internal$Style$classes.dD, capital), $mdgriffith$elm_ui$Internal$Model$fontRule_fn(name, $mdgriffith$elm_ui$Internal$Style$classes.cY, full)));
    }, $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule_fn = function (fontToAdjust, otherFontName) {
        var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (" ." + fontToAdjust));
        return $elm$core$String$join_fn(" ", _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$bracket_fn("." + (name + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.dD + (", " + ("." + (name + (" ." + $mdgriffith$elm_ui$Internal$Style$classes.dD))))))), _List_fromArray([
                _Utils_Tuple2("line-height", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Model$bracket_fn("." + (name + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.dD + ("> ." + ($mdgriffith$elm_ui$Internal$Style$classes.dO + (", ." + (name + (" ." + ($mdgriffith$elm_ui$Internal$Style$classes.dD + (" > ." + $mdgriffith$elm_ui$Internal$Style$classes.dO)))))))))), _List_fromArray([
                _Utils_Tuple2("vertical-align", "0"),
                _Utils_Tuple2("line-height", "1")
            ]))
        ]));
    }, $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2($mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule_fn);
    var $mdgriffith$elm_ui$Internal$Model$adjust_fn = function (size, height, vertical) {
        return { aU: height / size, b1: size, b9: vertical };
    }, $mdgriffith$elm_ui$Internal$Model$adjust = F3($mdgriffith$elm_ui$Internal$Model$adjust_fn);
    var $elm$core$List$filter_fn = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; xs.b; xs = xs.b) {
            if (f(xs.a)) {
                var next = _List_Cons(xs.a, _List_Nil);
                end.b = next;
                end = next;
            }
        }
        return tmp.
            b;
    }, $elm$core$List$filter = F2($elm$core$List$filter_fn);
    var $elm$core$List$maximum = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return $elm$core$Maybe$Just($elm$core$List$foldl_fn($elm$core$Basics$max, x, xs));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $elm$core$List$minimum = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return $elm$core$Maybe$Just($elm$core$List$foldl_fn($elm$core$Basics$min, x, xs));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $elm$core$Basics$neq = _Utils_notEqual;
    var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
        var lines = _List_fromArray([adjustment.cH, adjustment.cv, adjustment.cQ, adjustment.dd]);
        var lineHeight = 1.5;
        var normalDescender = (lineHeight - 1) / 2;
        var oldMiddle = lineHeight / 2;
        var descender = $elm$core$Maybe$withDefault_fn(adjustment.cQ, $elm$core$List$minimum(lines));
        var newBaseline = $elm$core$Maybe$withDefault_fn(adjustment.cv, $elm$core$List$minimum($elm$core$List$filter_fn(function (x) {
            return !_Utils_eq(x, descender);
        }, lines)));
        var base = lineHeight;
        var ascender = $elm$core$Maybe$withDefault_fn(adjustment.cH, $elm$core$List$maximum(lines));
        var capitalSize = 1 / (ascender - newBaseline);
        var capitalVertical = 1 - ascender;
        var fullSize = 1 / (ascender - descender);
        var fullVertical = 1 - ascender;
        var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
        var newFullMiddle = ((ascender - descender) / 2) + descender;
        return {
            cH: $mdgriffith$elm_ui$Internal$Model$adjust_fn(capitalSize, ascender - newBaseline, capitalVertical),
            br: $mdgriffith$elm_ui$Internal$Model$adjust_fn(fullSize, ascender - descender, fullVertical)
        };
    };
    var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
        return _Utils_Tuple2(_List_fromArray([
            _Utils_Tuple2("display", "block")
        ]), _List_fromArray([
            _Utils_Tuple2("display", "inline-block"),
            _Utils_Tuple2("line-height", $elm$core$String$fromFloat(converted.aU)),
            _Utils_Tuple2("vertical-align", $elm$core$String$fromFloat(converted.b9) + "em"),
            _Utils_Tuple2("font-size", $elm$core$String$fromFloat(converted.b1) + "em")
        ]));
    };
    var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
        return $elm$core$List$foldl_fn_unwrapped(function (face, found) {
            if (found.$ === 1) {
                if (face.$ === 5) {
                    var _with = face.a;
                    var _v2 = _with.ch;
                    if (_v2.$ === 1) {
                        return found;
                    }
                    else {
                        var adjustment = _v2.a;
                        return $elm$core$Maybe$Just(_Utils_Tuple2($mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(function ($) {
                            return $.br;
                        }($mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))), $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(function ($) {
                            return $.cH;
                        }($mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
                    }
                }
                else {
                    return found;
                }
            }
            else {
                return found;
            }
        }, $elm$core$Maybe$Nothing, typefaces);
    };
    var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
        var withImport = function (font) {
            if (font.$ === 4) {
                var url = font.b;
                return $elm$core$Maybe$Just("@import url('" + (url + "');"));
            }
            else {
                return $elm$core$Maybe$Nothing;
            }
        };
        var fontImports = function (_v2) {
            var name = _v2.a;
            var typefaces = _v2.b;
            var imports = $elm$core$String$join_fn("\n", $elm$core$List$filterMap_fn(withImport, typefaces));
            return imports;
        };
        var allNames = $elm$core$List$map_fn($elm$core$Tuple$first, rules);
        var fontAdjustments = function (_v1) {
            var name = _v1.a;
            var typefaces = _v1.b;
            var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
            if (_v0.$ === 1) {
                return $elm$core$String$join_fn("", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name), allNames));
            }
            else {
                var adjustment = _v0.a;
                return $elm$core$String$join_fn("", $elm$core$List$map_fn(A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment), allNames));
            }
        };
        return _Utils_ap($elm$core$String$join_fn("\n", $elm$core$List$map_fn(fontImports, rules)), $elm$core$String$join_fn("\n", $elm$core$List$map_fn(fontAdjustments, rules)));
    };
    var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
        if (rule.$ === 1) {
            var name = rule.a;
            var typefaces = rule.b;
            return $elm$core$Maybe$Just(_Utils_Tuple2(name, typefaces));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString_fn = function (options, stylesheet) {
        var combine = F2(function (style, rendered) {
            return {
                aJ: _Utils_ap(rendered.aJ, $mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn(options, style, $elm$core$Maybe$Nothing)),
                at: function () {
                    var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
                    if (_v1.$ === 1) {
                        return rendered.at;
                    }
                    else {
                        var topLevel = _v1.a;
                        return _List_Cons(topLevel, rendered.at);
                    }
                }()
            };
        });
        var _v0 = $elm$core$List$foldl_fn(combine, { aJ: _List_Nil, at: _List_Nil }, stylesheet);
        var topLevel = _v0.at;
        var rules = _v0.aJ;
        return _Utils_ap($mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel), $elm$core$String$concat(rules));
    }, $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString_fn);
    var $mdgriffith$elm_ui$Internal$Model$toStyleSheet_fn = function (options, styleSheet) {
        var _v0 = options.df;
        switch (_v0) {
            case 0:
                return A3($elm$virtual_dom$VirtualDom$node, "div", _List_Nil, _List_fromArray([
                    A3($elm$virtual_dom$VirtualDom$node, "style", _List_Nil, _List_fromArray([
                        $elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Model$toStyleSheetString_fn(options, styleSheet))
                    ]))
                ]));
            case 1:
                return A3($elm$virtual_dom$VirtualDom$node, "div", _List_Nil, _List_fromArray([
                    A3($elm$virtual_dom$VirtualDom$node, "style", _List_Nil, _List_fromArray([
                        $elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Model$toStyleSheetString_fn(options, styleSheet))
                    ]))
                ]));
            default:
                return A3($elm$virtual_dom$VirtualDom$node, "elm-ui-rules", _List_fromArray([
                    $elm$virtual_dom$VirtualDom$property_fn("rules", $mdgriffith$elm_ui$Internal$Model$encodeStyles_fn(options, styleSheet))
                ]), _List_Nil);
        }
    }, $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2($mdgriffith$elm_ui$Internal$Model$toStyleSheet_fn);
    var $mdgriffith$elm_ui$Internal$Model$embedKeyed_fn = function (_static, opts, styles, children) {
        var dynamicStyleSheet = $mdgriffith$elm_ui$Internal$Model$toStyleSheet_fn(opts, $elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$reduceStyles, _Utils_Tuple2($elm$core$Set$empty, $mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.cX)), styles).b);
        return _static ? _List_Cons(_Utils_Tuple2("static-stylesheet", $mdgriffith$elm_ui$Internal$Model$staticRoot(opts)), _List_Cons(_Utils_Tuple2("dynamic-stylesheet", dynamicStyleSheet), children)) : _List_Cons(_Utils_Tuple2("dynamic-stylesheet", dynamicStyleSheet), children);
    }, $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4($mdgriffith$elm_ui$Internal$Model$embedKeyed_fn);
    var $mdgriffith$elm_ui$Internal$Model$embedWith_fn = function (_static, opts, styles, children) {
        var dynamicStyleSheet = $mdgriffith$elm_ui$Internal$Model$toStyleSheet_fn(opts, $elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$reduceStyles, _Utils_Tuple2($elm$core$Set$empty, $mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.cX)), styles).b);
        return _static ? _List_Cons($mdgriffith$elm_ui$Internal$Model$staticRoot(opts), _List_Cons(dynamicStyleSheet, children)) : _List_Cons(dynamicStyleSheet, children);
    }, $mdgriffith$elm_ui$Internal$Model$embedWith = F4($mdgriffith$elm_ui$Internal$Model$embedWith_fn);
    var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
    var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
    var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
        return _VirtualDom_keyedNodeNS_fn(_VirtualDom_keyedNode_a0, _VirtualDom_noScript(tag));
    };
    var $elm$core$Basics$not = _Basics_not;
    var $elm$html$Html$p = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "p"), $elm$html$Html$p_fn = $elm$html$Html$p.a2;
    var $elm$core$Bitwise$and = _Bitwise_and;
    var $mdgriffith$elm_ui$Internal$Flag$present_fn = function (myFlag, _v0) {
        var fieldOne = _v0.a;
        var fieldTwo = _v0.b;
        if (!myFlag.$) {
            var first = myFlag.a;
            return _Utils_eq(first & fieldOne, first);
        }
        else {
            var second = myFlag.a;
            return _Utils_eq(second & fieldTwo, second);
        }
    }, $mdgriffith$elm_ui$Internal$Flag$present = F2($mdgriffith$elm_ui$Internal$Flag$present_fn);
    var $elm$html$Html$s = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "s"), $elm$html$Html$s_fn = $elm$html$Html$s.a2;
    var $elm$html$Html$u = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "u"), $elm$html$Html$u_fn = $elm$html$Html$u.a2;
    var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
    var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
    var $mdgriffith$elm_ui$Internal$Model$finalizeNode_fn = function (has, node, attributes, children, embedMode, parentContext) {
        var createNode = F2(function (nodeName, attrs) {
            if (children.$ === 1) {
                var keyed = children.a;
                return A3($elm$virtual_dom$VirtualDom$keyedNode, nodeName, attrs, function () {
                    switch (embedMode.$) {
                        case 0:
                            return keyed;
                        case 2:
                            var opts = embedMode.a;
                            var styles = embedMode.b;
                            return $mdgriffith$elm_ui$Internal$Model$embedKeyed_fn(false, opts, styles, keyed);
                        default:
                            var opts = embedMode.a;
                            var styles = embedMode.b;
                            return $mdgriffith$elm_ui$Internal$Model$embedKeyed_fn(true, opts, styles, keyed);
                    }
                }());
            }
            else {
                var unkeyed = children.a;
                return A2(function () {
                    switch (nodeName) {
                        case "div":
                            return $elm$html$Html$div;
                        case "p":
                            return $elm$html$Html$p;
                        default:
                            return $elm$virtual_dom$VirtualDom$node(nodeName);
                    }
                }(), attrs, function () {
                    switch (embedMode.$) {
                        case 0:
                            return unkeyed;
                        case 2:
                            var opts = embedMode.a;
                            var styles = embedMode.b;
                            return $mdgriffith$elm_ui$Internal$Model$embedWith_fn(false, opts, styles, unkeyed);
                        default:
                            var opts = embedMode.a;
                            var styles = embedMode.b;
                            return $mdgriffith$elm_ui$Internal$Model$embedWith_fn(true, opts, styles, unkeyed);
                    }
                }());
            }
        });
        var html = function () {
            switch (node.$) {
                case 0:
                    return A2(createNode, "div", attributes);
                case 1:
                    var nodeName = node.a;
                    return A2(createNode, nodeName, attributes);
                default:
                    var nodeName = node.a;
                    var internal = node.b;
                    return A3($elm$virtual_dom$VirtualDom$node, nodeName, attributes, _List_fromArray([
                        A2(createNode, internal, _List_fromArray([
                            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $mdgriffith$elm_ui$Internal$Style$classes.cs + (" " + $mdgriffith$elm_ui$Internal$Style$classes.dC))
                        ]))
                    ]));
            }
        }();
        switch (parentContext) {
            case 0:
                return ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!$mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? $elm$html$Html$u_fn(_List_fromArray([
                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.cs, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.az, $mdgriffith$elm_ui$Internal$Style$classes.J, $mdgriffith$elm_ui$Internal$Style$classes.co])))
                ]), _List_fromArray([html])) : ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$centerX, has) ? $elm$html$Html$s_fn(_List_fromArray([
                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.cs, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.az, $mdgriffith$elm_ui$Internal$Style$classes.J, $mdgriffith$elm_ui$Internal$Style$classes.cm])))
                ]), _List_fromArray([html])) : html));
            case 1:
                return ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!$mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$centerY, has) ? $elm$html$Html$s_fn(_List_fromArray([
                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.cs, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.az, $mdgriffith$elm_ui$Internal$Style$classes.cn])))
                ]), _List_fromArray([html])) : ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? $elm$html$Html$u_fn(_List_fromArray([
                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.cs, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.az, $mdgriffith$elm_ui$Internal$Style$classes.cl])))
                ]), _List_fromArray([html])) : html));
            default:
                return html;
        }
    }, $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6($mdgriffith$elm_ui$Internal$Model$finalizeNode_fn);
    var $elm$core$List$isEmpty = function (xs) {
        if (!xs.b) {
            return true;
        }
        else {
            return false;
        }
    };
    var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
    var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.cs + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.dO + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.a7 + (" " + $mdgriffith$elm_ui$Internal$Style$classes.aV)))));
    var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
        return $elm$html$Html$div_fn(_List_fromArray([
            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $mdgriffith$elm_ui$Internal$Model$textElementClasses)
        ]), _List_fromArray([
            $elm$html$Html$text(str)
        ]));
    };
    var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.cs + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.dO + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.a8 + (" " + $mdgriffith$elm_ui$Internal$Style$classes.aW)))));
    var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
        return $elm$html$Html$div_fn(_List_fromArray([
            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
        ]), _List_fromArray([
            $elm$html$Html$text(str)
        ]));
    };
    var $mdgriffith$elm_ui$Internal$Model$createElement_fn = function (context, children, rendered) {
        var gatherKeyed = F2(function (_v8, _v9) {
            var key = _v8.a;
            var child = _v8.b;
            var htmls = _v9.a;
            var existingStyles = _v9.b;
            switch (child.$) {
                case 0:
                    var html = child.a;
                    return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, html(context)), htmls), existingStyles) : _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, html(context)), htmls), existingStyles);
                case 1:
                    var styled = child.a;
                    return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, A2(styled.c0, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)), htmls), $elm$core$List$isEmpty(existingStyles) ? styled.dM : _Utils_ap(styled.dM, existingStyles)) : _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, A2(styled.c0, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)), htmls), $elm$core$List$isEmpty(existingStyles) ? styled.dM : _Utils_ap(styled.dM, existingStyles));
                case 2:
                    var str = child.a;
                    return _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)), htmls), existingStyles);
                default:
                    return _Utils_Tuple2(htmls, existingStyles);
            }
        });
        var gather = F2(function (child, _v6) {
            var htmls = _v6.a;
            var existingStyles = _v6.b;
            switch (child.$) {
                case 0:
                    var html = child.a;
                    return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(_List_Cons(html(context), htmls), existingStyles) : _Utils_Tuple2(_List_Cons(html(context), htmls), existingStyles);
                case 1:
                    var styled = child.a;
                    return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(_List_Cons(A2(styled.c0, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context), htmls), $elm$core$List$isEmpty(existingStyles) ? styled.dM : _Utils_ap(styled.dM, existingStyles)) : _Utils_Tuple2(_List_Cons(A2(styled.c0, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context), htmls), $elm$core$List$isEmpty(existingStyles) ? styled.dM : _Utils_ap(styled.dM, existingStyles));
                case 2:
                    var str = child.a;
                    return _Utils_Tuple2(_List_Cons(_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str), htmls), existingStyles);
                default:
                    return _Utils_Tuple2(htmls, existingStyles);
            }
        });
        if (children.$ === 1) {
            var keyedChildren = children.a;
            var _v1 = $elm$core$List$foldr_fn(gatherKeyed, _Utils_Tuple2(_List_Nil, _List_Nil), keyedChildren);
            var keyed = _v1.a;
            var styles = _v1.b;
            var newStyles = $elm$core$List$isEmpty(styles) ? rendered.dM : _Utils_ap(rendered.dM, styles);
            if (!newStyles.b) {
                return $mdgriffith$elm_ui$Internal$Model$Unstyled(A5($mdgriffith$elm_ui$Internal$Model$finalizeNode, rendered.S, rendered.U, rendered.O, $mdgriffith$elm_ui$Internal$Model$Keyed($mdgriffith$elm_ui$Internal$Model$addKeyedChildren_fn("nearby-element-pls", keyed, rendered.P)), $mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
            }
            else {
                var allStyles = newStyles;
                return $mdgriffith$elm_ui$Internal$Model$Styled({
                    c0: A4($mdgriffith$elm_ui$Internal$Model$finalizeNode, rendered.S, rendered.U, rendered.O, $mdgriffith$elm_ui$Internal$Model$Keyed($mdgriffith$elm_ui$Internal$Model$addKeyedChildren_fn("nearby-element-pls", keyed, rendered.P))),
                    dM: allStyles
                });
            }
        }
        else {
            var unkeyedChildren = children.a;
            var _v3 = $elm$core$List$foldr_fn(gather, _Utils_Tuple2(_List_Nil, _List_Nil), unkeyedChildren);
            var unkeyed = _v3.a;
            var styles = _v3.b;
            var newStyles = $elm$core$List$isEmpty(styles) ? rendered.dM : _Utils_ap(rendered.dM, styles);
            if (!newStyles.b) {
                return $mdgriffith$elm_ui$Internal$Model$Unstyled(A5($mdgriffith$elm_ui$Internal$Model$finalizeNode, rendered.S, rendered.U, rendered.O, $mdgriffith$elm_ui$Internal$Model$Unkeyed($mdgriffith$elm_ui$Internal$Model$addChildren_fn(unkeyed, rendered.P)), $mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
            }
            else {
                var allStyles = newStyles;
                return $mdgriffith$elm_ui$Internal$Model$Styled({
                    c0: A4($mdgriffith$elm_ui$Internal$Model$finalizeNode, rendered.S, rendered.U, rendered.O, $mdgriffith$elm_ui$Internal$Model$Unkeyed($mdgriffith$elm_ui$Internal$Model$addChildren_fn(unkeyed, rendered.P))),
                    dM: allStyles
                });
            }
        }
    }, $mdgriffith$elm_ui$Internal$Model$createElement = F3($mdgriffith$elm_ui$Internal$Model$createElement_fn);
    var $mdgriffith$elm_ui$Internal$Model$Single_fn = function (a, b, c) {
        return { $: 3, a: a, b: b, c: c };
    }, $mdgriffith$elm_ui$Internal$Model$Single = F3($mdgriffith$elm_ui$Internal$Model$Single_fn);
    var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
        return { $: 10, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Flag$Field_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Flag$Field = F2($mdgriffith$elm_ui$Internal$Flag$Field_fn);
    var $elm$core$Bitwise$or = _Bitwise_or;
    var $mdgriffith$elm_ui$Internal$Flag$add_fn = function (myFlag, _v0) {
        var one = _v0.a;
        var two = _v0.b;
        if (!myFlag.$) {
            var first = myFlag.a;
            return $mdgriffith$elm_ui$Internal$Flag$Field_fn(first | one, two);
        }
        else {
            var second = myFlag.a;
            return $mdgriffith$elm_ui$Internal$Flag$Field_fn(one, second | two);
        }
    }, $mdgriffith$elm_ui$Internal$Flag$add = F2($mdgriffith$elm_ui$Internal$Flag$add_fn);
    var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2($mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn);
    var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$nearbyElement_fn = function (location, elem) {
        return $elm$html$Html$div_fn(_List_fromArray([
            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, function () {
                switch (location) {
                    case 0:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.af, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.cg]));
                    case 1:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.af, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.cx]));
                    case 2:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.af, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.dj]));
                    case 3:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.af, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.dh]));
                    case 4:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.af, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.c3]));
                    default:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.af, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.cw]));
                }
            }())
        ]), _List_fromArray([
            function () {
                switch (elem.$) {
                    case 3:
                        return $elm$virtual_dom$VirtualDom$text("");
                    case 2:
                        var str = elem.a;
                        return $mdgriffith$elm_ui$Internal$Model$textElement(str);
                    case 0:
                        var html = elem.a;
                        return html($mdgriffith$elm_ui$Internal$Model$asEl);
                    default:
                        var styled = elem.a;
                        return A2(styled.c0, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
                }
            }()
        ]));
    }, $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2($mdgriffith$elm_ui$Internal$Model$nearbyElement_fn);
    var $mdgriffith$elm_ui$Internal$Model$addNearbyElement_fn = function (location, elem, existing) {
        var nearby = $mdgriffith$elm_ui$Internal$Model$nearbyElement_fn(location, elem);
        switch (existing.$) {
            case 0:
                if (location === 5) {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(_List_fromArray([nearby]));
                }
                else {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(_List_fromArray([nearby]));
                }
            case 1:
                var existingBehind = existing.a;
                if (location === 5) {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(_List_Cons(nearby, existingBehind));
                }
                else {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn(existingBehind, _List_fromArray([nearby]));
                }
            case 2:
                var existingInFront = existing.a;
                if (location === 5) {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn(_List_fromArray([nearby]), existingInFront);
                }
                else {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(_List_Cons(nearby, existingInFront));
                }
            default:
                var existingBehind = existing.a;
                var existingInFront = existing.b;
                if (location === 5) {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn(_List_Cons(nearby, existingBehind), existingInFront);
                }
                else {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn(existingBehind, _List_Cons(nearby, existingInFront));
                }
        }
    }, $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3($mdgriffith$elm_ui$Internal$Model$addNearbyElement_fn);
    var $mdgriffith$elm_ui$Internal$Model$Embedded_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Embedded = F2($mdgriffith$elm_ui$Internal$Model$Embedded_fn);
    var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$addNodeName_fn = function (newNode, old) {
        switch (old.$) {
            case 0:
                return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
            case 1:
                var name = old.a;
                return $mdgriffith$elm_ui$Internal$Model$Embedded_fn(name, newNode);
            default:
                var x = old.a;
                var y = old.b;
                return $mdgriffith$elm_ui$Internal$Model$Embedded_fn(x, y);
        }
    }, $mdgriffith$elm_ui$Internal$Model$addNodeName = F2($mdgriffith$elm_ui$Internal$Model$addNodeName_fn);
    var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
        switch (align) {
            case 0:
                return $mdgriffith$elm_ui$Internal$Style$classes.aN + (" " + $mdgriffith$elm_ui$Internal$Style$classes.bd);
            case 2:
                return $mdgriffith$elm_ui$Internal$Style$classes.aN + (" " + $mdgriffith$elm_ui$Internal$Style$classes.be);
            default:
                return $mdgriffith$elm_ui$Internal$Style$classes.aN + (" " + $mdgriffith$elm_ui$Internal$Style$classes.cj);
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
        switch (align) {
            case 0:
                return $mdgriffith$elm_ui$Internal$Style$classes.aO + (" " + $mdgriffith$elm_ui$Internal$Style$classes.cp);
            case 2:
                return $mdgriffith$elm_ui$Internal$Style$classes.aO + (" " + $mdgriffith$elm_ui$Internal$Style$classes.ci);
            default:
                return $mdgriffith$elm_ui$Internal$Style$classes.aO + (" " + $mdgriffith$elm_ui$Internal$Style$classes.ck);
        }
    };
    var $elm$virtual_dom$VirtualDom$attribute_fn = function (key, value) {
        return _VirtualDom_attribute_fn(_VirtualDom_noOnOrFormAction(key), _VirtualDom_noJavaScriptOrHtmlUri(value));
    }, $elm$virtual_dom$VirtualDom$attribute = F2($elm$virtual_dom$VirtualDom$attribute_fn);
    var $mdgriffith$elm_ui$Internal$Model$FullTransform_fn = function (a, b, c, d) {
        return { $: 2, a: a, b: b, c: c, d: d };
    }, $mdgriffith$elm_ui$Internal$Model$FullTransform = F4($mdgriffith$elm_ui$Internal$Model$FullTransform_fn);
    var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$composeTransformation_fn = function (transform, component) {
        switch (transform.$) {
            case 0:
                switch (component.$) {
                    case 0:
                        var x = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(x, 0, 0));
                    case 1:
                        var y = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(0, y, 0));
                    case 2:
                        var z = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(0, 0, z));
                    case 3:
                        var xyz = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
                    case 4:
                        var xyz = component.a;
                        var angle = component.b;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(0, 0, 0), _Utils_Tuple3(1, 1, 1), xyz, angle);
                    default:
                        var xyz = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(0, 0, 0), xyz, _Utils_Tuple3(0, 0, 1), 0);
                }
            case 1:
                var moved = transform.a;
                var x = moved.a;
                var y = moved.b;
                var z = moved.c;
                switch (component.$) {
                    case 0:
                        var newX = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(newX, y, z));
                    case 1:
                        var newY = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(x, newY, z));
                    case 2:
                        var newZ = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(x, y, newZ));
                    case 3:
                        var xyz = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
                    case 4:
                        var xyz = component.a;
                        var angle = component.b;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(moved, _Utils_Tuple3(1, 1, 1), xyz, angle);
                    default:
                        var scale = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(moved, scale, _Utils_Tuple3(0, 0, 1), 0);
                }
            default:
                var moved = transform.a;
                var x = moved.a;
                var y = moved.b;
                var z = moved.c;
                var scaled = transform.b;
                var origin = transform.c;
                var angle = transform.d;
                switch (component.$) {
                    case 0:
                        var newX = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(newX, y, z), scaled, origin, angle);
                    case 1:
                        var newY = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(x, newY, z), scaled, origin, angle);
                    case 2:
                        var newZ = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(x, y, newZ), scaled, origin, angle);
                    case 3:
                        var newMove = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(newMove, scaled, origin, angle);
                    case 4:
                        var newOrigin = component.a;
                        var newAngle = component.b;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(moved, scaled, newOrigin, newAngle);
                    default:
                        var newScale = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(moved, newScale, origin, angle);
                }
        }
    }, $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2($mdgriffith$elm_ui$Internal$Model$composeTransformation_fn);
    var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
    var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
    var $mdgriffith$elm_ui$Internal$Flag$merge_fn = function (_v0, _v1) {
        var one = _v0.a;
        var two = _v0.b;
        var three = _v1.a;
        var four = _v1.b;
        return $mdgriffith$elm_ui$Internal$Flag$Field_fn(one | three, two | four);
    }, $mdgriffith$elm_ui$Internal$Flag$merge = F2($mdgriffith$elm_ui$Internal$Flag$merge_fn);
    var $mdgriffith$elm_ui$Internal$Flag$none = $mdgriffith$elm_ui$Internal$Flag$Field_fn(0, 0);
    var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
        switch (h.$) {
            case 0:
                var px = h.a;
                var val = $elm$core$String$fromInt(px);
                var name = "height-px-" + val;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$none, $mdgriffith$elm_ui$Internal$Style$classes.bu + (" " + name), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Single_fn(name, "height", val + "px")
                ]));
            case 1:
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.aV, _List_Nil);
            case 2:
                var portion = h.a;
                return (portion === 1) ? _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.aW, _List_Nil) : _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.bv + (" height-fill-" + $elm$core$String$fromInt(portion)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Style$classes.cs + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.I + (" > " + $mdgriffith$elm_ui$Internal$Style$dot("height-fill-" + $elm$core$String$fromInt(portion))))), "flex-grow", $elm$core$String$fromInt(portion * 100000))
                ]));
            case 3:
                var minSize = h.a;
                var len = h.b;
                var cls = "min-height-" + $elm$core$String$fromInt(minSize);
                var style = $mdgriffith$elm_ui$Internal$Model$Single_fn(cls, "min-height", $elm$core$String$fromInt(minSize) + "px !important");
                var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
                var newFlag = _v1.a;
                var newAttrs = _v1.b;
                var newStyle = _v1.c;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag), cls + (" " + newAttrs), _List_Cons(style, newStyle));
            default:
                var maxSize = h.a;
                var len = h.b;
                var cls = "max-height-" + $elm$core$String$fromInt(maxSize);
                var style = $mdgriffith$elm_ui$Internal$Model$Single_fn(cls, "max-height", $elm$core$String$fromInt(maxSize) + "px");
                var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
                var newFlag = _v2.a;
                var newAttrs = _v2.b;
                var newStyle = _v2.c;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag), cls + (" " + newAttrs), _List_Cons(style, newStyle));
        }
    };
    var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
    var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
        switch (w.$) {
            case 0:
                var px = w.a;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$none, $mdgriffith$elm_ui$Internal$Style$classes.cb + (" width-px-" + $elm$core$String$fromInt(px)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Single_fn("width-px-" + $elm$core$String$fromInt(px), "width", $elm$core$String$fromInt(px) + "px")
                ]));
            case 1:
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.a7, _List_Nil);
            case 2:
                var portion = w.a;
                return (portion === 1) ? _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.a8, _List_Nil) : _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.cc + (" width-fill-" + $elm$core$String$fromInt(portion)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Style$classes.cs + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.bZ + (" > " + $mdgriffith$elm_ui$Internal$Style$dot("width-fill-" + $elm$core$String$fromInt(portion))))), "flex-grow", $elm$core$String$fromInt(portion * 100000))
                ]));
            case 3:
                var minSize = w.a;
                var len = w.b;
                var cls = "min-width-" + $elm$core$String$fromInt(minSize);
                var style = $mdgriffith$elm_ui$Internal$Model$Single_fn(cls, "min-width", $elm$core$String$fromInt(minSize) + "px");
                var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
                var newFlag = _v1.a;
                var newAttrs = _v1.b;
                var newStyle = _v1.c;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag), cls + (" " + newAttrs), _List_Cons(style, newStyle));
            default:
                var maxSize = w.a;
                var len = w.b;
                var cls = "max-width-" + $elm$core$String$fromInt(maxSize);
                var style = $mdgriffith$elm_ui$Internal$Model$Single_fn(cls, "max-width", $elm$core$String$fromInt(maxSize) + "px");
                var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
                var newFlag = _v2.a;
                var newAttrs = _v2.b;
                var newStyle = _v2.c;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag), cls + (" " + newAttrs), _List_Cons(style, newStyle));
        }
    };
    var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
    var $elm$core$Basics$ge = _Utils_ge;
    var $mdgriffith$elm_ui$Internal$Model$skippable_fn = function (flag, style) {
        if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
            if (style.$ === 3) {
                var val = style.c;
                switch (val) {
                    case "0px":
                        return true;
                    case "1px":
                        return true;
                    case "2px":
                        return true;
                    case "3px":
                        return true;
                    case "4px":
                        return true;
                    case "5px":
                        return true;
                    case "6px":
                        return true;
                    default:
                        return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            switch (style.$) {
                case 2:
                    var i = style.a;
                    return (i >= 8) && (i <= 32);
                case 7:
                    var name = style.a;
                    var t = style.b;
                    var r = style.c;
                    var b = style.d;
                    var l = style.e;
                    return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
                default:
                    return false;
            }
        }
    }, $mdgriffith$elm_ui$Internal$Model$skippable = F2($mdgriffith$elm_ui$Internal$Model$skippable_fn);
    var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
    var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
    var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
    var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive_fn = function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
        gatherAttrRecursive: while (true) {
            if (!elementAttrs.b) {
                var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
                if (_v1.$ === 1) {
                    return {
                        O: _List_Cons($elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, classes), attrs),
                        P: children,
                        S: has,
                        U: node,
                        dM: styles
                    };
                }
                else {
                    var _class = _v1.a;
                    return {
                        O: _List_Cons($elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, classes + (" " + _class)), attrs),
                        P: children,
                        S: has,
                        U: node,
                        dM: _List_Cons($mdgriffith$elm_ui$Internal$Model$Transform(transform), styles)
                    };
                }
            }
            else {
                var attribute = elementAttrs.a;
                var remaining = elementAttrs.b;
                switch (attribute.$) {
                    case 0:
                        var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                        classes = $temp$classes;
                        node = $temp$node;
                        has = $temp$has;
                        transform = $temp$transform;
                        styles = $temp$styles;
                        attrs = $temp$attrs;
                        children = $temp$children;
                        elementAttrs = $temp$elementAttrs;
                        continue gatherAttrRecursive;
                    case 3:
                        var flag = attribute.a;
                        var exactClassName = attribute.b;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn(flag, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            var $temp$classes = exactClassName + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn(flag, has), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                    case 1:
                        var actualAttribute = attribute.a;
                        var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons(actualAttribute, attrs), $temp$children = children, $temp$elementAttrs = remaining;
                        classes = $temp$classes;
                        node = $temp$node;
                        has = $temp$has;
                        transform = $temp$transform;
                        styles = $temp$styles;
                        attrs = $temp$attrs;
                        children = $temp$children;
                        elementAttrs = $temp$elementAttrs;
                        continue gatherAttrRecursive;
                    case 4:
                        var flag = attribute.a;
                        var style = attribute.b;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn(flag, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            if ($mdgriffith$elm_ui$Internal$Model$skippable_fn(flag, style)) {
                                var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn(flag, has), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            }
                            else {
                                var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn(flag, has), $temp$transform = transform, $temp$styles = _List_Cons(style, styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            }
                        }
                    case 10:
                        var flag = attribute.a;
                        var component = attribute.b;
                        var $temp$classes = classes, $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn(flag, has), $temp$transform = $mdgriffith$elm_ui$Internal$Model$composeTransformation_fn(transform, component), $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                        classes = $temp$classes;
                        node = $temp$node;
                        has = $temp$has;
                        transform = $temp$transform;
                        styles = $temp$styles;
                        attrs = $temp$attrs;
                        children = $temp$children;
                        elementAttrs = $temp$elementAttrs;
                        continue gatherAttrRecursive;
                    case 7:
                        var width = attribute.a;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$width, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            switch (width.$) {
                                case 0:
                                    var px = width.a;
                                    var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.cb + (" width-px-" + $elm$core$String$fromInt(px))) + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has), $temp$transform = transform, $temp$styles = _List_Cons($mdgriffith$elm_ui$Internal$Model$Single_fn("width-px-" + $elm$core$String$fromInt(px), "width", $elm$core$String$fromInt(px) + "px"), styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                case 1:
                                    var $temp$classes = classes + (" " + $mdgriffith$elm_ui$Internal$Style$classes.a7), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                case 2:
                                    var portion = width.a;
                                    if (portion === 1) {
                                        var $temp$classes = classes + (" " + $mdgriffith$elm_ui$Internal$Style$classes.a8), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                    else {
                                        var $temp$classes = classes + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.cc + (" width-fill-" + $elm$core$String$fromInt(portion)))), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has)), $temp$transform = transform, $temp$styles = _List_Cons($mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Style$classes.cs + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.bZ + (" > " + $mdgriffith$elm_ui$Internal$Style$dot("width-fill-" + $elm$core$String$fromInt(portion))))), "flex-grow", $elm$core$String$fromInt(portion * 100000)), styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                default:
                                    var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
                                    var addToFlags = _v4.a;
                                    var newClass = _v4.b;
                                    var newStyles = _v4.c;
                                    var $temp$classes = classes + (" " + newClass), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$merge_fn(addToFlags, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has)), $temp$transform = transform, $temp$styles = _Utils_ap(newStyles, styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                            }
                        }
                    case 8:
                        var height = attribute.a;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$height, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            switch (height.$) {
                                case 0:
                                    var px = height.a;
                                    var val = $elm$core$String$fromInt(px) + "px";
                                    var name = "height-px-" + val;
                                    var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.bu + (" " + (name + (" " + classes))), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has), $temp$transform = transform, $temp$styles = _List_Cons($mdgriffith$elm_ui$Internal$Model$Single_fn(name, "height ", val), styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                case 1:
                                    var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.aV + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                case 2:
                                    var portion = height.a;
                                    if (portion === 1) {
                                        var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.aW + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                    else {
                                        var $temp$classes = classes + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.bv + (" height-fill-" + $elm$core$String$fromInt(portion)))), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has)), $temp$transform = transform, $temp$styles = _List_Cons($mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Style$classes.cs + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.I + (" > " + $mdgriffith$elm_ui$Internal$Style$dot("height-fill-" + $elm$core$String$fromInt(portion))))), "flex-grow", $elm$core$String$fromInt(portion * 100000)), styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                default:
                                    var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
                                    var addToFlags = _v6.a;
                                    var newClass = _v6.b;
                                    var newStyles = _v6.c;
                                    var $temp$classes = classes + (" " + newClass), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$merge_fn(addToFlags, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has)), $temp$transform = transform, $temp$styles = _Utils_ap(newStyles, styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                            }
                        }
                    case 2:
                        var description = attribute.a;
                        switch (description.$) {
                            case 0:
                                var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("main", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 1:
                                var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("nav", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 2:
                                var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("footer", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 3:
                                var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("aside", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 4:
                                var i = description.a;
                                if (i <= 1) {
                                    var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("h1", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                }
                                else {
                                    if (i < 7) {
                                        var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("h" + $elm$core$String$fromInt(i), node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                    else {
                                        var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("h6", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                }
                            case 9:
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 8:
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons($elm$virtual_dom$VirtualDom$attribute_fn("role", "button"), attrs), $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 5:
                                var label = description.a;
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons($elm$virtual_dom$VirtualDom$attribute_fn("aria-label", label), attrs), $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 6:
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons($elm$virtual_dom$VirtualDom$attribute_fn("aria-live", "polite"), attrs), $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            default:
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons($elm$virtual_dom$VirtualDom$attribute_fn("aria-live", "assertive"), attrs), $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                        }
                    case 9:
                        var location = attribute.a;
                        var elem = attribute.b;
                        var newStyles = function () {
                            switch (elem.$) {
                                case 3:
                                    return styles;
                                case 2:
                                    var str = elem.a;
                                    return styles;
                                case 0:
                                    var html = elem.a;
                                    return styles;
                                default:
                                    var styled = elem.a;
                                    return _Utils_ap(styles, styled.dM);
                            }
                        }();
                        var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = newStyles, $temp$attrs = attrs, $temp$children = $mdgriffith$elm_ui$Internal$Model$addNearbyElement_fn(location, elem, children), $temp$elementAttrs = remaining;
                        classes = $temp$classes;
                        node = $temp$node;
                        has = $temp$has;
                        transform = $temp$transform;
                        styles = $temp$styles;
                        attrs = $temp$attrs;
                        children = $temp$children;
                        elementAttrs = $temp$elementAttrs;
                        continue gatherAttrRecursive;
                    case 6:
                        var x = attribute.a;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (" " + classes), $temp$node = node, $temp$has = function (flags) {
                                switch (x) {
                                    case 1:
                                        return $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$centerX, flags);
                                    case 2:
                                        return $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
                                    default:
                                        return flags;
                                }
                            }($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$xAlign, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                    default:
                        var y = attribute.a;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (" " + classes), $temp$node = node, $temp$has = function (flags) {
                                switch (y) {
                                    case 1:
                                        return $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$centerY, flags);
                                    case 2:
                                        return $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
                                    default:
                                        return flags;
                                }
                            }($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$yAlign, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                }
            }
        }
    }, $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8($mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive_fn);
    var $mdgriffith$elm_ui$Internal$Model$Untransformed = { $: 0 };
    var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
    var $mdgriffith$elm_ui$Internal$Model$element_fn = function (context, node, attributes, children) {
        return $mdgriffith$elm_ui$Internal$Model$createElement_fn(context, children, $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive_fn($mdgriffith$elm_ui$Internal$Model$contextClasses(context), node, $mdgriffith$elm_ui$Internal$Flag$none, $mdgriffith$elm_ui$Internal$Model$untransformed, _List_Nil, _List_Nil, $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren, $elm$core$List$reverse(attributes)));
    }, $mdgriffith$elm_ui$Internal$Model$element = F4($mdgriffith$elm_ui$Internal$Model$element_fn);
    var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
        return { $: 8, a: a };
    };
    var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
    var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
        return $mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, cls));
    };
    var $mdgriffith$elm_ui$Internal$Model$Content = { $: 1 };
    var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
    var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
        return { $: 7, a: a };
    };
    var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
    var $mdgriffith$elm_ui$Element$column_fn = function (attrs, children) {
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asColumn, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cM + (" " + $mdgriffith$elm_ui$Internal$Style$classes.al)), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink), attrs))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
    }, $mdgriffith$elm_ui$Element$column = F2($mdgriffith$elm_ui$Element$column_fn);
    var $mdgriffith$elm_ui$Internal$Model$FontFamily_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$FontFamily = F2($mdgriffith$elm_ui$Internal$Model$FontFamily_fn);
    var $mdgriffith$elm_ui$Internal$Model$StyleClass_fn = function (a, b) {
        return { $: 4, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$StyleClass = F2($mdgriffith$elm_ui$Internal$Model$StyleClass_fn);
    var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
    var $elm$core$String$toLower = _String_toLower;
    var $elm$core$String$words = _String_words;
    var $mdgriffith$elm_ui$Internal$Model$renderFontClassName_fn = function (font, current) {
        return _Utils_ap(current, function () {
            switch (font.$) {
                case 0:
                    return "serif";
                case 1:
                    return "sans-serif";
                case 2:
                    return "monospace";
                case 3:
                    var name = font.a;
                    return $elm$core$String$join_fn("-", $elm$core$String$words($elm$core$String$toLower(name)));
                case 4:
                    var name = font.a;
                    var url = font.b;
                    return $elm$core$String$join_fn("-", $elm$core$String$words($elm$core$String$toLower(name)));
                default:
                    var name = font.a.T;
                    return $elm$core$String$join_fn("-", $elm$core$String$words($elm$core$String$toLower(name)));
            }
        }());
    }, $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2($mdgriffith$elm_ui$Internal$Model$renderFontClassName_fn);
    var $mdgriffith$elm_ui$Element$Font$family = function (families) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontFamily, $mdgriffith$elm_ui$Internal$Model$FontFamily_fn($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderFontClassName, "ff-", families), families));
    };
    var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
    var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2($mdgriffith$elm_ui$Internal$Model$OnlyDynamic_fn);
    var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2($mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic_fn);
    var $mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
    var $mdgriffith$elm_ui$Internal$Model$Layout = 0;
    var $mdgriffith$elm_ui$Internal$Model$Rgba_fn = function (a, b, c, d) {
        return { $: 0, a: a, b: b, c: c, d: d };
    }, $mdgriffith$elm_ui$Internal$Model$Rgba = F4($mdgriffith$elm_ui$Internal$Model$Rgba_fn);
    var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
        cu: $elm$core$Maybe$Nothing,
        cA: $elm$core$Maybe$Nothing,
        dB: $elm$core$Maybe$Just({
            ab: 0,
            ac: $mdgriffith$elm_ui$Internal$Model$Rgba_fn(155 / 255, 203 / 255, 1, 1),
            b: _Utils_Tuple2(0, 0),
            b1: 3
        })
    };
    var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
        var combine = F2(function (opt, record) {
            switch (opt.$) {
                case 0:
                    var hoverable = opt.a;
                    var _v4 = record.c$;
                    if (_v4.$ === 1) {
                        return _Utils_update(record, {
                            c$: $elm$core$Maybe$Just(hoverable)
                        });
                    }
                    else {
                        return record;
                    }
                case 1:
                    var focusStyle = opt.a;
                    var _v5 = record.cX;
                    if (_v5.$ === 1) {
                        return _Utils_update(record, {
                            cX: $elm$core$Maybe$Just(focusStyle)
                        });
                    }
                    else {
                        return record;
                    }
                default:
                    var renderMode = opt.a;
                    var _v6 = record.df;
                    if (_v6.$ === 1) {
                        return _Utils_update(record, {
                            df: $elm$core$Maybe$Just(renderMode)
                        });
                    }
                    else {
                        return record;
                    }
            }
        });
        var andFinally = function (record) {
            return {
                cX: function () {
                    var _v0 = record.cX;
                    if (_v0.$ === 1) {
                        return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
                    }
                    else {
                        var focusable = _v0.a;
                        return focusable;
                    }
                }(),
                c$: function () {
                    var _v1 = record.c$;
                    if (_v1.$ === 1) {
                        return 1;
                    }
                    else {
                        var hoverable = _v1.a;
                        return hoverable;
                    }
                }(),
                df: function () {
                    var _v2 = record.df;
                    if (_v2.$ === 1) {
                        return 0;
                    }
                    else {
                        var actualMode = _v2.a;
                        return actualMode;
                    }
                }()
            };
        };
        return andFinally($elm$core$List$foldr_fn(combine, { cX: $elm$core$Maybe$Nothing, c$: $elm$core$Maybe$Nothing, df: $elm$core$Maybe$Nothing }, options));
    };
    var $mdgriffith$elm_ui$Internal$Model$toHtml_fn = function (mode, el) {
        switch (el.$) {
            case 0:
                var html = el.a;
                return html($mdgriffith$elm_ui$Internal$Model$asEl);
            case 1:
                var styles = el.a.dM;
                var html = el.a.c0;
                return A2(html, mode(styles), $mdgriffith$elm_ui$Internal$Model$asEl);
            case 2:
                var text = el.a;
                return $mdgriffith$elm_ui$Internal$Model$textElement(text);
            default:
                return $mdgriffith$elm_ui$Internal$Model$textElement("");
        }
    }, $mdgriffith$elm_ui$Internal$Model$toHtml = F2($mdgriffith$elm_ui$Internal$Model$toHtml_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderRoot_fn = function (optionList, attributes, child) {
        var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
        var embedStyle = function () {
            var _v0 = options.df;
            if (_v0 === 1) {
                return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
            }
            else {
                return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
            }
        }();
        return $mdgriffith$elm_ui$Internal$Model$toHtml_fn(embedStyle, $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, attributes, $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([child]))));
    }, $mdgriffith$elm_ui$Internal$Model$renderRoot = F3($mdgriffith$elm_ui$Internal$Model$renderRoot_fn);
    var $mdgriffith$elm_ui$Internal$Model$Colored_fn = function (a, b, c) {
        return { $: 4, a: a, b: b, c: c };
    }, $mdgriffith$elm_ui$Internal$Model$Colored = F3($mdgriffith$elm_ui$Internal$Model$Colored_fn);
    var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$SansSerif = { $: 1 };
    var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
        return { $: 3, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
    var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
    var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
    var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
        var red = _v0.a;
        var green = _v0.b;
        var blue = _v0.c;
        var alpha = _v0.d;
        return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ("-" + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
    };
    var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
        var families = _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$Typeface("Open Sans"),
            $mdgriffith$elm_ui$Internal$Model$Typeface("Helvetica"),
            $mdgriffith$elm_ui$Internal$Model$Typeface("Verdana"),
            $mdgriffith$elm_ui$Internal$Model$SansSerif
        ]);
        return _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$bgColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("bg-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass($mdgriffith$elm_ui$Internal$Model$Rgba_fn(1, 1, 1, 0)), "background-color", $mdgriffith$elm_ui$Internal$Model$Rgba_fn(1, 1, 1, 0))),
            $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("fc-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass($mdgriffith$elm_ui$Internal$Model$Rgba_fn(0, 0, 0, 1)), "color", $mdgriffith$elm_ui$Internal$Model$Rgba_fn(0, 0, 0, 1))),
            $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontSize, $mdgriffith$elm_ui$Internal$Model$FontSize(20)),
            $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontFamily, $mdgriffith$elm_ui$Internal$Model$FontFamily_fn($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderFontClassName, "font-", families), families))
        ]);
    }();
    var $mdgriffith$elm_ui$Element$layoutWith_fn = function (_v0, attrs, child) {
        var options = _v0.bJ;
        return $mdgriffith$elm_ui$Internal$Model$renderRoot_fn(options, _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.du, $mdgriffith$elm_ui$Internal$Style$classes.cs, $mdgriffith$elm_ui$Internal$Style$classes.dC]))), _Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)), child);
    }, $mdgriffith$elm_ui$Element$layoutWith = F3($mdgriffith$elm_ui$Element$layoutWith_fn);
    var $mdgriffith$elm_ui$Element$layout_a0 = { bJ: _List_Nil }, $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith($mdgriffith$elm_ui$Element$layout_a0);
    var $author$project$Main$LoadMore = { $: 2 };
    var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
        return { $: 5, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$Top = 0;
    var $mdgriffith$elm_ui$Element$alignTop = $mdgriffith$elm_ui$Internal$Model$AlignY(0);
    var $mdgriffith$elm_ui$Internal$Model$Button = { $: 8 };
    var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
        return { $: 2, a: a };
    };
    var $elm$json$Json$Encode$bool = _Json_wrap;
    var $elm$html$Html$Attributes$boolProperty_fn = function (key, bool) {
        return _VirtualDom_property_fn(key, $elm$json$Json$Encode$bool(bool));
    }, $elm$html$Html$Attributes$boolProperty = F2($elm$html$Html$Attributes$boolProperty_fn);
    var $elm$html$Html$Attributes$disabled_a0 = "disabled", $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty($elm$html$Html$Attributes$disabled_a0);
    var $mdgriffith$elm_ui$Element$Input$enter = "Enter";
    var $mdgriffith$elm_ui$Internal$Model$NoAttribute = { $: 0 };
    var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
        if (((attr.$ === 4) && (attr.b.$ === 11)) && (!attr.b.a)) {
            var _v1 = attr.b;
            var _v2 = _v1.a;
            return true;
        }
        else {
            return false;
        }
    };
    var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
        return $elm$core$List$any_fn($mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass("focusable");
    };
    var $elm$core$Basics$composeL_fn = function (g, f, x) {
        return g(f(x));
    }, $elm$core$Basics$composeL = F3($elm$core$Basics$composeL_fn);
    var $elm$virtual_dom$VirtualDom$Normal = function (a) {
        return { $: 0, a: a };
    };
    var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
    var $elm$html$Html$Events$on_fn = function (event, decoder) {
        return _VirtualDom_on_fn(event, $elm$virtual_dom$VirtualDom$Normal(decoder));
    }, $elm$html$Html$Events$on = F2($elm$html$Html$Events$on_fn);
    var $elm$html$Html$Events$onClick = function (msg) {
        return $elm$html$Html$Events$on_fn("click", $elm$json$Json$Decode$succeed(msg));
    };
    var $mdgriffith$elm_ui$Element$Events$onClick_a0 = $mdgriffith$elm_ui$Internal$Model$Attr, $mdgriffith$elm_ui$Element$Events$onClick_a1 = $elm$html$Html$Events$onClick, $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$Events$onClick_a0, $mdgriffith$elm_ui$Element$Events$onClick_a1);
    var $elm$json$Json$Decode$fail = _Json_fail;
    var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
        return { $: 2, a: a };
    };
    var $elm$html$Html$Events$preventDefaultOn_fn = function (event, decoder) {
        return _VirtualDom_on_fn(event, $elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
    }, $elm$html$Html$Events$preventDefaultOn = F2($elm$html$Html$Events$preventDefaultOn_fn);
    var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
        var decode = function (code) {
            var _v0 = lookup(code);
            if (_v0.$ === 1) {
                return $elm$json$Json$Decode$fail("No key matched");
            }
            else {
                var msg = _v0.a;
                return $elm$json$Json$Decode$succeed(msg);
            }
        };
        var isKey = _Json_andThen_fn(decode, _Json_decodeField_fn("key", $elm$json$Json$Decode$string));
        return $mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Events$preventDefaultOn_fn("keydown", _Json_map1_fn(function (fired) {
            return _Utils_Tuple2(fired, true);
        }, isKey)));
    };
    var $mdgriffith$elm_ui$Internal$Model$Class_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Class = F2($mdgriffith$elm_ui$Internal$Model$Class_fn);
    var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
    var $mdgriffith$elm_ui$Element$pointer = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cO);
    var $mdgriffith$elm_ui$Element$Input$space = " ";
    var $elm$html$Html$Attributes$tabindex = function (n) {
        return _VirtualDom_attribute_fn("tabIndex", $elm$core$String$fromInt(n));
    };
    var $mdgriffith$elm_ui$Element$Input$button_fn = function (attrs, _v0) {
        var onPress = _v0.di;
        var label = _v0.g;
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aB + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.J + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.dz + (" " + $mdgriffith$elm_ui$Internal$Style$classes.bH)))))), _List_Cons($mdgriffith$elm_ui$Element$pointer, _List_Cons($mdgriffith$elm_ui$Element$Input$focusDefault(attrs), _List_Cons($mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button), _List_Cons($mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Attributes$tabindex(0)), function () {
            if (onPress.$ === 1) {
                return _List_Cons($mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Attributes$boolProperty_fn($elm$html$Html$Attributes$disabled_a0, true)), attrs);
            }
            else {
                var msg = onPress.a;
                return _List_Cons($elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Events$onClick_a0, $mdgriffith$elm_ui$Element$Events$onClick_a1, msg), _List_Cons($mdgriffith$elm_ui$Element$Input$onKeyLookup(function (code) {
                    return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(msg) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing);
                }), attrs));
            }
        }()))))))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([label])));
    }, $mdgriffith$elm_ui$Element$Input$button = F2($mdgriffith$elm_ui$Element$Input$button_fn);
    var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
        return { $: 6, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$CenterX = 1;
    var $mdgriffith$elm_ui$Element$centerX = $mdgriffith$elm_ui$Internal$Model$AlignX(1);
    var $elm$core$List$drop_fn = function (n, list) {
        drop: while (true) {
            if (n <= 0) {
                return list;
            }
            else {
                if (!list.b) {
                    return list;
                }
                else {
                    var x = list.a;
                    var xs = list.b;
                    var $temp$n = n - 1, $temp$list = xs;
                    n = $temp$n;
                    list = $temp$list;
                    continue drop;
                }
            }
        }
    }, $elm$core$List$drop = F2($elm$core$List$drop_fn);
    var $mdgriffith$elm_ui$Element$el_fn = function (attrs, child) {
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink), attrs)), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([child])));
    }, $mdgriffith$elm_ui$Element$el = F2($mdgriffith$elm_ui$Element$el_fn);
    var $mdgriffith$elm_ui$Element$htmlAttribute = $mdgriffith$elm_ui$Internal$Model$Attr;
    var $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn = function (a, b, c, d, e) {
        return { $: 7, a: a, b: b, c: c, d: d, e: e };
    }, $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5($mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn);
    var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
    var $mdgriffith$elm_ui$Element$paddingXY_fn = function (x, y) {
        if (_Utils_eq(x, y)) {
            var f = x;
            return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn("p-" + $elm$core$String$fromInt(x), f, f, f, f));
        }
        else {
            var yFloat = y;
            var xFloat = x;
            return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn("p-" + ($elm$core$String$fromInt(x) + ("-" + $elm$core$String$fromInt(y))), yFloat, xFloat, yFloat, xFloat));
        }
    }, $mdgriffith$elm_ui$Element$paddingXY = F2($mdgriffith$elm_ui$Element$paddingXY_fn);
    var $author$project$RCStyles$Style_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $author$project$RCStyles$Style = F2($author$project$RCStyles$Style_fn);
    var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
    var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
    var $author$project$RCStyles$ofStyle = function (_v0) {
        var prop = _v0.a;
        var val = _v0.b;
        return _VirtualDom_style_fn(prop, val);
    };
    var $author$project$RCStyles$rcButtonStyle = $elm$core$List$map_fn($author$project$RCStyles$ofStyle, _List_fromArray([
        $author$project$RCStyles$Style_fn("font-family", "'PT Sans', arial, sans-serif"),
        $author$project$RCStyles$Style_fn("text-transform", "uppercase"),
        $author$project$RCStyles$Style_fn("letter-spacing", "1px"),
        $author$project$RCStyles$Style_fn("background", "#FFF"),
        $author$project$RCStyles$Style_fn("color", "#999"),
        $author$project$RCStyles$Style_fn("border", "solid 1px #999"),
        $author$project$RCStyles$Style_fn("text-align", "center"),
        $author$project$RCStyles$Style_fn("min-width", "124px"),
        $author$project$RCStyles$Style_fn("line-height", "11px"),
        $author$project$RCStyles$Style_fn("margin", "10px 0 0 10px"),
        $author$project$RCStyles$Style_fn("padding", "7px"),
        $author$project$RCStyles$Style_fn("font-size", "11px"),
        $author$project$RCStyles$Style_fn("box-sizing", "border-box")
    ]));
    var $mdgriffith$elm_ui$Internal$Model$AsRow = 0;
    var $mdgriffith$elm_ui$Internal$Model$asRow = 0;
    var $mdgriffith$elm_ui$Element$row_fn = function (attrs, children) {
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asRow, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.al + (" " + $mdgriffith$elm_ui$Internal$Style$classes.J)), _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink), attrs))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
    }, $mdgriffith$elm_ui$Element$row = F2($mdgriffith$elm_ui$Element$row_fn);
    var $mdgriffith$elm_ui$Element$Font$size = function (i) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontSize, $mdgriffith$elm_ui$Internal$Model$FontSize(i));
    };
    var $mdgriffith$elm_ui$Internal$Model$SpacingStyle_fn = function (a, b, c) {
        return { $: 5, a: a, b: b, c: c };
    }, $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3($mdgriffith$elm_ui$Internal$Model$SpacingStyle_fn);
    var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
    var $mdgriffith$elm_ui$Internal$Model$spacingName_fn = function (x, y) {
        return "spacing-" + ($elm$core$String$fromInt(x) + ("-" + $elm$core$String$fromInt(y)));
    }, $mdgriffith$elm_ui$Internal$Model$spacingName = F2($mdgriffith$elm_ui$Internal$Model$spacingName_fn);
    var $mdgriffith$elm_ui$Element$spacing = function (x) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$spacing, $mdgriffith$elm_ui$Internal$Model$SpacingStyle_fn($mdgriffith$elm_ui$Internal$Model$spacingName_fn(x, x), x, x));
    };
    var $mdgriffith$elm_ui$Element$spacingXY_fn = function (x, y) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$spacing, $mdgriffith$elm_ui$Internal$Model$SpacingStyle_fn($mdgriffith$elm_ui$Internal$Model$spacingName_fn(x, y), x, y));
    }, $mdgriffith$elm_ui$Element$spacingXY = F2($mdgriffith$elm_ui$Element$spacingXY_fn);
    var $elm$core$List$takeReverse_fn = function (n, list, kept) {
        takeReverse: while (true) {
            if (n <= 0) {
                return kept;
            }
            else {
                if (!list.b) {
                    return kept;
                }
                else {
                    var x = list.a;
                    var xs = list.b;
                    var $temp$n = n - 1, $temp$list = xs, $temp$kept = _List_Cons(x, kept);
                    n = $temp$n;
                    list = $temp$list;
                    kept = $temp$kept;
                    continue takeReverse;
                }
            }
        }
    }, $elm$core$List$takeReverse = F3($elm$core$List$takeReverse_fn);
    var $elm$core$List$takeTailRec_fn = function (n, list) {
        return $elm$core$List$reverse($elm$core$List$takeReverse_fn(n, list, _List_Nil));
    }, $elm$core$List$takeTailRec = F2($elm$core$List$takeTailRec_fn);
    var $elm$core$List$takeFast_fn = function (ctr, n, list) {
        if (n <= 0) {
            return _List_Nil;
        }
        else {
            var _v0 = _Utils_Tuple2(n, list);
            _v0$1: while (true) {
                _v0$5: while (true) {
                    if (!_v0.b.b) {
                        return list;
                    }
                    else {
                        if (_v0.b.b.b) {
                            switch (_v0.a) {
                                case 1:
                                    break _v0$1;
                                case 2:
                                    var _v2 = _v0.b;
                                    var x = _v2.a;
                                    var _v3 = _v2.b;
                                    var y = _v3.a;
                                    return _List_fromArray([x, y]);
                                case 3:
                                    if (_v0.b.b.b.b) {
                                        var _v4 = _v0.b;
                                        var x = _v4.a;
                                        var _v5 = _v4.b;
                                        var y = _v5.a;
                                        var _v6 = _v5.b;
                                        var z = _v6.a;
                                        return _List_fromArray([x, y, z]);
                                    }
                                    else {
                                        break _v0$5;
                                    }
                                default:
                                    if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
                                        var _v7 = _v0.b;
                                        var x = _v7.a;
                                        var _v8 = _v7.b;
                                        var y = _v8.a;
                                        var _v9 = _v8.b;
                                        var z = _v9.a;
                                        var _v10 = _v9.b;
                                        var w = _v10.a;
                                        var tl = _v10.b;
                                        return (ctr > 1000) ? _List_Cons(x, _List_Cons(y, _List_Cons(z, _List_Cons(w, $elm$core$List$takeTailRec_fn(n - 4, tl))))) : _List_Cons(x, _List_Cons(y, _List_Cons(z, _List_Cons(w, $elm$core$List$takeFast_fn(ctr + 1, n - 4, tl)))));
                                    }
                                    else {
                                        break _v0$5;
                                    }
                            }
                        }
                        else {
                            if (_v0.a === 1) {
                                break _v0$1;
                            }
                            else {
                                break _v0$5;
                            }
                        }
                    }
                }
                return list;
            }
            var _v1 = _v0.b;
            var x = _v1.a;
            return _List_fromArray([x]);
        }
    }, $elm$core$List$takeFast = F3($elm$core$List$takeFast_fn);
    var $elm$core$List$take_fn = function (n, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (var i = 0; i < n && xs.b; xs = xs.
            b, i++) {
            var next = _List_Cons(xs.a, _List_Nil);
            end.b = next;
            end = next;
        }
        return tmp.b;
    }, $elm$core$List$take = F2($elm$core$List$take_fn);
    var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_ui$Element$text = function (content) {
        return $mdgriffith$elm_ui$Internal$Model$Text(content);
    };
    var $mdgriffith$elm_ui$Internal$Model$Left = 0;
    var $mdgriffith$elm_ui$Element$alignLeft = $mdgriffith$elm_ui$Internal$Model$AlignX(0);
    var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
    var $author$project$Main$authorAsString = function (_v0) {
        var a = _v0;
        return a.T;
    };
    var $author$project$Main$authorUrl = function (_v0) {
        var a = _v0;
        return "https://www.researchcatalogue.net/profile/?person=" + $elm$core$String$fromInt(a.an);
    };
    var $mdgriffith$elm_ui$Internal$Flag$overflow = $mdgriffith$elm_ui$Internal$Flag$flag(20);
    var $mdgriffith$elm_ui$Element$clip = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.cJ);
    var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("fc-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor), "color", fontColor));
    };
    var $mdgriffith$elm_ui$Element$fillPortion = $mdgriffith$elm_ui$Internal$Model$Fill;
    var $mdgriffith$elm_ui$Internal$Model$Heading = function (a) {
        return { $: 4, a: a };
    };
    var $mdgriffith$elm_ui$Element$Region$heading_a0 = $mdgriffith$elm_ui$Internal$Model$Describe, $mdgriffith$elm_ui$Element$Region$heading_a1 = $mdgriffith$elm_ui$Internal$Model$Heading, $mdgriffith$elm_ui$Element$Region$heading = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$Region$heading_a0, $mdgriffith$elm_ui$Element$Region$heading_a1);
    var $elm$html$Html$Attributes$alt_a0 = "alt", $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty($elm$html$Html$Attributes$alt_a0);
    var $elm$core$Basics$always_fn = function (a, _v0) {
        return a;
    }, $elm$core$Basics$always = F2($elm$core$Basics$always_fn);
    var $mdgriffith$elm_ui$Internal$Model$unstyled_a0 = $mdgriffith$elm_ui$Internal$Model$Unstyled, $mdgriffith$elm_ui$Internal$Model$unstyled_a1 = $elm$core$Basics$always, $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$unstyled_a0, $mdgriffith$elm_ui$Internal$Model$unstyled_a1);
    var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
    var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
    var $author$project$Main$image = function (src) {
        return $mdgriffith$elm_ui$Element$html(A3($elm$html$Html$node, "lazy-image", _List_fromArray([
            $elm$virtual_dom$VirtualDom$attribute_fn("src", src),
            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$alt_a0, "description"),
            $elm$virtual_dom$VirtualDom$attribute_fn("width", "100px"),
            $elm$virtual_dom$VirtualDom$attribute_fn("height", "250px")
        ]), _List_Nil));
    };
    var $elm$html$Html$Attributes$href = function (url) {
        return $elm$html$Html$Attributes$stringProperty_fn("href", _VirtualDom_noJavaScriptUri(url));
    };
    var $elm$html$Html$Attributes$rel_a0 = "rel", $elm$html$Html$Attributes$rel = _VirtualDom_attribute($elm$html$Html$Attributes$rel_a0);
    var $mdgriffith$elm_ui$Element$link_fn = function (attrs, _v0) {
        var url = _v0.f;
        var label = _v0.g;
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$NodeName("a"), _List_Cons($mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Attributes$href(url)), _List_Cons($mdgriffith$elm_ui$Internal$Model$Attr(_VirtualDom_attribute_fn($elm$html$Html$Attributes$rel_a0, "noopener noreferrer")), _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aB + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.J + (" " + $mdgriffith$elm_ui$Internal$Style$classes.bE)))), attrs))))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([label])));
    }, $mdgriffith$elm_ui$Element$link = F2($mdgriffith$elm_ui$Element$link_fn);
    var $mdgriffith$elm_ui$Internal$Model$Empty = { $: 3 };
    var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
    var $mdgriffith$elm_ui$Element$padding = function (x) {
        var f = x;
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn("p-" + $elm$core$String$fromInt(x), f, f, f, f));
    };
    var $mdgriffith$elm_ui$Internal$Model$Paragraph = { $: 9 };
    var $mdgriffith$elm_ui$Element$paragraph_fn = function (attrs, children) {
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asParagraph, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Paragraph), _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill), _List_Cons($mdgriffith$elm_ui$Element$spacing(5), attrs))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
    }, $mdgriffith$elm_ui$Element$paragraph = F2($mdgriffith$elm_ui$Element$paragraph_fn);
    var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
    var $mdgriffith$elm_ui$Internal$Flag$fontWeight = $mdgriffith$elm_ui$Internal$Flag$flag(13);
    var $mdgriffith$elm_ui$Element$Font$regular = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.dX);
    var $mdgriffith$elm_ui$Element$rgb_fn = function (r, g, b) {
        return $mdgriffith$elm_ui$Internal$Model$Rgba_fn(r, g, b, 1);
    }, $mdgriffith$elm_ui$Element$rgb = F3($mdgriffith$elm_ui$Element$rgb_fn);
    var $mdgriffith$elm_ui$Element$Font$sansSerif = $mdgriffith$elm_ui$Internal$Model$SansSerif;
    var $mdgriffith$elm_ui$Element$Font$typeface = $mdgriffith$elm_ui$Internal$Model$Typeface;
    var $author$project$Main$viewResearchMicro = function (research) {
        var img = function (src) {
            return $mdgriffith$elm_ui$Element$link_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fillPortion(1))
            ]), {
                g: $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$px(200)),
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$px(200)),
                    $mdgriffith$elm_ui$Element$paddingXY_fn(0, 5)
                ]), $author$project$Main$image(src)),
                f: research.ad
            });
        };
        var _v0 = research.aq;
        if (!_v0.$) {
            return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$px(200)),
                $mdgriffith$elm_ui$Element$clip
            ]), _List_fromArray([
                $elm$core$Maybe$withDefault_fn($mdgriffith$elm_ui$Element$none, $elm$core$Maybe$map_fn(img, research.aq)),
                $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fillPortion(6)),
                    $mdgriffith$elm_ui$Element$alignTop
                ]), _List_fromArray([
                    $mdgriffith$elm_ui$Element$link_fn(_List_fromArray([
                        $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                        $mdgriffith$elm_ui$Element$alignLeft
                    ]), {
                        g: $mdgriffith$elm_ui$Element$paragraph_fn(_List_fromArray([
                            $mdgriffith$elm_ui$Element$Font$family(_List_fromArray([
                                $mdgriffith$elm_ui$Element$Font$typeface("Open Sans"),
                                $mdgriffith$elm_ui$Element$Font$sansSerif
                            ])),
                            $mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$rgb_fn(0, 0.1, 0)),
                            $mdgriffith$elm_ui$Element$Font$size(16),
                            $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Region$heading_a0, $mdgriffith$elm_ui$Element$Region$heading_a1, 1),
                            $mdgriffith$elm_ui$Element$padding(5),
                            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
                        ]), _List_fromArray([
                            $mdgriffith$elm_ui$Element$text(research.as)
                        ])),
                        f: research.ad
                    }),
                    $mdgriffith$elm_ui$Element$link_fn(_List_fromArray([
                        $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
                    ]), {
                        g: $mdgriffith$elm_ui$Element$paragraph_fn(_List_fromArray([
                            $mdgriffith$elm_ui$Element$Font$family(_List_fromArray([
                                $mdgriffith$elm_ui$Element$Font$typeface("Open Sans"),
                                $mdgriffith$elm_ui$Element$Font$sansSerif
                            ])),
                            $mdgriffith$elm_ui$Element$Font$size(16),
                            $mdgriffith$elm_ui$Element$Font$regular,
                            $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Region$heading_a0, $mdgriffith$elm_ui$Element$Region$heading_a1, 2),
                            $mdgriffith$elm_ui$Element$padding(5),
                            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                            $mdgriffith$elm_ui$Element$htmlAttribute($elm$virtual_dom$VirtualDom$attribute_fn("style", "text-transform: unset"))
                        ]), _List_fromArray([
                            $mdgriffith$elm_ui$Element$text($author$project$Main$authorAsString(research.aa))
                        ])),
                        f: $author$project$Main$authorUrl(research.aa)
                    })
                ]))
            ]));
        }
        else {
            return $mdgriffith$elm_ui$Element$none;
        }
    };
    var $author$project$Main$listView = function (model) {
        var researchColumn = function (lst) {
            return $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$spacing(5),
                $mdgriffith$elm_ui$Element$alignTop,
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$paddingXY_fn(5, 5)
            ]), $elm$core$List$map_fn($author$project$Main$viewResearchMicro, lst));
        };
        var filtered = $elm$core$List$filter_fn(function (r) {
            var _v0 = r.aq;
            if (!_v0.$) {
                return true;
            }
            else {
                return false;
            }
        }, model.Y);
        var published = $elm$core$List$filter_fn(function (r) {
            return r.aG === 1;
        }, filtered);
        return $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$spacingXY_fn(0, 25),
            $mdgriffith$elm_ui$Element$paddingXY_fn(0, 25)
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$row_fn(_List_Nil, _List_fromArray([
                researchColumn($elm$core$List$take_fn(model.F, published)),
                researchColumn($elm$core$List$take_fn(model.F, $elm$core$List$drop_fn(model.F * 2, published))),
                researchColumn($elm$core$List$take_fn(model.F, $elm$core$List$drop_fn(model.F * 3, published)))
            ])),
            $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$Input$button_fn(_List_Cons($mdgriffith$elm_ui$Element$centerX, $elm$core$List$map_fn($mdgriffith$elm_ui$Element$htmlAttribute, $author$project$RCStyles$rcButtonStyle)), {
                    g: $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                        $mdgriffith$elm_ui$Element$centerX,
                        $mdgriffith$elm_ui$Element$Font$size(18)
                    ]), $mdgriffith$elm_ui$Element$text("LOAD MORE")),
                    di: $elm$core$Maybe$Just($author$project$Main$LoadMore)
                })
            ]))
        ]));
    };
    var $mdgriffith$elm_ui$Internal$Model$paddingName_fn = function (top, right, bottom, left) {
        return "pad-" + ($elm$core$String$fromInt(top) + ("-" + ($elm$core$String$fromInt(right) + ("-" + ($elm$core$String$fromInt(bottom) + ("-" + $elm$core$String$fromInt(left)))))));
    }, $mdgriffith$elm_ui$Internal$Model$paddingName = F4($mdgriffith$elm_ui$Internal$Model$paddingName_fn);
    var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
        var top = _v0.d2;
        var right = _v0.dt;
        var bottom = _v0.cE;
        var left = _v0.dc;
        if (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) {
            var topFloat = top;
            return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn("p-" + $elm$core$String$fromInt(top), topFloat, topFloat, topFloat, topFloat));
        }
        else {
            return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn($mdgriffith$elm_ui$Internal$Model$paddingName_fn(top, right, bottom, left), top, right, bottom, left));
        }
    };
    var $author$project$Main$SmallLink = 0;
    var $author$project$Main$black = $mdgriffith$elm_ui$Element$rgb_fn(0, 0, 0);
    var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$bgColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("bg-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr), "background-color", clr));
    };
    var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
    var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$borderColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("bc-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr), "border-color", clr));
    };
    var $mdgriffith$elm_ui$Internal$Flag$borderStyle = $mdgriffith$elm_ui$Internal$Flag$flag(11);
    var $mdgriffith$elm_ui$Element$Border$dashed = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$borderStyle, $mdgriffith$elm_ui$Internal$Style$classes.cB);
    var $author$project$Main$gray = $mdgriffith$elm_ui$Element$rgb_fn(0.5, 0.5, 0.5);
    var $mdgriffith$elm_ui$Internal$Model$Hover = 1;
    var $mdgriffith$elm_ui$Internal$Model$PseudoSelector_fn = function (a, b) {
        return { $: 11, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$PseudoSelector = F2($mdgriffith$elm_ui$Internal$Model$PseudoSelector_fn);
    var $mdgriffith$elm_ui$Internal$Flag$hover = $mdgriffith$elm_ui$Internal$Flag$flag(33);
    var $mdgriffith$elm_ui$Internal$Model$Nearby_fn = function (a, b) {
        return { $: 9, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Nearby = F2($mdgriffith$elm_ui$Internal$Model$Nearby_fn);
    var $mdgriffith$elm_ui$Internal$Model$TransformComponent_fn = function (a, b) {
        return { $: 10, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2($mdgriffith$elm_ui$Internal$Model$TransformComponent_fn);
    var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
    var $mdgriffith$elm_ui$Internal$Model$map_fn = function (fn, el) {
        switch (el.$) {
            case 1:
                var styled = el.a;
                return $mdgriffith$elm_ui$Internal$Model$Styled({
                    c0: F2(function (add, context) {
                        return _VirtualDom_map_fn(fn, A2(styled.c0, add, context));
                    }),
                    dM: styled.dM
                });
            case 0:
                var html = el.a;
                return $mdgriffith$elm_ui$Internal$Model$Unstyled(A2($elm$core$Basics$composeL, $elm$virtual_dom$VirtualDom$map(fn), html));
            case 2:
                var str = el.a;
                return $mdgriffith$elm_ui$Internal$Model$Text(str);
            default:
                return $mdgriffith$elm_ui$Internal$Model$Empty;
        }
    }, $mdgriffith$elm_ui$Internal$Model$map = F2($mdgriffith$elm_ui$Internal$Model$map_fn);
    var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
    var $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle_fn = function (fn, attr) {
        switch (attr.$) {
            case 0:
                return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
            case 2:
                var description = attr.a;
                return $mdgriffith$elm_ui$Internal$Model$Describe(description);
            case 6:
                var x = attr.a;
                return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
            case 5:
                var y = attr.a;
                return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
            case 7:
                var x = attr.a;
                return $mdgriffith$elm_ui$Internal$Model$Width(x);
            case 8:
                var x = attr.a;
                return $mdgriffith$elm_ui$Internal$Model$Height(x);
            case 3:
                var x = attr.a;
                var y = attr.b;
                return $mdgriffith$elm_ui$Internal$Model$Class_fn(x, y);
            case 4:
                var flag = attr.a;
                var style = attr.b;
                return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn(flag, style);
            case 9:
                var location = attr.a;
                var elem = attr.b;
                return $mdgriffith$elm_ui$Internal$Model$Nearby_fn(location, $mdgriffith$elm_ui$Internal$Model$map_fn(fn, elem));
            case 1:
                var htmlAttr = attr.a;
                return $mdgriffith$elm_ui$Internal$Model$Attr(_VirtualDom_mapAttribute_fn(fn, htmlAttr));
            default:
                var fl = attr.a;
                var trans = attr.b;
                return $mdgriffith$elm_ui$Internal$Model$TransformComponent_fn(fl, trans);
        }
    }, $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle = F2($mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle_fn);
    var $mdgriffith$elm_ui$Internal$Model$removeNever = function (style) {
        return $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle_fn($elm$core$Basics$never, style);
    };
    var $mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper_fn = function (attr, _v0) {
        var styles = _v0.a;
        var trans = _v0.b;
        var _v1 = $mdgriffith$elm_ui$Internal$Model$removeNever(attr);
        switch (_v1.$) {
            case 4:
                var style = _v1.b;
                return _Utils_Tuple2(_List_Cons(style, styles), trans);
            case 10:
                var flag = _v1.a;
                var component = _v1.b;
                return _Utils_Tuple2(styles, $mdgriffith$elm_ui$Internal$Model$composeTransformation_fn(trans, component));
            default:
                return _Utils_Tuple2(styles, trans);
        }
    }, $mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper = F2($mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper_fn);
    var $mdgriffith$elm_ui$Internal$Model$unwrapDecorations = function (attrs) {
        var _v0 = $elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper, _Utils_Tuple2(_List_Nil, $mdgriffith$elm_ui$Internal$Model$Untransformed), attrs);
        var styles = _v0.a;
        var transform = _v0.b;
        return _List_Cons($mdgriffith$elm_ui$Internal$Model$Transform(transform), styles);
    };
    var $mdgriffith$elm_ui$Element$mouseOver = function (decs) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$hover, $mdgriffith$elm_ui$Internal$Model$PseudoSelector_fn(1, $mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
    };
    var $mdgriffith$elm_ui$Element$Border$solid = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$borderStyle, $mdgriffith$elm_ui$Internal$Style$classes.cD);
    var $mdgriffith$elm_ui$Element$Font$underline = $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.d5);
    var $author$project$Main$white = $mdgriffith$elm_ui$Element$rgb_fn(1, 1, 1);
    var $mdgriffith$elm_ui$Internal$Model$BorderWidth_fn = function (a, b, c, d, e) {
        return { $: 6, a: a, b: b, c: c, d: d, e: e };
    }, $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5($mdgriffith$elm_ui$Internal$Model$BorderWidth_fn);
    var $mdgriffith$elm_ui$Element$Border$width = function (v) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$borderWidth, $mdgriffith$elm_ui$Internal$Model$BorderWidth_fn("b-" + $elm$core$String$fromInt(v), v, v, v, v));
    };
    var $author$project$Main$linkStyle_fn = function (active, style) {
        var padding = function () {
            if (!style) {
                return 10;
            }
            else {
                return 10;
            }
        }();
        var fontSize = function () {
            if (!style) {
                return 12;
            }
            else {
                return 20;
            }
        }();
        var common = _List_fromArray([
            $mdgriffith$elm_ui$Element$Border$color($author$project$Main$gray),
            $mdgriffith$elm_ui$Element$Border$width(1),
            $mdgriffith$elm_ui$Element$padding(padding),
            $mdgriffith$elm_ui$Element$Background$color($author$project$Main$white),
            $mdgriffith$elm_ui$Element$Font$color($author$project$Main$black),
            $mdgriffith$elm_ui$Element$mouseOver(_List_fromArray([
                $mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$rgb_fn(0.5, 0.5, 0.5))
            ])),
            $mdgriffith$elm_ui$Element$Font$size(fontSize)
        ]);
        return active ? $elm$core$List$append_fn(_List_fromArray([$mdgriffith$elm_ui$Element$Font$underline, $mdgriffith$elm_ui$Element$Border$solid]), common) : _List_Cons($mdgriffith$elm_ui$Element$Border$dashed, common);
    }, $author$project$Main$linkStyle = F2($author$project$Main$linkStyle_fn);
    var $mdgriffith$elm_ui$Internal$Model$Navigation = { $: 1 };
    var $mdgriffith$elm_ui$Element$Region$navigation = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Navigation);
    var $author$project$Main$screenViewOrderSwitch = function (titleSorting) {
        return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$paddingXY_fn(0, 25),
            $mdgriffith$elm_ui$Element$Region$navigation,
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$spacing(5),
            $mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$rgb_fn(0, 0, 1))
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(!titleSorting, 0), {
                g: $mdgriffith$elm_ui$Element$text("random"),
                f: "/#/screenshots?sorting=random"
            }),
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(titleSorting === 1, 0), {
                g: $mdgriffith$elm_ui$Element$text("old first"),
                f: "/#/screenshots?sorting=oldestfirst"
            }),
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(titleSorting === 2, 0), {
                g: $mdgriffith$elm_ui$Element$text("new first"),
                f: "/#/screenshots?sorting=newestfirst"
            })
        ]));
    };
    var $author$project$Main$getCount = function (_v0) {
        var kw = _v0;
        return kw.am;
    };
    var $elm_community$maybe_extra$Maybe$Extra$cons_fn = function (item, list) {
        if (!item.$) {
            var v = item.a;
            return _List_Cons(v, list);
        }
        else {
            return list;
        }
    }, $elm_community$maybe_extra$Maybe$Extra$cons = F2($elm_community$maybe_extra$Maybe$Extra$cons_fn);
    var $elm_community$maybe_extra$Maybe$Extra$values_a0 = $elm_community$maybe_extra$Maybe$Extra$cons, $elm_community$maybe_extra$Maybe$Extra$values_a1 = _List_Nil, $elm_community$maybe_extra$Maybe$Extra$values = A2($elm$core$List$foldr, $elm_community$maybe_extra$Maybe$Extra$values_a0, $elm_community$maybe_extra$Maybe$Extra$values_a1);
    var $author$project$Main$getKeywordsOfResearch_fn = function (keywordset, research) {
        return $elm$core$List$foldr_fn($elm_community$maybe_extra$Maybe$Extra$values_a0, $elm_community$maybe_extra$Maybe$Extra$values_a1, $elm$core$List$map_fn(function (str) {
            return $author$project$Main$find_fn(str, keywordset);
        }, research.v));
    }, $author$project$Main$getKeywordsOfResearch = F2($author$project$Main$getKeywordsOfResearch_fn);
    var $author$project$Main$kwName = function (_v0) {
        var kw = _v0;
        return kw.T;
    };
    var $author$project$Main$makeNumColumns_fn = function (num, input) {
        var f = F3(function (n, inp, acc) {
            if (!inp.b) {
                return acc;
            }
            else {
                var x = inp.a;
                var xs = inp.b;
                return _List_Cons($elm$core$List$take_fn(num, _List_Cons(x, xs)), A3(f, n, $elm$core$List$drop_fn(n, _List_Cons(x, xs)), acc));
            }
        });
        return A3(f, num, input, _List_Nil);
    }, $author$project$Main$makeNumColumns = F2($author$project$Main$makeNumColumns_fn);
    var $author$project$Main$makeColumns_fn = function (n, attrs, lst) {
        return $mdgriffith$elm_ui$Element$column_fn(attrs, $elm$core$List$map_fn(function (rowItems) {
            return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$spacing(25)
            ]), rowItems);
        }, $author$project$Main$makeNumColumns_fn(n, lst)));
    }, $author$project$Main$makeColumns = F3($author$project$Main$makeColumns_fn);
    var $elm$core$List$sortBy = _List_sortBy;
    var $elm$core$List$member_fn = function (x, xs) {
        return $elm$core$List$any_fn(function (a) {
            return _Utils_eq(a, x);
        }, xs);
    }, $elm$core$List$member = F2($elm$core$List$member_fn);
    var $elm_community$list_extra$List$Extra$uniqueHelp_fn = function (f, existing, remaining, accumulator) {
        uniqueHelp: while (true) {
            if (!remaining.b) {
                return $elm$core$List$reverse(accumulator);
            }
            else {
                var first = remaining.a;
                var rest = remaining.b;
                var computedFirst = f(first);
                if ($elm$core$List$member_fn(computedFirst, existing)) {
                    var $temp$f = f, $temp$existing = existing, $temp$remaining = rest, $temp$accumulator = accumulator;
                    f = $temp$f;
                    existing = $temp$existing;
                    remaining = $temp$remaining;
                    accumulator = $temp$accumulator;
                    continue uniqueHelp;
                }
                else {
                    var $temp$f = f, $temp$existing = _List_Cons(computedFirst, existing), $temp$remaining = rest, $temp$accumulator = _List_Cons(first, accumulator);
                    f = $temp$f;
                    existing = $temp$existing;
                    remaining = $temp$remaining;
                    accumulator = $temp$accumulator;
                    continue uniqueHelp;
                }
            }
        }
    }, $elm_community$list_extra$List$Extra$uniqueHelp = F4($elm_community$list_extra$List$Extra$uniqueHelp_fn);
    var $elm_community$list_extra$List$Extra$unique = function (list) {
        return $elm_community$list_extra$List$Extra$uniqueHelp_fn($elm$core$Basics$identity, _List_Nil, list, _List_Nil);
    };
    var $mdgriffith$elm_ui$Internal$Model$Right = 2;
    var $mdgriffith$elm_ui$Element$alignRight = $mdgriffith$elm_ui$Internal$Model$AlignX(2);
    var $mdgriffith$elm_ui$Element$clipX = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.cK);
    var $lydell$elm_app_url$AppUrl$fromPath = function (path) {
        return { bq: $elm$core$Maybe$Nothing, dp: path, aH: $elm$core$Dict$empty };
    };
    var $mdgriffith$elm_ui$Element$rgb255_fn = function (red, green, blue) {
        return $mdgriffith$elm_ui$Internal$Model$Rgba_fn(red / 255, green / 255, blue / 255, 1);
    }, $mdgriffith$elm_ui$Element$rgb255 = F3($mdgriffith$elm_ui$Element$rgb255_fn);
    var $lydell$elm_app_url$Escape$Fragment = 2;
    var $elm$core$String$cons = _String_cons;
    var $elm$core$String$fromChar = function (_char) {
        return _String_cons_fn(_char, "");
    };
    var $lydell$elm_app_url$Escape$forPath = function (_char) {
        switch (_char) {
            case "/":
                return "%2F";
            case "?":
                return "%3F";
            case "#":
                return "%23";
            default:
                return $elm$core$String$fromChar(_char);
        }
    };
    var $lydell$elm_app_url$Escape$forQuery = function (_char) {
        switch (_char) {
            case "=":
                return "%3D";
            case "&":
                return "%26";
            case "#":
                return "%23";
            default:
                return $elm$core$String$fromChar(_char);
        }
    };
    var $lydell$elm_app_url$Escape$escapePart = function (part) {
        switch (part) {
            case 0:
                return $lydell$elm_app_url$Escape$forPath;
            case 1:
                return $lydell$elm_app_url$Escape$forQuery;
            default:
                return $elm$core$String$fromChar;
        }
    };
    var $lydell$elm_app_url$Escape$shouldHandlePlusAndSpace = function (part) {
        switch (part) {
            case 0:
                return false;
            case 1:
                return true;
            default:
                return false;
        }
    };
    var $lydell$elm_app_url$Escape$forAll_fn = function (part, _char) {
        switch (_char) {
            case "\0":
                return "%00";
            case "\u0001":
                return "%01";
            case "\u0002":
                return "%02";
            case "\u0003":
                return "%03";
            case "\u0004":
                return "%04";
            case "\u0005":
                return "%05";
            case "\u0006":
                return "%06";
            case "\u0007":
                return "%07";
            case "\b":
                return "%08";
            case "\t":
                return "%09";
            case "\n":
                return "%0A";
            case "\v":
                return "%0B";
            case "\f":
                return "%0C";
            case "\r":
                return "%0D";
            case "\u000E":
                return "%0E";
            case "\u000F":
                return "%0F";
            case "\u0010":
                return "%10";
            case "\u0011":
                return "%11";
            case "\u0012":
                return "%12";
            case "\u0013":
                return "%13";
            case "\u0014":
                return "%14";
            case "\u0015":
                return "%15";
            case "\u0016":
                return "%16";
            case "\u0017":
                return "%17";
            case "\u0018":
                return "%18";
            case "\u0019":
                return "%19";
            case "\u001A":
                return "%1A";
            case "\u001B":
                return "%1B";
            case "\u001C":
                return "%1C";
            case "\u001D":
                return "%1D";
            case "\u001E":
                return "%1E";
            case "\u001F":
                return "%1F";
            case " ":
                return $lydell$elm_app_url$Escape$shouldHandlePlusAndSpace(part) ? "+" : "%20";
            case "%":
                return "%25";
            case "+":
                return $lydell$elm_app_url$Escape$shouldHandlePlusAndSpace(part) ? "%2B" : $elm$core$String$fromChar(_char);
            case "\u00A0":
                return "%C2%A0";
            case "\u1680":
                return "%E1%9A%80";
            case "\u2000":
                return "%E2%80%80";
            case "\u2001":
                return "%E2%80%81";
            case "\u2002":
                return "%E2%80%82";
            case "\u2003":
                return "%E2%80%83";
            case "\u2004":
                return "%E2%80%84";
            case "\u2005":
                return "%E2%80%85";
            case "\u2006":
                return "%E2%80%86";
            case "\u2007":
                return "%E2%80%87";
            case "\u2008":
                return "%E2%80%88";
            case "\u2009":
                return "%E2%80%89";
            case "\u200A":
                return "%E2%80%8A";
            case "\u2028":
                return "%E2%80%A8";
            case "\u2029":
                return "%E2%80%A9";
            case "\u202F":
                return "%E2%80%AF";
            case "\u205F":
                return "%E2%81%9F";
            case "\u3000":
                return "%E3%80%80";
            case "\uFEFF":
                return "%EF%BB%BF";
            default:
                return A2($lydell$elm_app_url$Escape$escapePart, part, _char);
        }
    }, $lydell$elm_app_url$Escape$forAll = F2($lydell$elm_app_url$Escape$forAll_fn);
    var $elm$core$String$foldr = _String_foldr;
    var $elm$core$String$toList = function (string) {
        return _String_foldr_fn($elm$core$List$cons, _List_Nil, string);
    };
    var $lydell$elm_app_url$AppUrl$percentEncode_fn = function (part, string) {
        return $elm$core$String$concat($elm$core$List$map_fn($lydell$elm_app_url$Escape$forAll(part), $elm$core$String$toList(string)));
    }, $lydell$elm_app_url$AppUrl$percentEncode = F2($lydell$elm_app_url$AppUrl$percentEncode_fn);
    var $lydell$elm_app_url$AppUrl$fragmentToString = function (maybeFragment) {
        if (!maybeFragment.$) {
            var fragment = maybeFragment.a;
            return "#" + $lydell$elm_app_url$AppUrl$percentEncode_fn(2, fragment);
        }
        else {
            return "";
        }
    };
    var $lydell$elm_app_url$Escape$Path = 0;
    var $lydell$elm_app_url$AppUrl$pathToString = function (path) {
        return "/" + $elm$core$String$join_fn("/", $elm$core$List$map_fn($lydell$elm_app_url$AppUrl$percentEncode(0), path));
    };
    var $elm$core$Dict$foldl_fn = function (func, acc, dict) {
        foldl: while (true) {
            if (dict.$ === -2) {
                return acc;
            }
            else {
                var key = dict.b;
                var value = dict.c;
                var left = dict.d;
                var right = dict.e;
                var $temp$func = func, $temp$acc = A3(func, key, value, $elm$core$Dict$foldl_fn(func, acc, left)), $temp$dict = right;
                func = $temp$func;
                acc = $temp$acc;
                dict = $temp$dict;
                continue foldl;
            }
        }
    }, $elm$core$Dict$foldl_fn_unwrapped = function (func, acc, dict) {
        foldl: while (true) {
            if (dict.$ === -2) {
                return acc;
            }
            else {
                var key = dict.b;
                var value = dict.c;
                var left = dict.d;
                var right = dict.e;
                var $temp$func = func, $temp$acc = func(key, value, $elm$core$Dict$foldl_fn_unwrapped(func, acc, left)), $temp$dict = right;
                func = $temp$func;
                acc = $temp$acc;
                dict = $temp$dict;
                continue foldl;
            }
        }
    }, $elm$core$Dict$foldl = F3($elm$core$Dict$foldl_fn);
    var $elm$core$Dict$filter_fn = function (isGood, dict) {
        return $elm$core$Dict$foldl_fn_unwrapped(function (k, v, d) {
            return A2(isGood, k, v) ? $elm$core$Dict$insert_fn(k, v, d) : d;
        }, $elm$core$Dict$empty, dict);
    }, $elm$core$Dict$filter_fn_unwrapped = function (isGood, dict) {
        return $elm$core$Dict$foldl_fn_unwrapped(function (k, v, d) {
            return isGood(k, v) ? $elm$core$Dict$insert_fn(k, v, d) : d;
        }, $elm$core$Dict$empty, dict);
    }, $elm$core$Dict$filter = F2($elm$core$Dict$filter_fn);
    var $elm$core$Dict$isEmpty = function (dict) {
        if (dict.$ === -2) {
            return true;
        }
        else {
            return false;
        }
    };
    var $lydell$elm_app_url$Escape$Query = 1;
    var $lydell$elm_app_url$AppUrl$queryParameterToString = function (_v0) {
        var key = _v0.a;
        var values = _v0.b;
        return $elm$core$List$map_fn(function (value) {
            return ((!$elm$core$String$isEmpty(key)) && $elm$core$String$isEmpty(value)) ? $lydell$elm_app_url$AppUrl$percentEncode_fn(1, key) : ($lydell$elm_app_url$AppUrl$percentEncode_fn(1, key) + ("=" + $lydell$elm_app_url$AppUrl$percentEncode_fn(1, value)));
        }, values);
    };
    var $lydell$elm_app_url$AppUrl$queryParametersToString = function (queryParameters) {
        var filteredQueryParameters = $elm$core$Dict$filter_fn_unwrapped(function (_v0, values) {
            return !$elm$core$List$isEmpty(values);
        }, queryParameters);
        return $elm$core$Dict$isEmpty(filteredQueryParameters) ? "" : ("?" + $elm$core$String$join_fn("&", $elm$core$List$concatMap_fn($lydell$elm_app_url$AppUrl$queryParameterToString, $elm$core$Dict$toList(filteredQueryParameters))));
    };
    var $lydell$elm_app_url$AppUrl$toString = function (url) {
        return _Utils_ap($lydell$elm_app_url$AppUrl$pathToString(url.dp), _Utils_ap($lydell$elm_app_url$AppUrl$queryParametersToString(url.aH), $lydell$elm_app_url$AppUrl$fragmentToString(url.bq)));
    };
    var $author$project$Main$viewKeywordAsButton_fn = function (fontsize, _v0) {
        var k = _v0;
        var name = k.T;
        var count = k.am;
        return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$spacing(5),
            $mdgriffith$elm_ui$Element$padding(5),
            $mdgriffith$elm_ui$Element$Border$solid,
            $mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$rgb255_fn(144, 144, 144)),
            $mdgriffith$elm_ui$Element$Border$width(1),
            $mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$rgb255_fn(250, 250, 250)),
            $mdgriffith$elm_ui$Element$clipX,
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$link_fn(_List_Nil, {
                g: $mdgriffith$elm_ui$Element$paragraph_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$centerX,
                    $mdgriffith$elm_ui$Element$Font$size(fontsize)
                ]), _List_fromArray([
                    $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                        $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
                    ]), $mdgriffith$elm_ui$Element$text(name))
                ])),
                f: $lydell$elm_app_url$AppUrl$toString($lydell$elm_app_url$AppUrl$fromPath(_List_fromArray(["keywords", name])))
            }),
            $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$px(25)),
                $mdgriffith$elm_ui$Element$alignRight,
                $mdgriffith$elm_ui$Element$Font$size(fontsize)
            ]), $mdgriffith$elm_ui$Element$text($elm$core$String$fromInt(count)))
        ]));
    }, $author$project$Main$viewKeywordAsButton = F2($author$project$Main$viewKeywordAsButton_fn);
    var $mdgriffith$elm_ui$Element$Font$light = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.dV);
    var $author$project$Main$listAndThen_fn = function (f, lst) {
        return $elm$core$List$concatMap_fn(f, lst);
    }, $author$project$Main$listAndThen = F2($author$project$Main$listAndThen_fn);
    var $author$project$Main$shortAbstract = function (_abstract) {
        var splitted = $author$project$Main$listAndThen_fn($elm$core$String$split("?"), $elm$core$String$split_fn(".", _abstract));
        if (splitted.b) {
            var head = splitted.a;
            return head + ".";
        }
        else {
            return "";
        }
    };
    var $author$project$Main$viewResearch = function (research) {
        var _short = $author$project$Main$shortAbstract($elm$core$Maybe$withDefault_fn("no abstract", research.bb));
        var img = function (src) {
            return $mdgriffith$elm_ui$Element$link_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
            ]), {
                g: $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$centerX,
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$px(200)),
                    $mdgriffith$elm_ui$Element$paddingXY_fn(0, 5)
                ]), $author$project$Main$image(src)),
                f: research.ad
            });
        };
        return $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$px(400)),
            $mdgriffith$elm_ui$Element$centerX,
            $mdgriffith$elm_ui$Element$clip
        ]), _List_fromArray([
            $elm$core$Maybe$withDefault_fn($mdgriffith$elm_ui$Element$none, $elm$core$Maybe$map_fn(img, research.aq)),
            $mdgriffith$elm_ui$Element$link_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
            ]), {
                g: $mdgriffith$elm_ui$Element$paragraph_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$Font$family(_List_fromArray([
                        $mdgriffith$elm_ui$Element$Font$typeface("Open Sans"),
                        $mdgriffith$elm_ui$Element$Font$sansSerif
                    ])),
                    $mdgriffith$elm_ui$Element$Font$size(16),
                    $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Region$heading_a0, $mdgriffith$elm_ui$Element$Region$heading_a1, 1),
                    $mdgriffith$elm_ui$Element$padding(5),
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
                ]), _List_fromArray([
                    $mdgriffith$elm_ui$Element$text(research.as)
                ])),
                f: research.ad
            }),
            $mdgriffith$elm_ui$Element$link_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
            ]), {
                g: $mdgriffith$elm_ui$Element$paragraph_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$Font$family(_List_fromArray([
                        $mdgriffith$elm_ui$Element$Font$typeface("Open Sans"),
                        $mdgriffith$elm_ui$Element$Font$sansSerif
                    ])),
                    $mdgriffith$elm_ui$Element$Font$size(12),
                    $mdgriffith$elm_ui$Element$Font$regular,
                    $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Region$heading_a0, $mdgriffith$elm_ui$Element$Region$heading_a1, 2),
                    $mdgriffith$elm_ui$Element$padding(5),
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$htmlAttribute($elm$virtual_dom$VirtualDom$attribute_fn("style", "text-transform: unset"))
                ]), _List_fromArray([
                    $mdgriffith$elm_ui$Element$text($author$project$Main$authorAsString(research.aa))
                ])),
                f: $author$project$Main$authorUrl(research.aa)
            }),
            $mdgriffith$elm_ui$Element$paragraph_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$padding(5),
                $mdgriffith$elm_ui$Element$Font$size(15),
                $mdgriffith$elm_ui$Element$Font$light,
                $mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$rgb_fn(0.33, 0.33, 0.33))
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$text(_short)
            ]))
        ]));
    };
    var $author$project$Main$viewKeywordDetail_fn = function (kw, model) {
        var researchWithKeyword = $elm$core$Maybe$withDefault_fn(_List_Nil, $elm$core$Dict$get_fn($author$project$Main$kwName(kw), model.aI));
        var relatedKeywords = $elm$core$List$reverse(_List_sortBy_fn($author$project$Main$getCount, $elm_community$list_extra$List$Extra$unique($elm$core$List$concatMap_fn($author$project$Main$getKeywordsOfResearch(model.v), researchWithKeyword))));
        return $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$spacingXY_fn(0, 0)
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$spacingXY_fn(25, 5),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
            ]), _List_fromArray([
                $author$project$Main$screenViewOrderSwitch(2)
            ])),
            $mdgriffith$elm_ui$Element$link_fn(_List_Nil, {
                g: $mdgriffith$elm_ui$Element$text("Back"),
                f: "/keywords"
            }),
            $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$Font$size(36),
                $mdgriffith$elm_ui$Element$paddingXY_fn(0, 25),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$text($author$project$Main$kwName(kw)),
                $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$Font$size(14)
                ]), $mdgriffith$elm_ui$Element$text($elm$core$String$fromInt($author$project$Main$getCount(kw)) + " expositions use this keyword"))
            ])),
            $mdgriffith$elm_ui$Element$el_fn(_List_Nil, $mdgriffith$elm_ui$Element$text("related keywords : ")),
            $author$project$Main$makeColumns_fn(6, _List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$spacing(5),
                $mdgriffith$elm_ui$Element$paddingXY_fn(0, 25),
                $mdgriffith$elm_ui$Element$Font$size(9)
            ]), $elm$core$List$map_fn($author$project$Main$viewKeywordAsButton(15), $elm$core$List$take_fn(12, relatedKeywords))),
            $author$project$Main$makeColumns_fn(3, _List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$spacing(25),
                $mdgriffith$elm_ui$Element$paddingXY_fn(0, 25)
            ]), $elm$core$List$map_fn($author$project$Main$viewResearch, researchWithKeyword))
        ]));
    }, $author$project$Main$viewKeywordDetail = F2($author$project$Main$viewKeywordDetail_fn);
    var $author$project$Main$ChangedQuery = function (a) {
        return { $: 1, a: a };
    };
    var $elm$parser$Parser$Advanced$Bad_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $elm$parser$Parser$Advanced$Bad = F2($elm$parser$Parser$Advanced$Bad_fn);
    var $elm$parser$Parser$Advanced$Good_fn = function (a, b, c) {
        return { $: 0, a: a, b: b, c: c };
    }, $elm$parser$Parser$Advanced$Good = F3($elm$parser$Parser$Advanced$Good_fn);
    var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
    var $elm$parser$Parser$Advanced$andThen_fn = function (callback, _v0) {
        var parseA = _v0;
        return function (s0) {
            var _v1 = parseA(s0);
            if (_v1.$ === 1) {
                var p = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p1 = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                var _v2 = callback(a);
                var parseB = _v2;
                var _v3 = parseB(s1);
                if (_v3.$ === 1) {
                    var p2 = _v3.a;
                    var x = _v3.b;
                    return $elm$parser$Parser$Advanced$Bad_fn(p1 || p2, x);
                }
                else {
                    var p2 = _v3.a;
                    var b = _v3.b;
                    var s2 = _v3.c;
                    return $elm$parser$Parser$Advanced$Good_fn(p1 || p2, b, s2);
                }
            }
        };
    }, $elm$parser$Parser$Advanced$andThen = F2($elm$parser$Parser$Advanced$andThen_fn);
    var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
    var $elm$parser$Parser$ExpectingEnd = { $: 10 };
    var $elm$parser$Parser$Advanced$AddRight_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $elm$parser$Parser$Advanced$AddRight = F2($elm$parser$Parser$Advanced$AddRight_fn);
    var $elm$parser$Parser$Advanced$DeadEnd_fn = function (row, col, problem, contextStack) {
        return { bj: col, cN: contextStack, bP: problem, bZ: row };
    }, $elm$parser$Parser$Advanced$DeadEnd = F4($elm$parser$Parser$Advanced$DeadEnd_fn);
    var $elm$parser$Parser$Advanced$Empty = { $: 0 };
    var $elm$parser$Parser$Advanced$fromState_fn = function (s, x) {
        return $elm$parser$Parser$Advanced$AddRight_fn($elm$parser$Parser$Advanced$Empty, $elm$parser$Parser$Advanced$DeadEnd_fn(s.bZ, s.bj, x, s.d));
    }, $elm$parser$Parser$Advanced$fromState = F2($elm$parser$Parser$Advanced$fromState_fn);
    var $elm$parser$Parser$Advanced$end = function (x) {
        return function (s) {
            return _Utils_eq($elm$core$String$length(s.a), s.b) ? $elm$parser$Parser$Advanced$Good_fn(false, 0, s) : $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, x));
        };
    };
    var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
    var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
    var $elm$parser$Parser$Advanced$chompWhileHelp_fn = function (isGood, offset, row, col, s0) {
        chompWhileHelp: while (true) {
            var newOffset = _Parser_isSubChar_fn(isGood, offset, s0.a);
            if (newOffset === -1) {
                return $elm$parser$Parser$Advanced$Good_fn(_Utils_cmp(s0.b, offset) < 0, 0, { bj: col, d: s0.d, e: s0.e, b: offset, bZ: row, a: s0.a });
            }
            else {
                if (newOffset === -2) {
                    var $temp$isGood = isGood, $temp$offset = offset + 1, $temp$row = row + 1, $temp$col = 1, $temp$s0 = s0;
                    isGood = $temp$isGood;
                    offset = $temp$offset;
                    row = $temp$row;
                    col = $temp$col;
                    s0 = $temp$s0;
                    continue chompWhileHelp;
                }
                else {
                    var $temp$isGood = isGood, $temp$offset = newOffset, $temp$row = row, $temp$col = col + 1, $temp$s0 = s0;
                    isGood = $temp$isGood;
                    offset = $temp$offset;
                    row = $temp$row;
                    col = $temp$col;
                    s0 = $temp$s0;
                    continue chompWhileHelp;
                }
            }
        }
    }, $elm$parser$Parser$Advanced$chompWhileHelp = F5($elm$parser$Parser$Advanced$chompWhileHelp_fn);
    var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
        return function (s) {
            return $elm$parser$Parser$Advanced$chompWhileHelp_fn(isGood, s.b, s.bZ, s.bj, s);
        };
    };
    var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
    var $elm$parser$Parser$Advanced$mapChompedString_fn = function (func, _v0) {
        var parse = _v0;
        return function (s0) {
            var _v1 = parse(s0);
            if (_v1.$ === 1) {
                var p = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                return $elm$parser$Parser$Advanced$Good_fn(p, A2(func, _String_slice_fn(s0.b, s1.b, s0.a), a), s1);
            }
        };
    }, $elm$parser$Parser$Advanced$mapChompedString_fn_unwrapped = function (func, _v0) {
        var parse = _v0;
        return function (s0) {
            var _v1 = parse(s0);
            if (_v1.$ === 1) {
                var p = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                return $elm$parser$Parser$Advanced$Good_fn(p, func(_String_slice_fn(s0.b, s1.b, s0.a), a), s1);
            }
        };
    }, $elm$parser$Parser$Advanced$mapChompedString = F2($elm$parser$Parser$Advanced$mapChompedString_fn);
    var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
        return $elm$parser$Parser$Advanced$mapChompedString_fn($elm$core$Basics$always, parser);
    };
    var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
    var $elm$parser$Parser$Problem = function (a) {
        return { $: 12, a: a };
    };
    var $elm$parser$Parser$Advanced$problem = function (x) {
        return function (s) {
            return $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, x));
        };
    };
    var $elm$parser$Parser$problem = function (msg) {
        return $elm$parser$Parser$Advanced$problem($elm$parser$Parser$Problem(msg));
    };
    var $elm$parser$Parser$Advanced$succeed = function (a) {
        return function (s) {
            return $elm$parser$Parser$Advanced$Good_fn(false, a, s);
        };
    };
    var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
    var $elm$core$String$toFloat = _String_toFloat;
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs = $elm$parser$Parser$Advanced$andThen_fn(function (str) {
        if ($elm$core$String$length(str) <= 9) {
            var _v0 = $elm$core$String$toFloat("0." + str);
            if (!_v0.$) {
                var floatVal = _v0.a;
                return $elm$parser$Parser$succeed($elm$core$Basics$round(floatVal * 1000));
            }
            else {
                return $elm$parser$Parser$problem("Invalid float: \"" + (str + "\""));
            }
        }
        else {
            return $elm$parser$Parser$problem("Expected at most 9 digits, but got " + $elm$core$String$fromInt($elm$core$String$length(str)));
        }
    }, $elm$parser$Parser$getChompedString($elm$parser$Parser$chompWhile($elm$core$Char$isDigit)));
    var $elm$time$Time$Posix = $elm$core$Basics$identity;
    var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts_fn = function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
        return $elm$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
    }, $rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts = F6($rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts_fn);
    var $elm$parser$Parser$Advanced$map2_fn = function (func, _v0, _v1) {
        var parseA = _v0;
        var parseB = _v1;
        return function (s0) {
            var _v2 = parseA(s0);
            if (_v2.$ === 1) {
                var p = _v2.a;
                var x = _v2.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p1 = _v2.a;
                var a = _v2.b;
                var s1 = _v2.c;
                var _v3 = parseB(s1);
                if (_v3.$ === 1) {
                    var p2 = _v3.a;
                    var x = _v3.b;
                    return $elm$parser$Parser$Advanced$Bad_fn(p1 || p2, x);
                }
                else {
                    var p2 = _v3.a;
                    var b = _v3.b;
                    var s2 = _v3.c;
                    return $elm$parser$Parser$Advanced$Good_fn(p1 || p2, A2(func, a, b), s2);
                }
            }
        };
    }, $elm$parser$Parser$Advanced$map2_fn_unwrapped = function (func, _v0, _v1) {
        var parseA = _v0;
        var parseB = _v1;
        return function (s0) {
            var _v2 = parseA(s0);
            if (_v2.$ === 1) {
                var p = _v2.a;
                var x = _v2.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p1 = _v2.a;
                var a = _v2.b;
                var s1 = _v2.c;
                var _v3 = parseB(s1);
                if (_v3.$ === 1) {
                    var p2 = _v3.a;
                    var x = _v3.b;
                    return $elm$parser$Parser$Advanced$Bad_fn(p1 || p2, x);
                }
                else {
                    var p2 = _v3.a;
                    var b = _v3.b;
                    var s2 = _v3.c;
                    return $elm$parser$Parser$Advanced$Good_fn(p1 || p2, func(a, b), s2);
                }
            }
        };
    }, $elm$parser$Parser$Advanced$map2 = F3($elm$parser$Parser$Advanced$map2_fn);
    var $elm$parser$Parser$Advanced$ignorer_fn = function (keepParser, ignoreParser) {
        return $elm$parser$Parser$Advanced$map2_fn($elm$core$Basics$always, keepParser, ignoreParser);
    }, $elm$parser$Parser$Advanced$ignorer = F2($elm$parser$Parser$Advanced$ignorer_fn);
    var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
    var $elm$parser$Parser$Advanced$keeper_fn = function (parseFunc, parseArg) {
        return $elm$parser$Parser$Advanced$map2_fn($elm$core$Basics$apL, parseFunc, parseArg);
    }, $elm$parser$Parser$Advanced$keeper = F2($elm$parser$Parser$Advanced$keeper_fn);
    var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
    var $elm$parser$Parser$Advanced$Append_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $elm$parser$Parser$Advanced$Append = F2($elm$parser$Parser$Advanced$Append_fn);
    var $elm$parser$Parser$Advanced$oneOfHelp_fn = function (s0, bag, parsers) {
        oneOfHelp: while (true) {
            if (!parsers.b) {
                return $elm$parser$Parser$Advanced$Bad_fn(false, bag);
            }
            else {
                var parse = parsers.a;
                var remainingParsers = parsers.b;
                var _v1 = parse(s0);
                if (!_v1.$) {
                    var step = _v1;
                    return step;
                }
                else {
                    var step = _v1;
                    var p = step.a;
                    var x = step.b;
                    if (p) {
                        return step;
                    }
                    else {
                        var $temp$s0 = s0, $temp$bag = $elm$parser$Parser$Advanced$Append_fn(bag, x), $temp$parsers = remainingParsers;
                        s0 = $temp$s0;
                        bag = $temp$bag;
                        parsers = $temp$parsers;
                        continue oneOfHelp;
                    }
                }
            }
        }
    }, $elm$parser$Parser$Advanced$oneOfHelp = F3($elm$parser$Parser$Advanced$oneOfHelp_fn);
    var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
        return function (s) {
            return $elm$parser$Parser$Advanced$oneOfHelp_fn(s, $elm$parser$Parser$Advanced$Empty, parsers);
        };
    };
    var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
    var $elm$parser$Parser$Done = function (a) {
        return { $: 1, a: a };
    };
    var $elm$parser$Parser$Loop = function (a) {
        return { $: 0, a: a };
    };
    var $elm$core$String$append = _String_append;
    var $elm$parser$Parser$UnexpectedChar = { $: 11 };
    var $elm$parser$Parser$Advanced$chompIf_fn = function (isGood, expecting) {
        return function (s) {
            var newOffset = _Parser_isSubChar_fn(isGood, s.b, s.a);
            return newOffset === -1 ? $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, expecting)) : (newOffset === -2 ? $elm$parser$Parser$Advanced$Good_fn(true, 0, { bj: 1, d: s.d, e: s.e, b: s.b + 1, bZ: s.bZ + 1, a: s.a }) : $elm$parser$Parser$Advanced$Good_fn(true, 0, { bj: s.bj + 1, d: s.d, e: s.e, b: newOffset, bZ: s.bZ, a: s.a }));
        };
    }, $elm$parser$Parser$Advanced$chompIf = F2($elm$parser$Parser$Advanced$chompIf_fn);
    var $elm$parser$Parser$chompIf = function (isGood) {
        return $elm$parser$Parser$Advanced$chompIf_fn(isGood, $elm$parser$Parser$UnexpectedChar);
    };
    var $elm$parser$Parser$Advanced$loopHelp_fn = function (p, state, callback, s0) {
        loopHelp: while (true) {
            var _v0 = callback(state);
            var parse = _v0;
            var _v1 = parse(s0);
            if (!_v1.$) {
                var p1 = _v1.a;
                var step = _v1.b;
                var s1 = _v1.c;
                if (!step.$) {
                    var newState = step.a;
                    var $temp$p = p || p1, $temp$state = newState, $temp$callback = callback, $temp$s0 = s1;
                    p = $temp$p;
                    state = $temp$state;
                    callback = $temp$callback;
                    s0 = $temp$s0;
                    continue loopHelp;
                }
                else {
                    var result = step.a;
                    return $elm$parser$Parser$Advanced$Good_fn(p || p1, result, s1);
                }
            }
            else {
                var p1 = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p || p1, x);
            }
        }
    }, $elm$parser$Parser$Advanced$loopHelp = F4($elm$parser$Parser$Advanced$loopHelp_fn);
    var $elm$parser$Parser$Advanced$loop_fn = function (state, callback) {
        return function (s) {
            return $elm$parser$Parser$Advanced$loopHelp_fn(false, state, callback, s);
        };
    }, $elm$parser$Parser$Advanced$loop = F2($elm$parser$Parser$Advanced$loop_fn);
    var $elm$parser$Parser$Advanced$map_fn = function (func, _v0) {
        var parse = _v0;
        return function (s0) {
            var _v1 = parse(s0);
            if (!_v1.$) {
                var p = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                return $elm$parser$Parser$Advanced$Good_fn(p, func(a), s1);
            }
            else {
                var p = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
        };
    }, $elm$parser$Parser$Advanced$map = F2($elm$parser$Parser$Advanced$map_fn);
    var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
    var $elm$parser$Parser$Advanced$Done = function (a) {
        return { $: 1, a: a };
    };
    var $elm$parser$Parser$Advanced$Loop = function (a) {
        return { $: 0, a: a };
    };
    var $elm$parser$Parser$toAdvancedStep = function (step) {
        if (!step.$) {
            var s = step.a;
            return $elm$parser$Parser$Advanced$Loop(s);
        }
        else {
            var a = step.a;
            return $elm$parser$Parser$Advanced$Done(a);
        }
    };
    var $elm$parser$Parser$loop_fn = function (state, callback) {
        return $elm$parser$Parser$Advanced$loop_fn(state, function (s) {
            return $elm$parser$Parser$Advanced$map_fn($elm$parser$Parser$toAdvancedStep, callback(s));
        });
    }, $elm$parser$Parser$loop = F2($elm$parser$Parser$loop_fn);
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt = function (quantity) {
        var helper = function (str) {
            if (_Utils_eq($elm$core$String$length(str), quantity)) {
                var _v0 = $elm$core$String$toInt(str);
                if (!_v0.$) {
                    var intVal = _v0.a;
                    return $elm$parser$Parser$Advanced$map_fn($elm$parser$Parser$Done, $elm$parser$Parser$succeed(intVal));
                }
                else {
                    return $elm$parser$Parser$problem("Invalid integer: \"" + (str + "\""));
                }
            }
            else {
                return $elm$parser$Parser$Advanced$map_fn(function (nextChar) {
                    return $elm$parser$Parser$Loop(_String_append_fn(str, nextChar));
                }, $elm$parser$Parser$getChompedString($elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
            }
        };
        return $elm$parser$Parser$loop_fn("", helper);
    };
    var $elm$parser$Parser$ExpectingSymbol = function (a) {
        return { $: 8, a: a };
    };
    var $elm$parser$Parser$Advanced$Token_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$parser$Parser$Advanced$Token = F2($elm$parser$Parser$Advanced$Token_fn);
    var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
    var $elm$parser$Parser$Advanced$token = function (_v0) {
        var str = _v0.a;
        var expecting = _v0.b;
        var progress = !$elm$core$String$isEmpty(str);
        return function (s) {
            var _v1 = _Parser_isSubString_fn(str, s.b, s.bZ, s.bj, s.a);
            var newOffset = _v1.a;
            var newRow = _v1.b;
            var newCol = _v1.c;
            return newOffset === -1 ? $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, expecting)) : $elm$parser$Parser$Advanced$Good_fn(progress, 0, { bj: newCol, d: s.d, e: s.e, b: newOffset, bZ: newRow, a: s.a });
        };
    };
    var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
    var $elm$parser$Parser$symbol = function (str) {
        return $elm$parser$Parser$Advanced$symbol($elm$parser$Parser$Advanced$Token_fn(str, $elm$parser$Parser$ExpectingSymbol(str)));
    };
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear = 1970;
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay = function (day) {
        return $elm$parser$Parser$problem("Invalid day: " + $elm$core$String$fromInt(day));
    };
    var $elm$core$Basics$modBy = _Basics_modBy;
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear = function (year) {
        return (!_Basics_modBy_fn(4, year)) && ((!(!_Basics_modBy_fn(100, year))) || (!_Basics_modBy_fn(400, year)));
    };
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore = function (y1) {
        var y = y1 - 1;
        return (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
    };
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay = 86400000;
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear = 31536000000;
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay = function (_v0) {
        var year = _v0.a;
        var month = _v0.b;
        var dayInMonth = _v0.c;
        if (dayInMonth < 0) {
            return $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth);
        }
        else {
            var succeedWith = function (extraMs) {
                var yearMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear * (year - $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear);
                var days = ((month < 3) || (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
                var dayMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay * (days + ($rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(year) - $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore($rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear)));
                return $elm$parser$Parser$succeed((extraMs + yearMs) + dayMs);
            };
            switch (month) {
                case 1:
                    return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
                case 2:
                    return ((dayInMonth > 29) || ((dayInMonth === 29) && (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year)))) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
                case 3:
                    return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
                case 4:
                    return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
                case 5:
                    return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
                case 6:
                    return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
                case 7:
                    return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
                case 8:
                    return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
                case 9:
                    return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
                case 10:
                    return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
                case 11:
                    return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
                case 12:
                    return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
                default:
                    return $elm$parser$Parser$problem("Invalid month: \"" + ($elm$core$String$fromInt(month) + "\""));
            }
        }
    };
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs = $elm$parser$Parser$Advanced$andThen_fn($rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay, $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed(F3(function (year, month, day) {
        return _Utils_Tuple3(year, month, day);
    })), $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(4)), $elm$parser$Parser$oneOf(_List_fromArray([
        $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$symbol("-")), $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
        $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
    ]))), $elm$parser$Parser$oneOf(_List_fromArray([
        $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$symbol("-")), $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
        $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
    ]))));
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes = function () {
        var utcOffsetMinutesFromParts = F3(function (multiplier, hours, minutes) {
            return (multiplier * (hours * 60)) + minutes;
        });
        return $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$oneOf(_List_fromArray([
            $elm$parser$Parser$Advanced$map_fn(function (_v0) {
                return 0;
            }, $elm$parser$Parser$symbol("Z")),
            $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed(utcOffsetMinutesFromParts), $elm$parser$Parser$oneOf(_List_fromArray([
                $elm$parser$Parser$Advanced$map_fn(function (_v1) {
                    return 1;
                }, $elm$parser$Parser$symbol("+")),
                $elm$parser$Parser$Advanced$map_fn(function (_v2) {
                    return -1;
                }, $elm$parser$Parser$symbol("-"))
            ]))), $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)), $elm$parser$Parser$oneOf(_List_fromArray([
                $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$symbol(":")), $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
                $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
                $elm$parser$Parser$succeed(0)
            ]))),
            $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(0), $elm$parser$Parser$end)
        ])));
    }();
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601 = $elm$parser$Parser$Advanced$andThen_fn(function (datePart) {
        return $elm$parser$Parser$oneOf(_List_fromArray([
            $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts(datePart)), $elm$parser$Parser$symbol("T")), $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)), $elm$parser$Parser$oneOf(_List_fromArray([
                $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$symbol(":")), $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
                $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
            ]))), $elm$parser$Parser$oneOf(_List_fromArray([
                $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$symbol(":")), $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
                $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
                $elm$parser$Parser$succeed(0)
            ]))), $elm$parser$Parser$oneOf(_List_fromArray([
                $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$symbol(".")), $rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs),
                $elm$parser$Parser$succeed(0)
            ]))), $elm$parser$Parser$Advanced$ignorer_fn($rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes, $elm$parser$Parser$end)),
            $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts_fn(datePart, 0, 0, 0, 0, 0)), $elm$parser$Parser$end)
        ]));
    }, $rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs);
    var $elm$parser$Parser$DeadEnd_fn = function (row, col, problem) {
        return { bj: col, bP: problem, bZ: row };
    }, $elm$parser$Parser$DeadEnd = F3($elm$parser$Parser$DeadEnd_fn);
    var $elm$parser$Parser$problemToDeadEnd = function (p) {
        return $elm$parser$Parser$DeadEnd_fn(p.bZ, p.bj, p.bP);
    };
    var $elm$parser$Parser$Advanced$bagToList_fn = function (bag, list) {
        bagToList: while (true) {
            switch (bag.$) {
                case 0:
                    return list;
                case 1:
                    var bag1 = bag.a;
                    var x = bag.b;
                    var $temp$bag = bag1, $temp$list = _List_Cons(x, list);
                    bag = $temp$bag;
                    list = $temp$list;
                    continue bagToList;
                default:
                    var bag1 = bag.a;
                    var bag2 = bag.b;
                    var $temp$bag = bag1, $temp$list = $elm$parser$Parser$Advanced$bagToList_fn(bag2, list);
                    bag = $temp$bag;
                    list = $temp$list;
                    continue bagToList;
            }
        }
    }, $elm$parser$Parser$Advanced$bagToList = F2($elm$parser$Parser$Advanced$bagToList_fn);
    var $elm$parser$Parser$Advanced$run_fn = function (_v0, src) {
        var parse = _v0;
        var _v1 = parse({ bj: 1, d: _List_Nil, e: 1, b: 0, bZ: 1, a: src });
        if (!_v1.$) {
            var value = _v1.b;
            return $elm$core$Result$Ok(value);
        }
        else {
            var bag = _v1.b;
            return $elm$core$Result$Err($elm$parser$Parser$Advanced$bagToList_fn(bag, _List_Nil));
        }
    }, $elm$parser$Parser$Advanced$run = F2($elm$parser$Parser$Advanced$run_fn);
    var $elm$parser$Parser$run_fn = function (parser, source) {
        var _v0 = $elm$parser$Parser$Advanced$run_fn(parser, source);
        if (!_v0.$) {
            var a = _v0.a;
            return $elm$core$Result$Ok(a);
        }
        else {
            var problems = _v0.a;
            return $elm$core$Result$Err($elm$core$List$map_fn($elm$parser$Parser$problemToDeadEnd, problems));
        }
    }, $elm$parser$Parser$run = F2($elm$parser$Parser$run_fn);
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime = function (str) {
        return $elm$parser$Parser$run_fn($rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601, str);
    };
    var $author$project$Main$dateFromString = function (str) {
        var result = $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime($elm$core$String$join_fn("-", $elm$core$List$reverse($elm$core$String$split_fn("/", str))));
        if (!result.$) {
            var time = result.a;
            return $elm$core$Maybe$Just(time);
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $elm$time$Time$posixToMillis = function (_v0) {
        var millis = _v0;
        return millis;
    };
    var $author$project$Main$findLastDate = function (lst) {
        var onlyJust = function (mlst) {
            onlyJust: while (true) {
                if (mlst.b) {
                    if (!mlst.a.$) {
                        var x = mlst.a.a;
                        var xs = mlst.b;
                        return _List_Cons(x, onlyJust(xs));
                    }
                    else {
                        var _v1 = mlst.a;
                        var xs = mlst.b;
                        var $temp$mlst = xs;
                        mlst = $temp$mlst;
                        continue onlyJust;
                    }
                }
                else {
                    return _List_Nil;
                }
            }
        };
        return $elm$core$Maybe$withDefault_fn($elm$time$Time$millisToPosix(0), $elm$core$List$head($elm$core$List$reverse(_List_sortBy_fn($elm$time$Time$posixToMillis, onlyJust($elm$core$List$map_fn(function (r) {
            return $elm$core$Maybe$andThen_fn($author$project$Main$dateFromString, r.bT);
        }, lst))))));
    };
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromMonth = function (month) {
        switch (month) {
            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 3;
            case 3:
                return 4;
            case 4:
                return 5;
            case 5:
                return 6;
            case 6:
                return 7;
            case 7:
                return 8;
            case 8:
                return 9;
            case 9:
                return 10;
            case 10:
                return 11;
            default:
                return 12;
        }
    };
    var $elm$time$Time$flooredDiv_fn = function (numerator, denominator) {
        return $elm$core$Basics$floor(numerator / denominator);
    }, $elm$time$Time$flooredDiv = F2($elm$time$Time$flooredDiv_fn);
    var $elm$time$Time$toAdjustedMinutesHelp_fn = function (defaultOffset, posixMinutes, eras) {
        toAdjustedMinutesHelp: while (true) {
            if (!eras.b) {
                return posixMinutes + defaultOffset;
            }
            else {
                var era = eras.a;
                var olderEras = eras.b;
                if (_Utils_cmp(era.a3, posixMinutes) < 0) {
                    return posixMinutes + era.b;
                }
                else {
                    var $temp$defaultOffset = defaultOffset, $temp$posixMinutes = posixMinutes, $temp$eras = olderEras;
                    defaultOffset = $temp$defaultOffset;
                    posixMinutes = $temp$posixMinutes;
                    eras = $temp$eras;
                    continue toAdjustedMinutesHelp;
                }
            }
        }
    }, $elm$time$Time$toAdjustedMinutesHelp = F3($elm$time$Time$toAdjustedMinutesHelp_fn);
    var $elm$time$Time$toAdjustedMinutes_fn = function (_v0, time) {
        var defaultOffset = _v0.a;
        var eras = _v0.b;
        return $elm$time$Time$toAdjustedMinutesHelp_fn(defaultOffset, $elm$time$Time$flooredDiv_fn($elm$time$Time$posixToMillis(time), 60000), eras);
    }, $elm$time$Time$toAdjustedMinutes = F2($elm$time$Time$toAdjustedMinutes_fn);
    var $elm$time$Time$toCivil = function (minutes) {
        var rawDay = $elm$time$Time$flooredDiv_fn(minutes, 60 * 24) + 719468;
        var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
        var dayOfEra = rawDay - (era * 146097);
        var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
        var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
        var mp = (((5 * dayOfYear) + 2) / 153) | 0;
        var month = mp + ((mp < 10) ? 3 : (-9));
        var year = yearOfEra + (era * 400);
        return {
            bk: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
            bG: month,
            cf: year + ((month <= 2) ? 1 : 0)
        };
    };
    var $elm$time$Time$toDay_fn = function (zone, time) {
        return $elm$time$Time$toCivil($elm$time$Time$toAdjustedMinutes_fn(zone, time)).bk;
    }, $elm$time$Time$toDay = F2($elm$time$Time$toDay_fn);
    var $elm$time$Time$toHour_fn = function (zone, time) {
        return _Basics_modBy_fn(24, $elm$time$Time$flooredDiv_fn($elm$time$Time$toAdjustedMinutes_fn(zone, time), 60));
    }, $elm$time$Time$toHour = F2($elm$time$Time$toHour_fn);
    var $elm$time$Time$toMillis_fn = function (_v0, time) {
        return _Basics_modBy_fn(1000, $elm$time$Time$posixToMillis(time));
    }, $elm$time$Time$toMillis = F2($elm$time$Time$toMillis_fn);
    var $elm$time$Time$toMinute_fn = function (zone, time) {
        return _Basics_modBy_fn(60, $elm$time$Time$toAdjustedMinutes_fn(zone, time));
    }, $elm$time$Time$toMinute = F2($elm$time$Time$toMinute_fn);
    var $elm$time$Time$Apr = 3;
    var $elm$time$Time$Aug = 7;
    var $elm$time$Time$Dec = 11;
    var $elm$time$Time$Feb = 1;
    var $elm$time$Time$Jan = 0;
    var $elm$time$Time$Jul = 6;
    var $elm$time$Time$Jun = 5;
    var $elm$time$Time$Mar = 2;
    var $elm$time$Time$May = 4;
    var $elm$time$Time$Nov = 10;
    var $elm$time$Time$Oct = 9;
    var $elm$time$Time$Sep = 8;
    var $elm$time$Time$toMonth_fn = function (zone, time) {
        var _v0 = $elm$time$Time$toCivil($elm$time$Time$toAdjustedMinutes_fn(zone, time)).bG;
        switch (_v0) {
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 3;
            case 5:
                return 4;
            case 6:
                return 5;
            case 7:
                return 6;
            case 8:
                return 7;
            case 9:
                return 8;
            case 10:
                return 9;
            case 11:
                return 10;
            default:
                return 11;
        }
    }, $elm$time$Time$toMonth = F2($elm$time$Time$toMonth_fn);
    var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
    var $elm$core$String$repeatHelp_fn = function (n, chunk, result) {
        return (n <= 0) ? result : $elm$core$String$repeatHelp_fn(n >> 1, _Utils_ap(chunk, chunk), (!(n & 1)) ? result : _Utils_ap(result, chunk));
    }, $elm$core$String$repeatHelp = F3($elm$core$String$repeatHelp_fn);
    var $elm$core$String$repeat_fn = function (n, chunk) {
        return $elm$core$String$repeatHelp_fn(n, chunk, "");
    }, $elm$core$String$repeat = F2($elm$core$String$repeat_fn);
    var $elm$core$String$padLeft_fn = function (n, _char, string) {
        return _Utils_ap($elm$core$String$repeat_fn(n - $elm$core$String$length(string), $elm$core$String$fromChar(_char)), string);
    }, $elm$core$String$padLeft = F3($elm$core$String$padLeft_fn);
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString_fn = function (digits, time) {
        return $elm$core$String$padLeft_fn(digits, "0", $elm$core$String$fromInt(time));
    }, $rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString = F2($rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString_fn);
    var $elm$time$Time$toSecond_fn = function (_v0, time) {
        return _Basics_modBy_fn(60, $elm$time$Time$flooredDiv_fn($elm$time$Time$posixToMillis(time), 1000));
    }, $elm$time$Time$toSecond = F2($elm$time$Time$toSecond_fn);
    var $elm$time$Time$toYear_fn = function (zone, time) {
        return $elm$time$Time$toCivil($elm$time$Time$toAdjustedMinutes_fn(zone, time)).cf;
    }, $elm$time$Time$toYear = F2($elm$time$Time$toYear_fn);
    var $elm$time$Time$Zone_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$time$Time$Zone = F2($elm$time$Time$Zone_fn);
    var $elm$time$Time$utc = $elm$time$Time$Zone_fn(0, _List_Nil);
    var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime = function (time) {
        return $rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString_fn(4, $elm$time$Time$toYear_fn($elm$time$Time$utc, time)) + ("-" + ($rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString_fn(2, $rtfeldman$elm_iso8601_date_strings$Iso8601$fromMonth($elm$time$Time$toMonth_fn($elm$time$Time$utc, time))) + ("-" + ($rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString_fn(2, $elm$time$Time$toDay_fn($elm$time$Time$utc, time)) + ("T" + ($rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString_fn(2, $elm$time$Time$toHour_fn($elm$time$Time$utc, time)) + (":" + ($rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString_fn(2, $elm$time$Time$toMinute_fn($elm$time$Time$utc, time)) + (":" + ($rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString_fn(2, $elm$time$Time$toSecond_fn($elm$time$Time$utc, time)) + ("." + ($rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString_fn(3, $elm$time$Time$toMillis_fn($elm$time$Time$utc, time)) + "Z"))))))))))));
    };
    var $mdgriffith$elm_ui$Element$Input$Above = 2;
    var $mdgriffith$elm_ui$Element$Input$Label_fn = function (a, b, c) {
        return { $: 0, a: a, b: b, c: c };
    }, $mdgriffith$elm_ui$Element$Input$Label = F3($mdgriffith$elm_ui$Element$Input$Label_fn);
    var $mdgriffith$elm_ui$Element$Input$labelAbove_a0 = 2, $mdgriffith$elm_ui$Element$Input$labelAbove = $mdgriffith$elm_ui$Element$Input$Label($mdgriffith$elm_ui$Element$Input$labelAbove_a0);
    var $mdgriffith$elm_ui$Element$Input$Placeholder_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Element$Input$Placeholder = F2($mdgriffith$elm_ui$Element$Input$Placeholder_fn);
    var $mdgriffith$elm_ui$Element$Input$placeholder = $mdgriffith$elm_ui$Element$Input$Placeholder;
    var $mdgriffith$elm_ui$Element$Input$TextInputNode = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_ui$Element$Input$TextArea = { $: 1 };
    var $mdgriffith$elm_ui$Internal$Model$LivePolite = { $: 6 };
    var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
    var $mdgriffith$elm_ui$Element$Input$applyLabel_fn = function (attrs, label, input) {
        if (label.$ === 1) {
            var labelText = label.a;
            return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asColumn, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), attrs, $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([input])));
        }
        else {
            var position = label.a;
            var labelAttrs = label.b;
            var labelChild = label.c;
            var labelElement = $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, labelAttrs, $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([labelChild])));
            switch (position) {
                case 2:
                    return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asColumn, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aF), attrs), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([labelElement, input])));
                case 3:
                    return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asColumn, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aF), attrs), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([input, labelElement])));
                case 0:
                    return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asRow, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aF), attrs), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([input, labelElement])));
                default:
                    return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asRow, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aF), attrs), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([labelElement, input])));
            }
        }
    }, $mdgriffith$elm_ui$Element$Input$applyLabel = F3($mdgriffith$elm_ui$Element$Input$applyLabel_fn);
    var $mdgriffith$elm_ui$Element$Input$autofill_a0 = $mdgriffith$elm_ui$Internal$Model$Attr, $mdgriffith$elm_ui$Element$Input$autofill_a1 = $elm$html$Html$Attributes$attribute("autocomplete"), $mdgriffith$elm_ui$Element$Input$autofill = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$Input$autofill_a0, $mdgriffith$elm_ui$Element$Input$autofill_a1);
    var $mdgriffith$elm_ui$Internal$Model$Behind = 5;
    var $mdgriffith$elm_ui$Element$createNearby_fn = function (loc, element) {
        if (element.$ === 3) {
            return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
        }
        else {
            return $mdgriffith$elm_ui$Internal$Model$Nearby_fn(loc, element);
        }
    }, $mdgriffith$elm_ui$Element$createNearby = F2($mdgriffith$elm_ui$Element$createNearby_fn);
    var $mdgriffith$elm_ui$Element$behindContent = function (element) {
        return $mdgriffith$elm_ui$Element$createNearby_fn(5, element);
    };
    var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
    var $mdgriffith$elm_ui$Element$moveUp = function (y) {
        return $mdgriffith$elm_ui$Internal$Model$TransformComponent_fn($mdgriffith$elm_ui$Internal$Flag$moveY, $mdgriffith$elm_ui$Internal$Model$MoveY(-y));
    };
    var $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding = function (attrs) {
        var gatherSpacing = F2(function (attr, found) {
            if ((attr.$ === 4) && (attr.b.$ === 5)) {
                var _v2 = attr.b;
                var x = _v2.b;
                var y = _v2.c;
                if (found.$ === 1) {
                    return $elm$core$Maybe$Just(y);
                }
                else {
                    return found;
                }
            }
            else {
                return found;
            }
        });
        var _v0 = $elm$core$List$foldr_fn(gatherSpacing, $elm$core$Maybe$Nothing, attrs);
        if (_v0.$ === 1) {
            return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
        }
        else {
            var vSpace = _v0.a;
            return $mdgriffith$elm_ui$Element$moveUp($elm$core$Basics$floor(vSpace / 2));
        }
    };
    var $mdgriffith$elm_ui$Element$Input$darkGrey = $mdgriffith$elm_ui$Element$rgb_fn(186 / 255, 189 / 255, 182 / 255);
    var $mdgriffith$elm_ui$Element$Input$defaultTextPadding = $mdgriffith$elm_ui$Element$paddingXY_fn(12, 12);
    var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
    var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$borderRound, $mdgriffith$elm_ui$Internal$Model$Single_fn("br-" + $elm$core$String$fromInt(radius), "border-radius", $elm$core$String$fromInt(radius) + "px"));
    };
    var $mdgriffith$elm_ui$Element$Input$white = $mdgriffith$elm_ui$Element$rgb_fn(1, 1, 1);
    var $mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle = _List_fromArray([
        $mdgriffith$elm_ui$Element$Input$defaultTextPadding,
        $mdgriffith$elm_ui$Element$Border$rounded(3),
        $mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$Input$darkGrey),
        $mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
        $mdgriffith$elm_ui$Element$Border$width(1),
        $mdgriffith$elm_ui$Element$spacing(5),
        $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
        $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink)
    ]);
    var $mdgriffith$elm_ui$Element$Input$getHeight = function (attr) {
        if (attr.$ === 8) {
            var h = attr.a;
            return $elm$core$Maybe$Just(h);
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
        return { $: 5, a: a };
    };
    var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
        if (label.$ === 1) {
            var textLabel = label.a;
            return $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Label(textLabel));
        }
        else {
            return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$InFront = 4;
    var $mdgriffith$elm_ui$Element$inFront = function (element) {
        return $mdgriffith$elm_ui$Element$createNearby_fn(4, element);
    };
    var $mdgriffith$elm_ui$Element$Input$isConstrained = function (len) {
        isConstrained: while (true) {
            switch (len.$) {
                case 1:
                    return false;
                case 0:
                    return true;
                case 2:
                    return true;
                case 3:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isConstrained;
                default:
                    var l = len.b;
                    return true;
            }
        }
    };
    var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
        if (label.$ === 1) {
            return true;
        }
        else {
            return false;
        }
    };
    var $mdgriffith$elm_ui$Element$Input$isStacked = function (label) {
        if (!label.$) {
            var loc = label.a;
            switch (loc) {
                case 0:
                    return false;
                case 1:
                    return false;
                case 2:
                    return true;
                default:
                    return true;
            }
        }
        else {
            return true;
        }
    };
    var $mdgriffith$elm_ui$Element$Input$negateBox = function (box) {
        return { cE: -box.cE, dc: -box.dc, dt: -box.dt, d2: -box.d2 };
    };
    var $elm$html$Html$Events$alwaysStop = function (x) {
        return _Utils_Tuple2(x, true);
    };
    var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
        return { $: 1, a: a };
    };
    var $elm$html$Html$Events$stopPropagationOn_fn = function (event, decoder) {
        return _VirtualDom_on_fn(event, $elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
    }, $elm$html$Html$Events$stopPropagationOn = F2($elm$html$Html$Events$stopPropagationOn_fn);
    var $elm$json$Json$Decode$at_fn = function (fields, decoder) {
        return $elm$core$List$foldr_fn($elm$json$Json$Decode$field, decoder, fields);
    }, $elm$json$Json$Decode$at = F2($elm$json$Json$Decode$at_fn);
    var $elm$html$Html$Events$targetValue = $elm$json$Json$Decode$at_fn(_List_fromArray(["target", "value"]), $elm$json$Json$Decode$string);
    var $elm$html$Html$Events$onInput = function (tagger) {
        return $elm$html$Html$Events$stopPropagationOn_fn("input", _Json_map1_fn($elm$html$Html$Events$alwaysStop, _Json_map1_fn(tagger, $elm$html$Html$Events$targetValue)));
    };
    var $mdgriffith$elm_ui$Element$Input$isFill = function (len) {
        isFill: while (true) {
            switch (len.$) {
                case 2:
                    return true;
                case 1:
                    return false;
                case 0:
                    return false;
                case 3:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isFill;
                default:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isFill;
            }
        }
    };
    var $mdgriffith$elm_ui$Element$Input$isPixel = function (len) {
        isPixel: while (true) {
            switch (len.$) {
                case 1:
                    return false;
                case 0:
                    return true;
                case 2:
                    return false;
                case 3:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isPixel;
                default:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isPixel;
            }
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$paddingNameFloat_fn = function (top, right, bottom, left) {
        return "pad-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(top) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(right) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(bottom) + ("-" + $mdgriffith$elm_ui$Internal$Model$floatClass(left)))))));
    }, $mdgriffith$elm_ui$Internal$Model$paddingNameFloat = F4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat_fn);
    var $mdgriffith$elm_ui$Element$Input$redistributeOver_fn = function (isMultiline, stacked, attr, els) {
        switch (attr.$) {
            case 9:
                return _Utils_update(els, {
                    c: _List_Cons(attr, els.c)
                });
            case 7:
                var width = attr.a;
                return $mdgriffith$elm_ui$Element$Input$isFill(width) ? _Utils_update(els, {
                    h: _List_Cons(attr, els.h),
                    m: _List_Cons(attr, els.m),
                    c: _List_Cons(attr, els.c)
                }) : (stacked ? _Utils_update(els, {
                    h: _List_Cons(attr, els.h)
                }) : _Utils_update(els, {
                    c: _List_Cons(attr, els.c)
                }));
            case 8:
                var height = attr.a;
                return (!stacked) ? _Utils_update(els, {
                    h: _List_Cons(attr, els.h),
                    c: _List_Cons(attr, els.c)
                }) : ($mdgriffith$elm_ui$Element$Input$isFill(height) ? _Utils_update(els, {
                    h: _List_Cons(attr, els.h),
                    c: _List_Cons(attr, els.c)
                }) : ($mdgriffith$elm_ui$Element$Input$isPixel(height) ? _Utils_update(els, {
                    c: _List_Cons(attr, els.c)
                }) : _Utils_update(els, {
                    c: _List_Cons(attr, els.c)
                })));
            case 6:
                return _Utils_update(els, {
                    h: _List_Cons(attr, els.h)
                });
            case 5:
                return _Utils_update(els, {
                    h: _List_Cons(attr, els.h)
                });
            case 4:
                switch (attr.b.$) {
                    case 5:
                        var _v1 = attr.b;
                        return _Utils_update(els, {
                            h: _List_Cons(attr, els.h),
                            m: _List_Cons(attr, els.m),
                            c: _List_Cons(attr, els.c),
                            aj: _List_Cons(attr, els.aj)
                        });
                    case 7:
                        var cls = attr.a;
                        var _v2 = attr.b;
                        var pad = _v2.a;
                        var t = _v2.b;
                        var r = _v2.c;
                        var b = _v2.d;
                        var l = _v2.e;
                        if (isMultiline) {
                            return _Utils_update(els, {
                                r: _List_Cons(attr, els.r),
                                c: _List_Cons(attr, els.c)
                            });
                        }
                        else {
                            var newTop = t - $elm$core$Basics$min_fn(t, b);
                            var newLineHeight = $mdgriffith$elm_ui$Element$htmlAttribute(_VirtualDom_style_fn("line-height", "calc(1.0em + " + ($elm$core$String$fromFloat(2 * $elm$core$Basics$min_fn(t, b)) + "px)")));
                            var newHeight = $mdgriffith$elm_ui$Element$htmlAttribute(_VirtualDom_style_fn("height", "calc(1.0em + " + ($elm$core$String$fromFloat(2 * $elm$core$Basics$min_fn(t, b)) + "px)")));
                            var newBottom = b - $elm$core$Basics$min_fn(t, b);
                            var reducedVerticalPadding = $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn($mdgriffith$elm_ui$Internal$Model$paddingNameFloat_fn(newTop, r, newBottom, l), newTop, r, newBottom, l));
                            return _Utils_update(els, {
                                r: _List_Cons(attr, els.r),
                                m: _List_Cons(newHeight, _List_Cons(newLineHeight, els.m)),
                                c: _List_Cons(reducedVerticalPadding, els.c)
                            });
                        }
                    case 6:
                        var _v3 = attr.b;
                        return _Utils_update(els, {
                            r: _List_Cons(attr, els.r),
                            c: _List_Cons(attr, els.c)
                        });
                    case 10:
                        return _Utils_update(els, {
                            r: _List_Cons(attr, els.r),
                            c: _List_Cons(attr, els.c)
                        });
                    case 2:
                        return _Utils_update(els, {
                            h: _List_Cons(attr, els.h)
                        });
                    case 1:
                        var _v4 = attr.b;
                        return _Utils_update(els, {
                            h: _List_Cons(attr, els.h)
                        });
                    default:
                        var flag = attr.a;
                        var cls = attr.b;
                        return _Utils_update(els, {
                            c: _List_Cons(attr, els.c)
                        });
                }
            case 0:
                return els;
            case 1:
                var a = attr.a;
                return _Utils_update(els, {
                    m: _List_Cons(attr, els.m)
                });
            case 2:
                return _Utils_update(els, {
                    m: _List_Cons(attr, els.m)
                });
            case 3:
                return _Utils_update(els, {
                    c: _List_Cons(attr, els.c)
                });
            default:
                return _Utils_update(els, {
                    m: _List_Cons(attr, els.m)
                });
        }
    }, $mdgriffith$elm_ui$Element$Input$redistributeOver = F4($mdgriffith$elm_ui$Element$Input$redistributeOver_fn);
    var $mdgriffith$elm_ui$Element$Input$redistribute_fn = function (isMultiline, stacked, attrs) {
        return function (redist) {
            return {
                r: $elm$core$List$reverse(redist.r),
                h: $elm$core$List$reverse(redist.h),
                m: $elm$core$List$reverse(redist.m),
                c: $elm$core$List$reverse(redist.c),
                aj: $elm$core$List$reverse(redist.aj)
            };
        }($elm$core$List$foldl_fn(A2($mdgriffith$elm_ui$Element$Input$redistributeOver, isMultiline, stacked), { r: _List_Nil, h: _List_Nil, m: _List_Nil, c: _List_Nil, aj: _List_Nil }, attrs));
    }, $mdgriffith$elm_ui$Element$Input$redistribute = F3($mdgriffith$elm_ui$Element$Input$redistribute_fn);
    var $mdgriffith$elm_ui$Element$Input$renderBox = function (_v0) {
        var top = _v0.d2;
        var right = _v0.dt;
        var bottom = _v0.cE;
        var left = _v0.dc;
        return $elm$core$String$fromInt(top) + ("px " + ($elm$core$String$fromInt(right) + ("px " + ($elm$core$String$fromInt(bottom) + ("px " + ($elm$core$String$fromInt(left) + "px"))))));
    };
    var $mdgriffith$elm_ui$Internal$Model$Transparency_fn = function (a, b) {
        return { $: 12, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Transparency = F2($mdgriffith$elm_ui$Internal$Model$Transparency_fn);
    var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
    var $mdgriffith$elm_ui$Element$alpha = function (o) {
        var transparency = function (x) {
            return 1 - x;
        }($elm$core$Basics$min_fn(1, $elm$core$Basics$max_fn(0, o)));
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$transparency, $mdgriffith$elm_ui$Internal$Model$Transparency_fn("transparency-" + $mdgriffith$elm_ui$Internal$Model$floatClass(transparency), transparency));
    };
    var $mdgriffith$elm_ui$Element$Input$charcoal = $mdgriffith$elm_ui$Element$rgb_fn(136 / 255, 138 / 255, 133 / 255);
    var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
    var $mdgriffith$elm_ui$Element$Input$renderPlaceholder_fn = function (_v0, forPlaceholder, on) {
        var placeholderAttrs = _v0.a;
        var placeholderEl = _v0.b;
        return $mdgriffith$elm_ui$Element$el_fn(_Utils_ap(forPlaceholder, _Utils_ap(_List_fromArray([
            $mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$Input$charcoal),
            $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bH + (" " + $mdgriffith$elm_ui$Internal$Style$classes.$7)),
            $mdgriffith$elm_ui$Element$clip,
            $mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Internal$Model$Rgba_fn(0, 0, 0, 0)),
            $mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Internal$Model$Rgba_fn(0, 0, 0, 0)),
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$alpha(on ? 1 : 0)
        ]), placeholderAttrs)), placeholderEl);
    }, $mdgriffith$elm_ui$Element$Input$renderPlaceholder = F3($mdgriffith$elm_ui$Element$Input$renderPlaceholder_fn);
    var $mdgriffith$elm_ui$Element$scrollbarY = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.dy);
    var $elm$html$Html$span = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "span"), $elm$html$Html$span_fn = $elm$html$Html$span.a2;
    var $elm$html$Html$Attributes$spellcheck_a0 = "spellcheck", $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty($elm$html$Html$Attributes$spellcheck_a0);
    var $mdgriffith$elm_ui$Element$Input$spellcheck_a0 = $mdgriffith$elm_ui$Internal$Model$Attr, $mdgriffith$elm_ui$Element$Input$spellcheck_a1 = $elm$html$Html$Attributes$spellcheck, $mdgriffith$elm_ui$Element$Input$spellcheck = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$Input$spellcheck_a0, $mdgriffith$elm_ui$Element$Input$spellcheck_a1);
    var $elm$html$Html$Attributes$type__a0 = "type", $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty($elm$html$Html$Attributes$type__a0);
    var $elm$html$Html$Attributes$value_a0 = "value", $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty($elm$html$Html$Attributes$value_a0);
    var $mdgriffith$elm_ui$Element$Input$value_a0 = $mdgriffith$elm_ui$Internal$Model$Attr, $mdgriffith$elm_ui$Element$Input$value_a1 = $elm$html$Html$Attributes$value, $mdgriffith$elm_ui$Element$Input$value = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$Input$value_a0, $mdgriffith$elm_ui$Element$Input$value_a1);
    var $mdgriffith$elm_ui$Element$Input$textHelper_fn = function (textInput, attrs, textOptions) {
        var withDefaults = _Utils_ap($mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle, attrs);
        var redistributed = $mdgriffith$elm_ui$Element$Input$redistribute_fn(_Utils_eq(textInput.p, $mdgriffith$elm_ui$Element$Input$TextArea), $mdgriffith$elm_ui$Element$Input$isStacked(textOptions.g), withDefaults);
        var onlySpacing = function (attr) {
            if ((attr.$ === 4) && (attr.b.$ === 5)) {
                var _v9 = attr.b;
                return true;
            }
            else {
                return false;
            }
        };
        var heightConstrained = function () {
            var _v7 = textInput.p;
            if (!_v7.$) {
                var inputType = _v7.a;
                return false;
            }
            else {
                return $elm$core$Maybe$withDefault_fn(false, $elm$core$Maybe$map_fn($mdgriffith$elm_ui$Element$Input$isConstrained, $elm$core$List$head($elm$core$List$reverse($elm$core$List$filterMap_fn($mdgriffith$elm_ui$Element$Input$getHeight, withDefaults)))));
            }
        }();
        var getPadding = function (attr) {
            if ((attr.$ === 4) && (attr.b.$ === 7)) {
                var cls = attr.a;
                var _v6 = attr.b;
                var pad = _v6.a;
                var t = _v6.b;
                var r = _v6.c;
                var b = _v6.d;
                var l = _v6.e;
                return $elm$core$Maybe$Just({
                    cE: $elm$core$Basics$max_fn(0, $elm$core$Basics$floor(b - 3)),
                    dc: $elm$core$Basics$max_fn(0, $elm$core$Basics$floor(l - 3)),
                    dt: $elm$core$Basics$max_fn(0, $elm$core$Basics$floor(r - 3)),
                    d2: $elm$core$Basics$max_fn(0, $elm$core$Basics$floor(t - 3))
                });
            }
            else {
                return $elm$core$Maybe$Nothing;
            }
        };
        var parentPadding = $elm$core$Maybe$withDefault_fn({ cE: 0, dc: 0, dt: 0, d2: 0 }, $elm$core$List$head($elm$core$List$reverse($elm$core$List$filterMap_fn(getPadding, withDefaults))));
        var inputElement = $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, function () {
            var _v3 = textInput.p;
            if (!_v3.$) {
                var inputType = _v3.a;
                return $mdgriffith$elm_ui$Internal$Model$NodeName("input");
            }
            else {
                return $mdgriffith$elm_ui$Internal$Model$NodeName("textarea");
            }
        }(), _Utils_ap(function () {
            var _v4 = textInput.p;
            if (!_v4.$) {
                var inputType = _v4.a;
                return _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$type__a0, inputType)),
                    $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c9)
                ]);
            }
            else {
                return _List_fromArray([
                    $mdgriffith$elm_ui$Element$clip,
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c5),
                    $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding(withDefaults),
                    $mdgriffith$elm_ui$Element$paddingEach(parentPadding),
                    $mdgriffith$elm_ui$Internal$Model$Attr(_VirtualDom_style_fn("margin", $mdgriffith$elm_ui$Element$Input$renderBox($mdgriffith$elm_ui$Element$Input$negateBox(parentPadding)))),
                    $mdgriffith$elm_ui$Internal$Model$Attr(_VirtualDom_style_fn("box-sizing", "content-box"))
                ]);
            }
        }(), _Utils_ap(_List_fromArray([
            $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Input$value_a0, $mdgriffith$elm_ui$Element$Input$value_a1, textOptions.dO),
            $mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Events$onInput(textOptions.dg)),
            $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(textOptions.g),
            $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Input$spellcheck_a0, $mdgriffith$elm_ui$Element$Input$spellcheck_a1, textInput.A),
            $elm$core$Maybe$withDefault_fn($mdgriffith$elm_ui$Internal$Model$NoAttribute, $elm$core$Maybe$map_fn($mdgriffith$elm_ui$Element$Input$autofill, textInput.w))
        ]), redistributed.m)), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil));
        var wrappedInput = function () {
            var _v0 = textInput.p;
            if (_v0.$ === 1) {
                return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, _Utils_ap((heightConstrained ? $elm$core$List$cons($mdgriffith$elm_ui$Element$scrollbarY) : $elm$core$Basics$identity)(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $elm$core$List$any_fn($mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bp),
                    $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c8)
                ])), redistributed.c), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asParagraph, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill), _List_Cons($mdgriffith$elm_ui$Element$inFront(inputElement), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c7), redistributed.aj)))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(function () {
                        if (textOptions.dO === "") {
                            var _v1 = textOptions.dq;
                            if (_v1.$ === 1) {
                                return _List_fromArray([
                                    $mdgriffith$elm_ui$Element$text("\u00A0")
                                ]);
                            }
                            else {
                                var place = _v1.a;
                                return _List_fromArray([
                                    $mdgriffith$elm_ui$Element$Input$renderPlaceholder_fn(place, _List_Nil, textOptions.dO === "")
                                ]);
                            }
                        }
                        else {
                            return _List_fromArray([
                                $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Internal$Model$unstyled_a0, $mdgriffith$elm_ui$Internal$Model$unstyled_a1, $elm$html$Html$span_fn(_List_fromArray([
                                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $mdgriffith$elm_ui$Internal$Style$classes.c6)
                                ]), _List_fromArray([
                                    $elm$html$Html$text(textOptions.dO + "\u00A0")
                                ])))
                            ]);
                        }
                    }()))
                ])));
            }
            else {
                var inputType = _v0.a;
                return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill), _List_Cons($elm$core$List$any_fn($mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bp), $elm$core$List$concat(_List_fromArray([
                    redistributed.c,
                    function () {
                        var _v2 = textOptions.dq;
                        if (_v2.$ === 1) {
                            return _List_Nil;
                        }
                        else {
                            var place = _v2.a;
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Element$behindContent($mdgriffith$elm_ui$Element$Input$renderPlaceholder_fn(place, redistributed.r, textOptions.dO === ""))
                            ]);
                        }
                    }()
                ])))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([inputElement])));
            }
        }();
        return $mdgriffith$elm_ui$Element$Input$applyLabel_fn(_List_Cons($mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cP), _List_Cons($mdgriffith$elm_ui$Element$Input$isHiddenLabel(textOptions.g) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(5), _List_Cons($mdgriffith$elm_ui$Element$Region$announce, redistributed.h))), textOptions.g, wrappedInput);
    }, $mdgriffith$elm_ui$Element$Input$textHelper = F3($mdgriffith$elm_ui$Element$Input$textHelper_fn);
    var $mdgriffith$elm_ui$Element$Input$search_a0 = {
        w: $elm$core$Maybe$Nothing,
        A: false,
        p: $mdgriffith$elm_ui$Element$Input$TextInputNode("search")
    }, $mdgriffith$elm_ui$Element$Input$search = $mdgriffith$elm_ui$Element$Input$textHelper($mdgriffith$elm_ui$Element$Input$search_a0);
    var $elm$random$Random$Seed_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$random$Random$Seed = F2($elm$random$Random$Seed_fn);
    var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
    var $elm$random$Random$next = function (_v0) {
        var state0 = _v0.a;
        var incr = _v0.b;
        return $elm$random$Random$Seed_fn(((state0 * 1664525) + incr) >>> 0, incr);
    };
    var $elm$random$Random$initialSeed = function (x) {
        var _v0 = $elm$random$Random$next($elm$random$Random$Seed_fn(0, 1013904223));
        var state1 = _v0.a;
        var incr = _v0.b;
        var state2 = (state1 + x) >>> 0;
        return $elm$random$Random$next($elm$random$Random$Seed_fn(state2, incr));
    };
    var $elm$random$Random$Generator = $elm$core$Basics$identity;
    var $elm$core$Bitwise$xor = _Bitwise_xor;
    var $elm$random$Random$peel = function (_v0) {
        var state = _v0.a;
        var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
        return ((word >>> 22) ^ word) >>> 0;
    };
    var $elm$random$Random$int_fn = function (a, b) {
        return function (seed0) {
            var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
            var lo = _v0.a;
            var hi = _v0.b;
            var range = (hi - lo) + 1;
            if (!((range - 1) & range)) {
                return _Utils_Tuple2((((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo, $elm$random$Random$next(seed0));
            }
            else {
                var threshhold = (((-range) >>> 0) % range) >>> 0;
                var accountForBias = function (seed) {
                    accountForBias: while (true) {
                        var x = $elm$random$Random$peel(seed);
                        var seedN = $elm$random$Random$next(seed);
                        if (_Utils_cmp(x, threshhold) < 0) {
                            var $temp$seed = seedN;
                            seed = $temp$seed;
                            continue accountForBias;
                        }
                        else {
                            return _Utils_Tuple2((x % range) + lo, seedN);
                        }
                    }
                };
                return accountForBias(seed0);
            }
        };
    }, $elm$random$Random$int = F2($elm$random$Random$int_fn);
    var $elm$random$Random$maxInt = 2147483647;
    var $elm$random$Random$minInt = -2147483648;
    var $elm_community$random_extra$Random$List$anyInt = $elm$random$Random$int_fn($elm$random$Random$minInt, $elm$random$Random$maxInt);
    var $elm$random$Random$map3_fn = function (func, _v0, _v1, _v2) {
        var genA = _v0;
        var genB = _v1;
        var genC = _v2;
        return function (seed0) {
            var _v3 = genA(seed0);
            var a = _v3.a;
            var seed1 = _v3.b;
            var _v4 = genB(seed1);
            var b = _v4.a;
            var seed2 = _v4.b;
            var _v5 = genC(seed2);
            var c = _v5.a;
            var seed3 = _v5.b;
            return _Utils_Tuple2(A3(func, a, b, c), seed3);
        };
    }, $elm$random$Random$map3_fn_unwrapped = function (func, _v0, _v1, _v2) {
        var genA = _v0;
        var genB = _v1;
        var genC = _v2;
        return function (seed0) {
            var _v3 = genA(seed0);
            var a = _v3.a;
            var seed1 = _v3.b;
            var _v4 = genB(seed1);
            var b = _v4.a;
            var seed2 = _v4.b;
            var _v5 = genC(seed2);
            var c = _v5.a;
            var seed3 = _v5.b;
            return _Utils_Tuple2(func(a, b, c), seed3);
        };
    }, $elm$random$Random$map3 = F4($elm$random$Random$map3_fn);
    var $elm$random$Random$step_fn = function (_v0, seed) {
        var generator = _v0;
        return generator(seed);
    }, $elm$random$Random$step = F2($elm$random$Random$step_fn);
    var $elm$random$Random$independentSeed = function (seed0) {
        var makeIndependentSeed = F3(function (state, b, c) {
            return $elm$random$Random$next($elm$random$Random$Seed_fn(state, (1 | (b ^ c)) >>> 0));
        });
        var gen = $elm$random$Random$int_fn(0, 4294967295);
        return $elm$random$Random$step_fn($elm$random$Random$map3_fn(makeIndependentSeed, gen, gen, gen), seed0);
    };
    var $elm$random$Random$map_fn = function (func, _v0) {
        var genA = _v0;
        return function (seed0) {
            var _v1 = genA(seed0);
            var a = _v1.a;
            var seed1 = _v1.b;
            return _Utils_Tuple2(func(a), seed1);
        };
    }, $elm$random$Random$map = F2($elm$random$Random$map_fn);
    var $elm_community$random_extra$Random$List$shuffle = function (list) {
        return $elm$random$Random$map_fn(function (independentSeed) {
            return $elm$core$List$map_fn($elm$core$Tuple$first, _List_sortBy_fn($elm$core$Tuple$second, $elm$core$List$foldl_fn_unwrapped(function (item, _v0) {
                var acc = _v0.a;
                var seed = _v0.b;
                var _v1 = $elm$random$Random$step_fn($elm_community$random_extra$Random$List$anyInt, seed);
                var tag = _v1.a;
                var nextSeed = _v1.b;
                return _Utils_Tuple2(_List_Cons(_Utils_Tuple2(item, tag), acc), nextSeed);
            }, _Utils_Tuple2(_List_Nil, independentSeed), list).a));
        }, $elm$random$Random$independentSeed);
    };
    var $author$project$Main$shuffleWithSeed_fn = function (seed, lst) {
        return $elm$random$Random$step_fn($elm_community$random_extra$Random$List$shuffle(lst), $elm$random$Random$initialSeed(seed)).a;
    }, $author$project$Main$shuffleWithSeed = F2($author$project$Main$shuffleWithSeed_fn);
    var $author$project$Main$sortKeywordLst_fn = function (sorting, lst) {
        switch (sorting) {
            case 0:
                return $elm$core$List$reverse(_List_sortBy_fn($author$project$Main$getCount, lst));
            case 1:
                return _List_sortBy_fn($author$project$Main$kwName, lst);
            default:
                return $author$project$Main$shuffleWithSeed_fn(42, lst);
        }
    }, $author$project$Main$sortKeywordLst = F2($author$project$Main$sortKeywordLst_fn);
    var $elm$core$Dict$values = function (dict) {
        return $elm$core$Dict$foldr_fn_unwrapped(function (key, value, valueList) {
            return _List_Cons(value, valueList);
        }, _List_Nil, dict);
    };
    var $author$project$Main$toList = function (_v0) {
        var kwSet = _v0;
        return $elm$core$Dict$values(kwSet);
    };
    var $author$project$Main$toggleSorting = function (sorting) {
        return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$paddingXY_fn(0, 25),
            $mdgriffith$elm_ui$Element$Region$navigation,
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$spacing(5),
            $mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$rgb_fn(0, 0, 1))
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(!sorting, 0), {
                g: $mdgriffith$elm_ui$Element$text("by use"),
                f: "/#/keywords?sorting=ByUse"
            }),
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(sorting === 1, 0), {
                g: $mdgriffith$elm_ui$Element$text("alphabetical"),
                f: "/#/keywords?sorting=Alphabetical"
            }),
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(sorting === 2, 0), {
                g: $mdgriffith$elm_ui$Element$text("random"),
                f: "/#/keywords?sorting=Random"
            })
        ]));
    };
    var $author$project$Main$totalNumber = function (_v0) {
        var dict = _v0;
        return $elm$core$List$length($elm$core$Dict$keys(dict));
    };
    var $author$project$Main$viewKeywords_fn = function (model, sorting) {
        var lastDate = function () {
            var dateStr = $elm$core$Maybe$withDefault_fn("?", $elm$core$List$head($elm$core$String$split_fn("T", $rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime($author$project$Main$findLastDate(model.Y)))));
            return $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$Font$size(12)
            ]), $mdgriffith$elm_ui$Element$text("last updated: " + dateStr));
        }();
        var keywordSearch = $mdgriffith$elm_ui$Element$Input$textHelper_fn($mdgriffith$elm_ui$Element$Input$search_a0, _List_fromArray([
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$px(200))
        ]), {
            g: $mdgriffith$elm_ui$Element$Input$Label_fn($mdgriffith$elm_ui$Element$Input$labelAbove_a0, _List_Nil, $mdgriffith$elm_ui$Element$text("search")),
            dg: $author$project$Main$ChangedQuery,
            dq: $elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Input$Placeholder_fn(_List_Nil, $mdgriffith$elm_ui$Element$text("search for keyword"))),
            dO: model.ag
        });
        var keywordCount = function () {
            var count = $elm$core$String$fromInt($author$project$Main$totalNumber(model.v)) + " keywords";
            return $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$Font$size(12)
            ]), $mdgriffith$elm_ui$Element$text(count));
        }();
        var filtered = $elm$core$List$filter_fn(function (kw) {
            return _String_contains_fn(model.ag, $author$project$Main$kwName(kw));
        }, $author$project$Main$toList(model.v));
        var sorted = $author$project$Main$sortKeywordLst_fn(sorting, filtered);
        return $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$spacingXY_fn(0, 15)
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$spacingXY_fn(25, 25),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink)
                ]), $author$project$Main$toggleSorting(sorting)),
                $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink)
                ]), keywordCount),
                $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink)
                ]), lastDate)
            ])),
            $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink)
            ]), keywordSearch),
            $author$project$Main$makeColumns_fn(4, _List_fromArray([
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$spacingXY_fn(25, 25)
            ]), $elm$core$List$map_fn($author$project$Main$viewKeywordAsButton(16), sorted))
        ]));
    }, $author$project$Main$viewKeywords = F2($author$project$Main$viewKeywords_fn);
    var $author$project$Main$BigLink = 1;
    var $author$project$Main$isKeywordView = function (v) {
        if (!v.$) {
            return true;
        }
        else {
            return false;
        }
    };
    var $author$project$Main$isListView = function (v) {
        if (v.$ === 1) {
            return true;
        }
        else {
            return false;
        }
    };
    var $author$project$Main$isScreenview = function (vw) {
        if (vw.$ === 2) {
            return true;
        }
        else {
            return false;
        }
    };
    var $author$project$Main$viewNav = function (currentView) {
        return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$paddingXY_fn(0, 5),
            $mdgriffith$elm_ui$Element$Region$navigation,
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$spacing(5),
            $mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$rgb_fn(0, 0, 1))
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn($author$project$Main$isKeywordView(currentView), 1), {
                g: $mdgriffith$elm_ui$Element$text("keywords"),
                f: "/#/keywords"
            }),
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn($author$project$Main$isScreenview(currentView), 1), {
                g: $mdgriffith$elm_ui$Element$text("screenshots"),
                f: "/#/screenshots"
            }),
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn($author$project$Main$isListView(currentView), 1), {
                g: $mdgriffith$elm_ui$Element$text("list"),
                f: "/#/list"
            })
        ]));
    };
    var $author$project$Main$viewScaleSwitch = function (scale) {
        return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$padding(25),
            $mdgriffith$elm_ui$Element$Region$navigation,
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$spacing(5),
            $mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$rgb_fn(0, 0, 1))
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(!scale, 0), {
                g: $mdgriffith$elm_ui$Element$text("micro"),
                f: "/#/screenshots?zoom=micro"
            }),
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(scale === 1, 0), {
                g: $mdgriffith$elm_ui$Element$text("small"),
                f: "/#/screenshots?zoom=small"
            }),
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(scale === 2, 0), {
                g: $mdgriffith$elm_ui$Element$text("medium"),
                f: "/#/screenshots?zoom=medium"
            }),
            $mdgriffith$elm_ui$Element$link_fn($author$project$Main$linkStyle_fn(scale === 3, 0), {
                g: $mdgriffith$elm_ui$Element$text("large"),
                f: "/#/screenshots?zoom=large"
            })
        ]));
    };
    var $elm$html$Html$a = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "a"), $elm$html$Html$a_fn = $elm$html$Html$a.a2;
    var $author$project$Main$getName = function (_v0) {
        var author = _v0;
        return author.T;
    };
    var $elm$html$Html$Attributes$target_a0 = "target", $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty($elm$html$Html$Attributes$target_a0);
    var $elm$html$Html$Attributes$title_a0 = "title", $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty($elm$html$Html$Attributes$title_a0);
    var $author$project$Main$lazyImageWithErrorHandling_fn = function (groupSize, dimensions, research) {
        var width = $elm$core$String$fromInt(((dimensions.a5 - 180) / groupSize) | 0) + "px";
        var urlFromId = function (i) {
            return function (fileName) {
                return "/screenshots/" + (fileName + ".jpeg");
            }($elm$core$String$fromInt(i));
        };
        var height = $elm$core$String$fromInt((dimensions.bs / (groupSize - 1)) | 0) + "px";
        return $elm$html$Html$a_fn(_List_fromArray([
            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$target_a0, "_blank"),
            $elm$html$Html$Attributes$href(research.ad),
            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$title_a0, $author$project$Main$getName(research.aa) + (" - " + (research.as + (" - " + research.aD))))
        ]), _List_fromArray([
            A3($elm$html$Html$node, "lazy-image", _List_fromArray([
                $elm$virtual_dom$VirtualDom$attribute_fn("src", urlFromId(research.an)),
                _VirtualDom_style_fn("width", width),
                _VirtualDom_style_fn("height", height)
            ]), _List_Nil)
        ]));
    }, $author$project$Main$lazyImageWithErrorHandling = F3($author$project$Main$lazyImageWithErrorHandling_fn);
    var $author$project$Main$scaleToGroupSize = function (scale) {
        switch (scale) {
            case 0:
                return 16;
            case 1:
                return 8;
            case 2:
                return 4;
            default:
                return 3;
        }
    };
    var $author$project$Main$sortResearch_fn = function (sorting, research) {
        switch (sorting) {
            case 1:
                return _List_sortBy_fn(function (r) {
                    return r.aD;
                }, research);
            case 0:
                return $elm$core$List$reverse(_List_sortBy_fn(function (r) {
                    return r.an;
                }, research));
            default:
                return $elm$core$List$reverse(_List_sortBy_fn(function (r) {
                    return r.aD;
                }, research));
        }
    }, $author$project$Main$sortResearch = F2($author$project$Main$sortResearch_fn);
    var $author$project$Main$splitGroupsOf_fn = function (n, lst) {
        if (!lst.b) {
            return _List_Nil;
        }
        else {
            var rest = $elm$core$List$drop_fn(n, lst);
            var first = $elm$core$List$take_fn(n, lst);
            return _List_Cons(first, $author$project$Main$splitGroupsOf_fn(n, rest));
        }
    }, $author$project$Main$splitGroupsOf = F2($author$project$Main$splitGroupsOf_fn);
    var $author$project$Main$viewScreenshots_fn = function (scale, titlesort, model) {
        var groupSize = $author$project$Main$scaleToGroupSize(scale);
        var groups = $author$project$Main$splitGroupsOf_fn(groupSize, $author$project$Main$sortResearch_fn(titlesort, model.Y));
        var viewGroup = function (group) {
            return $elm$html$Html$div_fn(_List_fromArray([
                _VirtualDom_style_fn("display", "flex")
            ]), $elm$core$List$map_fn(function (exp) {
                return $author$project$Main$lazyImageWithErrorHandling_fn(groupSize, model.aK, exp);
            }, group));
        };
        return $mdgriffith$elm_ui$Element$column_fn(_List_Nil, _List_fromArray([
            $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Region$heading_a0, $mdgriffith$elm_ui$Element$Region$heading_a1, 1)
            ]), $mdgriffith$elm_ui$Element$text("Visual")),
            $mdgriffith$elm_ui$Element$html($elm$html$Html$div_fn(_List_Nil, $elm$core$List$map_fn(viewGroup, groups)))
        ]));
    }, $author$project$Main$viewScreenshots = F3($author$project$Main$viewScreenshots_fn);
    var $author$project$Main$view = function (model) {
        var body = function () {
            var _v0 = model.B;
            switch (_v0.$) {
                case 1:
                    var _v1 = _v0.a;
                    return $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                        $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
                            $mdgriffith$elm_ui$Element$spacingXY_fn(0, 25)
                        ]), _List_fromArray([
                            $author$project$Main$screenViewOrderSwitch(0)
                        ])),
                        $author$project$Main$listView(model)
                    ]));
                case 0:
                    var kwtype = _v0.a;
                    if (!kwtype.$) {
                        var sorting = kwtype.a;
                        return $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
                        ]), _List_fromArray([
                            $author$project$Main$viewKeywords_fn(model, sorting)
                        ]));
                    }
                    else {
                        var k = kwtype.a;
                        return $author$project$Main$viewKeywordDetail_fn(k, model);
                    }
                default:
                    var scale = _v0.a;
                    var sorting = _v0.b;
                    return $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                        $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
                            $mdgriffith$elm_ui$Element$spacing(25)
                        ]), _List_fromArray([
                            $author$project$Main$screenViewOrderSwitch(sorting),
                            $author$project$Main$viewScaleSwitch(scale)
                        ])),
                        $author$project$Main$viewScreenshots_fn(scale, sorting, model)
                    ]));
            }
        }();
        return {
            cy: _List_fromArray([
                $mdgriffith$elm_ui$Element$layoutWith_fn($mdgriffith$elm_ui$Element$layout_a0, _List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$px($elm$core$Basics$floor(model.aK.a5 * 0.9))),
                    $mdgriffith$elm_ui$Element$Font$family(_List_fromArray([
                        $mdgriffith$elm_ui$Element$Font$typeface("Helvetica Neue"),
                        $mdgriffith$elm_ui$Element$Font$sansSerif
                    ])),
                    $mdgriffith$elm_ui$Element$paddingEach({ cE: 25, dc: 15, dt: 15, d2: 10 })
                ]), $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
                ]), _List_fromArray([
                    $author$project$Main$viewNav(model.B),
                    body
                ])))
            ]),
            as: "Research Catalogue - Screenshot Page"
        };
    };
    var $author$project$Main$main = $elm$browser$Browser$application({ c4: $author$project$Main$init, dk: $author$project$Main$UrlChanged, dl: $author$project$Main$LinkClicked, dN: $author$project$Main$subscriptions, d6: $author$project$Main$update, B: $author$project$Main$view });
    _Platform_export({ "Main": { "init": $author$project$Main$main(_Json_andThen_fn(function (width) {
                return _Json_andThen_fn(function (height) {
                    return $elm$json$Json$Decode$succeed({ aU: height, a6: width });
                }, _Json_decodeField_fn("height", $elm$json$Json$Decode$int));
            }, _Json_decodeField_fn("width", $elm$json$Json$Decode$int)))(0) } });
}(this));
