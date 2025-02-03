document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.nav-right input[type="text"]');
    const searchButton = document.querySelector('.nav-right button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Perform the search operation (e.g., redirect to a search results page)
            console.log(`Searching for: ${query}`);
            // Example: window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});