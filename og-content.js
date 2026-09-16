// config/meta.js

const DEFAULT_META = {
  title: 'Детский театр Аквариум - Санкт-Петербург',
  description: 'Детский музыкально-драматический театр «Аквариум». Яркие музыкально-драматические и кукольные спектакли для детей от 2х лет в Санкт-Петербурге.',
  image: '/img/og/og-default.jpg',
  type: 'website',
};

function buildMeta(overrides = {}) {
  return { ...DEFAULT_META, ...overrides };
}

// ---------- Статичные страницы ----------

const PAGES_META = {

  // Главная
  welcome: buildMeta({
    title: 'Детский театр Аквариум - Санкт-Петербург',
    description: 'Детский музыкально-драматический театр «Аквариум». Яркие музыкально-драматические и кукольные спектакли для детей от 2х лет в Санкт-Петербурге. Театральная студия, Театр народного творчества, групповые посещения.',
    image: '/img/og/og-default.jpg',
    url: "welcome",
  }),

  // Афиша (список ближайших спектаклей/дат)
  playbill: buildMeta({
    title: 'Афиша спектаклей — Театр Аквариум',
    description: 'Расписание спектаклей детского театра «Аквариум» в Санкт-Петербурге. Актуальные даты и билеты на ближайшие показы.',
    image: '/img/og/og-poster.jpg',
    url: "playbill",
  }),

  // Труппа (список актёров)
  troupe: buildMeta({
    title: 'Аактёры театра Аквариум',
    description: 'Актёры детского музыкально-драматического театра «Аквариум»: биографии, роли, фотографии.',
    image: '/img/og/og-troupe.jpg',
    url: "troupe",
    
  }),

  // Репертуар (список всех спектаклей)
  repertoire: buildMeta({
    title: 'Спектакли театра Аквариум',
    description: 'Полный репертуар детского театра «Аквариум»: музыкально-драматические и кукольные спектакли для детей от 2х лет.',
    image: '/img/og/og-repertoire.jpg',
    url: "repertoire",
  }),

  // Отзывы
  reviews: buildMeta({
    title: 'Отзывы о театре Аквариум',
    description: 'Отзывы родителей и зрителей о спектаклях, ТНТ, театральной студии, лагере детского театра «Аквариум» в Санкт-Петербурге.',
    image: '/img/og/og-reviews.jpg',
    url: "reviews",
  }),

  // Доступная среда
  accessibility: buildMeta({
    title: 'Доступная среда — Театр Аквариум',
    description: 'Информация об условиях доступности театра «Аквариум» для людей с ограниченными возможностями здоровья. И маршруты до театра.',
    image: '/img/og/og-accessibility.jpg',
    url: "accessible-environment",
  }),

  // Коллективное посещение (для школ, садов, групп)
  collectiveVisit: buildMeta({
    title: 'Коллективные посещения — Театр Аквариум',
    description: 'Организация коллективных посещений спектаклей театра «Аквариум» для детских садов, школ и групп.',
    image: '/img/og/og-group-visit.jpg',
    url: "collective-visit",
  }),

  // Театральная студия
  daramaSchool: buildMeta({
    title: 'Театральная студия — Театр Аквариум',
    description: 'Театральная студия при театре «Аквариум»: занятия актёрским мастерством для детей в Санкт-Петербурге.',
    image: '/img/og/og-theater-studio.jpg',
    url: "darama-school",
  }),

  // Театр народного творчества
  tnt: buildMeta({
    title: 'Театр народного творчества — Аквариум',
    description: 'Театр народного творчества при театре «Аквариум».',
    image: '/img/og/og-folk-art-theater.jpg',
    url: "tnt",
  }),

};

// ---------- Динамические страницы ----------

// Страница конкретного спектакля
function performanceMeta(spectacle, id) {
  return buildMeta({
    title: `${spectacle.title} — Театр Аквариум`,
    description: spectacle.origin || DEFAULT_META.description,
    image: spectacle.title_image || '/img/og/og-repertoire.jpg',
    type: 'article',
    url: `performance/${id}`,
  });
}

// Страница конкретного актёра
function actorMeta(actor) {
  return buildMeta({
    title: `${actor.last_name} ${actor.first_name} ${actor.patronymic}  — актёр театра Аквариум`,
    description: actor.role_name || DEFAULT_META.description,
    image: actor.portrait || '/img/og/og-troupe.jpg',
    type: 'profile',
    url: `actor/${actor.actor_id}`,
  });
}

export  {
  buildMeta,
  DEFAULT_META,
  PAGES_META,
  performanceMeta,
  actorMeta,
};