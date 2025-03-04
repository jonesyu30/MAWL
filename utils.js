function changeScreen(fromDiv, toDiv) {
    var screen = document.getElementById(fromDiv);
    screen.style.display = "none";
    screen = document.getElementById(toDiv);
    screen.style.display = "block";
}
