/* This script supports IE9+ */
(function () {
  /* Opening modal window function */
  const openModal = (ele) => {
    //const originalSrc = ele.dataset.originalsrc || "";
    const src = ele.getAttribute("src");
    const image = new Image();
    image.className = "img";
    image.src = src;
    image.alt = "";
    const modalWindow = document.getElementById("jsModal");
    const modalImgContainer = document.getElementById("img-container");
    modalImgContainer.innerHTML = "";
    modalImgContainer.appendChild(image);

    modalWindow.classList
      ? modalWindow.classList.remove("hide")
      : (modalWindow.className += " " + "hide");
  };

  function closeModal() {
    /* Get close button */
    var closeButton = document.getElementsByClassName("jsModalClose");
    var closeOverlay = document.getElementsByClassName("jsOverlay");

    /* Set onclick event handler for close buttons */
    for (var i = 0; i < closeButton.length; i++) {
      closeButton[i].onclick = function () {
        var modalWindow = this.parentNode.parentNode;

        modalWindow.classList
          ? modalWindow.classList.add("hide")
          : (modalWindow.className = modalWindow.className.replace(
              new RegExp(
                "(^|\\b)" + "hide".split(" ").join("|") + "(\\b|$)",
                "gi"
              ),
              " "
            ));
      };
    }

    /* Set onclick event handler for modal overlay */
    for (var i = 0; i < closeOverlay.length; i++) {
      closeOverlay[i].onclick = function () {
        var modalWindow = this.parentNode;

        modalWindow.classList
          ? modalWindow.classList.add("hide")
          : (modalWindow.className = modalWindow.className.replace(
              new RegExp(
                "(^|\\b)" + "hide".split(" ").join("|") + "(\\b|$)",
                "gi"
              ),
              " "
            ));
      };
    }
  }

  /* Handling domready event IE9+ */
  function ready(fn) {
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  /* Triggering modal window function after dom ready */
  // ready(openModal);
  ready(closeModal);

  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.value.indexOf("image-thumb") > -1) {
      openModal(e.target);
    }
  });
})();
