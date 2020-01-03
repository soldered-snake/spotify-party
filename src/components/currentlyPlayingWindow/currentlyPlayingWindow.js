import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';



class CurrentlyPlayingWindowComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            playing: true,
            songQueue: [],
            currentTrack: '',
            nextTrack: '',
            changingTrack: false
        }
    }

    componentDidMount() {
        console.log('COMP MOUNT');
        this.setState({
            currentTrack: this.props.currentTrack,
            nextTrack: this.props.nextTrack,
            songQueue: [this.props.currentTrack, this.props.nextTrack]
        })
    }

    componentWillReceiveProps(nextProps){
        //If currently changing track
        console.log('PROPS CURRENT TRACK, ' , nextProps.currentTrack);
        console.log('PROPS NEXT TRACK ', nextProps.nextTrack);

        if(this.state.changingTrack){
            console.log(this.state.songQueue.splice(0, 1).concat(nextProps.nextTrack));
            this.setState({
                songQueue: this.state.songQueue.splice(0, 1).concat(nextProps.nextTrack),
                changingTrack: false
            });
            console.log('REMOVING CURRENT SONG! ', this.state.songQueue);
        }
    }


    componentDidUpdate(){
        console.log('COMP UPDATE');
    }

    render(){

        return(
            <div>
                <button onClick={this.changeUri}> change between 2 songs. </button>
                <SpotifyPlayer
                    token={this.props.token}
                    uris={this.state.songQueue}
                    autoPlay={false}
                    play={this.state.playing}
                    name={"Spotify House Party"}
                    callback={(state) => this.handleState(state)}/>
            </div>
        );
    }

    //State change,
    handleState = async(state) => {
        console.log(state)
        //If the current track in the state call back doesn't equal the current state track
        if(state.track.uri !== this.state.currentTrack && state.track.uri !== ""){
            //call function that updates the state next and current track back in app.js
            this.setState({changingTrack: true});
            this.changeTrack(this.state.currentTrack);
        }

    };

    changeTrack = (currentTrackUri) => this.props.changeTracks(currentTrackUri)
}

export default withStyles(styles)(CurrentlyPlayingWindowComponent);
