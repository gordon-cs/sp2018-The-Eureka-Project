import React, { Component } from "react";

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupCode: '',
            Lesson: 0,
            Players: [],
            wordsSent: [], //This is a list of words? Or counter?
            wordsUsed: [], //Same as above
            PromptIDs: [],
        };
    }

    render() {

    }
}