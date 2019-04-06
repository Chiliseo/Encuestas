//import liraries
import React, { Component } from "react";
import _axios from "axios";
import querystring from 'querystring';

import * as Survey from "survey-react";
import "survey-react/survey.css";


import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import * as widgets from "surveyjs-widgets";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Grid,
  FormControl,
  CircularProgress,
  Fade
} from "@material-ui/core";

import MySnackbarContentWrapper from "../components/Notification"

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

// create a component
export class CsatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: false,
      idcsat: null,
      idcontrol: null,
      query: 'idle',
      loading: false,
      dataControl: {
        idcontrol: '',
        coach: '',
        horario: '',
        salon: '',
        pais: '',
        sucursal: ''
      }
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.inputIdcontrol = this.inputIdcontrol.bind(this);
    this.handleCloseError = this.handleCloseError.bind(this);
    this.handleAgree = this.handleAgree.bind(this);

  }
  componentDidMount() {
    clearTimeout(this.timer);
    this.setState(state => ({
      loading: !state.loading,
    }));
    _axios
      .get(`${process.env.REACT_APP_API_REMOTE}csat_active/`)
      .then(({ data }) => {
        if (data.csat) {
          this.setState({ idcsat: data.csat[0].id });
        }

      });
    this.setState({
      query: 'progress',
    });
    this.timer = setTimeout(() => {
      this.setState({
        query: 'success',
      });
    }, 2000);
  }
  inputIdcontrol(event) {
    this.setState({ idcontrol: event.target.value });
  }
  handleCloseError() {
    this.setState({ error: false });
  }
  handleClickOpen() {
    console.log(this.state)
    let idcontrol = this.state.idcontrol;
    console.log(idcontrol);
    if (idcontrol > 0) {
      _axios
        .get(`${process.env.REACT_APP_API_REMOTE}get_info_control/${idcontrol}`)
        .then(({ data }) => {
          // console.log(data.data[0]);
          if (data.success) {
            this.setState({ dataControl: data.data[0] });
            this.setState({ open: true });
          } else {
            this.setState({ error: true });
          }

        });

    } else {
      this.setState({ error: true });
    }


  }

  handleClose() {
    console.log(this.state);
    this.setState({ open: false });
  }
  handleAgree() {
    console.log(this.state);
    this.setState({ open: false });
    let idcontrol = this.state.idcontrol
    let idcsat = this.state.idcsat
    if (idcsat > 0) {
      this.props.history.push(`/csat/${idcsat}/${idcontrol}`);
    }

  }
  render() {
    const { query } = this.state;
    return (
      <div>
        {this.state.idcsat > 0 ? (
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h1>Encuesta de satisfacción</h1>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <TextField
                  autoFocus={true}
                  placeholder={"Pin de clase *****"}
                  required={true}
                  variant="outlined"
                  label="Pin"
                  onChange={this.inputIdcontrol}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>Evaluar</Button>
              </FormControl>
            </Grid>

          </Grid>
        ) : (
            <Grid container spacing={24}>
              <Grid item xs={12}>
                {query === 'success' ? (
                  <h1>Upps No hay Encuestas Activas!</h1>
                ) : (
                    <Fade
                      in={query === 'progress'}
                      style={{
                        transitionDelay: query === 'progress' ? '800ms' : '0ms',
                      }}
                      unmountOnExit
                    >
                      <CircularProgress />
                    </Fade>
                  )}
              </Grid>
            </Grid>
          )}
        <Dialog
          open={this.state.open}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle id="alert-dialog-slide-title">
            {"Estas seguro del ID Control?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Salón: <strong>{this.state.dataControl.salon}</strong>
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              Horario: <strong>{this.state.dataControl.horario}</strong>
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              Coach: <strong>{this.state.dataControl.coach}</strong>
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              Sucursal: <strong>{this.state.dataControl.sucursal}</strong>
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              Pais: <strong>{this.state.dataControl.pais}</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleAgree} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.error}
          autoHideDuration={6000}
          onClose={this.handleCloseError}
          className='error'
        >
          <MySnackbarContentWrapper
            className='error'
            onClose={this.handleCloseError}
            variant="error"
            message="Pin Invalido"
          />
        </Snackbar>
      </div>
    );
  }
}

export class Csat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonSurver: "",
      idsurver: 0,
      idcontrol: 0,
      ...props
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    _axios
      .get(`${process.env.REACT_APP_API_REMOTE}csat/${this.state.match.params.id}`)
      .then(({ data }) => {
        // console.log(data.survey[0]);
        let jsonData = JSON.parse(data.survey[0].json);
        this.setState({ jsonSurver: jsonData });
        this.setState({ idsurver: data.id });
        this.setState({ idcontrol: params.idcontrol });
      });
  }
  onComplete = (result) => {
    let idsurvey = this.state.match.params.id;
    let idcontrol = this.state.match.params.idcontrol;
    let answers = JSON.stringify(result.data);
    let jsonData = JSON.stringify(result);
    let data = querystring.stringify({ idsurvey: idsurvey, idcontrol: idcontrol, answers: answers, jsonData: jsonData });
    // let data;
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const baseURL = process.env.REACT_APP_API_REMOTE;
    const axios = _axios.create({
      baseURL,
      timeout: 1000000000,
    })

    let itemsData = [];
    // for (let index = 0; index < 1000; index++) {
    if (navigator.onLine) {
      axios.post('saveAnswers', data, config)
        .then(res => {
        })
    } else {

      itemsData.push(data);
      localStorage.setItem('answers', JSON.stringify(itemsData));
    }
    // }

    // axios.post('${process.env.REACT_APP_API_REMOTE}saveAnswers',data,config)
    //   .then(res=>{
    //     console.log(res);
    //   })


  }
  onValueChanged() { }
  render() {
    Survey.Survey.cssType = "bootstrap";
    var model = new Survey.Model(this.state.jsonSurver);
    Survey.Survey.surveyShowDataSaving = true;
    return (
      <div>
        <Survey.Survey
          model={model}
          onComplete={this.onComplete}
          onValueChanged={this.onValueChanged}
        />
      </div>
    );
  }
}
