import * as React from 'react';
import Movie from '../../models/movie';
import Paper from 'material-ui/Paper';
import Ratings from './ratings';

interface MovieDetailProps {
    movie: Movie
}

class FindResult extends React.Component<MovieDetailProps, {}> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Paper zDepth={2} className="row no-margin" style={{ marginTop: '.5em' }}>
                <div className="col-md-2 hidden-xs no-padding">
                    <img src={this.props.movie.posterUrl} alt="" className="img-responsive" />
                </div>
                <div className="col-xs-12 col-md-10" style={{ paddingBottom: '1em' }}>
                    <div style={{paddingTop:'.5em',paddingBottom:'.5em'}}>
                    <b>{this.props.movie.chineseTitle}({this.props.movie.englishTitle})</b>
                    <div className="row">
                        <span className="col-xs-7 col-md-3">上映日: {this.props.movie.releaseDate}</span>
                        <span className="hidden-xs col-md-3">類型: {this.props.movie.type}</span>
                        <span className="col-xs-5 col-md-3 no-padding">片長: {this.props.movie.runTime}</span>
                    </div>
                    </div>
                    <Ratings movie={this.props.movie}></Ratings>
                     </div>
            </Paper>
        );
    };
}

export default FindResult;