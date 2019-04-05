import React, { Component } from 'react';
import axios from 'axios';
import SimpleTable from "../components/ListCsat";

export class SettingsView extends Component {
    constructor(props) {
        super(props);
        this.state={
            row:[]
        }
    }
    componentDidMount() {
        axios.get(`${process.env.API_REMOTE}list_csat/`)
        .then(({ data: survey }) => {
            this.setState({ row:survey.survey});
        });
      }
      
    render(){
        return(
            <div>
                <h1>Setting</h1>
                <SimpleTable items={this.state.row} />
            </div>
            )
    }
}

export default SettingsView