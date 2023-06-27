import React from 'react';
import styles from './styles.css';
import { LightLevelPicture } from 'components/UI/lightLevelPicture';
import { NookPlants } from '../NookPlants';
import { SuggestionsList } from '../SuggestionsList';
import { WishlistCarousel } from '../WishlistCarousel';
import fetchNook from 'api/queries/fetchNook';
import { CircleLoader } from 'react-spinners';

export const nookDetailText = {
  loadingText: 'Loading...',
  errorText: 'Error: ',
};

export const NookDetail = props => {
  let userPhotoUrl;
  const localUser = localStorage.getItem('user');
  if (!localUser) window.location.replace('/');
  else userPhotoUrl = JSON.parse(localUser).photoUrl;
  const { nookId } = props.match && props.match.params;
  const { loadingText, errorText } = nookDetailText;

  const { loading, error, data } = fetchNook(nookId);
  if (loading)
    return (
      <span className={styles.loading}>
        <CircleLoader color={'#ffc32d'} loading={true} />
      </span>
    );
  if (error) return errorText + error.message;
  const { nook } = data,
    { name, luxLevel, wishes } = nook;
  return (
    <div>
      <div className={styles.title}>{name}</div>
      <div className={styles.lux}>
        <LightLevelPicture lightLevel={luxLevel} styles={styles.suns} />
        <img src={userPhotoUrl} alt={userPhotoUrl} className={styles.proPic} />
      </div>
      <NookPlants {...nook} />
      <WishlistCarousel plants={wishes} />
      <SuggestionsList luxLevel={luxLevel} />
    </div>
  );
};
