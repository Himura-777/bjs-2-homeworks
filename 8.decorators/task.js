//Задача № 1
function cachingDecoratorNew(func) {
	let cache = [];
	const maxCacheValuesCount = 5;
	return (...args) => {
		const hash = md5(JSON.stringify(args));

		const cacheItem = cache.find(item => item.hash === hash);

		if (cacheItem) {
			console.log(`Из кеша: ${cacheItem.result}`);
			return `Из кеша: ${cacheItem.result}`;
		}

		const result = func(...args);
		console.log(`Вычисляем: ${result}`);

		cache.push({ hash, result });

		if (cache.length > maxCacheValuesCount) {
			cache.shift();
		}

		return `Вычисляем: ${result}`;
	};
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
	let timeoutId = null;
	wrapper.count = 0;
	wrapper.allCount = 0;

	function wrapper(...args) {
		wrapper.allCount += 1;

		if (timeoutId === null) {
			func.apply(this, args);
			wrapper.count++;
		}
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func.apply(this, args);
			wrapper.count++;
		}, delay);
	}

	return wrapper;
}

module.exports = {
	debounceDecoratorNew,
};
