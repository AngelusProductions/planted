import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CircleLoader } from 'react-spinners';
import { MdAddCircleOutline } from 'react-icons/md';
import * as s from './styles.css';

import GET_NOOKS_BY_USER_ID from 'api/queries/getNooksByUserId';
import { sortByName } from 'utils';

import HeaderRow from '../HeaderRow';
import AddNookModal from '../AddNookModal';
import NookList from '../NookList';

const GardenView = props => {
  let nooks = [];
  const [isAlphabeticallySorted, toggleSort] = useState(true);
  const [showAddNookModal, toggleAddNookModal] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (!currentUser) window.location.replace('/');
  const { loading, errors, data } = useQuery(GET_NOOKS_BY_USER_ID, {
    variables: { userId: currentUser ? currentUser.id : '' },
  });
  nooks = data && data.nooks.sort(sortByName);
  if (!isAlphabeticallySorted) nooks = nooks.reverse();

  const plantTotalReducer = (plantTotalAccumulator, nook) =>
    nook.plants && plantTotalAccumulator + nook.plants.length;
  const plantTotal = data && nooks.reduce(plantTotalReducer, 0);

  const headerRowProps = {
    plantTotal,
    toggleSort,
    isAlphabeticallySorted,
  };

  const baseProps = {
    nooks,
    headerRowProps,
    showAddNookModal,
    toggleAddNookModal,
  };

  return !loading && !errors && <BaseGardenView {...baseProps} />;
};

export const BaseGardenView = ({
  nooks,
  headerRowProps,
  showAddNookModal,
  toggleAddNookModal,
}) => {
  return nooks ? (
    <div className={s.gardenViewContainer}>
      <HeaderRow nooks={nooks} {...headerRowProps} />
      <MdAddCircleOutline
        className={s.addNookButton}
        onClick={() => toggleAddNookModal(!showAddNookModal)}
      />
      {showAddNookModal && (
        <AddNookModal toggleAddNookModal={toggleAddNookModal} />
      )}
      <NookList nooks={nooks} />
    </div>
  ) : (
    <span className={s.loading}>
      <CircleLoader color={'#ffc32d'} loading={true} />
    </span>
  );
};

export default GardenView;
