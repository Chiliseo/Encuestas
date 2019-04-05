import React, { Component } from "react";
import * as SurveyJSEditor from "surveyjs-editor";
import * as SurveyKo from "survey-knockout";
import "surveyjs-editor/surveyeditor.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "icheck/skins/square/blue.css";

import * as widgets from "surveyjs-widgets";

widgets.icheck(SurveyKo, $);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
// widgets.emotionsratings(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);
// console.log(widgets);


class SurveyEditor extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      ...props
    }
    // console.log(props)
    
  }

  componentDidMount() {
    // console.log(this)
    // this.setState({ jsonData: this.props.loadData });
    
    let editorOptions = { showEmbededSurveyTab: true };
    editorOptions.questions= this.props.loadData;
    
    if(this.props.loadData){
      editorOptions.text = this.props.loadData
    }

    this.editor = new SurveyJSEditor.SurveyEditor("surveyEditorContainer",editorOptions);
    this.editor.saveSurveyFunc = this.saveMySurvey;
    this.editor.text = this.props.loadMySurvey;
    this.editor.actions = this.props.actions;
    // console.log(this.editor)
    // console.log(this.loadMySurvey)
    
  }

  render() {
      return <div id="surveyEditorContainer" />;
  }
  saveMySurvey = () => {
    console.log(this.state);
    let surveyDataJson=JSON.stringify(this.editor.text);
    let surveyData=JSON.parse(this.editor.text);
    // let locale=surveyData.locale;
    let title=surveyData.title;
    let url='//e4cconline.com/encuesta/Api/';
    let typeAction=this.state.action.typeAction;
    let id=this.state.action.id;
    if(typeAction==='edit'){
      url+='updateCsatForm';
    }else{
      url+='save_survey';
    }
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: {
          idsurvey:id,
          surveyTitle: title,
          surveyText : surveyDataJson
      },
      success: function (data) {
          // callback(saveNo, data.isSuccess);
      },
      error: function (xhr, ajaxOptions, thrownError) {
          // callback(saveNo, false);
          alert(thrownError);
      }
    });
    console.log(surveyData.title);
  };

}

export default SurveyEditor;
