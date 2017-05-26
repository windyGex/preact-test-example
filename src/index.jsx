import React from 'react';
import classNames from 'classnames';

class Button extends React.Component {
    static propTypes = {
        type: React.PropTypes.string
    }

    render() {
        const cls = classNames({
            'ui-btn': true,
            [`ui-btn-${this.props.type}`]: true
        })
        return (
            <button {...this.props} className={cls}>{this.props.children}</button>
        );
    }
}

export default Button;
