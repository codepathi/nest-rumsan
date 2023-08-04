<h4>Caching without using redis</h4>

<h4>Fetching all books with cache</h4>
<b>Method:</b>
<ul>
  <li>Imported cacheManager and @nestjs/cache-manager.</li>
  <li>Imported cacheManger module in App module and made it global.</li>
  <li>Created instance of cacheManager in bookController.</li>
  <li>Created cache with key book while fetching for the first time, i.e. if cachedBook is null.</li>
  <li>If cachedBook is not null, just return the cache, no need to hit database. (Cache Hit)</li>
  <li>If cachedBook is null, fetch from database and also create cache with key 'books'. (Cache miss)</li>
</ul>

<h4>Implement Redis while caching.</h4>
