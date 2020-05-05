import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

// const getAuthorsQuery = gql`
// {
//   authors {
//     name 
//     id
//   }
// }
// `;


class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }

  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (
        <option disabled>Loading Authors</option>
      );
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        );
      });
    }
  }

  submitForm(event) {
    event.preventDefault();
    this.props.addBookMutation({
      variables: {
        // name: this.state.name,
        // genre: this.state.genre,
        // authorId: this.state.authorId
        ...this.state
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name: </label>
          <input type="text" onChange={(event) => this.setState({ name: event.target.value })} />
        </div>

        <div className="field">
          <label>Genre: </label>
          <input type="text" onChange={(event) => this.setState({ genre: event.target.value })} />
        </div>

        <div className="field">
          <label>Author: </label>
          <select onChange={(event) => { this.setState({ authorId: event.target.value }); }
          }>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>

      </form>
    );
  }
};

export default flowRight(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);


