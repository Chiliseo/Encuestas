import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import querystring from 'querystring';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableHead,TableRow,Paper,Checkbox} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends Component{
  constructor(props) {
    super(props);
    this.state={
      ...props
    }
    this.updateStatus = this.updateStatus.bind(this);
    this.evaluar = this.evaluar.bind(this);
  }

  evaluar(status){
      if(status==="1"){
          return true;
      }else{
          return false;
      }      
  }
  componentDidUpdate(oldProps) {
    // By duplicating the data, you have to then
    // keep the local copy in sync with the
    // updated props...
    if(oldProps.items !== this.props.items) {
      // This triggers an unnecessary re-render
      this.setState({
        items: this.props.items
      });
    }
  }
  componentDidMount() {
    console.log('componentDidMount')
  }

  updateStatus(e){
    const isChecked = e.target.checked;
    const id=e.target.dataset.id;
    var i = isChecked ? 1 : 0;
    
    let data=querystring.stringify({status:i,idsurvey:id});
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post('//e4cconline.com/encuesta/Api/updateStatusSurvey',data,config)
    .then(res=>{
      console.log(res);
      const itemIndex = this.state.items.findIndex(i=> i.id === id);
      this.setState(prevState => {
        const newItems = [...prevState.items];
        newItems[itemIndex].status = i.toString();
        return {items: newItems};
    })
      
      
    })
    .catch(err=>{
      
    })
    
   
  }
  isItemSelected = (id) => {
    let status=this.state.items.find(x => (x.id === id)).status;    
    if(status==="1"){
      return true;
    }else{
      return false;
    }
  }

  render(){
    const { classes } = this.props;
    return(
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Active</TableCell>
            <TableCell align="center">Fecha de Creacion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.items.map(rows => (
            <TableRow key={rows.id}>
              <TableCell align="center"> <Link to={{pathname:"edit/"+rows.id}}> <Edit></Edit> </Link>    </TableCell>
              <TableCell align="center">{rows.id}</TableCell>
              <TableCell align="center" component="th" scope="row">
                {rows.title}
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={this.isItemSelected(rows.id)} onChange={this.updateStatus} inputProps={{'data-id':rows.id}} value={rows.status}></Checkbox>
              </TableCell>
              <TableCell align="center">{rows.ingresa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    );
  }
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};
export default (withStyles(styles)(SimpleTable));