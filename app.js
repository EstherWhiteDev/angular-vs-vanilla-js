const input = document.querySelector("input");
const container = document.querySelector(".container");
const thumbsWrapper = document.querySelector(".thumbs-wrapper");
const productTags = document.querySelector(".product-tags");
const search = document.querySelector(".search");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
	fetch("https://fakerapi.it/api/v1/products")
		.then((response) => response.json())
		.then((items) => {
			const inputValue = parseInt(input.value);
			if (!inputValue || inputValue <= 0) {
				container.innerHTML = `
							<div class="message">
									<p>No products Faked yet..</p>
							</div>`;
			} else if (inputValue > 10) {
				container.innerHTML = `
							<div class="message">
									<p>Maximum product amount exceeded...</p>
									<p>We can only supply up to 10 products at this point.</p>
							</div>`;
			} else {
				const displayedItems = items.data.slice(0, inputValue);
				displayedItems.forEach(createBox);
			}
		});

	clear();
});

// Create boxes
function createBox(items) {
	const box = document.createElement("div");

	const { image, name, price, tags, images } = items;

	const formattedAmount = Number(price).toLocaleString("de-DE", {
		style: "currency",
		currency: "EUR",
	});

	box.classList.add("box");
	box.innerHTML = `
	<img class="mainImage" src="assets/images/main.png" alt="artificial product"/>
	`; // had to replace image since the ones from the api got discontinued
	container.appendChild(box);

	// Thumbnails
	const thumbsWrapper = document.createElement("div");
	thumbsWrapper.classList.add("thumbs-wrapper");
	box.appendChild(thumbsWrapper);

	// images.forEach((item) => {
	// 	const thumb = document.createElement("img");
	// 	thumb.classList.add("thumb");
	// 	thumb.src = item.url;
	// 	thumbsWrapper.appendChild(thumb);
	// });

	images.forEach((item) => {
		const thumb = document.createElement("img");
		thumb.classList.add("thumb");
		thumb.src = "assets/images/small.png";
		thumbsWrapper.appendChild(thumb);
	});

	// Product Info
	const productInfo = document.createElement("div");
	productInfo.classList.add("product-info");
	productInfo.innerHTML = `
	  <p class="product-name">${name}</p>
	  <p class="product-price">${formattedAmount}</p>
	  `;
	box.appendChild(productInfo);

	// Product Tags
	const productTags = document.createElement("div");
	productTags.classList.add("product-tags");
	box.appendChild(productTags);

	tags.forEach((item) => {
		const tag = document.createElement("div");
		tag.classList.add("tag");
		tag.innerHTML = item;
		productTags.appendChild(tag);
	});
}

// Clear loaded products
function clear() {
	const loadedProducts = container.querySelectorAll("div");

	if (loadedProducts.length > 0) {
		loadedProducts.forEach((product) => {
			product.remove();
		});
	}
}
