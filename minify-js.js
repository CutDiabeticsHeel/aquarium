import { minify } from "terser";

async function minifyJs(js) {
    const result = await minify(js, {
        compress: true,
        mangle: true,
        format: {
            comments: false
        }
    });

    return result.code;
}
export default  minifyJs;