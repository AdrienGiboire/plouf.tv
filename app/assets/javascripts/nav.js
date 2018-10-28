window.onload = () => {
  // Hamburger to X toggle
  document.querySelector('#nav-toggle').addEventListener('click', function () {
    this.classList.toggle('active')
    toggle(document.querySelector('nav ul.nav-list'))
  })
}
