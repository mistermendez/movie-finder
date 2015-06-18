var React = require('react');

var Home = React.createClass({

    render: function() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>About <small>Movie Finder</small></h1>
                </div>
                <div className="row-fluid">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        );
    }
});

module.exports = Home;