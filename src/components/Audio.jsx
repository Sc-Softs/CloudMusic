import React, {Component} from "react";
import PubSub from "pubsub-js";
import {MESSAGE_SET_CURRENT_TIME, MESSAGE_SET_TOTAL_TIME} from "./PlayBar";

const MESSAGE_SET_PROGRESS = "Message.Audio.SetProgress";
export {MESSAGE_SET_PROGRESS};

export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        //this.audioRef = null;

        this.data = {
            currentTime: null,
            totalTime: null
        };
        if (this.audioRef !== undefined) {
            this.data = {
                currentTime: this.audioRef.currentTime,
                totalTime: this.audioRef.duration
            };
        }

        this.state = {...this.data, src: this.props.src};
        PubSub.subscribe(
            MESSAGE_SET_PROGRESS,
            (message, data) => {

                // noinspection UnnecessaryLocalVariableJS
                const currentTime = data;
                this.audioRef.currentTime = currentTime;
            }
        );

    }
    handlePause() {
        const { setPlaying } = this.props;
        setPlaying(false);
    }
    handlePlay() {
        const { setPlaying } = this.props;
        setPlaying(true);
    }
    handleProgress() {
        const {audioRef} = this;
        const currentTime = audioRef.currentTime;
        this.setState({...this.state, currentTime});
        PubSub.publish(MESSAGE_SET_CURRENT_TIME, currentTime);
    }
    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
        const { src, play } = nextProps;
        const { audioRef } = this;
        const srcState = this.state.src;

        const setTotalTime = data => PubSub.publish(MESSAGE_SET_TOTAL_TIME, data);
        if (srcState !== src) this.setState({ src });
        if (play) {
            if (audioRef.readyState !== audioRef.HAVE_ENOUGH_DATA) {
                audioRef.oncanplay = () => {
                    audioRef.play();
                    setTotalTime(audioRef.duration);
                    audioRef.oncanplay = null;
                    this.setState({...this.state, totalTime: audioRef.duration});
                };
            } else {
                audioRef.play();
                setTotalTime(audioRef.duration);
                audioRef.oncanplay = null;
                //this.setState({...this.state, totalTime: audioRef.duration});
            }
        } else {
            audioRef.oncanplay = null;
            audioRef.pause();
        }
        // const currentTime = nextProps.currentState[0];
        // if(currentTime !== this.state.progress && !isNaN(currentTime)){
        //     this.audioRef.currentTime = currentTime;
        // }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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
