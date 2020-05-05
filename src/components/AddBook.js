import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

// const getAuthorsQuery = gql`
// {
//   authors {
//     name 
//     id
//   }
// }
// `;


class AddBook extends Component {
  displayAuthors() {
    const data = this.props.data;
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

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <label>Book name: </label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre: </label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author: </label>
          <select>
            <option value="">Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>

      </form>
    );
  }
};

export default graphql(getAuthorsQuery)(AddBook);


