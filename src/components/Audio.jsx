import React, { Component } from "react";

export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.setCurrentTime = props.currentState[1];
        this.currentTime = props.currentState[0];
        this.setTotalTime = props.totalState[1];
        this.state = {
            src: props.src,
            progress:this.currentTime
        };
    }
    handlePause() {
        const { setPlaying } = this.props;
        setPlaying(false);
    }
    handlePlay() {
        const { setPlaying } = this.props;
        setPlaying(true);
    }
    handleProgress(){
        const {audioRef} = this;
        const progress = audioRef.currentTime;
        this.setCurrentTime(progress);
        this.setTotalTime(audioRef.duration);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        const { src, play } = nextProps;
        const { audioRef } = this;
        const srcState = this.state.src;

        if (srcState !== src) this.setState({ src });
        if (play) {
            if (audioRef.readyState !== audioRef.HAVE_ENOUGH_DATA)
                audioRef.oncanplay = () => audioRef.play();
            else {
                audioRef.play();
                audioRef.oncanplay = null;
            }
        } else {
            audioRef.pause();
            audioRef.oncanplay = null;
        }
        const currentTime = nextProps.currentState[0];
        if(currentTime !== this.state.progress && !isNaN(currentTime)){
            this.audioRef.currentTime = currentTime;
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
                onTimeUpdate={this.handleProgress}
            />
        );
    }
}
