import React, { Component } from "react";

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            groupCode: '',
            wordsReceived: [],
            promptReceived: [],
            choiceCorrect: 0,
        };
    }
    render() {

    }
}