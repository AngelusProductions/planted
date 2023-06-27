import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import getLuxOrCycleIcon from 'utils/getLuxOrCycleIcon';
import styles, {
  plantCardLarge,
  plantCardLargePhoto,
  plantCardLargeLuxLevel,
} from './styles.css';

const PlantCardLarge = ({
  id,
  name,
  luxLevel,
  photoUrl,
  photoUrlVerticalCrop,
}) => {
  const [plantTypePhotoUrl, setPlantTypePhotoUrl] = useState(
    photoUrlVerticalCrop,
  );
  const plantTypeLink = `/plant-types/${id}`;
  const luxIcon = getLuxOrCycleIcon(
    'luxLevel',
    luxLevel,
    'unselected',
    plantCardLargeLuxLevel,
  );
  return (
    <Link
      to={plantTypeLink}
      className={plantCardLarge}
      onMouseEnter={() => setPlantTypePhotoUrl(photoUrl)}
      onMouseLeave={() => setPlantTypePhotoUrl(photoUrlVerticalCrop)}
    >
      <img src={plantTypePhotoUrl} alt={name} className={plantCardLargePhoto} />
      <span className={styles.label}>{name}</span>
      {luxIcon}
    </Link>
  );
};

export default PlantCardLarge;
