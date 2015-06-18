var React = require('react');

var Appbar = React.createClass({

    render: function () {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#"><span className="glyphicon glyphicon-film"></span> Movie Finder </a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">Home</a></li>
                            <li><a href="#about">About</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Appbar;
