import React, { Component } from "react";

export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = { src: props.src };
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }
    handlePause(){
        const {setPlaying} = this.props;
        setPlaying(false);
    }
    handlePlay(){
        const {setPlaying} = this.props;
        setPlaying(true);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        const { src, play } = nextProps;
        const { audioRef } = this;
        const srcState = this.state.src;

        if (srcState !== src) this.setState({ src });
        if (play) {
            if(audioRef.readyState !== audioRef.HAVE_ENOUGH_DATA)
                audioRef.oncanplay=()=>audioRef.play();
            else{
                audioRef.play();
            }
        }
        else {
            
                audioRef.pause();
        }
    }
    render() {
        return (
            <audio
                controls={false}
                ref={(ref) => (this.audioRef = ref)}
                src={this.state["src"]}
                onPause={this.handlePause}
                onPlay={this.handlePlay}
            ></audio>
        );
    }
}
