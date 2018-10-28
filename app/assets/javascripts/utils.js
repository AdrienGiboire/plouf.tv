// Show an element
const show = (element) => {
  element.style.display = 'block'
}

// Hide an element
const hide = (element) => {
  element.style.display = 'none'
}

// Toggle element visibility
const toggle = (element) => {
  // If the element is visible, hide it
  if (window.getComputedStyle(element).display === 'block') {
    hide(element)
    return
  }

  // Otherwise, show it
  show(element)
}
