var React = require('react'),
    ReactPropTypes = React.PropTypes,
    moment = require('moment');

var Movie = React.createClass({
    propTypes: {
        movie: ReactPropTypes.object.isRequired
    },

    // Render feed View
    render: function () {
        if (Object.keys(this.props.movie).length < 1) {
            return null;
        }
        var movie = this.props.movie;
        var shows = movie.showtimes;
        var showtimes = [];

        for (var key in shows) {
            var showtime = shows[key];
            var time = moment(showtime.dateTime).format('h:mm a');
            var keyId = 'show' + key;
            showtimes.push(<li className="list-group-item" key={keyId}>{showtime.theatre.name} <span className="label label-success">{time}</span></li>);
        }

        return (
            <article className="col-xs-6 col-sm-4">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">{movie.title}</h3>
                    </div>
                    <div className="panel-body">
                        <p>{movie.shortDescription}</p>
                    </div>
                    <ul className="list-group">
                        {showtimes}
                    </ul>
                </div>
            </article>
        );
    }
});

module.exports = Movie;
