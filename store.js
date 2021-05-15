const Store = require('electron-store');

const schema = {
	width: {
		type: 'number',
		default: 1400,
    minimum: 100
	},
  height: {
		type: 'number',
		default: 800,
    minimum: 100
	},
  serverSelected: {
    type: 'string',
    default: "hello"
  },
	serverInfo: {
    type: "object",
    default:
      {
        "Localhost Hi": {
          protocol: "http://",
          host: "localhost",
          port: 13500,
          suffix: "/presenter/"
        },
        "MATTSicle": {
          protocol: "http://",
          host: "192.168.0.78",
          port: 13500,
          suffix: "/presenter/"
        },
        "Studio Red": {
          protocol: "http://",
          host: "studio1.ury.york.ac.uk",
          port: 13500,
          suffix: "/presenter/"
        }
      }
	}
};

const store = new Store({schema});

exports.store = store
