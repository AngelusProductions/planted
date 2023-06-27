import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styles from './styles.css';
import { WishlistItem } from 'components/plant-page/WishlistItem';
import { arrowConnecting, exit } from 'assets/icons';
import CREATE_WISH from 'api/mutations/createWish';
import currentUser from 'utils/currentUser';

export const text = {
  connectorAlt: 'Connecting piece from heart to popupBox',
  wishlistHeader: 'Add to Wishlist',
  buttonType: 'submit',
  buttonValue: 'Save',
  closeButtonHeader: 'The X in the top right of the header to close it',
};

export const Wishlist = ({ nooks, wishes, togglePopUp, plantTypeId }) => {
  const [createWish] = useMutation(CREATE_WISH);
  const [selectedNooks, setSelectedNooks] = useState([]);

  const onSaveClick = selectedNooks => {
    const userId = currentUser.id;
    selectedNooks.forEach(nookId => {
      const isAlreadyAdded = wishes.some(
        wish => wish.nook && wish.nook.id === nookId,
      );
      if (!isAlreadyAdded)
        createWish({
          variables: {
            wish: {
              nookId,
              userId,
              plantTypeId,
            },
          },
        });
    });
    togglePopUp();
  };
  return (
    <div>
      <img
        src={arrowConnecting}
        className={styles.wishlistConnector}
        alt={text.connectorAlt}
      />
      <div className={styles.wishlistContainer}>
        <div className={styles.wishlistHeaderContainer}>
          <h5 className={styles.header}>{text.wishlistHeader}</h5>
          <button className={styles.exit} onClick={togglePopUp}>
            <img src={exit} alt={text.closeButtonHeader} />
          </button>
        </div>
        <div className={styles.optionList}>
          {nooks.map(nook => (
            <WishlistItem
              id={nook.id}
              key={nook.id}
              selectedNooks={selectedNooks}
              setSelectedNooks={setSelectedNooks}
              wishes={wishes}
              {...nook}
            />
          ))}
        </div>
        <div className={styles.saveButtonContainer}>
          <input
            type={text.buttonType}
            value={text.buttonValue}
            className={styles.saveButton}
            onClick={() => onSaveClick(selectedNooks)}
          />
        </div>
      </div>
    </div>
  );
};
