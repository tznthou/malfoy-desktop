// electron-builder afterPack：打包后、做 dmg 之前补一次完整的 ad-hoc 签名。
// identity 为 null 时 electron-builder 不签名，.app 只剩 linker 签名，浏览器下载后会被判「已损坏」。
const { execSync } = require("child_process");
const path = require("path");

exports.default = async function (context) {
  if (context.electronPlatformName !== "darwin") return;

  const appPath = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.app`);
  console.log(`Ad-hoc signing: ${appPath}`);

  execSync(`codesign --force --deep -s - "${appPath}"`, { stdio: "inherit" });
  execSync(`codesign --verify --deep --strict "${appPath}"`, { stdio: "inherit" });

  console.log("Ad-hoc signing complete");
};
