
const monthMap = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
const date = Temporal.Now.plainDateISO();
let month = monthMap[date.month - 1];
let day = date.day;

const firstDay = date.with({ day: 1 });
const lastDay = firstDay.add({ months: 1 }).subtract({ days: 1 });
const weekendsList = document.querySelector('.dates-list');
const playbill = document.querySelector('.playbill');
const performancesList = document.querySelector('.performances-list')

function getWeekends(startDate, endDate) {
    const weekends = [];
    let currentDate = startDate;

    while (Temporal.PlainDate.compare(currentDate, endDate) <= 0){
        const dayOfWeek = currentDate.dayOfWeek
        if (dayOfWeek == 6 || dayOfWeek == 7) {
            weekends.push(currentDate.day);
        }
        currentDate = currentDate.add({days: 1});
    }
    return weekends
}

const weekends = getWeekends(firstDay, lastDay) 

function displayDates() {
    for (let day of weekends){
        let weekendsListItem = document.createElement('li');
        weekendsListItem.textContent = `${day} ${month}`;
        weekendsListItem.classList.add("dates-list__item", "swiper-slide");
        let charmonth = null;
        if (date.month < 10){
            charmonth = `0${date.month}`
        }
        weekendsListItem.dataset.date = `${day}.${charmonth}`;
        weekendsList.append(weekendsListItem);
    }
    let weekendsListItem = document.createElement('li');
    weekendsListItem.textContent = "Сбросить фильтр";
    weekendsListItem.classList.add("dates-list__item", "remove-filter", "swiper-slide");
    weekendsList.append(weekendsListItem);

    return weekendsList
}
displayDates();

const performancesDates = document.querySelectorAll(".dates-list__item");
const performancesItem = document.querySelectorAll(".performances-list__item")
const removeFilter = document.querySelector(".remove-filter")
const modal = document.querySelector(".hidden-modal")

function updateCounter(){
    let visiblePerformance = 0;
    for (let performance of performancesItem){
        if (!performance.classList.contains("hidden")){
            visiblePerformance++;
        }
    }
    modal.classList.toggle("hidden-modal", visiblePerformance !== 0)
    modal.classList.toggle("zero-performances", visiblePerformance === 0) 
}

for (let date of performancesDates) {
    date.addEventListener("click", () => {

        for (let performance of performancesItem) {

            const shouldHide = performance.dataset.date !== date.dataset.date;

            performance.classList.toggle("hidden", shouldHide);
        }

        updateCounter();
    });
}

removeFilter.addEventListener("click", () => {

    for (let performance of performancesItem) {
        performance.classList.remove("hidden");
    }

    updateCounter();
});

const swiper = new Swiper('.dates-list-swiper', {
    freeMode: true,
    spaceBetween: 15,
    mousewheel: true,
    mousewheel: {
        sensitivity: 0.6,
    },
    slidesPerView: 'auto',
    resistance: true,
    resistanceRatio: 0.85,
});
