(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
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
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
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

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
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

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
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


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = {$: 'GT'};
var $author$project$Worker$LoadData = function (a) {
	return {$: 'LoadData', a: a};
};
var $author$project$Worker$Loading = {$: 'Loading'};
var $author$project$Research$InProgress = {$: 'InProgress'};
var $author$project$Research$Published = {$: 'Published'};
var $author$project$Research$Undecided = {$: 'Undecided'};
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
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
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm_community$json_extra$Json$Decode$Extra$andMap = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $author$project$Research$Author = function (a) {
	return {$: 'Author', a: a};
};
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Research$author = function () {
	var makeAuthor = F2(
		function (id, name) {
			return $author$project$Research$Author(
				{id: id, name: name});
		});
	return A3(
		$elm$json$Json$Decode$map2,
		makeAuthor,
		A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string));
}();
var $author$project$Research$calcStatus = function (research) {
	var _v0 = research.publicationStatus;
	if (_v0.$ === 'InProgress') {
		return $author$project$Research$InProgress;
	} else {
		return $author$project$Research$Published;
	}
};
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $author$project$RichAbstract$AbsKw = function (a) {
	return {$: 'AbsKw', a: a};
};
var $author$project$RichAbstract$AbsText = function (a) {
	return {$: 'AbsText', a: a};
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$String$slice = _String_slice;
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 'ExpectingKeyword', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return (_Utils_eq(newOffset, -1) || (0 <= A3(
				$elm$parser$Parser$Advanced$isSubChar,
				function (c) {
					return $elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('_'));
				},
				newOffset,
				s.src))) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $author$project$RichAbstract$chompExactlyFast = F2(
	function (n, isGood) {
		return A2(
			$elm$parser$Parser$loop,
			n,
			function (i) {
				return (i <= 0) ? $elm$parser$Parser$succeed(
					$elm$parser$Parser$Done(_Utils_Tuple0)) : A2(
					$elm$parser$Parser$andThen,
					function (_v0) {
						return $elm$parser$Parser$succeed(
							$elm$parser$Parser$Loop(i - 1));
					},
					$elm$parser$Parser$chompIf(isGood));
			});
	});
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$core$String$length = _String_length;
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$RichAbstract$parseOrEnd = function (_v0) {
	return A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(_Utils_Tuple0),
				$elm$parser$Parser$chompIf(
					function (c) {
						return !_Utils_eq(
							c,
							_Utils_chr('}'));
					})),
			$elm$parser$Parser$chompWhile(
				function (c) {
					return !_Utils_eq(
						c,
						_Utils_chr('}'));
				})),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$author$project$RichAbstract$chompExactlyFast,
					2,
					function (c) {
						return _Utils_eq(
							c,
							_Utils_chr('}'));
					}),
					$elm$parser$Parser$end,
					$elm$parser$Parser$lazy($author$project$RichAbstract$parseOrEnd)
				])));
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $author$project$RichAbstract$parseKeyword = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(
			function (str) {
				return A3($elm$core$String$slice, 0, -2, str);
			}),
		$elm$parser$Parser$token('{{')),
	$elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$map,
				$elm$core$Basics$always(''),
				$elm$parser$Parser$keyword('}}')),
				$elm$parser$Parser$getChompedString(
				$author$project$RichAbstract$parseOrEnd(_Utils_Tuple0))
			])));
var $author$project$RichAbstract$notCurly = function (c) {
	return !_Utils_eq(
		c,
		_Utils_chr('{'));
};
var $author$project$RichAbstract$parseUntilKeyword = $elm$parser$Parser$getChompedString(
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(_Utils_Tuple0),
			$elm$parser$Parser$chompIf($author$project$RichAbstract$notCurly)),
		$elm$parser$Parser$chompWhile($author$project$RichAbstract$notCurly)));
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$RichAbstract$theUnhappyCase = function () {
	var secondCurly = A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$symbol('{')),
		A2(
			$elm$parser$Parser$map,
			$author$project$RichAbstract$AbsKw,
			$elm$parser$Parser$getChompedString(
				$author$project$RichAbstract$parseOrEnd(_Utils_Tuple0))));
	var noSecond = A2(
		$elm$parser$Parser$map,
		function (rest) {
			return $author$project$RichAbstract$AbsText('{' + rest);
		},
		$author$project$RichAbstract$parseUntilKeyword);
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$symbol('{')),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					$elm$core$Basics$always(
						$author$project$RichAbstract$AbsText('{')),
					$elm$parser$Parser$end),
					secondCurly,
					noSecond
				])));
}();
var $author$project$RichAbstract$parseBoth = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2($elm$parser$Parser$map, $author$project$RichAbstract$AbsKw, $author$project$RichAbstract$parseKeyword),
			$author$project$RichAbstract$theUnhappyCase,
			A2($elm$parser$Parser$map, $author$project$RichAbstract$AbsText, $author$project$RichAbstract$parseUntilKeyword)
		]));
var $author$project$RichAbstract$abstractParser = function () {
	var helper = function (lst) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (segment) {
						return $elm$parser$Parser$Loop(
							A2($elm$core$List$cons, segment, lst));
					},
					$author$project$RichAbstract$parseBoth),
					$elm$parser$Parser$succeed(
					$elm$parser$Parser$Done(
						$elm$core$List$reverse(lst)))
				]));
	};
	return A2($elm$parser$Parser$loop, _List_Nil, helper);
}();
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$parser$Parser$deadEndsToString = function (deadEnds) {
	return 'TODO deadEndsToString';
};
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $author$project$RichAbstract$decodeAbstract = A2(
	$elm$json$Json$Decode$andThen,
	function (str) {
		var _v0 = A2($elm$parser$Parser$run, $author$project$RichAbstract$abstractParser, str);
		if (_v0.$ === 'Ok') {
			var abs = _v0.a;
			return $elm$json$Json$Decode$succeed(abs);
		} else {
			var e = _v0.a;
			return $elm$json$Json$Decode$fail(
				'abstract with keywords could not be parsed: ' + $elm$parser$Parser$deadEndsToString(e));
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$RichAbstract$decodeAbstractWithKeywords = $author$project$RichAbstract$decodeAbstract;
var $author$project$Screenshots$Exposition = function (a) {
	return {$: 'Exposition', a: a};
};
var $author$project$Screenshots$Weave = function (a) {
	return {$: 'Weave', a: a};
};
var $author$project$Screenshots$Screenshot = function (a) {
	return {$: 'Screenshot', a: a};
};
var $elm$json$Json$Decode$map = _Json_map1;
var $author$project$Screenshots$decodeScreenshot = A2($elm$json$Json$Decode$map, $author$project$Screenshots$Screenshot, $elm$json$Json$Decode$string);
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Screenshots$decodeWeave = A2(
	$elm$json$Json$Decode$map,
	$author$project$Screenshots$Weave,
	$elm$json$Json$Decode$list($author$project$Screenshots$decodeScreenshot));
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
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
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $author$project$Screenshots$decodeExposition = function () {
	var parser = $elm$json$Json$Decode$keyValuePairs($author$project$Screenshots$decodeWeave);
	return A2(
		$elm$json$Json$Decode$andThen,
		function (lst) {
			return $elm$json$Json$Decode$succeed(
				$author$project$Screenshots$Exposition(
					$elm$core$Dict$fromList(lst)));
		},
		parser);
}();
var $author$project$Toc$Weave = F5(
	function (file, page, pageTitle, url, weaveSize) {
		return {file: file, page: page, pageTitle: pageTitle, url: url, weaveSize: weaveSize};
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$Toc$Dimensions = F2(
	function (height, width) {
		return {height: height, width: width};
	});
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $author$project$Toc$decodeDimensions = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$int),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$int),
				$elm$json$Json$Decode$succeed($author$project$Toc$Dimensions))),
			$elm$json$Json$Decode$succeed(
			{height: 1440, width: 1920})
		]));
var $elm$core$String$toInt = _String_toInt;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Toc$decodeWeave = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'weave_size', $author$project$Toc$decodeDimensions),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'page_title', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					$elm$json$Json$Decode$field,
					'page',
					A2(
						$elm$json$Json$Decode$map,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$String$toInt,
							$elm$core$Maybe$withDefault(0)),
						$elm$json$Json$Decode$string)),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, 'file', $elm$json$Json$Decode$string),
					$elm$json$Json$Decode$succeed($author$project$Toc$Weave))))));
var $author$project$Toc$expositionToc = F2(
	function (id, lst) {
		return {expoId: id, weaves: lst};
	});
var $author$project$Toc$decodeToc = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Toc$expositionToc,
	A2($elm$json$Json$Decode$field, 'expoId', $elm$json$Json$Decode$int),
	A2(
		$elm$json$Json$Decode$field,
		'weaves',
		$elm$json$Json$Decode$list($author$project$Toc$decodeWeave)));
