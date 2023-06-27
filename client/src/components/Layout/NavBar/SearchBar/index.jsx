import React from 'react';
import { searchForm, searchInput } from './styles.css';

export default ({ onSearchSubmit }) => (
  <form className={searchForm} onSubmit={onSearchSubmit}>
    <input
      type="text"
      className={searchInput}
      onSubmit={onSearchSubmit}
      placeholder=" &#xf002;    Search Plant Names"
    />
  </form>
);
