// webpack require.context 对应 vite写法
// const modulesFiles = require.context('./modules', true, /\.js$/) // webpack
// const modulesFiles = import.meta.globEager("./module/*.js") // vite
const files = import.meta.globEager("./*.js"); // vite
const modules = {};
for (const key in files) {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        modules[key.replace(/(\.\/|\.js)/g, '')] = files[key].default
    }
}

export default modules;

