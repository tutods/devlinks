const htmlElement = document.documentElement;
const isDarkTheme = htmlElement.classList.contains("dark");

const svgIcon = document.getElementById("switch-icon");
const baseSpritePath = "./assets/icons-sprite.svg";

// set default href of icon
svgIcon.firstElementChild.setAttribute(
  "href",
  `${baseSpritePath}#${isDarkTheme ? "moon" : "sun"}`
);

const toggleTheme = () => {
  const useTag = svgIcon.firstElementChild;

  htmlElement.classList.toggle("dark");
  // change icon when change theme
  if (htmlElement.classList.contains("dark")) {
    useTag.setAttribute("href", `${baseSpritePath}#moon`);
  } else {
    useTag.setAttribute("href", `${baseSpritePath}#sun`);
  }
};

htmlElement.addEventListener("");
