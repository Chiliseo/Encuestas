import React,{Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { dark } from '@material-ui/core/styles/createPalette';
import { red } from '@material-ui/core/colors';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[600],
  },
  info: {
    backgroundColor: dark[600],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    // marginRight: theme.spacing.unit * 1,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});
class MySnackbarContentWrapper extends Component{
  constructor(props) {
    super(props);
    this.state={
      ...props
    }
  }
  variantIcon=(variant)=>{
    const variantIconList = {
      success: CheckCircleIcon,
      warning: WarningIcon,
      error: ErrorIcon,
      info: InfoIcon,
    };
    return variantIconList[variant];
  }
  
//  function MySnackbarContentWrapper(props) {
  // const classes = styles();
  // const { className, message, onClose, variant, ...other } = props;
  // const Icon = variantIcon[variant];

  render(){
    const { classes } = this.props;
    const Icon = this.variantIcon(this.state.variant);
    console.log(Icon);
    console.log(this.state);
    console.log(classes);
    return (
      <SnackbarContent
        className={clsx(classes[this.state.variant], this.state.className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={clsx(classes.message)}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {this.state.message}
          </span>
        }
        action={[
          <IconButton
            edge="end"
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.state.onClose}
          >
            <CloseIcon/>
          </IconButton>,
        ]}
        {...this.state.other}
      />
    );
  }
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};
export default withStyles(styles)(MySnackbarContentWrapper);