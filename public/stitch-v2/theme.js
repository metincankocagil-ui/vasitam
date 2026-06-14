(function () {
  var storageKey = "vasitan-theme";
  var root = document.documentElement;

  function getPreferredTheme() {
    var saved = localStorage.getItem(storageKey) || localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return "dark";
  }

  function applyTheme(theme) {
    var isLight = theme === "light";
    root.classList.toggle("light", isLight);
    root.classList.toggle("dark", !isLight);
    localStorage.setItem(storageKey, theme);
    localStorage.setItem("theme", theme);

    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-label", isLight ? "Koyu temaya geç" : "Açık temaya geç");
      button.setAttribute("aria-pressed", String(!isLight));
      var icon = button.querySelector(".material-symbols-outlined");
      if (icon) {
        icon.textContent = isLight ? "light_mode" : "dark_mode";
      }
    });
  }

  function toggleTheme() {
    applyTheme(root.classList.contains("light") ? "dark" : "light");
  }

  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getPreferredTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        toggleTheme();
      });
    });
  });
})();
