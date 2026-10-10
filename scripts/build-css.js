import * as esbuild from 'esbuild';

const OUT_DIR = 'assets/css-dist';

const SWIPER = './node_modules/swiper/swiper-bundle.min.css';
const FANCYBOX = './node_modules/@fancyapps/ui/dist/fancybox/fancybox.css';
const src = (file) => `assets/css/${file}`;

const bundles = {
    main: [
        SWIPER, FANCYBOX,
        src('main.css'),
        src('printery.css'),
        src('tag-style.css'),
        src('vendor.css'),
        src('partials/curtains.css'),
        src('partials/footer.css'),
        src('partials/header.css'),
        src('partials/theatre-location.css'),
        src('partials/visually-impared.css'),
    ],
    welcome: [
        src('index/about-theatre.css'),
        src('index/main-section.css'),
        src('index/services.css'),
    ],
    actor: [src('actor/actor.css')],
    'admin-panel': [src('admin-panel/admin-panel.css'), src('admin-panel/admin.css')],
    'collective-visit': [src('collective-visit/collective-visit-section.css')],
    'drama-school': [src('drama-school/drama-school-section.css')],
    performance: [src('performance/performance.css')],
    playbill: [src('playbill/playbill.css')],
    reviews: [src('reviews/reviews.css')],
    tnt: [src('tnt/tnt-section.css')],
    troupe: [src('troupe/troupe-section.css')],
    'accessible-environment': [src('accessible-environment/accessible-environment.css')],
    repertoire: [src('repertoire/repertoire.css')],
};

await Promise.all(
    Object.entries(bundles).map(([name, files]) =>
        esbuild.build({
            stdin: {
                contents: files.map((f) => `@import "${f}";`).join('\n'),
                resolveDir: process.cwd(),
                loader: 'css',
            },
            bundle: true,
            minify: true,
            outfile: `${OUT_DIR}/${name}.css`,
            external: [
                '/font/*', '/img/*', '/svg/*', '/gif/*',
                '../font/*', '../img/*', '../svg/*', '../gif/*',
            ],
        })
    )
);