// In your service worker file (e.g., service-worker.js)

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/static/media')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          // If response found in cache, return it
          return response;
        }

        // If response not found in cache, fetch and cache it
        return fetch(event.request).then(fetchResponse => {
          // Clone the response as it's a stream and can only be consumed once
          const clonedResponse = fetchResponse.clone();

          caches.open('my-cache').then(cache => {
            // Cache the fetched response
            cache.put(event.request, clonedResponse);
          });

          return fetchResponse;
        });
      })
    );
  }
});
