import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.scss';

class ItemDescription extends PureComponent {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  handleOnClick = () => {
    const { addComment, _id } = this.props;
    const { value } = this.input.current;
    const item = { _id, title: value };
    addComment(item);
  };

  render() {
    const {
      description,
      comments,
    } = this.props;
    const itemComments = comments.map(comment => <div className="todo-item__comments-item" key={comment._id}>{comment.title}</div>);
    return (
      <div className="todo-item__description">
        {!!description ? (<div className="todo-item__description-title">{description}</div>) : ''}
        <div className="todo-item__comments">
          <div>Comments:</div>
          <input ref={this.input} />
          <button onClick={this.handleOnClick}>add</button>
          {itemComments}
        </div>
      </div>
    );
  }
}

ItemDescription.propTypes = {
  _id: PropTypes.string,
  addComment: PropTypes.func,
  description: PropTypes.string,
  comments: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default connect(
  state => ({}),
  dispatch => ({
    addComment: (item) => {
      dispatch({ type: 'ADD_COMMENT', item });
    },
  }),
)(ItemDescription);
