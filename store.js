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
        "Studio Red": {
          protocol: "http://",
          host: "studio1.ury.york.ac.uk",
          port: 13500,
          suffix: "/presenter/"
        },
        "Studio Blue": {
          protocol: "http://",
          host: "studio2.ury.york.ac.uk",
          port: 13500,
          suffix: "/presenter/"
        },
        "Localhost (Dev)": {
          protocol: "http://",
          host: "localhost",
          port: 13500,
          suffix: "/presenter/"
        }
      }
	}
};

const store = new Store({schema});

exports.store = store
