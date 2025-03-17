document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.nav-right input[type="text"]');
    const searchButton = document.querySelector('.nav-right button');

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const paragraphs = document.querySelectorAll('p');
        let found = false;

        paragraphs.forEach(paragraph => {
            if (paragraph.textContent.toLowerCase().includes(query)) {
                paragraph.style.backgroundColor = 'yellow';
                found = true;
            } else {
                paragraph.style.backgroundColor = '';
            }
        });

        if (!found) {
            alert('No results found');
        }
    }

    searchButton.addEventListener('click', function() {
        performSearch();
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    searchInput.addEventListener('focus', function() {
        searchInput.value = '';
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            paragraph.style.backgroundColor = '';
        });
    });
});