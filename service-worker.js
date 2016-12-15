// const VERSION = 1;

const filesToCache = [
	'./',
	'./index.html',
	'./favicon.ico',
	'./sudoku-128x128.png',
	'./sudoku-144x144.png',
	'./sudoku-152x152.png',
	'./sudoku-192x192.png',
	'./sudoku-256x256.png'
];

var dataCacheName = 'sudoku-appData-v1';
var cacheName = 'sudoku-v1';

self.addEventListener('install', function(e){
	console.log('[ServiceWorker] install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache){
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	)
});

self.addEventListener('activate', function(e){
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function(keyList){
			return Promise.all(keyList.map(function(key){
				if(key !== changeName && key !== dataCacheName){
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});
