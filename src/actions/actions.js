var Reflux = require('reflux');

var actions = Reflux.createActions({
    'listenToMovies': {},
    'stopListenToMovies': {},
    'setFilterView': {}
});

module.exports = actions;