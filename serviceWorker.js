const staticCalculator = "calculator-v1";

const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/favicon/favicon-96x96.png",
    "/favicon/favicon-32x32.png",
    "/favicon/favicon-16x16.png"
]



self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticCalculator).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})