var $justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var $justinmimbs$date$Date$fromRataDie = function (rd) {
	return $justinmimbs$date$Date$RD(rd);
};
var $author$project$KeywordString$KeywordString = function (a) {
	return {$: 'KeywordString', a: a};
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$trim = _String_trim;
var $author$project$KeywordString$fromString = function (str) {
	return $author$project$KeywordString$KeywordString(
		$elm$core$String$trim(
			$elm$core$String$toLower(str)));
};
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $author$project$EnrichedResearch$mkResearchWithKeywords = function (id) {
	return function (title) {
		return function (keywords) {
			return function (created) {
				return function (createdDate) {
					return function (authr) {
						return function (issueId) {
							return function (publicationStatus) {
								return function (publication) {
									return function (thumbnail) {
										return function (_abstract) {
											return function (defaultPage) {
												return function (portals) {
													return function (connectedToPortals) {
														return function (abstractWithKw) {
															return function (simpleToc) {
																return function (screenshots) {
																	return {_abstract: _abstract, abstractWithKeywords: abstractWithKw, author: authr, connectedTo: connectedToPortals, created: created, createdDate: createdDate, defaultPage: defaultPage, id: id, issueId: issueId, keywords: keywords, portals: portals, publication: publication, publicationStatus: publicationStatus, screenshots: screenshots, thumbnail: thumbnail, title: title, toc: simpleToc};
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
					};
				};
			};
		};
	};
};
var $author$project$Research$Portal = F3(
	function (id, name, type_) {
		return {id: id, name: name, type_: type_};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Research$Institutional = {$: 'Institutional'};
var $author$project$Research$Journal = {$: 'Journal'};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Research$portalType = function (portalName) {
	var institutional = _List_fromArray(
		['KC Research Portal', 'Stockholm University of the Arts (SKH)', 'University of the Arts Helsinki', 'Norwegian Academy of Music', 'The Danish National School of Performing Arts', 'Rhythmic Music Conservatory Copenhagen', 'Konstfack - University of Arts, Crafts and Design', 'NTNU', 'i2ADS - Research Institute in Art, Design and Society', 'University of Applied Arts Vienna', 'Academy of Creative and Performing Arts', 'International Center for Knowledge in the Arts (Denmark)', 'Inland Norway University of Applied Sciences, The Norwegian Film School', 'Fontys Academy of the Arts (internal)']);
	return A2($elm$core$List$member, portalName, institutional) ? $author$project$Research$Institutional : $author$project$Research$Journal;
};
var $author$project$Research$rcPortalDecoder = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Research$Portal,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$map,
		$author$project$Research$portalType,
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string)));
var $author$project$EnrichedResearch$decoder = function () {
	var statusFromString = function (statusString) {
		switch (statusString) {
			case 'published':
				return $author$project$Research$Published;
			case 'progress':
				return $author$project$Research$InProgress;
			default:
				return $author$project$Research$Undecided;
		}
	};
	var researchPublicationStatus = function (research) {
		return _Utils_update(
			research,
			{
				publicationStatus: $author$project$Research$calcStatus(research)
			});
	};
	return A2(
		$elm$json$Json$Decode$map,
		researchPublicationStatus,
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, 'screenshots', $author$project$Screenshots$decodeExposition)),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				$elm$json$Json$Decode$maybe(
					A2($elm$json$Json$Decode$field, 'toc', $author$project$Toc$decodeToc)),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, 'abstractWithKeywords', $author$project$RichAbstract$decodeAbstractWithKeywords),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							$elm$json$Json$Decode$field,
							'connectedTo',
							$elm$json$Json$Decode$list($author$project$Research$rcPortalDecoder)),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(
								$elm$json$Json$Decode$field,
								'portals',
								$elm$json$Json$Decode$list($author$project$Research$rcPortalDecoder)),
							A2(
								$elm_community$json_extra$Json$Decode$Extra$andMap,
								A2($elm$json$Json$Decode$field, 'defaultPage', $elm$json$Json$Decode$string),
								A2(
									$elm_community$json_extra$Json$Decode$Extra$andMap,
									$elm$json$Json$Decode$maybe(
										A2($elm$json$Json$Decode$field, 'abstract', $elm$json$Json$Decode$string)),
									A2(
										$elm_community$json_extra$Json$Decode$Extra$andMap,
										$elm$json$Json$Decode$maybe(
											A2($elm$json$Json$Decode$field, 'thumbnail', $elm$json$Json$Decode$string)),
										A2(
											$elm_community$json_extra$Json$Decode$Extra$andMap,
											$elm$json$Json$Decode$maybe(
												A2(
													$elm$json$Json$Decode$field,
													'published',
													A2($elm$json$Json$Decode$map, $justinmimbs$date$Date$fromRataDie, $elm$json$Json$Decode$int))),
											A2(
												$elm_community$json_extra$Json$Decode$Extra$andMap,
												A2(
													$elm$json$Json$Decode$map,
													statusFromString,
													A2($elm$json$Json$Decode$field, 'status', $elm$json$Json$Decode$string)),
												A2(
													$elm_community$json_extra$Json$Decode$Extra$andMap,
													$elm$json$Json$Decode$maybe(
														A2(
															$elm$json$Json$Decode$field,
															'issue',
															A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int))),
													A2(
														$elm_community$json_extra$Json$Decode$Extra$andMap,
														A2($elm$json$Json$Decode$field, 'author', $author$project$Research$author),
														A2(
															$elm_community$json_extra$Json$Decode$Extra$andMap,
															A2(
																$elm$json$Json$Decode$field,
																'createdDate',
																A2($elm$json$Json$Decode$map, $justinmimbs$date$Date$fromRataDie, $elm$json$Json$Decode$int)),
															A2(
																$elm_community$json_extra$Json$Decode$Extra$andMap,
																A2($elm$json$Json$Decode$field, 'created', $elm$json$Json$Decode$string),
																A2(
																	$elm_community$json_extra$Json$Decode$Extra$andMap,
																	A2(
																		$elm$json$Json$Decode$map,
																		$elm$core$List$map($author$project$KeywordString$fromString),
																		A2(
																			$elm$json$Json$Decode$field,
																			'keywords',
																			$elm$json$Json$Decode$list($elm$json$Json$Decode$string))),
																	A2(
																		$elm_community$json_extra$Json$Decode$Extra$andMap,
																		A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
																		A2(
																			$elm_community$json_extra$Json$Decode$Extra$andMap,
																			A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
																			$elm$json$Json$Decode$succeed($author$project$EnrichedResearch$mkResearchWithKeywords)))))))))))))))))));
}();
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
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
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
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
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
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
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
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
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{body: $elm$http$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$Worker$init = function (_v0) {
	return _Utils_Tuple2(
		$author$project$Worker$Loading,
		$elm$http$Http$get(
			{
				expect: A2(
					$elm$http$Http$expectJson,
					$author$project$Worker$LoadData,
					$elm$json$Json$Decode$list($author$project$EnrichedResearch$decoder)),
				url: '/enriched.json'
			}));
};
var $author$project$Worker$SearchQuery = function (a) {
	return {$: 'SearchQuery', a: a};
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Worker$searchQuery = _Platform_incomingPort('searchQuery', $elm$json$Json$Decode$value);
var $author$project$Worker$subscriptions = function (_v0) {
	return $author$project$Worker$searchQuery($author$project$Worker$SearchQuery);
};
var $author$project$Queries$AllKeywords = function (a) {
	return {$: 'AllKeywords', a: a};
};
var $author$project$Queries$AllPortals = function (a) {
	return {$: 'AllPortals', a: a};
};
var $author$project$Research$Alphabetical = {$: 'Alphabetical'};
var $author$project$Worker$DecodeError = {$: 'DecodeError'};
var $author$project$Queries$Exposition = function (a) {
	return {$: 'Exposition', a: a};
};
var $author$project$Queries$Keywords = function (a) {
	return {$: 'Keywords', a: a};
};
var $author$project$Worker$LoadError = function (a) {
	return {$: 'LoadError', a: a};
};
var $author$project$Worker$Loaded = function (a) {
	return {$: 'Loaded', a: a};
};
var $author$project$Worker$LoadingWithQuery = F2(
	function (a, b) {
		return {$: 'LoadingWithQuery', a: a, b: b};
	});
var $author$project$Queries$RankedExpositions = function (a) {
	return {$: 'RankedExpositions', a: a};
};
var $author$project$Queries$Unranked = function (a) {
	return {$: 'Unranked', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Worker$debug = _Platform_outgoingPort('debug', $elm$json$Json$Encode$string);
var $author$project$Queries$FindKeywords = F2(
	function (a, b) {
		return {$: 'FindKeywords', a: a, b: b};
	});
var $author$project$Queries$FindResearch = function (a) {
	return {$: 'FindResearch', a: a};
};
var $author$project$Queries$GetAllKeywords = {$: 'GetAllKeywords'};
var $author$project$Queries$GetAllPortals = {$: 'GetAllPortals'};
var $author$project$Queries$GetExposition = function (a) {
	return {$: 'GetExposition', a: a};
};
var $author$project$Queries$Advanced = function (a) {
	return {$: 'Advanced', a: a};
};
var $author$project$Queries$QuickSearch = function (a) {
	return {$: 'QuickSearch', a: a};
};
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm$json$Json$Decode$map8 = _Json_map8;
var $author$project$Queries$publicationFilterOfString = function (str) {
	switch (str) {
		case 'published':
			return $author$project$Research$Published;
		case 'inprogress':
			return $author$project$Research$InProgress;
		default:
			return $author$project$Research$Undecided;
	}
};
var $author$project$Queries$Search = function (a) {
	return {$: 'Search', a: a};
};
var $author$project$Queries$search = F8(
	function (title, author, keywords, _abstract, after, before, portal, publicationStatus) {
		return $author$project$Queries$Search(
			{_abstract: _abstract, after: after, author: author, before: before, keywords: keywords, portal: portal, publicationStatus: publicationStatus, title: title});
	});
var $author$project$Queries$decodeSearch = A9(
	$elm$json$Json$Decode$map8,
	$author$project$Queries$search,
	A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'author', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$map,
		$elm$core$Set$fromList,
		A2(
			$elm$json$Json$Decode$field,
			'keywords',
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string))),
	A2($elm$json$Json$Decode$field, 'abstract', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2(
			$elm$json$Json$Decode$map,
			$justinmimbs$date$Date$fromRataDie,
			A2($elm$json$Json$Decode$field, 'after', $elm$json$Json$Decode$int))),
	$elm$json$Json$Decode$maybe(
		A2(
			$elm$json$Json$Decode$map,
			$justinmimbs$date$Date$fromRataDie,
			A2($elm$json$Json$Decode$field, 'before', $elm$json$Json$Decode$int))),
	A2($elm$json$Json$Decode$field, 'portal', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2(
			$elm$json$Json$Decode$field,
			'publicationStatus',
			A2($elm$json$Json$Decode$map, $author$project$Queries$publicationFilterOfString, $elm$json$Json$Decode$string))));
var $author$project$Queries$decodeExpositionSearch = A2(
	$elm$json$Json$Decode$andThen,
	function (t) {
		switch (t) {
			case 'quick':
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$Queries$QuickSearch,
					A2($elm$json$Json$Decode$field, 'search', $elm$json$Json$Decode$string));
			case 'advanced':
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$Queries$Advanced,
					A2($elm$json$Json$Decode$field, 'search', $author$project$Queries$decodeSearch));
			default:
				return $elm$json$Json$Decode$fail('corrupted json, expected { \"type\" : \"quicksearch\" }');
		}
	},
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
var $author$project$Research$ByUse = {$: 'ByUse'};
var $author$project$Research$RandomKeyword = {$: 'RandomKeyword'};
var $author$project$Queries$decodeKeywordSorting = A2(
	$elm$json$Json$Decode$andThen,
	function (s) {
		switch (s) {
			case 'ByUse':
				return $elm$json$Json$Decode$succeed($author$project$Research$ByUse);
			case 'Random':
				return $elm$json$Json$Decode$succeed($author$project$Research$RandomKeyword);
			case 'Alphabetical':
				return $elm$json$Json$Decode$succeed($author$project$Research$Alphabetical);
			default:
				return $elm$json$Json$Decode$fail('Unknown keyword sorting');
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Queries$decodeSearchQuery = A2(
	$elm$json$Json$Decode$andThen,
	function (t) {
		switch (t) {
			case 'FindKeywords':
				return A3(
					$elm$json$Json$Decode$map2,
					$author$project$Queries$FindKeywords,
					A2(
						$elm$json$Json$Decode$map,
						$elm$core$String$toLower,
						A2($elm$json$Json$Decode$field, 'keywords', $elm$json$Json$Decode$string)),
					A2($elm$json$Json$Decode$field, 'sorting', $author$project$Queries$decodeKeywordSorting));
			case 'FindResearch':
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$Queries$FindResearch,
					A2($elm$json$Json$Decode$field, 'search', $author$project$Queries$decodeExpositionSearch));
			case 'GetAllKeywords':
				return $elm$json$Json$Decode$succeed($author$project$Queries$GetAllKeywords);
			case 'GetAllPortals':
				return $elm$json$Json$Decode$succeed($author$project$Queries$GetAllPortals);
			case 'GetExposition':
				return A2(
					$elm$json$Json$Decode$map,
					function (id) {
						return $author$project$Queries$GetExposition(id);
					},
					A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int));
			default:
				return $elm$json$Json$Decode$fail('Unknown query type');
		}
	},
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $author$project$Research$KeywordSet = function (a) {
	return {$: 'KeywordSet', a: a};
};
var $author$project$Research$emptyKeywordSet = $author$project$Research$KeywordSet(
	{dict: $elm$core$Dict$empty, list: _List_Nil});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $author$project$RichAbstract$encodeSpanAsString = function (span) {
	if (span.$ === 'AbsKw') {
		var kw = span.a;
		return '{{' + (kw + '}}');
	} else {
		var txt = span.a;
		return txt;
	}
};
var $author$project$RichAbstract$asString = function (_abstract) {
	return $elm$core$String$concat(
		A2($elm$core$List$map, $author$project$RichAbstract$encodeSpanAsString, _abstract));
};
var $author$project$RichAbstract$encodeAbstract = function (_abstract) {
	return $elm$json$Json$Encode$string(
		$author$project$RichAbstract$asString(_abstract));
};
var $author$project$Research$getAuthorId = function (_v0) {
	var a = _v0.a;
	return a.id;
};
var $author$project$Research$getName = function (_v0) {
	var data = _v0.a;
	return data.name;
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Research$encodeAuthor = function (au) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(
					$author$project$Research$getName(au))),
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(
					$author$project$Research$getAuthorId(au)))
			]));
};
var $author$project$Screenshots$encodeScreenshot = function (_v0) {
	var url = _v0.a;
	return $elm$json$Json$Encode$string(url);
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$Screenshots$encodeExposition = function (_v0) {
	var dict = _v0.a;
	var encodeWeave = function (_v2) {
		var ws = _v2.a;
		return A2($elm$json$Json$Encode$list, $author$project$Screenshots$encodeScreenshot, ws);
	};
	return $elm$json$Json$Encode$object(
		A2(
			$elm$core$List$map,
			function (_v1) {
				var k = _v1.a;
				var weave = _v1.b;
				return _Utils_Tuple2(
					k,
					encodeWeave(weave));
			},
			$elm$core$Dict$toList(dict)));
};
var $author$project$Research$portalTypeToString = function (portaltype) {
	switch (portaltype.$) {
		case 'Institutional':
			return 'Institutional';
		case 'Journal':
			return 'Journal';
		case 'Project':
			return 'Project';
		default:
			return 'MainPortal';
	}
};
var $author$project$Research$encodePortal = function (portal) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(portal.id)),
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(portal.name)),
				_Utils_Tuple2(
				'type_',
				$elm$json$Json$Encode$string(
					$author$project$Research$portalTypeToString(portal.type_)))
			]));
};
var $author$project$Toc$encodeDimensions = function (d) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'height',
				$elm$json$Json$Encode$int(d.height)),
				_Utils_Tuple2(
				'width',
				$elm$json$Json$Encode$int(d.width))
			]));
};
var $author$project$Toc$encodeWeave = function (weave) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'file',
				$elm$json$Json$Encode$string(weave.file)),
				_Utils_Tuple2(
				'page',
				$elm$json$Json$Encode$int(weave.page)),
				_Utils_Tuple2(
				'page_title',
				$elm$json$Json$Encode$string(weave.pageTitle)),
				_Utils_Tuple2(
				'url',
				$elm$json$Json$Encode$string(weave.url)),
				_Utils_Tuple2(
				'weave_size',
				$author$project$Toc$encodeDimensions(weave.weaveSize))
			]));
};
var $author$project$Toc$encodeToc = function (expToc) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'expoId',
				$elm$json$Json$Encode$int(expToc.expoId)),
				_Utils_Tuple2(
				'weaves',
				A2($elm$json$Json$Encode$list, $author$project$Toc$encodeWeave, expToc.weaves))
			]));
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Research$publicationstatus = function (status) {
	return $elm$json$Json$Encode$string(
		function () {
			switch (status.$) {
				case 'InProgress':
					return 'inprogress';
				case 'Published':
					return 'published';
				default:
					return 'undecided';
			}
		}());
};
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0.a;
	return rd;
};
var $author$project$KeywordString$toString = function (_v0) {
	var k = _v0.a;
	return k;
};
var $author$project$EnrichedResearch$encodeResearchWithKeywords = function (exp) {
	var toc = A2(
		$elm$core$Maybe$map,
		function (t) {
			return _Utils_Tuple2(
				'toc',
				$author$project$Toc$encodeToc(t));
		},
		exp.toc);
	var string = $elm$json$Json$Encode$string;
	var thumbnail = A2(
		$elm$core$Maybe$map,
		function (t) {
			return _Utils_Tuple2(
				'thumbnail',
				string(t));
		},
		exp.thumbnail);
	var screenshots = A2(
		$elm$core$Maybe$map,
		function (s) {
			return _Utils_Tuple2(
				'screenshots',
				$author$project$Screenshots$encodeExposition(s));
		},
		exp.screenshots);
	var maybeAppend = F2(
		function (x, xs) {
			if (x.$ === 'Just') {
				var v = x.a;
				return A2($elm$core$List$cons, v, xs);
			} else {
				return xs;
			}
		});
	var list = $elm$json$Json$Encode$list;
	var _int = $elm$json$Json$Encode$int;
	var issueId = A2(
		$elm$core$Maybe$map,
		function (id) {
			return _Utils_Tuple2(
				'id',
				_int(id));
		},
		exp.issueId);
	var publication = A2(
		$elm$core$Maybe$map,
		function (p) {
			return _Utils_Tuple2(
				'published',
				_int(
					$justinmimbs$date$Date$toRataDie(p)));
		},
		exp.publication);
	var createdDate = $elm$json$Json$Encode$int(
		$justinmimbs$date$Date$toRataDie(exp.createdDate));
	var _abstract = A2(
		$elm$core$Maybe$map,
		function (a) {
			return _Utils_Tuple2(
				'abstract',
				string(a));
		},
		exp._abstract);
	return $elm$json$Json$Encode$object(
		A2(
			maybeAppend,
			screenshots,
			A2(
				maybeAppend,
				toc,
				A2(
					maybeAppend,
					_abstract,
					A2(
						maybeAppend,
						thumbnail,
						A2(
							maybeAppend,
							publication,
							A2(
								maybeAppend,
								issueId,
								_List_fromArray(
									[
										_Utils_Tuple2(
										'type',
										string('exposition')),
										_Utils_Tuple2(
										'id',
										_int(exp.id)),
										_Utils_Tuple2(
										'created',
										string(exp.created)),
										_Utils_Tuple2('createdDate', createdDate),
										_Utils_Tuple2(
										'title',
										string(exp.title)),
										_Utils_Tuple2(
										'keywords',
										A2(
											list,
											string,
											A2($elm$core$List$map, $author$project$KeywordString$toString, exp.keywords))),
										_Utils_Tuple2(
										'author',
										$author$project$Research$encodeAuthor(exp.author)),
										_Utils_Tuple2(
										'status',
										$author$project$Research$publicationstatus(exp.publicationStatus)),
										_Utils_Tuple2(
										'defaultPage',
										string(exp.defaultPage)),
										_Utils_Tuple2(
										'portals',
										A2(list, $author$project$Research$encodePortal, exp.portals)),
										_Utils_Tuple2(
										'connectedTo',
										A2(list, $author$project$Research$encodePortal, exp.portals)),
										_Utils_Tuple2(
										'abstractWithKeywords',
										$author$project$RichAbstract$encodeAbstract(exp.abstractWithKeywords))
									]))))))));
};
var $author$project$EnrichedResearch$encodeExpositionResult = function (exp) {
	if (exp.$ === 'Ok') {
		var e = exp.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'Ok',
					$author$project$EnrichedResearch$encodeResearchWithKeywords(e))
				]));
	} else {
		var error = exp.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'Err',
					$elm$json$Json$Encode$string(error))
				]));
	}
};
var $author$project$Research$encodeKeyword = function (_v0) {
	var kw = _v0.a;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('keyword')),
				_Utils_Tuple2(
				'count',
				$elm$json$Json$Encode$int(kw.count)),
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(kw.name))
			]));
};
var $author$project$Queries$encodeRanked = F2(
	function (encoder, result) {
		if (result.$ === 'RankedResult') {
			var lst = result.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'rankedResult',
						A2(
							$elm$json$Json$Encode$list,
							function (_v1) {
								var score = _v1.a;
								var value = _v1.b;
								return $elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'score',
											$elm$json$Json$Encode$int(score)),
											_Utils_Tuple2(
											'value',
											encoder(value))
										]));
							},
							lst))
					]));
		} else {
			var lst = result.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'unranked',
						A2($elm$json$Json$Encode$list, encoder, lst))
					]));
		}
	});
