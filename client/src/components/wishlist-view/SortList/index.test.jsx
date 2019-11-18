import React from 'react';
import { cleanup } from '@testing-library/react';
import { mount } from 'enzyme';
import { SortList } from './index';
import styles from './styles.css';
import 'jest-enzyme';

afterEach(cleanup);

describe('SortList component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SortList />);
  });

  it('should mount a SortList component', () => {
    const element = wrapper.find(SortList);
    expect(element).toExist();
  });

  it('should mount a div with class name sortListContainer', () => {
    const element = wrapper
      .find('div')
      .find({ className: styles.sortListContainer });
    expect(element).toExist();
  });

  it('should pass the required props to the sortListItems', () => {
    const sortListItems = wrapper.find('SortListItem');
    sortListItems.forEach(
      sortListItem =>
        expect(sortListItem).toHaveProp('icon') &&
        expect(sortListItem).toHaveProp('iconGreen') &&
        expect(sortListItem).toHaveProp('description') &&
        expect(sortListItem).toHaveProp('setHeader') &&
        expect(sortListItem).toHaveProp('toggleShowList'),
    );
  });
});
