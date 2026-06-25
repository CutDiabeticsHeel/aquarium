import { minify } from "terser";

async function minifyJs(js) {
    const result = await minify(js, {
        parse: {
            ecma: 2020
        },
        compress: {
            ecma: 2020
        },
        mangle: true,
        format: {
            comments: false
        }
    });

    return result.code;
}
export default minifyJs;