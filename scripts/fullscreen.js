function isGame()
{
	let content_area = document.getElementById("content_area");
	if (!content_area) {
		return (false);
	}
	let data = Array.from(content_area.getElementsByTagName("meta"));
	data = data.filter(item => {
		return (item.getAttribute("itemprop") == "applicationCategory");
	});
	if (data.length != 1) {
		return (false);
	}
	return (data[0].getAttribute("content") == "Game");
}

function waitForElement(id) {
  return new Promise(resolve => {
    const el = document.getElementById(id);
    if (el) return resolve(el);

    const observer = new MutationObserver(() => {
      const el = document.getElementById(id);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}


function createButton()
{
	let button_area = document.getElementById("embed_header").getElementsByTagName("div")[0];
	let button = document.createElement("button");
	let sym = document.createElement("a");

	waitForElement("iframe_embed").then(wraper => {
		let inner = wraper.children[0];

		let innerSize = {width: inner.style.width, height: inner.style.height};
		sym.setAttribute("class", "ngmedia-icon-enter-fullscreen");
		button.setAttribute("style", "background-color: black");
		button.addEventListener("click", () => {
			wraper.requestFullscreen().then(() => {
				innerStyle = {width: inner.style.width, height: inner.style.height};
				console.log("setter", inner.style.width, innerStyle.width);
				inner.style.width = "100%";
				inner.style.height = "100%";
			});
		});
		button_area.insertBefore(button, button_area.getElementsByTagName("span")[0]);
		button.appendChild(sym);
		document.addEventListener("fullscreenchange", () => {
			if (document.fullscreenElement === wraper) {
				console.log("enter", inner.style.width);
			} else {
				inner.style.width = innerSize.width;
				inner.style.height = innerSize.height;
				console.log("exit", inner.style.width);
			}
		});
	});
}

function turnResizeable()
{
	if (!isGame()) {
		return ;
	}
	createButton();
}

turnResizeable();
