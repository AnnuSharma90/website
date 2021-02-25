const view = document.getElementsByClassName("view");

for (let i = 0; i < view.length; i++) {
  view[i].addEventListener("click", function (e) {
    let id = e.target.id;
    let idNumeric = id.substring(0, id.index('_'));

    let image = document.getElementById(idNumeric + '_img');
    window.open(image.src);
  });
}
