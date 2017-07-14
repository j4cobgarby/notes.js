function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  var body = document.body;
  var docEl = document.documentElement;
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return {
    top: Math.round(top),
    left: Math.round(left)
  };
}

function Notify(element, type, text, posMode = 1, time = 2500, spacing = 15) {
  var elRect = element.getBoundingClientRect()
  var coords = getCoords(element)

  var ntf = document.createElement("DIV")
  ntf.className = ("inline-notification in " + type)
  ntf.innerHTML = text
  ntf.style.top = (coords.top).toString() + "px"

  if (posMode == 1) {
    ntf.style.left = (element.clientWidth + elRect.left + spacing).toString() + "px"
  } else if (posMode == 2) {
    ntf.style.right = ((window.innerWidth - elRect.right) + element.clientWidth + spacing).toString() + "px"
  } else if (posMode == 3) {
    ntf.style.left = (elRect.left + spacing).toString() + "px"
  } else if (posMode == 4) {
    ntf.style.right = (window.innerWidth - elRect.right).toString() + "px"
  }

  document.body.appendChild(ntf)

  if (time != Infinity) {
    setTimeout(function() {
      ntf.classList.remove('in')
      ntf.classList.add('out')
      setTimeout(function() {
        document.body.removeChild(ntf)
      }, 300)
    }, time)
  }
}
