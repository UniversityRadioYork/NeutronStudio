const {store} = require('./store');

window.addEventListener('DOMContentLoaded', () => {
  console.log(store.store)
  let connected = false;

  let settingsBtn = document.getElementById("settingsButton");
  settingsBtn.addEventListener("click", () => {
    store.clear();
    console.log("Reset.")
  });

  const checkConnectivity = () => {
    let iframe = document.getElementById("connected");
    let body = document.getElementById("body");
    let server = null;
    try {
      server = store.get("serverInfo")[store.get("serverSelected")];
    } catch {
      ;
    }

    if (!server) {
      console.log("Testing connection to no server!");
      connected = false;
    } else {
      hostname = `${server.protocol}${server.host}:${server.port}${server.suffix}`;
      console.log("Testing connection to: ", hostname);

      var myHeaders = new Headers();
      myHeaders.append('pragma', 'no-cache');
      myHeaders.append('cache-control', 'no-cache');

      var myInit = {
        method: 'GET',
        headers: myHeaders,
      };
      var myRequest = new Request(hostname);


      fetch(myRequest, myInit).then(function(response) {
        if (response.status == 200) {
          if (!connected) {
            connected = true;
            iframe.setAttribute("src", hostname);
          }
        } else {
          connected = false;
        }
      }).catch(function(error) {
        connected = false;
      }).finally(function() {
        if (!connected) {
          iframe.setAttribute("src", "#");
        }
        body.setAttribute("class", connected ? "connected" : "disconnected" + " bg-gradient-primary");
      });
    }

  }

  const setServerSelected = (serverName) => {
    store.set("serverSelected",serverName);
  }

  const updateServerList = () => {
    const list = document.getElementById("serverList");
    list.innerHTML = "";

    let serverInfo = store.get("serverInfo");
    let serverSelected = store.get("serverSelected")
    if (serverInfo) {
      Object.keys(serverInfo).forEach(serverName => {
        let server = serverInfo[serverName];
        let option = document.createElement("a");
        option.setAttribute("class", `list-group-item list-group-item-action flex-column align-items-start ${serverName == serverSelected ? "active":""}`)
        option.innerHTML =
          `
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">${serverName}</h5>
              <small>${server.host}:${server.port}</small>
            </div>

            ${serverName == serverSelected ? "<small>This server is selected, but is not responding.</small>":""}
        `;
        option.addEventListener("click",() => {setServerSelected(serverName)})
        list.appendChild(option);
      });
    };
  }
  updateServerList();

  store.onDidChange("serverInfo", updateServerList);

  store.onDidChange("serverSelected", checkConnectivity);
  //checkConnectivity();
  window.setInterval(checkConnectivity, 10000);

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
