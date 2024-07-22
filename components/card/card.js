export const GetCard = (imgSrc, itemTitle, oldPrice, newPrice, rightTextDescription, currentQuantity, link) => {
    let manipulatedName = itemTitle.length > 25 ? itemTitle.substring(0, 25) + "..." : itemTitle;

    let card =  `
      <div class="swiper-slide">

          <div id="${link}" class="card">

            <div class="header-controls">
              <i class="fa-solid fa-arrows-up-down-left-right btn-zoom"></i>
              <i class="fa-regular fa-heart btn-heart"></i>
            </div>

            <div class="panels">
              <div class="left-panel">
                <img src="${imgSrc}"/>
              </div>

              <div class="right-panel">
                <h1>${manipulatedName}</h1>

                <div class="divider"></div>

                <div class="price-and-discout">
                  ${oldPrice ? `<strike>${oldPrice} €</strike>` : "<br/>"}
                  <p>${newPrice} €</p>
                </div>

                <p class="description-text" style='text-align: right'>${rightTextDescription}</p>

                <div class="actions">

                  <div class="quantity-modifier">
                    <button class="subtractQuantity">-</button>
                    <p>${currentQuantity}</p>
                    <button class="addQuantity">+</button>
                  </div>

                  <button class="purchase">
                    <i class="fa-solid fa-shopping-cart"></i>
                    Purchase here
                  </button>

                </div>
              </div>

              <div class="progressbar-like-hover"></div>
            </div>
          </div>
      </div>
    `
    return card;
}