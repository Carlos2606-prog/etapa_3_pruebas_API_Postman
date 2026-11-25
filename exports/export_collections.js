const fs = require('fs');
const path = require('path');

const exportDir = 'C:\\Users\\muril\\OneDrive\\Documentos\\tmp\\Electiva\\Postman\\exports';
if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

function makeId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c=='x'?r:(r&0x3|0x8);
    return v.toString(16);
  });
}

var collections = [
  {
    name: 'Directions_API_Playground',
    id: '3BA35068f2F1FFAE0aEa3BD7',
    requests: [{
      name: 'https://api.mapbox.com/directions/v5/mapbox/walking/-73.36189%2C5.533118%3B-73.357405%2C5.55228',
      url: 'https://api.mapbox.com/directions/v5/mapbox/walking/-73.36189%2C5.533118%3B-73.357405%2C5.55228',
      method: 'GET',
      query: [
        {key:'alternatives',value:'true'},
        {key:'continue_straight',value:'true'},
        {key:'geometries',value:'geojson'},
        {key:'language',value:'en'},
        {key:'overview',value:'full'},
        {key:'steps',value:'true'},
        {key:'access_token',value:'{{mapbox_api_token_1cj1}}'}
      ]
    }]
  },
  {
    name: 'Static_Images_API',
    requests: [{
      name: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/-73.3635,5.5366,17,0/300x200.png',
      url: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/-73.3635,5.5366,17,0/300x200.png',
      method: 'GET',
      query: [
        {key:'attribution',value:'true'},
        {key:'logo',value:'true'},
        {key:'access_token',value:'{{mapbox_api_token_1cj1}}'}
      ]
    }]
  },
  {
    name: 'Search_Box_API_Forward_And_Reverse',
    requests: [{
      name: 'https://api.mapbox.com/search/searchbox/v1/forward',
      url: 'https://api.mapbox.com/search/searchbox/v1/forward',
      method: 'GET',
      query: [
        {key:'q',value:'tunja++exito'},
        {key:'access_token',value:'{{mapbox_api_token_1cj1}}'}
      ]
    }]
  },
  {
    name: 'MapBox_Standard_Style',
    requests: [{
      name: 'https://api.mapbox.com/styles/v1/mapbox/standard',
      url: 'https://api.mapbox.com/styles/v1/mapbox/standard',
      method: 'GET',
      query: [
        {key:'access_token',value:'{{mapbox_api_token_1cj1}}'}
      ]
    }]
  },
  {
    name: 'Geocoding_API',
    requests: [{
      name: 'https://api.mapbox.com/search/geocode/v6/forward',
      url: 'https://api.mapbox.com/search/geocode/v6/forward',
      method: 'GET',
      query: [
        {key:'access_token',value:'{{mapbox_api_token_1cj1}}'},
        {key:'place',value:'Tunja'},
        {key:'country',value:'Colombia'},
        {key:'postcode',value:'150002'}
      ]
    }]
  },
  {
    name: 'Map_Matching_API',
    requests: [{
      name: 'https://api.mapbox.com/matching/v5/mapbox/driving/-73.356313,5.546293;-73.351869,5.551301;-73.350691,5.549875',
      url: 'https://api.mapbox.com/matching/v5/mapbox/driving/-73.356313,5.546293;-73.351869,5.551301;-73.350691,5.549875',
      method: 'GET',
      query: [
        {key:'q',value:'tunja++exito'},
        {key:'access_token',value:'{{mapbox_api_token_1cj1}}'}
      ]
    }]
  },
  {
    name: 'Isochrone_API',
    requests: [{
      name: 'https://api.mapbox.com/isochrone/v1/mapbox/driving-traffic/-73.361890,5.533118',
      url: 'https://api.mapbox.com/isochrone/v1/mapbox/driving-traffic/-73.361890,5.533118',
      method: 'GET',
      query: [
        {key:'contours_minutes',value:'10'},
        {key:'contours_colors',value:'2723fb'},
        {key:'polygons',value:'true'},
        {key:'denoise',value:'1'},
        {key:'access_token',value:'{{mapbox_api_token_1cj1}}'}
      ]
    }]
  },
  {
    name: 'Search_Box_API_Suggest_And_Retrieve',
    requests: [{
      name: 'https://api.mapbox.com/search/searchbox/v1/retrieve/dXJuOm1ieHBvaToxYzE3MTM3OS03ZTNmLTRkNzgtOTU0MS0yNGNmOTljMDY3MTI',
      url: 'https://api.mapbox.com/search/searchbox/v1/retrieve/dXJuOm1ieHBvaToxYzE3MTM3OS03ZTNmLTRkNzgtOTU0MS0yNGNmOTljMDY3MTI',
      method: 'GET',
      query: [
        {key:'access_token',value:'{{mapbox_api_token_1cj1}}'},
        {key:'session_token',value:'sesion-tunja-01'}
      ]
    }]
  }
];

var results = [];
for (var i = 0; i < collections.length; i++) {
  var col = collections[i];
  var colId = col.id || makeId();
  var items = col.requests.map(function(req) {
    var qStr = req.query.map(function(q) { return q.key + '=' + q.value; }).join('&');
    var fullUrl = req.url + (qStr ? '?' + qStr : '');
    return {
      name: req.name,
      _postman_id: makeId(),
      request: {
        method: req.method,
        header: [],
        url: {
          raw: fullUrl,
          host: [req.url.replace(/https?:\/\//, '').split('/')[0]],
          path: req.url.replace(/https?:\/\/[^\/]+/, '').split('/').filter(Boolean),
          query: req.query.map(function(q) {
            return { key: q.key, value: q.value, disabled: false, description: '' };
          })
        },
        description: ''
      },
      response: []
    };
  });

  var collection = {
    info: {
      _postman_id: colId,
      name: col.name,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
    },
    item: items,
    variable: []
  };

  var outFile = path.join(exportDir, col.name + '.postman_collection.json');
  fs.writeFileSync(outFile, JSON.stringify(collection, null, 2), 'utf8');
  results.push('OK: ' + col.name);
}

console.log(results.join('\n'));
