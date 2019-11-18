import React, { useState } from 'react';
import NookCarousel from './NookCarousel';
import NookInfo from './NookInfo';
import { nookCard } from './styles.css';

const NookCardSmall = ({ nook }) => {
  const { plants } = nook;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const currentPlant = plants[carouselIndex];
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const onArrowClick = direction => {
    if (direction === 'left') setCarouselIndex(carouselIndex - 1);
    if (direction === 'right') setCarouselIndex(carouselIndex + 1);
  };
  const plantTotalText =
    plants.length === 1 ? `1 plant` : `${plants.length} plants`;
  const baseProps = {
    nook,
    plants,
    currentPlant,
    currentUser,
    onArrowClick,
    plantTotalText,
    carouselIndex,
    setCarouselIndex,
  };
  return <BaseNookCardSmall {...baseProps} />;
};

const BaseNookCardSmall = props => (
  <div className={nookCard}>
    <NookCarousel {...props} />
    <NookInfo {...props} />
  </div>
);
export default NookCardSmall;
