// WebMCP: exposes read-only site actions to browser agents. Does nothing where navigator.modelContext is missing.
(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext || !navigator.modelContext.provideContext) return;
  var origin = window.location.origin;
  function api(path) { return fetch(origin + path).then(function (r) { return r.json(); }); }
  navigator.modelContext.provideContext({
    tools: [
      {
        name: 'search_products',
        description: 'Search the e-bike catalogue by text, category, brand or maximum price (EUR).',
        inputSchema: { type: 'object', properties: { query: { type: 'string' }, category: { type: 'string' }, brand: { type: 'string' }, max_price: { type: 'number' } } },
        execute: function (a) {
          var p = new URLSearchParams();
          if (a.query) p.set('q', a.query); if (a.category) p.set('category', a.category); if (a.brand) p.set('brand', a.brand); if (a.max_price) p.set('max_price', String(a.max_price));
          return api('/api/products/?' + p.toString());
        },
      },
      { name: 'list_categories', description: 'List bike categories with model counts and starting prices.', inputSchema: { type: 'object', properties: {} }, execute: function () { return api('/api/categories/'); } },
      {
        name: 'get_product',
        description: 'Get one product by slug.',
        inputSchema: { type: 'object', properties: { slug: { type: 'string' } }, required: ['slug'] },
        execute: function (a) { return api('/api/products/' + encodeURIComponent(a.slug) + '/'); },
      },
    ],
  });
})();
