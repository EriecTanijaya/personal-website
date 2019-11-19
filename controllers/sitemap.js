// const express = require("express");
// const app = new express();

module.exports = (req, res) => {

  
};

function parsePattern(subPattern) {
  let acceptedValues = subPattern
    ? subPattern.match(/\((\|?([a-z0-9-]+)\|?)+\)/gi)
    : null;
  if (acceptedValues) {
    acceptedValues =
      acceptedValues && acceptedValues.length
        ? acceptedValues[0].substr(1, acceptedValues[0].length - 2).split("|")
        : null;
    const urlMap = acceptedValues
      ? acceptedValues.map(param => {
          const optionRegex = new RegExp(
            `\\((([a-z0-9-]+\\|)+)?(${param})((\\|[a-z0-9-]+)+)?\\)`,
            "ig"
          );
          return subPattern.replace(optionRegex, `$3`);
        })
      : null;
    return parseRoutes(urlMap);
  }

  return subPattern;
}

function parseRoutes(routes) {
  const realRoutes = routes.map(route => {
    const subPattern = route.replace(
      /(:[a-z]+)?(\(([a-z0-9-]+\|?)+\))+/gi,
      `$2`
    );
    const acceptedValues = parsePattern(subPattern);
    return acceptedValues;
  });

  return realRoutes;
}

function flattenArray(arr) {
  const isNotFlat = arr.filter(a => typeof a === "object");
  if (isNotFlat.length) {
    const newFlat = [].concat.apply([], arr);
    return flattenArray(newFlat);
  }
  return arr;
}
