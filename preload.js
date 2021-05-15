
const {store} = require('./store');
const { contextBridge } = require('electron')

// Port over some config functions without giving the iframe the whole of Electron/Your PC to play with.
// See https://www.electronjs.org/docs/tutorial/context-isolation and https://www.electronjs.org/docs/tutorial/security
contextBridge.exposeInMainWorld('neutron', {
  store_get: (param) => {
    if (!param) {
      return store.store
    }
    return store.get(param)
  },
  store_set: (param, value) => {return store.set(param,value)},
  store_clear: () => {store.clear()}
})


window.addEventListener('DOMContentLoaded', () => {

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
