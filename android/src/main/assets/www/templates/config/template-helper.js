template.helper('Math', Math);

template.helper('$substring', function (string, index, length) {
  if ((string ? string.length : 0) > length + index) {return string.substring(index, length) + "...";};
  return string;
});

template.helper('$add', function () {
  var result = 0;
  for (var i = arguments.length - 1; i >= 0; i--) {
    result += (arguments[i] || 0);
  };
  return result;
});

template.helper('$len', function (collection) {
  return collection.length;
});

template.helper('$array', function (size) {
  return new Array(size);
});

template.helper('$sub', function (x, y) {
  return x - y;
});


template.helper('$unescape', function (string) {
  return unescape(string);
});

