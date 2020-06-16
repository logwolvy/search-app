### Instructions
##### Without docker
`npm install`\
`npm start` (Starts dev server)

##### With docker
`docker build -t search-app:1.0 .` (Prod optimized build)\
`docker run -p 3000:80 search-app:1.0`

-------------

##### Pros
- Extensible search utility for adding query analyzer, positional frequency etc. in future
- Boolean search implemented with inverted indexes allows partial matches
- 3 column layout for book selections

##### Cons or things yet to implement
- Binary search on inverted index or radix tree for token level autocompletion
- Query analyzer for weighing down common words
- Positional frequency and inverted document frequency(IDF) to improve relevancy scoring
- CSS media queries for responsiveness (not very good at this)
- Component tests
- Refactoring `autocomplete-search` component to break it down further
