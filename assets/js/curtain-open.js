window.addEventListener('pageshow', () => {
    const leftCurtain = document.querySelector('.curtain-left');
    const rightCurtain = document.querySelector('.curtain-right');

    leftCurtain.classList.add('opening');
    rightCurtain.classList.add('opening');
});