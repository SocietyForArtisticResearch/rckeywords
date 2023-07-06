(function (scope) {
    "use strict";
    function $$Record1(ca, co, cJ, cM, ax, br, bu, dl, aB, dX, dZ) {
        this.ca = ca;
        this.co = co;
        this.cJ = cJ;
        this.cM =
            cM;
        this.ax = ax;
        this.
            br = br;
        this.bu = bu;
        this.dl = dl;
        this.aB = aB;
        this.dX = dX;
        this.dZ = dZ;
    }
    $$Record1.prototype.$c = function () {
        return new $$Record1(this.ca, this.co, this.cJ, this.cM, this.
            ax, this.br, this.bu, this.dl, this.aB, this.dX, this.dZ);
    };
    function $$Record2(aa, aj) {
        this.aa = aa;
        this.aj = aj;
    }
    $$Record2
        .prototype.$c = function () {
        return new $$Record2(this
            .aa, this.aj);
    };
    function $$Record3(bu, aA, aU) {
        this.bu = bu;
        this.aA = aA;
        this.aU = aU;
    }
    $$Record3.prototype.$c = function () {
        return new $$Record3(this.bu, this.aA, this.aU);
    };
    function $$Record4(_, D) {
        this._ = _;
        this.D = D;
    }
    $$Record4.prototype.$c = function () {
        return new $$Record4(this._, this.D);
    };
    function $$update__aa__aj(obj, aa, aj) {
        var $r = obj.$c();
        $r.aa = aa;
        $r.aj = aj;
        return $r;
    }
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
        if (region.aX.ai === region.ba.ai) {
            return "on line " + region.aX.ai;
        }
        return "on lines " + region.aX.ai + " through " + region.ba.ai;
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
        return _Platform_initialize(flagDecoder, args, impl.c1, impl.d2, impl.dI, function () { return function () { }; });
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
    var _Http_toTask_fn = function (router, toTask, request) {
        return _Scheduler_binding(function (callback) {
            function done(response) {
                callback(toTask(request.cR.a(response)));
            }
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("error", function () { done($elm$http$Http$NetworkError_); });
            xhr.addEventListener("timeout", function () { done($elm$http$Http$Timeout_); });
            xhr.addEventListener("load", function () { done(_Http_toResponse(request.cR.b, xhr)); });
            $elm$core$Maybe$isJust(request.bY) && _Http_track(router, xhr, request.bY.a);
            try {
                xhr.open(request.db, request.d3, true);
            }
            catch (e) {
                return done($elm$http$Http$BadUrl_(request.d3));
            }
            _Http_configureRequest(xhr, request);
            request.ct.a && xhr.setRequestHeader("Content-Type", request.ct.a);
            xhr.send(request.ct.b);
            return function () { xhr.c = true; xhr.abort(); };
        });
    }, _Http_toTask = F3(_Http_toTask_fn);
    function _Http_configureRequest(xhr, request) {
        for (var headers = request.bh; headers.b; headers = headers.b) {
            xhr.setRequestHeader(headers.a.a, headers.a.b);
        }
        xhr.timeout = request.dY.a || 0;
        xhr.responseType = request.cR.d;
        xhr.withCredentials = request.ck;
    }
    function _Http_toResponse(toBody, xhr) {
        return A2(200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_, _Http_toMetadata(xhr), toBody(xhr.response));
    }
    function _Http_toMetadata(xhr) {
        return {
            d3: xhr.responseURL,
            dC: xhr.status,
            dD: xhr.statusText,
            bh: _Http_parseHeaders(xhr.getAllResponseHeaders())
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
                dv: event.loaded,
                bU: event.total
            }))));
        });
        xhr.addEventListener("progress", function (event) {
            if (xhr.c) {
                return;
            }
            _Scheduler_rawSpawn(_Platform_sendToSelf_fn(router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
                dm: event.loaded,
                bU: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
            }))));
        });
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
    var $author$project$Worker$LoadData = function (a) {
        return { $: 0, a: a };
    };
    var $elm$core$Basics$identity = function (x) {
        return x;
    };
    var $author$project$Research$Author = $elm$core$Basics$identity;
    var $author$project$Research$InProgress = 0;
    var $author$project$Research$Published = 1;
    var $author$project$Research$Research = function (id) {
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
                                                return (new $$Record1(_abstract, author, created, defaultPage, id, issueId, keywords, publication, publicationStatus, thumbnail, title));
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
    var $author$project$Research$Undecided = 2;
    var $elm$core$Basics$apR_fn = function (x, f) {
        return f(x);
    }, $elm$core$Basics$apR = F2($elm$core$Basics$apR_fn);
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
        if (!builder.g) {
            return $elm$core$Array$Array_elm_builtin_fn($elm$core$Elm$JsArray$length(builder.j), $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, builder.j);
        }
        else {
            var treeLen = builder.g * $elm$core$Array$branchFactor;
            var depth = $elm$core$Basics$floor($elm$core$Basics$logBase_fn($elm$core$Array$branchFactor, treeLen - 1));
            var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.k) : builder.k;
            var tree = $elm$core$Array$treeFromBuilder_fn(correctNodeList, builder.g);
            return $elm$core$Array$Array_elm_builtin_fn($elm$core$Elm$JsArray$length(builder.j) + treeLen, $elm$core$Basics$max_fn(5, depth * $elm$core$Array$shiftStep), tree, builder.j);
        }
    }, $elm$core$Array$builderToArray = F2($elm$core$Array$builderToArray_fn);
    var $elm$core$Basics$idiv = _Basics_idiv;
    var $elm$core$Basics$lt = _Utils_lt;
    var $elm$core$Array$initializeHelp_fn = function (fn, fromIndex, len, nodeList, tail) {
        initializeHelp: while (true) {
            if (fromIndex < 0) {
                return $elm$core$Array$builderToArray_fn(false, { k: nodeList, g: (len / $elm$core$Array$branchFactor) | 0, j: tail });
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
    var $elm$json$Json$Decode$map2 = _Json_map2;
    var $elm_community$json_extra$Json$Decode$Extra$andMap_a0 = $elm$core$Basics$apR, $elm_community$json_extra$Json$Decode$Extra$andMap = $elm$json$Json$Decode$map2($elm_community$json_extra$Json$Decode$Extra$andMap_a0);
    var $author$project$Research$calcStatus = function (research) {
        var _v0 = research.aB;
        if (!_v0) {
            return 0;
        }
        else {
            var _v1 = research.br;
            if (!_v1.$) {
                return 1;
            }
            else {
                return 1;
            }
        }
    };
    var $elm$json$Json$Decode$field = _Json_decodeField;
    var $elm$json$Json$Decode$int = _Json_decodeInt;
    var $elm$json$Json$Decode$list = _Json_decodeList;
    var $elm$json$Json$Decode$map = _Json_map1;
    var $elm$json$Json$Decode$oneOf = _Json_oneOf;
    var $elm$json$Json$Decode$succeed = _Json_succeed;
    var $elm$json$Json$Decode$maybe = function (decoder) {
        return $elm$json$Json$Decode$oneOf(_List_fromArray([
            _Json_map1_fn($elm$core$Maybe$Just, decoder),
            $elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
        ]));
    };
    var $elm$json$Json$Decode$string = _Json_decodeString;
    var $author$project$Research$decoder = function () {
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
            return function () {
                var $r = research.$c();
                $r.aB = $author$project$Research$calcStatus(research);
                return $r;
            }();
        };
        var author = function () {
            var makeAuthor = F2(function (id, name) {
                return { ax: id, D: name };
            });
            return _Json_map2_fn(makeAuthor, _Json_decodeField_fn("id", $elm$json$Json$Decode$int), _Json_decodeField_fn("name", $elm$json$Json$Decode$string));
        }();
        return _Json_map1_fn(researchPublicationStatus, _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("default-page", $elm$json$Json$Decode$string), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, $elm$json$Json$Decode$maybe(_Json_decodeField_fn("abstract", $elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, $elm$json$Json$Decode$maybe(_Json_decodeField_fn("thumb", $elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, $elm$json$Json$Decode$maybe(_Json_decodeField_fn("published", $elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_map1_fn(statusFromString, _Json_decodeField_fn("status", $elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, $elm$json$Json$Decode$maybe(_Json_decodeField_fn("issue", _Json_decodeField_fn("id", $elm$json$Json$Decode$int))), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("author", author), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("created", $elm$json$Json$Decode$string), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("keywords", $elm$json$Json$Decode$list($elm$json$Json$Decode$string)), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("title", $elm$json$Json$Decode$string), _Json_map2_fn($elm_community$json_extra$Json$Decode$Extra$andMap_a0, _Json_decodeField_fn("id", $elm$json$Json$Decode$int), $elm$json$Json$Decode$succeed($author$project$Research$Research)))))))))))));
    }();
    var $author$project$Research$KeywordSet = $elm$core$Basics$identity;
    var $elm$core$Dict$RBEmpty_elm_builtin = { $: -2 };
    var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
    var $author$project$Research$emptyKeywordSet = (new $$Record2($elm$core$Dict$empty, _List_Nil));
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
                return $elm$core$Result$Err($elm$http$Http$BadStatus(metadata.dC));
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
        return { bM: reqs, bW: subs };
    }, $elm$http$Http$State = F2($elm$http$Http$State_fn);
    var $elm$core$Task$succeed = _Scheduler_succeed;
    var $elm$http$Http$init = $elm$core$Task$succeed($elm$http$Http$State_fn($elm$core$Dict$empty, _List_Nil));
    var $elm$core$Task$andThen = _Scheduler_andThen;
    var $elm$core$Process$kill = _Scheduler_kill;
    var $elm$core$Platform$sendToApp = _Platform_sendToApp;
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
                        var _v4 = req.bY;
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
        }, $elm$http$Http$updateReqs_fn(router, cmds, state.bM));
    }, $elm$http$Http$onEffects = F4($elm$http$Http$onEffects_fn);
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
    var $elm$http$Http$onSelfMsg_fn = function (router, _v0, state) {
        var tracker = _v0.a;
        var progress = _v0.b;
        return _Scheduler_andThen_fn(function (_v1) {
            return $elm$core$Task$succeed(state);
        }, $elm$core$Task$sequence($elm$core$List$filterMap_fn(A3($elm$http$Http$maybeSend, router, tracker, progress), state.bW)));
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
                ck: r.ck,
                ct: r.ct,
                cR: _Http_mapExpect_fn(func, r.cR),
                bh: r.bh,
                db: r.db,
                dY: r.dY,
                bY: r.bY,
                d3: r.d3
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
        return $elm$http$Http$command($elm$http$Http$Request({ ck: false, ct: r.ct, cR: r.cR, bh: r.bh, db: r.db, dY: r.dY, bY: r.bY, d3: r.d3 }));
    };
    var $elm$http$Http$get = function (r) {
        return $elm$http$Http$request({ ct: $elm$http$Http$emptyBody, cR: r.cR, bh: _List_Nil, db: "GET", dY: $elm$core$Maybe$Nothing, bY: $elm$core$Maybe$Nothing, d3: r.d3 });
    };
    var $author$project$Worker$init = function (_v0) {
        return _Utils_Tuple2((new $$Record3($author$project$Research$emptyKeywordSet, _List_Nil, _List_Nil)), $elm$http$Http$get({
            cR: $elm$http$Http$expectJson_fn($author$project$Worker$LoadData, $elm$json$Json$Decode$list($author$project$Research$decoder)),
            d3: "/internal_research.json"
        }));
    };
    var $author$project$Worker$SearchKeyword = function (a) {
        return { $: 1, a: a };
    };
    var $elm$json$Json$Decode$andThen = _Json_andThen;
    var $elm$json$Json$Decode$index = _Json_decodeIndex;
    var $author$project$Worker$searchKeyword = _Platform_incomingPort("searchKeyword", _Json_andThen_fn(function (_v0) {
        return _Json_andThen_fn(function (_v1) {
            return $elm$json$Json$Decode$succeed(_Utils_Tuple2(_v0, _v1));
        }, _Json_decodeIndex_fn(1, $elm$json$Json$Decode$string));
    }, _Json_decodeIndex_fn(0, $elm$json$Json$Decode$string)));
    var $author$project$Worker$subscriptions = function (_v0) {
        return $author$project$Worker$searchKeyword($author$project$Worker$SearchKeyword);
    };
    var $author$project$Worker$LoadError = $elm$core$Basics$identity;
    var $elm$json$Json$Encode$int = _Json_wrap;
    var $elm$json$Json$Encode$object = function (pairs) {
        return _Json_wrap($elm$core$List$foldl_fn_unwrapped(function (_v0, obj) {
            var k = _v0.a;
            var v = _v0.b;
            return _Json_addField_fn(k, v, obj);
        }, _Json_emptyObject(0), pairs));
    };
    var $elm$json$Json$Encode$string = _Json_wrap;
    var $author$project$Research$encodeKeyword = function (_v0) {
        var kw = _v0;
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("name", $elm$json$Json$Encode$string(kw.D)),
            _Utils_Tuple2("count", $elm$json$Json$Encode$int(kw._))
        ]));
    };
    var $elm$json$Json$Encode$list_fn = function (func, entries) {
        return _Json_wrap($elm$core$List$foldl_fn(_Json_addEntry(func), _Json_emptyArray(0), entries));
    }, $elm$json$Json$Encode$list = F2($elm$json$Json$Encode$list_fn);
    var $author$project$Worker$encodeKeywords_a0 = $author$project$Research$encodeKeyword, $author$project$Worker$encodeKeywords = $elm$json$Json$Encode$list($author$project$Worker$encodeKeywords_a0);
    var $elm$core$String$contains = _String_contains;
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
    var $author$project$Research$getCount = function (_v0) {
        var kw = _v0;
        return kw._;
    };
    var $author$project$Research$kwName = function (_v0) {
        var kw = _v0;
        return kw.D;
    };
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
    var $elm$core$Bitwise$and = _Bitwise_and;
    var $elm$core$Basics$negate = function (n) {
        return -n;
    };
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
    var $elm$core$Bitwise$or = _Bitwise_or;
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
    var $elm$random$Random$map_fn = function (func, _v0) {
        var genA = _v0;
        return function (seed0) {
            var _v1 = genA(seed0);
            var a = _v1.a;
            var seed1 = _v1.b;
            return _Utils_Tuple2(func(a), seed1);
        };
    }, $elm$random$Random$map = F2($elm$random$Random$map_fn);
    var $elm$core$Tuple$second = function (_v0) {
        var y = _v0.b;
        return y;
    };
    var $elm$core$List$sortBy = _List_sortBy;
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
    var $author$project$Worker$shuffleWithSeed_fn = function (seed, lst) {
        return $elm$random$Random$step_fn($elm_community$random_extra$Random$List$shuffle(lst), $elm$random$Random$initialSeed(seed)).a;
    }, $author$project$Worker$shuffleWithSeed = F2($author$project$Worker$shuffleWithSeed_fn);
    var $author$project$Research$toList = function (_v0) {
        var kwSet = _v0;
        return kwSet.aj;
    };
    var $author$project$Worker$findKeywords_fn = function (query, sorting, keywords) {
        var lst = $author$project$Research$toList(keywords);
        var filtered = function () {
            if (query === "") {
                return lst;
            }
            else {
                var nonEmptyQ = query;
                return $elm$core$List$filter_fn(A2($elm$core$Basics$composeR, $author$project$Research$kwName, $elm$core$String$contains(nonEmptyQ)), lst);
            }
        }();
        var ordered = function () {
            switch (sorting) {
                case 0:
                    return $elm$core$List$reverse(_List_sortBy_fn(function (kw) {
                        return $author$project$Research$getCount(kw);
                    }, filtered));
                case 1:
                    return _List_sortBy_fn(function (kw) {
                        return $author$project$Research$kwName(kw);
                    }, filtered);
                default:
                    return $author$project$Worker$shuffleWithSeed_fn(42, filtered);
            }
        }();
        return ordered;
    }, $author$project$Worker$findKeywords = F3($author$project$Worker$findKeywords_fn);
    var $author$project$Research$Keyword = $elm$core$Basics$identity;
    var $author$project$Research$newKey = function (str) {
        return (new $$Record4(1, str));
    };
    var $author$project$Research$use = function (_v0) {
        var kw = _v0;
        return function () {
            var $r = kw.$c();
            $r._ = kw._ + 1;
            return $r;
        }();
    };
    var $elm$core$Dict$values = function (dict) {
        return $elm$core$Dict$foldr_fn_unwrapped(function (key, value, valueList) {
            return _List_Cons(value, valueList);
        }, _List_Nil, dict);
    };
    var $author$project$Research$insert_fn = function (k, _v0) {
        var set = _v0;
        var dict = set.aa;
        var result = $elm$core$Dict$get_fn(k, dict);
        if (!result.$) {
            var kw = result.a;
            var used = $author$project$Research$use(kw);
            var newDict = $elm$core$Dict$insert_fn(kw.D, used, dict);
            return $$update__aa__aj(set, newDict, $elm$core$Dict$values(newDict));
        }
        else {
            var _new = $author$project$Research$newKey(k);
            return $$update__aa__aj(set, $elm$core$Dict$insert_fn(k, _new, dict), _List_Cons(_new, set.aj));
        }
    }, $author$project$Research$insert = F2($author$project$Research$insert_fn);
    var $author$project$Research$keywordSet = function (researchlist) {
        return $elm$core$List$foldr_fn(F2(function (research, set) {
            return $elm$core$List$foldr_fn($author$project$Research$insert, set, research.bu);
        }), $author$project$Research$emptyKeywordSet, researchlist);
    };
    var $elm$core$Platform$Cmd$batch = _Platform_batch;
    var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
    var $author$project$Worker$problemize_fn = function (p, m) {
        return function () {
            var $r = m.$c();
            $r.aA = _List_Cons(p, m.aA);
            return $r;
        }();
    }, $author$project$Worker$problemize = F2($author$project$Worker$problemize_fn);
    var $author$project$Worker$returnResults = _Platform_outgoingPort("returnResults", $elm$core$Basics$identity);
    var $author$project$Research$Alphabetical = 1;
    var $author$project$Research$ByUse = 0;
    var $author$project$Research$RandomKeyword = 2;
    var $author$project$Research$sortingFromString = function (str) {
        switch (str) {
            case "byuse":
                return 0;
            case "alphabetical":
                return 1;
            case "randomkeyword":
                return 2;
            default:
                return 0;
        }
    };
    var $author$project$Worker$update_fn = function (msg, model) {
        switch (msg.$) {
            case 2:
                var lst = msg.a;
                return _Utils_Tuple2(model, $author$project$Worker$returnResults($elm$json$Json$Encode$list_fn($author$project$Worker$encodeKeywords_a0, lst)));
            case 0:
                var res = msg.a;
                if (!res.$) {
                    var data = res.a;
                    return _Utils_Tuple2(function () {
                        var $r = model.$c();
                        $r.aU = data;
                        $r.bu = $author$project$Research$keywordSet(data);
                        return $r;
                    }(), $elm$core$Platform$Cmd$none);
                }
                else {
                    var e = res.a;
                    return _Utils_Tuple2($author$project$Worker$problemize_fn(e, model), $elm$core$Platform$Cmd$none);
                }
            default:
                var _v2 = msg.a;
                var str = _v2.a;
                var sorting = _v2.b;
                var sort = $author$project$Research$sortingFromString(sorting);
                var result = $author$project$Worker$findKeywords_fn(str, sort, model.bu);
                return _Utils_Tuple2(model, $author$project$Worker$returnResults($elm$json$Json$Encode$list_fn($author$project$Worker$encodeKeywords_a0, result)));
        }
    }, $author$project$Worker$update = F2($author$project$Worker$update_fn);
    var $elm$core$Platform$worker = _Platform_worker;
    var $author$project$Worker$main_a0 = { c1: $author$project$Worker$init, dI: $author$project$Worker$subscriptions, d2: $author$project$Worker$update }, $author$project$Worker$main = $elm$core$Platform$worker($author$project$Worker$main_a0);
    _Platform_export({ "Worker": { "init": $author$project$Worker$main($elm$json$Json$Decode$succeed(0))(0) } });
}(this));
