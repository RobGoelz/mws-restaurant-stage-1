
// this file was created with a lot of help from both Matthew Cranford's
// overview of service worker (https://goo.gl/EUu976), and also Doug Brown's
// YouTube walkthrough of this section: https://youtu.be/92dtrNU1GQc?t=2467

let cacheID = 'restaurant-001';

const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/js/*',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/register.js',
  '/js/restaurant_info.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

self.addEventListener('install', function(evt) {
  evt.waitUntil(
    caches.open(cacheID).then(function (cache) {
      return cache.addAll(cacheFiles);
    })
      .catch(function (error) {
        console.log(`Cache open failed with: ${error}`);
      })
  );
});

self.addEventListener('fetch',function(evt) {
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      if (response) {
        console.log(`Found ${evt.request} in cache`);
        return response;
      } else {
        console.log(`Could not find ${evt.request} in cache, FETCHING!`);
        return fetch(evt.request)
          .then(function (response) {
            const clonedResponse = response.clone();
            caches.open(cacheID).then(function (cache) {
              cache.put(evt.request, clonedResponse);
            })
            return response;
          })
          .catch(function (error) {
            console.log(`Failed to with: ${error}`);
          });
      }
    })
  );
});