var $author$project$Queries$encodeSearchResult = function (result) {
	switch (result.$) {
		case 'RankedExpositions':
			var exps = result.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('ranked-expositions')),
						_Utils_Tuple2(
						'expositions',
						A2($author$project$Queries$encodeRanked, $author$project$EnrichedResearch$encodeResearchWithKeywords, exps))
					]));
		case 'Keywords':
			var kws = result.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('keywords')),
						_Utils_Tuple2(
						'keywords',
						A2($elm$json$Json$Encode$list, $author$project$Research$encodeKeyword, kws))
					]));
		case 'AllKeywords':
			var kws = result.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('allkeywords')),
						_Utils_Tuple2(
						'keywords',
						A2($elm$json$Json$Encode$list, $author$project$Research$encodeKeyword, kws))
					]));
		case 'AllPortals':
			var portals = result.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('allportals')),
						_Utils_Tuple2(
						'portals',
						A2($elm$json$Json$Encode$list, $author$project$Research$encodePortal, portals))
					]));
		default:
			var exp = result.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('exposition')),
						_Utils_Tuple2(
						'exposition',
						$author$project$EnrichedResearch$encodeExpositionResult(exp))
					]));
	}
};
var $author$project$Worker$errorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			var url = error.a;
			return 'The URL ' + (url + ' was invalid');
		case 'Timeout':
			return 'Unable to reach the server, try again';
		case 'NetworkError':
			return 'Unable to reach the server, check your network connection';
		case 'BadStatus':
			switch (error.a) {
				case 500:
					return 'The server had a problem, try again later';
				case 400:
					return 'Verify your information and try again';
				default:
					return 'Unknown error';
			}
		default:
			var errorMessage = error.a;
			return errorMessage;
	}
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Queries$findExpositionWithId = F2(
	function (id, lst) {
		var _v0 = $elm$core$List$head(
			A2(
				$elm$core$List$filter,
				function (r) {
					return _Utils_eq(r.id, id);
				},
				lst));
		if (_v0.$ === 'Just') {
			var exp = _v0.a;
			return $elm$core$Result$Ok(exp);
		} else {
			return $elm$core$Result$Err(
				$elm$core$String$fromInt(id) + ' not found');
		}
	});
var $elm$core$String$contains = _String_contains;
var $author$project$Research$getCount = function (_v0) {
	var kw = _v0.a;
	return kw.count;
};
var $author$project$Research$kwName = function (_v0) {
	var kw = _v0.a;
	return $elm$core$String$toLower(kw.name);
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$random$Random$maxInt = 2147483647;
var $elm$random$Random$minInt = -2147483648;
var $elm_community$random_extra$Random$List$anyInt = A2($elm$random$Random$int, $elm$random$Random$minInt, $elm$random$Random$maxInt);
var $elm$random$Random$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var genA = _v0.a;
		var genB = _v1.a;
		var genC = _v2.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v3 = genA(seed0);
				var a = _v3.a;
				var seed1 = _v3.b;
				var _v4 = genB(seed1);
				var b = _v4.a;
				var seed2 = _v4.b;
				var _v5 = genC(seed2);
				var c = _v5.a;
				var seed3 = _v5.b;
				return _Utils_Tuple2(
					A3(func, a, b, c),
					seed3);
			});
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$independentSeed = $elm$random$Random$Generator(
	function (seed0) {
		var makeIndependentSeed = F3(
			function (state, b, c) {
				return $elm$random$Random$next(
					A2($elm$random$Random$Seed, state, (1 | (b ^ c)) >>> 0));
			});
		var gen = A2($elm$random$Random$int, 0, 4294967295);
		return A2(
			$elm$random$Random$step,
			A4($elm$random$Random$map3, makeIndependentSeed, gen, gen, gen),
			seed0);
	});
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$sortBy = _List_sortBy;
var $elm_community$random_extra$Random$List$shuffle = function (list) {
	return A2(
		$elm$random$Random$map,
		function (independentSeed) {
			return A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2(
					$elm$core$List$sortBy,
					$elm$core$Tuple$second,
					A3(
						$elm$core$List$foldl,
						F2(
							function (item, _v0) {
								var acc = _v0.a;
								var seed = _v0.b;
								var _v1 = A2($elm$random$Random$step, $elm_community$random_extra$Random$List$anyInt, seed);
								var tag = _v1.a;
								var nextSeed = _v1.b;
								return _Utils_Tuple2(
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(item, tag),
										acc),
									nextSeed);
							}),
						_Utils_Tuple2(_List_Nil, independentSeed),
						list).a));
		},
		$elm$random$Random$independentSeed);
};
var $author$project$Worker$shuffleWithSeed = F2(
	function (seed, lst) {
		return A2(
			$elm$random$Random$step,
			$elm_community$random_extra$Random$List$shuffle(lst),
			$elm$random$Random$initialSeed(seed)).a;
	});
var $author$project$Research$toList = function (_v0) {
	var kwSet = _v0.a;
	return kwSet.list;
};
var $author$project$Worker$findKeywords = F3(
	function (query, sorting, keywords) {
		var lst = $author$project$Research$toList(keywords);
		var filtered = function () {
			if (query === '') {
				return lst;
			} else {
				var nonEmptyQ = query;
				return A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeR,
						$author$project$Research$kwName,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$String$toLower,
							$elm$core$String$contains(
								$elm$core$String$toLower(nonEmptyQ)))),
					lst);
			}
		}();
		switch (sorting.$) {
			case 'ByUse':
				return $elm$core$List$reverse(
					A2(
						$elm$core$List$sortBy,
						function (kw) {
							return $author$project$Research$getCount(kw);
						},
						filtered));
			case 'Alphabetical':
				return A2(
					$elm$core$List$sortBy,
					function (kw) {
						return $author$project$Research$kwName(kw);
					},
					filtered);
			default:
				return A2($author$project$Worker$shuffleWithSeed, 42, filtered);
		}
	});
