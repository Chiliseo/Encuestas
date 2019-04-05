import React,{Component}from 'react'
import * as Survey from "survey-react";
import "survey-react/survey.css";
import SurveyEditor from "../lib/SurveyEditor";
// import "bootstrap/dist/css/bootstrap.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";
// import "emotion-ratings/dist/emotion-ratings.js"
import * as widgets from "surveyjs-widgets";

// widgets.emotionsratings();
widgets.icheck(Survey, $);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);
// console.log(widgets);


// var editorOptions = {};
// var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);

//Setting this callback will make visible the "Save" button

class NewCastForm extends Component{
    OnSaveSurvey(result) {
        //save the survey JSON
        console.log(result);
        
        // var jsonEl = document.getElementById('surveyJSON');
        // jsonEl.value = editor.text;
    }
    render(){
        return(
            <div>
                {/* {props.children} */}
                <SurveyEditor saveSurveyFunc={this.OnSaveSurvey} action={{typeAction:'create',id:0}} />
            </div>
        )
    }
}
// export const Component = (props) => (
    
// )

export default NewCastForm