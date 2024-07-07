/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from "$service-worker";
// console.log('files:', files)
// console.log('build:', build)
// console.log('version:', version)

const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files, // everything in `static`
];

self.addEventListener("install", (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) {
				await caches.delete(key);
			}
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "POST" && event.request.method !== "GET") return;

	if (event.request.method == "POST") {
		const url = new URL(event.request.url);
		// console.log('method:', event.request.method)
		// console.log('url:', url.pathname)
		return;
	}

	async function respond() {
		const url = new URL(event.request.url);

		const cache = await caches.open(CACHE);

		// serving build files
		if (ASSETS.includes(url.pathname)) {
			const cachedResponse = await cache.match(url.pathname);
			if (cachedResponse) {
				return cachedResponse;
			}
		}

		// Network first
		try {
			const response = await fetch(event.request);

			// if we're offline, fetch can return a value that is not a Response
			// instead of throwing - and we can't pass this non-Response to respondWith
			if (!(response instanceof Response)) {
				throw new Error("invalid response from fetch");
			}

			// caching the response
			if (response.status === 200) {
				// console.log('Caching response', url.pathname)
				cache.put(event.request, response.clone());
			}
			// console.log('Serving from network: ', url.pathname)
			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				// console.log('Serving from cache: ', url.pathname)
				return response;
			}

			throw err;
		}
	}

	event.respondWith(respond());
});
