import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ComponentBase, ComponentComposer } from '@boa/base';
import { Icon } from '@boa/components/Icon';
import { Label } from '@boa/components/Label';

import merge from 'lodash/merge';

const styles = theme => ({
  root: {
    margin: 0,
    width: '100%',
    height: 36,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    direction: 'ltr'
  },
  label: {
    color: theme.boaPalette.base400
  },
  isRTL: {
    flexDirection: 'row'
  }
});

@ComponentComposer
@withStyles(styles)
class Toggle extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * The default value of toggle.
     */
    defaultToggled: PropTypes.bool,
    /**
     * Will disable the toggle if true.
     */
    disabled: PropTypes.bool,
    /**
     * Indicates the style of element.
     */
    elementStyle: PropTypes.object,
    /**
     * Indicates the style of icon.
     */
    iconStyle: PropTypes.object,
    /**
     * Indicates the style of input.
     */
    inputStyle: PropTypes.object,
    /**
     * The label of toggle component.
     */
    label: PropTypes.node,
    /**
     * Indicates the style of label.
     */
    labelStyle: PropTypes.object,
    /**
     * The event to handle toggle.
     */
    onToggle: PropTypes.func,
    /**
     * Indicates the style of ripple.
     */
    rippleStyle: PropTypes.object,
    /**
     * Indicates the style.
     */
    style: PropTypes.object,
    /**
     * Indicates the style of track switched.
     */
    trackSwitchedStyle: PropTypes.object,
    /**
     * Indicates the value of link.
     */
    valueLink: PropTypes.object,
    /**
     * Indicates the icon properties.
     */
    iconProperties: PropTypes.object,
    /**
     * Indicates the icon information text.
     */
    informationText: PropTypes.string,
    /**
     * Indicates the toggled or not.
     */
    toggled: PropTypes.bool,

    errorText: PropTypes.string,
  };

  static defaultProps = {
    /**
     * Base default properties from ComponentBase.
     */
    ...ComponentBase.defaultProps,
    defaultToggled: false,
    disabled: false,
    toggled: false,
    labelPosition: 'left'
  };

  state = {
    disabled: this.props.disabled,
    toggled: this.props.toggled
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (nextProps.disabled !== this.state.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }

    if ((this.props.toggled != nextProps.toggled) && (nextProps.toggled != this.state.toggled)) {
      this.setState({ toggled: nextProps.toggled });
    }
  }

  getValue() {
    return this.state.toggled;
  }

  setValue(value) {
    this.setState({ toggled: value });
  }

  resetValue() {
    this.setState({ toggled: this.props.defaultToggled });
  }

  setDisable(value) {
    this.setState({ disabled: value });
  }

  handleOnToggle(event, value) {
    this.setValue(value);

    if (this.props.onChange) {
      this.props.onChange(event, value);
    } else if (this.props.onToggle) {
      this.props.onToggle(event, value);
    }
  }

  render() {
    let errorStyle = {
      color: this.props.context.theme.boaPalette.error500,
      fontSize: 11,
      marginTop: 2,
      height: 16,
      textAlign: this.props.context.localization.isRightToLeft ? 'right' : 'left',
    };
    const { classes } = this.props;
    var props = Object.assign({}, this.props);
    const { isRightToLeft } = this.props.context.localization;

    if (this.state.disabled) {
      var iconProperties = { width: 20, height: 20, disabled: 'disabled' };
      if (isRightToLeft) merge(iconProperties, { style: { marginLeft: 10 } });
      else merge(iconProperties, { style: { marginRight: 10 } });
      props.iconProperties = merge(iconProperties, props.iconProperties ? props.iconProperties : {});
    } else {
      iconProperties = { style: { width: 20, height: 20 } };
      if (isRightToLeft) merge(iconProperties, { style: { marginLeft: 10 } });
      else merge(iconProperties, { style: { marginRight: 10 } });
      props.iconProperties = merge(iconProperties, props.iconProperties ? props.iconProperties : {});
    }
    var toggleIcon = Icon.getIcon(props);

    const rootClass = classNames(classes.root, {
      [classes.isRTL]: isRightToLeft
    });

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {toggleIcon && <div>{toggleIcon}</div>}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={this.props.defaultToggled}
                checked={this.state.toggled}
                disabled={this.state.disabled}
                color="primary"
                onChange={(event, value) => {
                  this.handleOnToggle(event, value);
                }}
              />
            }
            classes={{
              root: rootClass,
              label: classes.label
            }}
            label={this.props.label}
          />
          {this.props.errorText ? (
            <Label
              style={errorStyle}
              context={this.props.context}
              text={this.props.errorText}
            />
          ) : null}
          {this.props.informationText ? (
            <Label
              style={{ height: 16, fontSize: '11px', color: this.props.context.theme.boaPalette.base400 }}
              context={this.props.context}
              text={this.props.informationText}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Toggle;