var Reflux = require('reflux');
var actions = require('../actions/actions');
var MoviesStore = require('../stores/MoviesStore');
var Movie = require('../components/Movie');
var Router = require('react-router');

var Movies = React.createClass({
    mixins: [
        Reflux.listenTo(MoviesStore, 'onStoreUpdate')
    ],

    getState: function (feedData) {
        return {
            movieItems: feedData.movieItems,
            feedDone: feedData.feedDone,
            locationData: feedData.locationData
        };
    },

    getInitialState: function () {
        var feedData = MoviesStore.getDefaultData();
        return this.getState(feedData);
    },

    onStoreUpdate: function(feedData) {
        this.setState(this.getState(feedData));
    },

    // Add change listeners
    componentDidMount: function() {
        this.getLocation();
    },

    getLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                actions.setFilterView({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, function(error) {
                console.error(error.toString());
            });
        } else {
            // fallback for no geolocation
        }
    },

    // Render all feed components, passing state via props
    render: function() {
        var locationData = this.state.locationData;
        var allMovies = this.state.movieItems;
        var movies = [];

        for (var key in allMovies) {
            var movie = allMovies[key];
            movies.push(<Movie key={key} movie={movie} />);
        }

        var loader = (
            <div className="feed col-xs-12">
                <div className="feed-loader">
                    Finding movies 5 miles from geolocation <img className="img-feed-loader" src="/images/tail-spin.svg" />
                </div>
            </div>
        );

        return (
            <div className="container">
                <div className="page-header">
                    <h1>Today's Movies <small>Geolocation: {JSON.stringify(locationData)}</small></h1>
                </div>

                <div className="row">
                    <div className="">
                        {movies}
                        {this.state.feedDone ? '' : loader}
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Movies;
