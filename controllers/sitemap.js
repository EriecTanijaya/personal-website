module.exports = (req, res) => {
  // This is just the domain you'll append the routes to
  const fh = process.env.blog_url;
  // we extract not null routes
  const routes = req.app._router.stack
    .map(r => (r.route ? r.route.path : null))
    .filter(r => r != null);
  // parse each routes in an array of array containing all the possible params rotations
  const realRoutes = parseRoutes(routes);
  
  // filter out null values and flatten the array
  const flattened = flattenArray(realRoutes);
  
  //hack to remove * at route
  //at index.js we have 
  //app.all("*", checkHttps);
  //so its count on "*"
  
  flattened.shift();
  
  // insert it into our XML
  const sitemapOutput = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${flattened.map(r => `<url><loc>${fh}${r}</loc></url>`).join("")}
    </urlset>`;
  // just send it
  res.status(200).end(sitemapOutput);
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
