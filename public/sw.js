// HotelSwiss Service Worker for Enhanced Caching (Native Nuxt 3 API)
const CACHE_NAME = 'hotelswiss-v2'
const API_CACHE_NAME = 'hotelswiss-api-v2'
const IMAGE_CACHE_NAME = 'hotelswiss-images-v2'
const STATIC_CACHE_NAME = 'hotelswiss-static-v2'

// Cache strategies
const cacheStrategies = {
  // Network first with cache fallback for API requests
  // Note: Server-side caching is handled by Nuxt's cachedEventHandler,
  // this provides client-side fallback for offline scenarios
  networkFirst: async (request) => {
    try {
      const networkResponse = await fetch(request)
      if (networkResponse.ok) {
        const cache = await caches.open(API_CACHE_NAME)
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    } catch (error) {
      const cachedResponse = await caches.match(request)
      if (cachedResponse) {
        return cachedResponse
      }
      throw error
    }
  },

  // Cache first for images and static assets
  cacheFirst: async (request) => {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    try {
      const networkResponse = await fetch(request)
      if (networkResponse.ok) {
        const cache = await caches.open(IMAGE_CACHE_NAME)
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    } catch (error) {
      // Return a fallback response for images if needed
      if (request.destination === 'image') {
        return new Response('', { status: 404 })
      }
      throw error
    }
  },

  // Stale while revalidate for pages
  staleWhileRevalidate: async (request) => {
    const cachedResponse = await caches.match(request)

    const fetchPromise = fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        const cache = caches.open(CACHE_NAME)
        cache.then(c => c.put(request, networkResponse.clone()))
      }
      return networkResponse
    }).catch(() => cachedResponse)

    return cachedResponse || fetchPromise
  }
}

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/assets/css/base.css',
        '/assets/fonts/Roboto/roboto-regular.woff2',
        '/assets/fonts/Patua_One/PatuaOne-Regular.woff2',
        '/favicon.ico',
      ]).catch(error => {
        console.warn('Cache pre-loading failed:', error)
      })
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![CACHE_NAME, API_CACHE_NAME, IMAGE_CACHE_NAME, STATIC_CACHE_NAME].includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - apply caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // API requests - network first with cache fallback
  if (url.pathname.includes('/api/')) {
    event.respondWith(cacheStrategies.networkFirst(request))
    return
  }

  // Images - cache first
  if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
    event.respondWith(cacheStrategies.cacheFirst(request))
    return
  }

  // Static assets - cache first
  if (url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/i)) {
    event.respondWith(cacheStrategies.cacheFirst(request))
    return
  }

  // Same origin pages - stale while revalidate
  if (url.origin === location.origin) {
    event.respondWith(cacheStrategies.staleWhileRevalidate(request))
    return
  }
})

// Background sync for API requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'cache-refresh') {
    event.waitUntil(
      // Refresh critical API endpoints using new native Nuxt 3 structure
      Promise.allSettled([
        fetch('/api/first-screen').then(response => {
          if (response.ok) {
            caches.open(API_CACHE_NAME).then(cache => {
              cache.put('/api/first-screen', response.clone())
            })
          }
        }),
        fetch('/api/categories').then(response => {
          if (response.ok) {
            caches.open(API_CACHE_NAME).then(cache => {
              cache.put('/api/categories', response.clone())
            })
          }
        }),
        fetch('/api/cantons').then(response => {
          if (response.ok) {
            caches.open(API_CACHE_NAME).then(cache => {
              cache.put('/api/cantons', response.clone())
            })
          }
        }),
        fetch('/api/filters').then(response => {
          if (response.ok) {
            caches.open(API_CACHE_NAME).then(cache => {
              cache.put('/api/filters', response.clone())
            })
          }
        }),
        fetch('/api/amenities').then(response => {
          if (response.ok) {
            caches.open(API_CACHE_NAME).then(cache => {
              cache.put('/api/amenities', response.clone())
            })
          }
        }),
      ])
    )
  }
})

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'CACHE_CLEAR') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        )
      }).then(() => {
        event.ports[0].postMessage({ success: true })
      })
    )
  }

  if (event.data && event.data.type === 'CACHE_STATS') {
    event.waitUntil(
      caches.keys().then(async (cacheNames) => {
        const stats = {}
        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName)
          const keys = await cache.keys()
          stats[cacheName] = keys.length
        }
        event.ports[0].postMessage({ stats })
      })
    )
  }
})