var $author$project$Queries$RankedResult = function (a) {
	return {$: 'RankedResult', a: a};
};
var $author$project$Queries$filterRanked = F2(
	function (f, ranked) {
		if (ranked.$ === 'RankedResult') {
			var lst = ranked.a;
			return $author$project$Queries$RankedResult(
				A2(
					$elm$core$List$filter,
					function (_v1) {
						var r = _v1.b;
						return f(r);
					},
					lst));
		} else {
			var lst = ranked.a;
			return $author$project$Queries$Unranked(
				A2($elm$core$List$filter, f, lst));
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$core$Set$union = F2(
	function (_v0, _v1) {
		var dict1 = _v0.a;
		var dict2 = _v1.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$union, dict1, dict2));
	});
var $author$project$Queries$findResearchWithKeywords = F3(
	function (kw, dict, research) {
		var intersectionOfNonempty = F2(
			function (first, rest) {
				return $elm$core$Set$toList(
					A3($elm$core$List$foldl, $elm$core$Set$union, first, rest));
			});
		var getId = function (exp) {
			return exp.id;
		};
		var findKw = function (k) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				function (s) {
					return A2($elm$core$Dict$get, s, dict);
				}(
					$elm$core$String$toLower(k)));
		};
		var combineResults = function (results) {
			if (!results.b) {
				return _List_Nil;
			} else {
				var x = results.a;
				var xs = results.b;
				return A2(intersectionOfNonempty, x, xs);
			}
		};
		var _v0 = $elm$core$Set$toList(kw);
		if (!_v0.b) {
			return research;
		} else {
			var kws = _v0;
			var ids = combineResults(
				A2(
					$elm$core$List$map,
					function (r) {
						return $elm$core$Set$fromList(
							A2(
								$elm$core$List$map,
								getId,
								findKw(r)));
					},
					kws));
			return A2(
				$author$project$Queries$filterRanked,
				function (exp) {
					return A2($elm$core$List$member, exp.id, ids);
				},
				research);
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return $elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2($elm$core$List$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2($elm$core$List$cons, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2($elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$uniqueBy = F2(
	function (f, list) {
		return A4($elm_community$list_extra$List$Extra$uniqueHelp, f, _List_Nil, list, _List_Nil);
	});
var $author$project$Research$getAllPortals = function (lst) {
	return A2(
		$elm_community$list_extra$List$Extra$uniqueBy,
		function (p) {
			return p.id;
		},
		A2(
			$elm$core$List$concatMap,
			function ($) {
				return $.portals;
			},
			lst));
};
var $author$project$Queries$getKeywords = function (s) {
	if (s.$ === 'QuickSearch') {
		return $elm$core$Set$empty;
	} else {
		var advancedSearch = s.a.a;
		return advancedSearch.keywords;
	}
};
var $author$project$Research$Keyword = function (a) {
	return {$: 'Keyword', a: a};
};
var $author$project$Research$newKey = function (str) {
	return $author$project$Research$Keyword(
		{
			count: 1,
			name: $elm$core$String$toLower(str)
		});
};
var $author$project$Research$use = function (_v0) {
	var kw = _v0.a;
	return $author$project$Research$Keyword(
		_Utils_update(
			kw,
			{count: kw.count + 1}));
};
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Research$insert = F2(
	function (k, _v0) {
		var set = _v0.a;
		var klower = $author$project$KeywordString$toString(k);
		var dict = set.dict;
		var result = A2($elm$core$Dict$get, klower, dict);
		if (result.$ === 'Just') {
			var kw = result.a.a;
			var used = $author$project$Research$use(
				$author$project$Research$Keyword(kw));
			var newDict = A3(
				$elm$core$Dict$insert,
				$elm$core$String$toLower(kw.name),
				used,
				dict);
			return $author$project$Research$KeywordSet(
				_Utils_update(
					set,
					{
						dict: newDict,
						list: $elm$core$Dict$values(newDict)
					}));
		} else {
			var _new = $author$project$Research$newKey(klower);
			return $author$project$Research$KeywordSet(
				_Utils_update(
					set,
					{
						dict: A3($elm$core$Dict$insert, klower, _new, dict),
						list: A2($elm$core$List$cons, _new, set.list)
					}));
		}
	});
var $author$project$EnrichedResearch$keywordSet = function (researchlist) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (research, set) {
				return A3($elm$core$List$foldr, $author$project$Research$insert, set, research.keywords);
			}),
		$author$project$Research$emptyKeywordSet,
		researchlist);
};
var $author$project$Research$keywordSet = function (researchlist) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (research, set) {
				return A3($elm$core$List$foldr, $author$project$Research$insert, set, research.keywords);
			}),
		$author$project$Research$emptyKeywordSet,
		researchlist);
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Worker$problemize = F2(
	function (p, m) {
		switch (m.$) {
			case 'Loading':
				return $author$project$Worker$Loading;
			case 'LoadingWithQuery':
				var q = m.a;
				var qs = m.b;
				return A2($author$project$Worker$LoadingWithQuery, q, qs);
			default:
				var lm = m.a;
				return $author$project$Worker$Loaded(
					_Utils_update(
						lm,
						{
							problems: A2($elm$core$List$cons, p, lm.problems)
						}));
		}
	});
var $author$project$Worker$returnResults = _Platform_outgoingPort('returnResults', $elm$core$Basics$identity);
var $author$project$Research$reverseKeywordDict = function (research) {
	var addExpToKeyword = F3(
		function (xpo, kw, currentDict) {
			return A3(
				$elm$core$Dict$update,
				$elm$core$String$toLower(kw),
				function (value) {
					if (value.$ === 'Nothing') {
						return $elm$core$Maybe$Just(
							_List_fromArray(
								[xpo]));
					} else {
						var lst = value.a;
						return $elm$core$Maybe$Just(
							A2($elm$core$List$cons, xpo, lst));
					}
				},
				currentDict);
		});
	var addResearchToDict = F2(
		function (exp, currentDict) {
			return A3(
				$elm$core$List$foldl,
				addExpToKeyword(exp),
				currentDict,
				A2($elm$core$List$map, $author$project$KeywordString$toString, exp.keywords));
		});
	return A3($elm$core$List$foldl, addResearchToDict, $elm$core$Dict$empty, research);
};
var $author$project$Queries$getRank = function (_v0) {
	var score = _v0.a;
	return score;
};
var $author$project$Queries$unrank = function (rs) {
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var x = _v0.b;
			return x;
		},
		rs);
};
var $author$project$Queries$joinRanked = F2(
	function (a, b) {
		var _v0 = _Utils_Tuple2(a, b);
		if (_v0.a.$ === 'RankedResult') {
			if (_v0.b.$ === 'RankedResult') {
				var lsta = _v0.a.a;
				var lstb = _v0.b.a;
				return $author$project$Queries$RankedResult(
					A2(
						$elm$core$List$sortBy,
						$author$project$Queries$getRank,
						_Utils_ap(lsta, lstb)));
			} else {
				if (!_v0.b.a.b) {
					var lsta = _v0.a.a;
					return $author$project$Queries$RankedResult(lsta);
				} else {
					var lsta = _v0.a.a;
					var lstb = _v0.b.a;
					return $author$project$Queries$Unranked(
						_Utils_ap(
							$author$project$Queries$unrank(lsta),
							lstb));
				}
			}
		} else {
			if (_v0.b.$ === 'RankedResult') {
				if (!_v0.a.a.b) {
					var lstb = _v0.b.a;
					return $author$project$Queries$RankedResult(lstb);
				} else {
					var lsta = _v0.a.a;
					var lstb = _v0.b.a;
					return $author$project$Queries$Unranked(
						_Utils_ap(
							lsta,
							$author$project$Queries$unrank(lstb)));
				}
			} else {
				var lsta = _v0.a.a;
				var lstb = _v0.b.a;
				return $author$project$Queries$Unranked(
					_Utils_ap(lsta, lstb));
			}
		}
	});
var $author$project$Queries$concatRanked = function (rs) {
	return A3(
		$elm$core$List$foldl,
		$author$project$Queries$joinRanked,
		$author$project$Queries$Unranked(_List_Nil),
		rs);
};
var $justinmimbs$date$Date$compare = F2(
	function (_v0, _v1) {
		var a = _v0.a;
		var b = _v1.a;
		return A2($elm$core$Basics$compare, a, b);
	});
var $author$project$Queries$findResearchAfter = F2(
	function (date, lst) {
		var test = function (research) {
			var _v0 = research.publication;
			if (_v0.$ === 'Just') {
				var researchdate = _v0.a;
				return A2(
					$elm$core$List$member,
					A2($justinmimbs$date$Date$compare, researchdate, date),
					_List_fromArray(
						[$elm$core$Basics$GT, $elm$core$Basics$EQ]));
			} else {
				return false;
			}
		};
		return A2($author$project$Queries$filterRanked, test, lst);
	});
var $author$project$Queries$findResearchBefore = F2(
	function (date, lst) {
		var test = function (research) {
			var _v0 = research.publication;
			if (_v0.$ === 'Just') {
				var researchdate = _v0.a;
				return A2(
					$elm$core$List$member,
					A2($justinmimbs$date$Date$compare, researchdate, date),
					_List_fromArray(
						[$elm$core$Basics$LT, $elm$core$Basics$EQ]));
			} else {
				return false;
			}
		};
		return A2($author$project$Queries$filterRanked, test, lst);
	});
var $author$project$Queries$containsIgnoreCase = F2(
	function (needle, haystack) {
		return A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(needle),
			$elm$core$String$toLower(haystack));
	});
var $author$project$Queries$findResearchWithAbstract = F2(
	function (abstractQ, lst) {
		return A2(
			$author$project$Queries$filterRanked,
			function (r) {
				var _v0 = r._abstract;
				if (_v0.$ === 'Nothing') {
					return false;
				} else {
					if (_v0.a === '') {
						return false;
					} else {
						var nonEmptyString = _v0.a;
						return A2($author$project$Queries$containsIgnoreCase, abstractQ, nonEmptyString);
					}
				}
			},
			lst);
	});
