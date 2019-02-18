"use strict";

document.addEventListener("DOMContentLoaded", init);

const imageAddress = "https://wallpapershome.com/images/pages/ico_h/475.jpg";

let dragged;

let nat_height;
let nat_width;

function init() {
  document.querySelector("button").addEventListener("click", loadTheImage);
  document.getElementById("reload").addEventListener("click", resetPage);
}

function loadTheImage() {
  document.querySelector("img").src = imageAddress;

  document.querySelector("img").onload = theImageHasLoaded;
}

function theImageHasLoaded() {
  const numOfYPieces = 3;
  const numOfXPieces = 3;

  console.log(document.querySelector("img").naturalHeight);
  nat_height = document.querySelector("img").naturalHeight;
  console.log(document.querySelector("img").naturalWidth);
  nat_width = document.querySelector("img").naturalWidth;

  let container_height = nat_height;
  let container_width = nat_width;

  document.querySelector(
    "#container"
  ).style.gridTemplateColumns = `repeat(${numOfYPieces}, 1fr)`;

  document.querySelector("#container").style.width = `${container_width}px`;

  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let dropzone = document.createElement("div");

      dropzone.style.height = container_height / numOfYPieces + "px";
      dropzone.style.width = container_width / numOfXPieces + "px";

      dropzone.dataset.dropzoneId = `Id${y}${x}`;
      console.log((dropzone.dataset.dropzoneId = `Id${y}${x}`));

      dropzone.classList.add("dropzone");

      console.log(dropzone);
      //data-dropzone-id
      dropzone.style.backgroundPositionY = `${y *
        (container_height / numOfYPieces)}px`;
      dropzone.style.backgroundPositionX = `${x *
        (container_width / numOfXPieces)}px`;

      document.querySelector("#container").appendChild(dropzone);
    }
  }

  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let piece = document.createElement("div");

      let procentY = y * 100;
      let procentX = x * 100;

      piece.style.height = nat_height / numOfYPieces + "px";
      piece.style.width = nat_width / numOfXPieces + "px";

      piece.style.backgroundImage = "url(" + imageAddress + ")";

      piece.dataset.pieceId = `Id${y}${x}`;
      console.log(piece);

      //data-dropzone-id

      piece.style.backgroundSize = `${numOfXPieces * 100}% ${numOfYPieces *
        100}%`;
      piece.style.backgroundPosition = `${numOfXPieces * 100 -
        procentX}% ${numOfYPieces * 100 - procentY}%`;

      piece.classList.add("piece");

      piece.draggable = true;

      piece.style.left = `${Math.random() * 500 + 1000}px`;
      piece.style.top = `${Math.random() * 500 + 30}px`;

      document.querySelector("#container_piece").appendChild(piece);
    }
  }
  document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = 0.5;
  });

  document.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
  });

  /* events fired on the drop targets */
  document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
  });

  document.addEventListener("drop", function(event) {
    console.log(event);
    // prevent default action (open as link for some elements)
    event.preventDefault();
    console.log("DROP", event.target.className);
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      dragged.style.left = event.target.style.left;
      dragged.style.top = event.target.style.top;
      testIfSolved();
    } else if (event.target.className == "theBody") {
      // park the dragged elem somewhere on the body
      dragged.style.left = event.pageX + "px";
      dragged.style.top = event.pageY + "px";
    }
  });
}
function testIfSolved() {
  document.querySelectorAll(".dropzone").forEach(eachZone => {
    // console.log(eachZone.dataset.dropzoneId);
    if (eachZone.firstElementChild != null) {
      console.log(
        eachZone.firstElementChild.dataset.pieceId ==
          eachZone.dataset.dropzoneId
      );
    }
  });
}

function resetPage() {
  window.location.href = window.location.href;
}
