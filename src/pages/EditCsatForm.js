import React,{Component}from 'react'
import axios from "axios";
import SurveyEditor from "../lib/SurveyEditor";


// var editorOptions = {};
// var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);

//Setting this callback will make visible the "Save" button

class EditCsatForm extends Component{
    
    result
    constructor(props) {
        super(props);
        this.state = {
          jsonSurver: "",
          idCsat:0,
          ...props
        };
      }
    
    async componentDidMount() {
        const {match: { params } } = this.props;
    
        // console.log(this.state);
        this.setState({ idCsat:params.idcsat});
        this.result = await this.loadMySurvey(params.idcsat);
        // const result = await axios
        // .get(`${process.env.REACT_APP_API_REMOTE}csat/${params.idcsat}`)
        // this.setState({ jsonSurver:JSON.parse(result.data.survey[0].json)});
    }
    async loadMySurvey(idcsat){
       const result = await axios
        .get(`${process.env.REACT_APP_API_REMOTE}csat/${idcsat}`)
        // console.log(result)
        this.setState({ jsonSurver:JSON.parse(result.data.survey[0].json)});
        return this.state.jsonSurver
    }
    OnSaveSurvey(result) {
        //save the survey JSON
        console.log(result);
        // var jsonEl = document.getElementById('surveyJSON');
        // jsonEl.value = editor.text;
    }
    render(){
      let data = this.state.jsonSurver
            if(data){
              return(
                <div>
                    <SurveyEditor loadMySurvey={data} saveSurveyFunc={this.OnSaveSurvey} action={{typeAction:'edit',id:this.state.match.params.idcsat}}/>
                </div>
              )
            }else{
              return(
                <div>

                </div>
              )
            }
        
    }
}
// export const Component = (props) => (
    
// )

export default EditCsatForm