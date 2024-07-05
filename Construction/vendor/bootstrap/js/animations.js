document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: Stop observing after it becomes visible
            }
        });
    });

    const mainTitle = document.getElementById('mainTitle');
    const subTitle = document.getElementById('subTitle');
    observer.observe(mainTitle);
    observer.observe(subTitle);
});