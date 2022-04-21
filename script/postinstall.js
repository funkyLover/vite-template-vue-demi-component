// from https://stackoverflow.com/questions/23076968/npm-postinstall-only-on-development
const crossEnv = require("cross-env");
const env = process.env;

if (
  // if INIT_CWD (yarn/npm install invocation path) and PWD
  // are the same, then local (dev) install/add is taking place
  env.INIT_CWD === env.PWD ||
  // local (dev) yarn install may have been run
  // from a project subfolder
  env.INIT_CWD.indexOf(env.PWD) === 0
) {
  // patch after local install 
  crossEnv(["patch-package", "--patch-dir", "./script/patches"]);
} else {
  // from https://juejin.cn/post/7055261325911719944
  const { switchVersion, loadModule } = require("./utils");
  const Vue = loadModule("vue");
  if (!Vue || typeof Vue.version !== "string") {
    console.warn(
      '[vue3-sketch-ruler] Vue is not found. Please run "npm install vue" to install.'
    );
  } else if (Vue.version.startsWith("2.")) {
    switchVersion(2);
  } else if (Vue.version.startsWith("3.")) {
    switchVersion(3);
  } else {
    console.warn(
      `[vue3-sketch-ruler] Vue version v${Vue.version} is not suppported.`
    );
  }
}
