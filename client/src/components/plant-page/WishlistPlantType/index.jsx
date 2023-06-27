import React from 'react';
import currentUser from 'utils/currentUser';
import { fetchNooksFromUser } from 'api/queries/fetchNooksFromUser';
import { Wishlist } from '../Wishlist';
import { CircleLoader } from 'react-spinners';
import styles from './styles.css';

export const WishlistInPlantType = props => {
  const { loading, error, data } = fetchNooksFromUser(currentUser.id);
  if (loading)
    return (
      <span className={styles.loading}>
        <CircleLoader color={'#ffc32d'} loading={true} />
      </span>
    );
  if (error) return `Error! ${error.message}`;
  return <Wishlist nooks={data.user.nooks} {...props} />;
};
