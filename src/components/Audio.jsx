import React, { Component } from "react";

export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = { src: props.src,progress:props.progressState[0]};
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.setProgress = props.progressState[1];
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
        const progress = Math.floor(audioRef.currentTime/audioRef.duration*100);
        this.setProgress(progress);
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
        }
        const progress = nextProps.progressState[0];
        if(progress !== this.state.progress && !isNaN(progress)){
            this.audioRef.currentTime = this.audioRef.duration * progress /100;
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