var $elm$core$String$foldl = _String_foldl;
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Char$fromCode = _Char_fromCode;
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $kuon$elm_string_normalize$String$Normalize$Diacritics$lookupList = _List_fromArray(
	[
		_Utils_Tuple2(
		_Utils_chr('Ⓐ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ａ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('À'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Á'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Â'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ầ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ấ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ẫ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ẩ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ã'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ā'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ă'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ằ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ắ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ẵ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ẳ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ȧ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ǡ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ä'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ǟ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ả'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Å'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ǻ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ǎ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ȁ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ȃ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ạ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ậ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ặ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ḁ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ą'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ⱥ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ɐ'),
		'A'),
		_Utils_Tuple2(
		_Utils_chr('Ꜳ'),
		'AA'),
		_Utils_Tuple2(
		_Utils_chr('Æ'),
		'AE'),
		_Utils_Tuple2(
		_Utils_chr('Ǽ'),
		'AE'),
		_Utils_Tuple2(
		_Utils_chr('Ǣ'),
		'AE'),
		_Utils_Tuple2(
		_Utils_chr('Ꜵ'),
		'AO'),
		_Utils_Tuple2(
		_Utils_chr('Ꜷ'),
		'AU'),
		_Utils_Tuple2(
		_Utils_chr('Ꜹ'),
		'AV'),
		_Utils_Tuple2(
		_Utils_chr('Ꜻ'),
		'AV'),
		_Utils_Tuple2(
		_Utils_chr('Ꜽ'),
		'AY'),
		_Utils_Tuple2(
		_Utils_chr('Ⓑ'),
		'B'),
		_Utils_Tuple2(
		_Utils_chr('Ｂ'),
		'B'),
		_Utils_Tuple2(
		_Utils_chr('Ḃ'),
		'B'),
		_Utils_Tuple2(
		_Utils_chr('Ḅ'),
		'B'),
		_Utils_Tuple2(
		_Utils_chr('Ḇ'),
		'B'),
		_Utils_Tuple2(
		_Utils_chr('Ƀ'),
		'B'),
		_Utils_Tuple2(
		_Utils_chr('Ƃ'),
		'B'),
		_Utils_Tuple2(
		_Utils_chr('Ɓ'),
		'B'),
		_Utils_Tuple2(
		_Utils_chr('Ⓒ'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ｃ'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ć'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ĉ'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ċ'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Č'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ç'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ḉ'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ƈ'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ȼ'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ꜿ'),
		'C'),
		_Utils_Tuple2(
		_Utils_chr('Ⓓ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ｄ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ḋ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ď'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ḍ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ḑ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ḓ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ḏ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Đ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ƌ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ɗ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ɖ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ꝺ'),
		'D'),
		_Utils_Tuple2(
		_Utils_chr('Ǳ'),
		'DZ'),
		_Utils_Tuple2(
		_Utils_chr('Ǆ'),
		'DZ'),
		_Utils_Tuple2(
		_Utils_chr('ǲ'),
		'Dz'),
		_Utils_Tuple2(
		_Utils_chr('ǅ'),
		'Dz'),
		_Utils_Tuple2(
		_Utils_chr('Ⓔ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ｅ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('È'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('É'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ê'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ề'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ế'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ễ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ể'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ẽ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ē'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ḕ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ḗ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ĕ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ė'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ë'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ẻ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ě'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ȅ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ȇ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ẹ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ệ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ȩ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ḝ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ę'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ḙ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ḛ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ɛ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ǝ'),
		'E'),
		_Utils_Tuple2(
		_Utils_chr('Ⓕ'),
		'F'),
		_Utils_Tuple2(
		_Utils_chr('Ｆ'),
		'F'),
		_Utils_Tuple2(
		_Utils_chr('Ḟ'),
		'F'),
		_Utils_Tuple2(
		_Utils_chr('Ƒ'),
		'F'),
		_Utils_Tuple2(
		_Utils_chr('Ꝼ'),
		'F'),
		_Utils_Tuple2(
		_Utils_chr('Ⓖ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ｇ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ǵ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ĝ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ḡ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ğ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ġ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ǧ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ģ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ǥ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ɠ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ꞡ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ᵹ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ꝿ'),
		'G'),
		_Utils_Tuple2(
		_Utils_chr('Ⓗ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ｈ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ĥ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ḣ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ḧ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ȟ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ḥ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ḩ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ḫ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ħ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ⱨ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ⱶ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ɥ'),
		'H'),
		_Utils_Tuple2(
		_Utils_chr('Ⓘ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ｉ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ì'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Í'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Î'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ĩ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ī'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ĭ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('İ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ï'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ḯ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ỉ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ǐ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ȉ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ȋ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ị'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Į'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ḭ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ɨ'),
		'I'),
		_Utils_Tuple2(
		_Utils_chr('Ⓙ'),
		'J'),
		_Utils_Tuple2(
		_Utils_chr('Ｊ'),
		'J'),
		_Utils_Tuple2(
		_Utils_chr('Ĵ'),
		'J'),
		_Utils_Tuple2(
		_Utils_chr('Ɉ'),
		'J'),
		_Utils_Tuple2(
		_Utils_chr('Ⓚ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ｋ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ḱ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ǩ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ḳ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ķ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ḵ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ƙ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ⱪ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ꝁ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ꝃ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ꝅ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ꞣ'),
		'K'),
		_Utils_Tuple2(
		_Utils_chr('Ⓛ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ｌ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ŀ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ĺ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ľ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ḷ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ḹ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ļ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ḽ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ḻ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ł'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ƚ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ɫ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ⱡ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ꝉ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ꝇ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ꞁ'),
		'L'),
		_Utils_Tuple2(
		_Utils_chr('Ǉ'),
		'LJ'),
		_Utils_Tuple2(
		_Utils_chr('ǈ'),
		'Lj'),
		_Utils_Tuple2(
		_Utils_chr('Ⓜ'),
		'M'),
		_Utils_Tuple2(
		_Utils_chr('Ｍ'),
		'M'),
		_Utils_Tuple2(
		_Utils_chr('Ḿ'),
		'M'),
		_Utils_Tuple2(
		_Utils_chr('Ṁ'),
		'M'),
		_Utils_Tuple2(
		_Utils_chr('Ṃ'),
		'M'),
		_Utils_Tuple2(
		_Utils_chr('Ɱ'),
		'M'),
		_Utils_Tuple2(
		_Utils_chr('Ɯ'),
		'M'),
		_Utils_Tuple2(
		_Utils_chr('Ⓝ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ｎ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ǹ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ń'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ñ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ṅ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ň'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ṇ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ņ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ṋ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ṉ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ƞ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ɲ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ꞑ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ꞥ'),
		'N'),
		_Utils_Tuple2(
		_Utils_chr('Ǌ'),
		'NJ'),
		_Utils_Tuple2(
		_Utils_chr('ǋ'),
		'Nj'),
		_Utils_Tuple2(
		_Utils_chr('Ⓞ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ｏ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ò'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ó'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ô'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ồ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ố'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ỗ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ổ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Õ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ṍ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ȭ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ṏ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ō'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ṑ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ṓ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ŏ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ȯ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ȱ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ö'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ȫ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ỏ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ő'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ǒ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ȍ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ȏ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ơ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ờ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ớ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ỡ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ở'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ợ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ọ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ộ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ǫ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ǭ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ø'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ǿ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ɔ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ɵ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ꝋ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ꝍ'),
		'O'),
		_Utils_Tuple2(
		_Utils_chr('Ƣ'),
		'OI'),
		_Utils_Tuple2(
		_Utils_chr('Ꝏ'),
		'OO'),
		_Utils_Tuple2(
		_Utils_chr('Ȣ'),
		'OU'),
		_Utils_Tuple2(
		_Utils_chr('\u008C'),
		'OE'),
		_Utils_Tuple2(
		_Utils_chr('Œ'),
		'OE'),
		_Utils_Tuple2(
		_Utils_chr('\u009C'),
		'oe'),
		_Utils_Tuple2(
		_Utils_chr('œ'),
		'oe'),
		_Utils_Tuple2(
		_Utils_chr('Ⓟ'),
		'P'),
		_Utils_Tuple2(
		_Utils_chr('Ｐ'),
		'P'),
		_Utils_Tuple2(
		_Utils_chr('Ṕ'),
		'P'),
		_Utils_Tuple2(
		_Utils_chr('Ṗ'),
		'P'),
		_Utils_Tuple2(
		_Utils_chr('Ƥ'),
		'P'),
		_Utils_Tuple2(
		_Utils_chr('Ᵽ'),
		'P'),
		_Utils_Tuple2(
		_Utils_chr('Ꝑ'),
		'P'),
		_Utils_Tuple2(
		_Utils_chr('Ꝓ'),
		'P'),
		_Utils_Tuple2(
		_Utils_chr('Ꝕ'),
		'P'),
		_Utils_Tuple2(
		_Utils_chr('Ⓠ'),
		'Q'),
		_Utils_Tuple2(
		_Utils_chr('Ｑ'),
		'Q'),
		_Utils_Tuple2(
		_Utils_chr('Ꝗ'),
		'Q'),
		_Utils_Tuple2(
		_Utils_chr('Ꝙ'),
		'Q'),
		_Utils_Tuple2(
		_Utils_chr('Ɋ'),
		'Q'),
		_Utils_Tuple2(
		_Utils_chr('Ⓡ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ｒ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ŕ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ṙ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ř'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ȑ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ȓ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ṛ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ṝ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ŗ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ṟ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ɍ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ɽ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ꝛ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ꞧ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ꞃ'),
		'R'),
		_Utils_Tuple2(
		_Utils_chr('Ⓢ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ｓ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('ẞ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ś'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ṥ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ŝ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ṡ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Š'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ṧ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ṣ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ṩ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ș'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ş'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ȿ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ꞩ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ꞅ'),
		'S'),
		_Utils_Tuple2(
		_Utils_chr('Ⓣ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ｔ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ṫ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ť'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ṭ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ț'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ţ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ṱ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ṯ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ŧ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ƭ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ʈ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ⱦ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ꞇ'),
		'T'),
		_Utils_Tuple2(
		_Utils_chr('Ꜩ'),
		'TZ'),
		_Utils_Tuple2(
		_Utils_chr('Ⓤ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ｕ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ù'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ú'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Û'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ũ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ṹ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ū'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ṻ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ŭ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ü'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ǜ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ǘ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ǖ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ǚ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ủ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ů'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ű'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ǔ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ȕ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ȗ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ư'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ừ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ứ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ữ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ử'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ự'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ụ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ṳ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ų'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ṷ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ṵ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ʉ'),
		'U'),
		_Utils_Tuple2(
		_Utils_chr('Ⓥ'),
		'V'),
		_Utils_Tuple2(
		_Utils_chr('Ｖ'),
		'V'),
		_Utils_Tuple2(
		_Utils_chr('Ṽ'),
		'V'),
		_Utils_Tuple2(
		_Utils_chr('Ṿ'),
		'V'),
		_Utils_Tuple2(
		_Utils_chr('Ʋ'),
		'V'),
		_Utils_Tuple2(
		_Utils_chr('Ꝟ'),
		'V'),
		_Utils_Tuple2(
		_Utils_chr('Ʌ'),
		'V'),
		_Utils_Tuple2(
		_Utils_chr('Ꝡ'),
		'VY'),
		_Utils_Tuple2(
		_Utils_chr('Ⓦ'),
		'W'),
		_Utils_Tuple2(
		_Utils_chr('Ｗ'),
		'W'),
		_Utils_Tuple2(
		_Utils_chr('Ẁ'),
		'W'),
		_Utils_Tuple2(
		_Utils_chr('Ẃ'),
		'W'),
		_Utils_Tuple2(
		_Utils_chr('Ŵ'),
		'W'),
		_Utils_Tuple2(
		_Utils_chr('Ẇ'),
		'W'),
		_Utils_Tuple2(
		_Utils_chr('Ẅ'),
		'W'),
		_Utils_Tuple2(
		_Utils_chr('Ẉ'),
		'W'),
		_Utils_Tuple2(
		_Utils_chr('Ⱳ'),
		'W'),
		_Utils_Tuple2(
		_Utils_chr('Ⓧ'),
		'X'),
		_Utils_Tuple2(
		_Utils_chr('Ｘ'),
		'X'),
		_Utils_Tuple2(
		_Utils_chr('Ẋ'),
		'X'),
		_Utils_Tuple2(
		_Utils_chr('Ẍ'),
		'X'),
		_Utils_Tuple2(
		_Utils_chr('Ⓨ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ｙ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ỳ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ý'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ŷ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ỹ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ȳ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ẏ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ÿ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ỷ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ỵ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ƴ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ɏ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ỿ'),
		'Y'),
		_Utils_Tuple2(
		_Utils_chr('Ⓩ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ｚ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ź'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ẑ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ż'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ž'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ẓ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ẕ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ƶ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ȥ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ɀ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ⱬ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('Ꝣ'),
		'Z'),
		_Utils_Tuple2(
		_Utils_chr('ⓐ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ａ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ẚ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('à'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('á'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('â'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ầ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ấ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ẫ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ẩ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ã'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ā'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ă'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ằ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ắ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ẵ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ẳ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ȧ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ǡ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ä'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ǟ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ả'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('å'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ǻ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ǎ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ȁ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ȃ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ạ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ậ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ặ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ḁ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ą'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ⱥ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ɐ'),
		'a'),
		_Utils_Tuple2(
		_Utils_chr('ꜳ'),
		'aa'),
		_Utils_Tuple2(
		_Utils_chr('æ'),
		'ae'),
		_Utils_Tuple2(
		_Utils_chr('ǽ'),
		'ae'),
		_Utils_Tuple2(
		_Utils_chr('ǣ'),
		'ae'),
		_Utils_Tuple2(
		_Utils_chr('ꜵ'),
		'ao'),
		_Utils_Tuple2(
		_Utils_chr('ꜷ'),
		'au'),
		_Utils_Tuple2(
		_Utils_chr('ꜹ'),
		'av'),
		_Utils_Tuple2(
		_Utils_chr('ꜻ'),
		'av'),
		_Utils_Tuple2(
		_Utils_chr('ꜽ'),
		'ay'),
		_Utils_Tuple2(
		_Utils_chr('ⓑ'),
		'b'),
		_Utils_Tuple2(
		_Utils_chr('ｂ'),
		'b'),
		_Utils_Tuple2(
		_Utils_chr('ḃ'),
		'b'),
		_Utils_Tuple2(
		_Utils_chr('ḅ'),
		'b'),
		_Utils_Tuple2(
		_Utils_chr('ḇ'),
		'b'),
		_Utils_Tuple2(
		_Utils_chr('ƀ'),
		'b'),
		_Utils_Tuple2(
		_Utils_chr('ƃ'),
		'b'),
		_Utils_Tuple2(
		_Utils_chr('ɓ'),
		'b'),
		_Utils_Tuple2(
		_Utils_chr('ⓒ'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ｃ'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ć'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ĉ'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ċ'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('č'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ç'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ḉ'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ƈ'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ȼ'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ꜿ'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ↄ'),
		'c'),
		_Utils_Tuple2(
		_Utils_chr('ⓓ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ｄ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ḋ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ď'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ḍ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ḑ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ḓ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ḏ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('đ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ƌ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ɖ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ɗ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ꝺ'),
		'd'),
		_Utils_Tuple2(
		_Utils_chr('ǳ'),
		'dz'),
		_Utils_Tuple2(
		_Utils_chr('ǆ'),
		'dz'),
		_Utils_Tuple2(
		_Utils_chr('ⓔ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ｅ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('è'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('é'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ê'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ề'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ế'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ễ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ể'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ẽ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ē'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ḕ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ḗ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ĕ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ė'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ë'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ẻ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ě'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ȅ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ȇ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ẹ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ệ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ȩ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ḝ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ę'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ḙ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ḛ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ɇ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ɛ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ǝ'),
		'e'),
		_Utils_Tuple2(
		_Utils_chr('ⓕ'),
		'f'),
		_Utils_Tuple2(
		_Utils_chr('ｆ'),
		'f'),
		_Utils_Tuple2(
		_Utils_chr('ḟ'),
		'f'),
		_Utils_Tuple2(
		_Utils_chr('ƒ'),
		'f'),
		_Utils_Tuple2(
		_Utils_chr('ꝼ'),
		'f'),
		_Utils_Tuple2(
		_Utils_chr('ⓖ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ｇ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ǵ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ĝ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ḡ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ğ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ġ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ǧ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ģ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ǥ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ɠ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ꞡ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ᵹ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ꝿ'),
		'g'),
		_Utils_Tuple2(
		_Utils_chr('ⓗ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ｈ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ĥ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ḣ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ḧ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ȟ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ḥ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ḩ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ḫ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ẖ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ħ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ⱨ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ⱶ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ɥ'),
		'h'),
		_Utils_Tuple2(
		_Utils_chr('ƕ'),
		'hv'),
		_Utils_Tuple2(
		_Utils_chr('ⓘ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ｉ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ì'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('í'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('î'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ĩ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ī'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ĭ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ï'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ḯ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ỉ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ǐ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ȉ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ȋ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ị'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('į'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ḭ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ɨ'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ı'),
		'i'),
		_Utils_Tuple2(
		_Utils_chr('ⓙ'),
		'j'),
		_Utils_Tuple2(
		_Utils_chr('ｊ'),
		'j'),
		_Utils_Tuple2(
		_Utils_chr('ĵ'),
		'j'),
		_Utils_Tuple2(
		_Utils_chr('ǰ'),
		'j'),
		_Utils_Tuple2(
		_Utils_chr('ɉ'),
		'j'),
		_Utils_Tuple2(
		_Utils_chr('ⓚ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ｋ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ḱ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ǩ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ḳ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ķ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ḵ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ƙ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ⱪ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ꝁ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ꝃ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ꝅ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ꞣ'),
		'k'),
		_Utils_Tuple2(
		_Utils_chr('ⓛ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ｌ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ŀ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ĺ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ľ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ḷ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ḹ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ļ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ḽ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ḻ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ſ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ł'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ƚ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ɫ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ⱡ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ꝉ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ꞁ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ꝇ'),
		'l'),
		_Utils_Tuple2(
		_Utils_chr('ǉ'),
		'lj'),
		_Utils_Tuple2(
		_Utils_chr('ⓜ'),
		'm'),
		_Utils_Tuple2(
		_Utils_chr('ｍ'),
		'm'),
		_Utils_Tuple2(
		_Utils_chr('ḿ'),
		'm'),
		_Utils_Tuple2(
		_Utils_chr('ṁ'),
		'm'),
		_Utils_Tuple2(
		_Utils_chr('ṃ'),
		'm'),
		_Utils_Tuple2(
		_Utils_chr('ɱ'),
		'm'),
		_Utils_Tuple2(
		_Utils_chr('ɯ'),
		'm'),
		_Utils_Tuple2(
		_Utils_chr('ⓝ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ｎ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ǹ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ń'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ñ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ṅ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ň'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ṇ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ņ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ṋ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ṉ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ƞ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ɲ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ŉ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ꞑ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ꞥ'),
		'n'),
		_Utils_Tuple2(
		_Utils_chr('ǌ'),
		'nj'),
		_Utils_Tuple2(
		_Utils_chr('ⓞ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ｏ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ò'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ó'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ô'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ồ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ố'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ỗ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ổ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('õ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ṍ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ȭ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ṏ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ō'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ṑ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ṓ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ŏ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ȯ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ȱ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ö'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ȫ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ỏ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ő'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ǒ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ȍ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ȏ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ơ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ờ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ớ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ỡ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ở'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ợ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ọ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ộ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ǫ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ǭ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ø'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ǿ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ɔ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ꝋ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ꝍ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ɵ'),
		'o'),
		_Utils_Tuple2(
		_Utils_chr('ƣ'),
		'oi'),
		_Utils_Tuple2(
		_Utils_chr('ȣ'),
		'ou'),
		_Utils_Tuple2(
		_Utils_chr('ꝏ'),
		'oo'),
		_Utils_Tuple2(
		_Utils_chr('ⓟ'),
		'p'),
		_Utils_Tuple2(
		_Utils_chr('ｐ'),
		'p'),
		_Utils_Tuple2(
		_Utils_chr('ṕ'),
		'p'),
		_Utils_Tuple2(
		_Utils_chr('ṗ'),
		'p'),
		_Utils_Tuple2(
		_Utils_chr('ƥ'),
		'p'),
		_Utils_Tuple2(
		_Utils_chr('ᵽ'),
		'p'),
		_Utils_Tuple2(
		_Utils_chr('ꝑ'),
		'p'),
		_Utils_Tuple2(
		_Utils_chr('ꝓ'),
		'p'),
		_Utils_Tuple2(
		_Utils_chr('ꝕ'),
		'p'),
		_Utils_Tuple2(
		_Utils_chr('ⓠ'),
		'q'),
		_Utils_Tuple2(
		_Utils_chr('ｑ'),
		'q'),
		_Utils_Tuple2(
		_Utils_chr('ɋ'),
		'q'),
		_Utils_Tuple2(
		_Utils_chr('ꝗ'),
		'q'),
		_Utils_Tuple2(
		_Utils_chr('ꝙ'),
		'q'),
		_Utils_Tuple2(
		_Utils_chr('ⓡ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ｒ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ŕ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ṙ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ř'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ȑ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ȓ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ṛ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ṝ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ŗ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ṟ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ɍ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ɽ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ꝛ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ꞧ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ꞃ'),
		'r'),
		_Utils_Tuple2(
		_Utils_chr('ⓢ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ｓ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ß'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ś'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ṥ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ŝ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ṡ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('š'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ṧ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ṣ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ṩ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ș'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ş'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ȿ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ꞩ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ꞅ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ẛ'),
		's'),
		_Utils_Tuple2(
		_Utils_chr('ⓣ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ｔ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ṫ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ẗ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ť'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ṭ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ț'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ţ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ṱ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ṯ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ŧ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ƭ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ʈ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ⱦ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ꞇ'),
		't'),
		_Utils_Tuple2(
		_Utils_chr('ꜩ'),
		'tz'),
		_Utils_Tuple2(
		_Utils_chr('ⓤ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ｕ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ù'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ú'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('û'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ũ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ṹ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ū'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ṻ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ŭ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ü'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ǜ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ǘ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ǖ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ǚ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ủ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ů'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ű'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ǔ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ȕ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ȗ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ư'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ừ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ứ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ữ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ử'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ự'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ụ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ṳ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ų'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ṷ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ṵ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ʉ'),
		'u'),
		_Utils_Tuple2(
		_Utils_chr('ⓥ'),
		'v'),
		_Utils_Tuple2(
		_Utils_chr('ｖ'),
		'v'),
		_Utils_Tuple2(
		_Utils_chr('ṽ'),
		'v'),
		_Utils_Tuple2(
		_Utils_chr('ṿ'),
		'v'),
		_Utils_Tuple2(
		_Utils_chr('ʋ'),
		'v'),
		_Utils_Tuple2(
		_Utils_chr('ꝟ'),
		'v'),
		_Utils_Tuple2(
		_Utils_chr('ʌ'),
		'v'),
		_Utils_Tuple2(
		_Utils_chr('ꝡ'),
		'vy'),
		_Utils_Tuple2(
		_Utils_chr('ⓦ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ｗ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ẁ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ẃ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ŵ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ẇ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ẅ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ẘ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ẉ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ⱳ'),
		'w'),
		_Utils_Tuple2(
		_Utils_chr('ⓧ'),
		'x'),
		_Utils_Tuple2(
		_Utils_chr('ｘ'),
		'x'),
		_Utils_Tuple2(
		_Utils_chr('ẋ'),
		'x'),
		_Utils_Tuple2(
		_Utils_chr('ẍ'),
		'x'),
		_Utils_Tuple2(
		_Utils_chr('ⓨ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ｙ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ỳ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ý'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ŷ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ỹ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ȳ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ẏ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ÿ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ỷ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ẙ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ỵ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ƴ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ɏ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ỿ'),
		'y'),
		_Utils_Tuple2(
		_Utils_chr('ⓩ'),
		'z'),
		_Utils_Tuple2(
		_Utils_chr('ｚ'),
		'z'),
		_Utils_Tuple2(
		_Utils_chr('ź'),
		'z'),
		_Utils_Tuple2(
		_Utils_chr('ẑ'),
		'z'),
		_Utils_Tuple2(
		_Utils_chr('ż'),
		'z'),
		_Utils_Tuple2(
		_Utils_chr('ž'),
		'z'),
		_Utils_Tuple2(
		_Utils_chr('ẓ'),
		'z'),
		_Utils_Tuple2(
		_Utils_chr('ẕ'),
		'z'),
		_Utils_Tuple2(
		_Utils_chr('ƶ'),
		'z')
	]);
var $kuon$elm_string_normalize$String$Normalize$Diacritics$lookupTable = $elm$core$Dict$fromList($kuon$elm_string_normalize$String$Normalize$Diacritics$lookupList);
var $kuon$elm_string_normalize$String$Normalize$Diacritics$maxUnicode = 1114111;
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $kuon$elm_string_normalize$String$Normalize$Diacritics$maxCode = A2(
	$elm$core$Maybe$withDefault,
	$kuon$elm_string_normalize$String$Normalize$Diacritics$maxUnicode,
	$elm$core$List$maximum(
		A2(
			$elm$core$List$map,
			$elm$core$Char$toCode,
			A2($elm$core$List$map, $elm$core$Tuple$first, $kuon$elm_string_normalize$String$Normalize$Diacritics$lookupList))));
var $kuon$elm_string_normalize$String$Normalize$Diacritics$lookupArray = $elm$core$Array$fromList(
	A2(
		$elm$core$List$map,
		function (i) {
			var _v0 = A2(
				$elm$core$Dict$get,
				$elm$core$Char$fromCode(i),
				$kuon$elm_string_normalize$String$Normalize$Diacritics$lookupTable);
			if (_v0.$ === 'Nothing') {
				return $elm$core$String$fromChar(
					$elm$core$Char$fromCode(i));
			} else {
				var str = _v0.a;
				return str;
			}
		},
		A2($elm$core$List$range, 0, $kuon$elm_string_normalize$String$Normalize$Diacritics$maxCode)));
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $kuon$elm_string_normalize$String$Normalize$Diacritics$minCode = A2(
	$elm$core$Maybe$withDefault,
	0,
	$elm$core$List$minimum(
		A2(
			$elm$core$List$map,
			$elm$core$Char$toCode,
			A2($elm$core$List$map, $elm$core$Tuple$first, $kuon$elm_string_normalize$String$Normalize$Diacritics$lookupList))));
var $kuon$elm_string_normalize$String$Normalize$removeDiacritics = function (str) {
	var replace = F2(
		function (c, result) {
			if (_Utils_cmp(
				$elm$core$Char$toCode(c),
				$kuon$elm_string_normalize$String$Normalize$Diacritics$minCode) < 0) {
				return _Utils_ap(
					result,
					$elm$core$String$fromChar(c));
			} else {
				var _v0 = A2(
					$elm$core$Array$get,
					$elm$core$Char$toCode(c),
					$kuon$elm_string_normalize$String$Normalize$Diacritics$lookupArray);
				if (_v0.$ === 'Just') {
					var candidate = _v0.a;
					return _Utils_ap(result, candidate);
				} else {
					return _Utils_ap(
						result,
						$elm$core$String$fromChar(c));
				}
			}
		});
	return A3($elm$core$String$foldl, replace, '', str);
};
var $author$project$Queries$getValue = function (_v0) {
	var value = _v0.b;
	return value;
};
var $author$project$Queries$toList = function (result) {
	if (result.$ === 'Unranked') {
		var xs = result.a;
		return xs;
	} else {
		var xs = result.a;
		return A2($elm$core$List$map, $author$project$Queries$getValue, xs);
	}
};
var $author$project$Queries$findResearchWithAuthor = F2(
	function (qauthor, lst) {
		var simplified = function (s) {
			return $kuon$elm_string_normalize$String$Normalize$removeDiacritics(
				$elm$core$String$toLower(s));
		};
		var fragments = function (r) {
			var authorname = simplified(
				$author$project$Research$getName(r.author));
			var test = A2(
				$elm$core$List$any,
				function (qFrag) {
					return A2($elm$core$String$contains, qFrag, authorname);
				},
				A2(
					$elm$core$String$split,
					' ',
					simplified(qauthor)));
			return test;
		};
		var f = function (r) {
			return A2(
				$elm$core$String$contains,
				simplified(qauthor),
				simplified(
					$author$project$Research$getName(r.author)));
		};
		if (qauthor === '') {
			return lst;
		} else {
			var res = A2($author$project$Queries$filterRanked, f, lst);
			var _v1 = $author$project$Queries$toList(res);
			if (!_v1.b) {
				return A2($author$project$Queries$filterRanked, fragments, lst);
			} else {
				return res;
			}
		}
	});
var $author$project$Queries$findResearchWithPortal = F2(
	function (portalq, lst) {
		switch (portalq) {
			case '':
				return lst;
			case 'All Portals':
				return lst;
			case 'Any portal':
				return lst;
			default:
				var nonemptyq = portalq;
				var f = function (research) {
					var names = A2(
						$elm$core$List$map,
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.name;
							},
							$elm$core$String$toLower),
						_Utils_ap(research.portals, research.connectedTo));
					return A2(
						$elm$core$List$any,
						function (p) {
							return _Utils_eq(
								p,
								$elm$core$String$toLower(nonemptyq));
						},
						names);
				};
				return A2($author$project$Queries$filterRanked, f, lst);
		}
	});
var $tripokey$elm_fuzzy$Fuzzy$AddPenalty = function (a) {
	return {$: 'AddPenalty', a: a};
};
var $tripokey$elm_fuzzy$Fuzzy$addPenalty = function (penalty) {
	return $tripokey$elm_fuzzy$Fuzzy$AddPenalty(penalty);
};
var $tripokey$elm_fuzzy$Fuzzy$InsertPenalty = function (a) {
	return {$: 'InsertPenalty', a: a};
};
var $tripokey$elm_fuzzy$Fuzzy$insertPenalty = function (penalty) {
	return $tripokey$elm_fuzzy$Fuzzy$InsertPenalty(penalty);
};
var $tripokey$elm_fuzzy$Fuzzy$Match = F4(
	function (score, offset, length, keys) {
		return {keys: keys, length: length, offset: offset, score: score};
	});
var $tripokey$elm_fuzzy$Fuzzy$Result = F2(
	function (score, matches) {
		return {matches: matches, score: score};
	});
var $tripokey$elm_fuzzy$Fuzzy$ConfigModel = F4(
	function (addPenalty, movePenalty, removePenalty, insertPenalty) {
		return {addPenalty: addPenalty, insertPenalty: insertPenalty, movePenalty: movePenalty, removePenalty: removePenalty};
	});
var $tripokey$elm_fuzzy$Fuzzy$defaultConfig = A4($tripokey$elm_fuzzy$Fuzzy$ConfigModel, 10, 1000, 10000, 1);
var $elm$core$String$indexes = _String_indexes;
var $tripokey$elm_fuzzy$Fuzzy$dissect = F2(
	function (separators, strings) {
		dissect:
		while (true) {
			if (!separators.b) {
				return strings;
			} else {
				var head = separators.a;
				var tail = separators.b;
				var dissectEntry = function (entry) {
					var separatorLength = $elm$core$String$length(head);
					var slice = F2(
						function (index, _v1) {
							var prevIndex = _v1.a;
							var sum = _v1.b;
							var separatorSlice = _List_fromArray(
								[
									A3($elm$core$String$slice, index, index + separatorLength, entry)
								]);
							var precedingSlice = _Utils_eq(prevIndex, index) ? _List_Nil : _List_fromArray(
								[
									A3($elm$core$String$slice, prevIndex, index, entry)
								]);
							return _Utils_Tuple2(
								index + separatorLength,
								_Utils_ap(
									sum,
									_Utils_ap(precedingSlice, separatorSlice)));
						});
					var indexes = A2($elm$core$String$indexes, head, entry);
					var result = A3(
						$elm$core$List$foldl,
						slice,
						_Utils_Tuple2(0, _List_Nil),
						indexes);
					var lastIndex = result.a;
					var first = result.b;
					var entryLength = $elm$core$String$length(entry);
					var last = _Utils_eq(lastIndex, entryLength) ? _List_Nil : _List_fromArray(
						[
							A3($elm$core$String$slice, lastIndex, entryLength, entry)
						]);
					return _Utils_ap(first, last);
				};
				var dissected = A3(
					$elm$core$List$foldl,
					F2(
						function (e, s) {
							return _Utils_ap(
								s,
								dissectEntry(e));
						}),
					_List_Nil,
					strings);
				var $temp$separators = tail,
					$temp$strings = dissected;
				separators = $temp$separators;
				strings = $temp$strings;
				continue dissect;
			}
		}
	});
var $tripokey$elm_fuzzy$Fuzzy$initialModel = _List_Nil;
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $tripokey$elm_fuzzy$Fuzzy$quickSort = function (entries) {
	if (!entries.b) {
		return _Utils_Tuple2(0, _List_Nil);
	} else {
		var head = entries.a;
		var tail = entries.b;
		var partition = A2(
			$elm$core$List$partition,
			function (e) {
				return _Utils_cmp(e, head) < 0;
			},
			tail);
		var smaller = $tripokey$elm_fuzzy$Fuzzy$quickSort(partition.a);
		var penalty = $elm$core$List$isEmpty(smaller.b) ? 0 : 1;
		var larger = $tripokey$elm_fuzzy$Fuzzy$quickSort(partition.b);
		return _Utils_Tuple2(
			(smaller.a + penalty) + larger.a,
			_Utils_ap(
				smaller.b,
				_Utils_ap(
					_List_fromArray(
						[head]),
					larger.b)));
	}
};
var $tripokey$elm_fuzzy$Fuzzy$distance = F3(
	function (config, needle, hay) {
		var accumulateInsertPenalty = F2(
			function (elem, result) {
				if (result.a.$ === 'Just') {
					var prev = result.a.a;
					var score = result.b;
					return _Utils_Tuple2(
						$elm$core$Maybe$Just(elem),
						((elem - 1) - prev) + score);
				} else {
					var _v2 = result.a;
					var score = result.b;
					return _Utils_Tuple2(
						$elm$core$Maybe$Just(elem),
						score);
				}
			});
		var accumulate = F2(
			function (c, indexList) {
				var indexes = A2(
					$elm$core$String$indexes,
					$elm$core$String$fromChar(c),
					hay);
				var hayIndex = $elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (e) {
							return !A2($elm$core$List$member, e, indexList);
						},
						indexes));
				if (hayIndex.$ === 'Just') {
					var v = hayIndex.a;
					return _Utils_ap(
						indexList,
						_List_fromArray(
							[v]));
				} else {
					return indexList;
				}
			});
		var accumulated = A3($elm$core$String$foldl, accumulate, $tripokey$elm_fuzzy$Fuzzy$initialModel, needle);
		var hPenalty = ($elm$core$String$length(hay) - $elm$core$List$length(accumulated)) * config.addPenalty;
		var nPenalty = ($elm$core$String$length(needle) - $elm$core$List$length(accumulated)) * config.removePenalty;
		var sorted = $tripokey$elm_fuzzy$Fuzzy$quickSort(accumulated);
		var iPenalty = A3(
			$elm$core$List$foldl,
			accumulateInsertPenalty,
			_Utils_Tuple2($elm$core$Maybe$Nothing, 0),
			sorted.b).b * config.insertPenalty;
		var mPenalty = sorted.a * config.movePenalty;
		return A4(
			$tripokey$elm_fuzzy$Fuzzy$Match,
			((mPenalty + hPenalty) + nPenalty) + iPenalty,
			0,
			$elm$core$String$length(hay),
			sorted.b);
	});
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $tripokey$elm_fuzzy$Fuzzy$padHays = F2(
	function (ns, hs) {
		return _Utils_ap(
			hs,
			A2(
				$elm$core$List$repeat,
				ns - $elm$core$List$length(hs),
				''));
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
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
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $tripokey$elm_fuzzy$Fuzzy$reduceLeft = F3(
	function (ns, c, hs) {
		return _Utils_Tuple2(
			A3(
				$elm$core$List$foldl,
				F2(
					function (e, sum) {
						return $elm$core$String$length(e) + sum;
					}),
				0,
				A2($elm$core$List$take, c, hs)),
			A2($elm$core$List$drop, c, hs));
	});
var $tripokey$elm_fuzzy$Fuzzy$reduceRight = F3(
	function (ns, c, hs) {
		return A2(
			$elm$core$List$take,
			$elm$core$List$length(hs) - ((ns - c) - 1),
			hs);
	});
var $tripokey$elm_fuzzy$Fuzzy$match = F4(
	function (configs, separators, needle, hay) {
		var reduceHays = F3(
			function (ns, c, hs) {
				return A3(
					$tripokey$elm_fuzzy$Fuzzy$reduceLeft,
					ns,
					c,
					A3(
						$tripokey$elm_fuzzy$Fuzzy$reduceRight,
						ns,
						c,
						A2($tripokey$elm_fuzzy$Fuzzy$padHays, ns, hs)));
			});
		var needles = A2(
			$tripokey$elm_fuzzy$Fuzzy$dissect,
			separators,
			_List_fromArray(
				[needle]));
		var initialResult = A2($tripokey$elm_fuzzy$Fuzzy$Result, 0, _List_Nil);
		var hays = A2(
			$tripokey$elm_fuzzy$Fuzzy$dissect,
			separators,
			_List_fromArray(
				[hay]));
		var accumulateConfig = F2(
			function (c, sum) {
				switch (c.$) {
					case 'AddPenalty':
						var val = c.a;
						return _Utils_update(
							sum,
							{addPenalty: val});
					case 'RemovePenalty':
						var val = c.a;
						return _Utils_update(
							sum,
							{removePenalty: val});
					case 'MovePenalty':
						var val = c.a;
						return _Utils_update(
							sum,
							{movePenalty: val});
					default:
						var val = c.a;
						return _Utils_update(
							sum,
							{insertPenalty: val});
				}
			});
		var config = A3($elm$core$List$foldl, accumulateConfig, $tripokey$elm_fuzzy$Fuzzy$defaultConfig, configs);
		var minScore = F2(
			function (n, _v2) {
				var offset = _v2.a;
				var hs = _v2.b;
				var initialPenalty = ((($elm$core$String$length(n) * config.removePenalty) + ($elm$core$String$length(n) * config.movePenalty)) + ($elm$core$String$length(hay) * config.addPenalty)) + (($elm$core$String$length(hay) * $elm$core$String$length(n)) * config.insertPenalty);
				var initialMatch = A4($tripokey$elm_fuzzy$Fuzzy$Match, initialPenalty, offset, 0, _List_Nil);
				var accumulateMatch = F2(
					function (e, _v1) {
						var prev = _v1.a;
						var prevOffset = _v1.b;
						var newOffset = prevOffset + $elm$core$String$length(e);
						var eDistance = A3($tripokey$elm_fuzzy$Fuzzy$distance, config, n, e);
						var newMatch = (_Utils_cmp(eDistance.score, prev.score) < 0) ? _Utils_update(
							eDistance,
							{offset: prevOffset}) : prev;
						return _Utils_Tuple2(newMatch, newOffset);
					});
				return A3(
					$elm$core$List$foldl,
					accumulateMatch,
					_Utils_Tuple2(initialMatch, offset),
					hs).a;
			});
		var accumulateResult = F2(
			function (n, _v0) {
				var prev = _v0.a;
				var num = _v0.b;
				var matchResult = A2(
					minScore,
					n,
					A3(
						reduceHays,
						$elm$core$List$length(needles),
						num,
						hays));
				var newResult = _Utils_update(
					prev,
					{
						matches: _Utils_ap(
							prev.matches,
							_List_fromArray(
								[matchResult])),
						score: matchResult.score + prev.score
					});
				return _Utils_Tuple2(newResult, num + 1);
			});
		return A3(
			$elm$core$List$foldl,
			accumulateResult,
			_Utils_Tuple2(initialResult, 0),
			needles).a;
	});
var $tripokey$elm_fuzzy$Fuzzy$MovePenalty = function (a) {
	return {$: 'MovePenalty', a: a};
};
var $tripokey$elm_fuzzy$Fuzzy$movePenalty = function (penalty) {
	return $tripokey$elm_fuzzy$Fuzzy$MovePenalty(penalty);
};
var $author$project$Queries$Ranked = F2(
	function (a, b) {
		return {$: 'Ranked', a: a, b: b};
	});
var $author$project$Queries$rank = F2(
	function (f, lst) {
		return $author$project$Queries$RankedResult(
			A2(
				$elm$core$List$map,
				function (x) {
					return A2(
						$author$project$Queries$Ranked,
						f(x),
						x);
				},
				lst));
	});
var $tripokey$elm_fuzzy$Fuzzy$RemovePenalty = function (a) {
	return {$: 'RemovePenalty', a: a};
};
var $tripokey$elm_fuzzy$Fuzzy$removePenalty = function (penalty) {
	return $tripokey$elm_fuzzy$Fuzzy$RemovePenalty(penalty);
};
var $author$project$Queries$findResearchWithTitle = F2(
	function (q, lst) {
		var frank = function (research) {
			return A2(
				$elm$core$String$contains,
				$elm$core$String$toLower(q),
				$elm$core$String$toLower(research.title)) ? (-10) : A4(
				$tripokey$elm_fuzzy$Fuzzy$match,
				_List_fromArray(
					[
						$tripokey$elm_fuzzy$Fuzzy$addPenalty(10),
						$tripokey$elm_fuzzy$Fuzzy$removePenalty(10000),
						$tripokey$elm_fuzzy$Fuzzy$insertPenalty(5),
						$tripokey$elm_fuzzy$Fuzzy$movePenalty(50)
					]),
				_List_fromArray(
					[' ']),
				q,
				research.title).score;
		};
		if (q === '') {
			return $author$project$Queries$Unranked(lst);
		} else {
			return function (result) {
				if (result.$ === 'Unranked') {
					var ulst = result.a;
					return $author$project$Queries$Unranked(ulst);
				} else {
					var rlst = result.a;
					return $author$project$Queries$RankedResult(
						A2(
							$elm$core$List$filter,
							function (x) {
								return function (score) {
									return score < 50;
								}(
									$author$project$Queries$getRank(x));
							},
							rlst));
				}
			}(
				A2($author$project$Queries$rank, frank, lst));
		}
	});
var $author$project$Worker$optionalFilter = F3(
	function (filter, value, lst) {
		if (value.$ === 'Nothing') {
			return lst;
		} else {
			var v = value.a;
			return A2(filter, v, lst);
		}
	});
var $author$project$Queries$mapRanked = F2(
	function (f, _v0) {
		var i = _v0.a;
		var a = _v0.b;
		return A2(
			$author$project$Queries$Ranked,
			i,
			f(a));
	});
var $author$project$Queries$uniqueRankedResult = F2(
	function (toComparable, rr) {
		if (rr.$ === 'Unranked') {
			var lst = rr.a;
			return $author$project$Queries$Unranked(
				A2($elm_community$list_extra$List$Extra$uniqueBy, toComparable, lst));
		} else {
			var lst = rr.a;
			return $author$project$Queries$RankedResult(
				A2(
					$elm_community$list_extra$List$Extra$uniqueBy,
					$author$project$Queries$mapRanked(toComparable),
					lst));
		}
	});
var $author$project$Worker$searchResearch = F3(
	function (expSearch, revDict, lst) {
		if (expSearch.$ === 'QuickSearch') {
			var qs = expSearch.a;
			return A2(
				$author$project$Queries$uniqueRankedResult,
				function ($) {
					return $.id;
				},
				$author$project$Queries$concatRanked(
					_List_fromArray(
						[
							A2($author$project$Queries$findResearchWithTitle, qs, lst),
							A2(
							$author$project$Queries$findResearchWithAuthor,
							qs,
							$author$project$Queries$Unranked(lst)),
							A3(
							$author$project$Queries$findResearchWithKeywords,
							$elm$core$Set$fromList(
								_List_fromArray(
									[qs])),
							revDict,
							$author$project$Queries$Unranked(lst))
						])));
		} else {
			var search = expSearch.a.a;
			return A3(
				$author$project$Worker$optionalFilter,
				$author$project$Queries$findResearchBefore,
				search.before,
				A3(
					$author$project$Worker$optionalFilter,
					$author$project$Queries$findResearchAfter,
					search.after,
					A2(
						$author$project$Queries$findResearchWithAbstract,
						search._abstract,
						A2(
							$author$project$Queries$findResearchWithPortal,
							search.portal,
							A3(
								$author$project$Queries$findResearchWithKeywords,
								search.keywords,
								revDict,
								A2(
									$author$project$Queries$findResearchWithAuthor,
									search.author,
									A2($author$project$Queries$findResearchWithTitle, search.title, lst)))))));
		}
	});
var $author$project$Worker$update = F2(
	function (msg, model) {
		switch (model.$) {
			case 'Loading':
				if (msg.$ === 'LoadData') {
					var res = msg.a;
					if (res.$ === 'Ok') {
						var data = res.a;
						var keywordSet = $author$project$EnrichedResearch$keywordSet(data);
						return _Utils_Tuple2(
							$author$project$Worker$Loaded(
								{
									keywords: keywordSet,
									problems: _List_Nil,
									research: data,
									reverseKeywordDict: $author$project$Research$reverseKeywordDict(data)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var e = res.a;
						return _Utils_Tuple2(
							A2(
								$author$project$Worker$problemize,
								$author$project$Worker$LoadError(e),
								model),
							$author$project$Worker$debug(
								$author$project$Worker$errorToString(e)));
					}
				} else {
					var json = msg.a;
					var _v3 = A2($elm$json$Json$Decode$decodeValue, $author$project$Queries$decodeSearchQuery, json);
					if (_v3.$ === 'Ok') {
						var query = _v3.a;
						return _Utils_Tuple2(
							A2($author$project$Worker$LoadingWithQuery, query, _List_Nil),
							$elm$core$Platform$Cmd$none);
					} else {
						var e = _v3.a;
						return _Utils_Tuple2(
							A2($author$project$Worker$problemize, $author$project$Worker$DecodeError, model),
							$author$project$Worker$debug(
								$elm$json$Json$Decode$errorToString(e)));
					}
				}
			case 'Loaded':
				var lmodel = model.a;
				if (msg.$ === 'SearchQuery') {
					var json = msg.a;
					var _v5 = A2($elm$json$Json$Decode$decodeValue, $author$project$Queries$decodeSearchQuery, json);
					if (_v5.$ === 'Ok') {
						var q = _v5.a;
						switch (q.$) {
							case 'FindKeywords':
								var str = q.a;
								var kwSorting = q.b;
								return _Utils_Tuple2(
									$author$project$Worker$Loaded(lmodel),
									$author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$Keywords(
												A3($author$project$Worker$findKeywords, str, kwSorting, lmodel.keywords)))));
							case 'FindResearch':
								var search = q.a;
								return _Utils_Tuple2(
									$author$project$Worker$Loaded(lmodel),
									$author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$RankedExpositions(
												A3($author$project$Worker$searchResearch, search, lmodel.reverseKeywordDict, lmodel.research)))));
							case 'GetAllKeywords':
								return _Utils_Tuple2(
									$author$project$Worker$Loaded(lmodel),
									$author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$AllKeywords(
												A3($author$project$Worker$findKeywords, '', $author$project$Research$Alphabetical, lmodel.keywords)))));
							case 'GetAllPortals':
								return _Utils_Tuple2(
									$author$project$Worker$Loaded(lmodel),
									$author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$AllPortals(
												$author$project$Research$getAllPortals(lmodel.research)))));
							default:
								var id = q.a;
								return _Utils_Tuple2(
									$author$project$Worker$Loaded(lmodel),
									$author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$Exposition(
												A2($author$project$Queries$findExpositionWithId, id, lmodel.research)))));
						}
					} else {
						var e = _v5.a;
						return _Utils_Tuple2(
							A2(
								$author$project$Worker$problemize,
								$author$project$Worker$DecodeError,
								$author$project$Worker$Loaded(lmodel)),
							$author$project$Worker$debug(
								$elm$json$Json$Decode$errorToString(e)));
					}
				} else {
					var res = msg.a;
					if (res.$ === 'Ok') {
						var data = res.a;
						return _Utils_Tuple2(
							$author$project$Worker$Loaded(
								_Utils_update(
									lmodel,
									{
										keywords: $author$project$Research$keywordSet(data),
										research: data
									})),
							$elm$core$Platform$Cmd$none);
					} else {
						var e = res.a;
						return _Utils_Tuple2(
							A2(
								$author$project$Worker$problemize,
								$author$project$Worker$LoadError(e),
								$author$project$Worker$Loaded(lmodel)),
							$author$project$Worker$debug(
								$author$project$Worker$errorToString(e)));
					}
				}
			default:
				var q = model.a;
				var otherQs = model.b;
				if (msg.$ === 'LoadData') {
					var res = msg.a;
					if (res.$ === 'Ok') {
						var data = res.a;
						var reverseKeywordDict = $author$project$Research$reverseKeywordDict(data);
						var kws = $author$project$Research$keywordSet(data);
						var cmdOfQ = function (query) {
							switch (query.$) {
								case 'FindKeywords':
									var str = query.a;
									var kwsorting = query.b;
									return $author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$Keywords(
												A3($author$project$Worker$findKeywords, str, kwsorting, kws))));
								case 'FindResearch':
									var search = query.a;
									var keywords = $author$project$Queries$getKeywords(search);
									return $author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$RankedExpositions(
												A3(
													$author$project$Queries$findResearchWithKeywords,
													keywords,
													reverseKeywordDict,
													$author$project$Queries$Unranked(data)))));
								case 'GetAllKeywords':
									return $author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$AllKeywords(
												A3($author$project$Worker$findKeywords, '', $author$project$Research$Alphabetical, kws))));
								case 'GetAllPortals':
									return $author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$AllPortals(
												$author$project$Research$getAllPortals(data))));
								default:
									var id = query.a;
									return $author$project$Worker$returnResults(
										$author$project$Queries$encodeSearchResult(
											$author$project$Queries$Exposition(
												A2($author$project$Queries$findExpositionWithId, id, data))));
							}
						};
						return _Utils_Tuple2(
							$author$project$Worker$Loaded(
								{keywords: kws, problems: _List_Nil, research: data, reverseKeywordDict: reverseKeywordDict}),
							$elm$core$Platform$Cmd$batch(
								A2(
									$elm$core$List$map,
									cmdOfQ,
									A2($elm$core$List$cons, q, otherQs))));
					} else {
						var e = res.a;
						return _Utils_Tuple2(
							A2(
								$author$project$Worker$problemize,
								$author$project$Worker$LoadError(e),
								$author$project$Worker$Loaded(
									{
										keywords: $author$project$Research$emptyKeywordSet,
										problems: _List_Nil,
										research: _List_Nil,
										reverseKeywordDict: $author$project$Research$reverseKeywordDict(_List_Nil)
									})),
							$author$project$Worker$debug(
								$author$project$Worker$errorToString(e)));
					}
				} else {
					var json = msg.a;
					var _v11 = A2($elm$json$Json$Decode$decodeValue, $author$project$Queries$decodeSearchQuery, json);
					if (_v11.$ === 'Ok') {
						var query = _v11.a;
						return _Utils_Tuple2(
							A2(
								$author$project$Worker$LoadingWithQuery,
								q,
								A2($elm$core$List$cons, query, otherQs)),
							$elm$core$Platform$Cmd$none);
					} else {
						var e = _v11.a;
						return _Utils_Tuple2(
							A2($author$project$Worker$problemize, $author$project$Worker$DecodeError, model),
							$author$project$Worker$debug(
								$elm$json$Json$Decode$errorToString(e)));
					}
				}
		}
	});
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$Worker$main = $elm$core$Platform$worker(
	{init: $author$project$Worker$init, subscriptions: $author$project$Worker$subscriptions, update: $author$project$Worker$update});
_Platform_export({'Worker':{'init':$author$project$Worker$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));