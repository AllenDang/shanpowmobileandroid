template.helper('Math', Math);
template.helper('$substring', function (string, index, length) {
  return string.substring(index, length);
});