const leftCurtain = document.querySelector('.curtain-left');
const rightCurtain = document.querySelector('.curtain-right');

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');

    if (!link || link.target === '_blank') return;

    const href = link.href;

    if (new URL(href).origin !== location.origin) return;

    e.preventDefault();

    leftCurtain.classList.add('closing');
    rightCurtain.classList.add('closing');

    setTimeout(() => {
        window.location.href = href;
    }, 800);
});