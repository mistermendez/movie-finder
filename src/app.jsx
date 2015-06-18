window.React        = require('react/addons');
var Reflux          = require('reflux');
var attachFastClick = require('fastclick');
var Router          = require('react-router');
var RouteHandler    = Router.RouteHandler;
var Route           = Router.Route;
var DefaultRoute    = Router.DefaultRoute;

var Movies      = require('./views/Movies');
var About       = require('./views/About');
var Appbar     = require('./components/Appbar');

var Application = React.createClass({

    render: function() {
        return (
            <div className="app">
                <Appbar />
                <RouteHandler />
            </div>
        );
    }
});

var routes = (
    <Route path="/" handler={Application}>
        <Route name="about" handler={About} />
        <DefaultRoute handler={Movies} />
    </Route>
);

Router.run(routes, function(Handler, state) {
    React.render(
        <Handler params={state.params} />,
        document.getElementById('app')
    );
});

// fastclick eliminates 300ms click delay on mobile
attachFastClick(document.body);