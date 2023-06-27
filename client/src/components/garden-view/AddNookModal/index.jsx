import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as s from './styles.css';

import CREATE_NOOK from 'api/mutations/createNook';
import CREATE_PLANT from 'api/mutations/createPlant';
import GET_PLANT_TYPES from 'api/queries/getPlantTypes';
import currentUser from 'utils/currentUser';
import getLuxOrCycleIcon from 'utils/getLuxOrCycleIcon';

const t = {
  addNookHeader: 'Add a Nook',
  newNookNameLabel: 'What would you like to call it?',
  newNookLuxLevel: 'How bright is it?',
  nextStep: 'Next step',
  low: 'quite dark',
  medium: 'about average',
  high: 'lots of light',
  addPlants: `Based upon the light level, the plants below would thrive the best.
              Select the ones you'd like to add.`,
  addNook: 'Add Nook',
};

const AddNookModal = ({ toggleAddNookModal, history }) => {
  const { data } = useQuery(GET_PLANT_TYPES);
  const [createNook] = useMutation(CREATE_NOOK);
  const [createPlant] = useMutation(CREATE_PLANT);

  const [newNookName, setNewNookName] = useState('');
  const [newLuxLevel, setNewLuxLevel] = useState(null);
  const [showAddPlants, toggleAddPlants] = useState(false);
  const [selectedPlantTypeIds, setSelectedPlantTypeIds] = useState([]);

  const onLuxClick = e => setNewLuxLevel(e.target.id.split(':')[1]);
  const onNewNookNameChange = e => setNewNookName(e.target.value);

  const placeholder = `${currentUser.firstName}'s Nook`;
  const suggestedPlantTypes =
    data && data.plantTypes.filter(p => p.luxLevel === newLuxLevel);

  const getIconSelect = level =>
    level === newLuxLevel ? 'selected' : 'unselected';
  const luxIconLow = getLuxOrCycleIcon(
    'luxLevel',
    'LOW',
    getIconSelect('LOW'),
    s.luxLevelIcon,
    onLuxClick,
  );
  const luxIconMedium = getLuxOrCycleIcon(
    'luxLevel',
    'MEDIUM',
    getIconSelect('MEDIUM'),
    s.luxLevelIcon,
    onLuxClick,
  );
  const luxIconHigh = getLuxOrCycleIcon(
    'luxLevel',
    'HIGH',
    getIconSelect('HIGH'),
    s.luxLevelIcon,
    onLuxClick,
  );

  const onPlantTypeClick = e => {
    selectedPlantTypeIds.includes(e.target.id)
      ? setSelectedPlantTypeIds(
          selectedPlantTypeIds.filter(f => f !== e.target.id),
        )
      : setSelectedPlantTypeIds([...selectedPlantTypeIds, e.target.id]);
  };

  const onAddNookClick = () => {
    createNook({
      variables: {
        nook: {
          name: newNookName,
          luxLevel: newLuxLevel,
          userId: currentUser.id,
        },
      },
    }).then(
      ({
        data: {
          createNook: { nook },
        },
      }) => {
        const newPlants = selectedPlantTypeIds.map(plantTypeId =>
          createPlant({
            variables: {
              plant: {
                nookId: nook.id,
                plantTypeId,
              },
            },
          }),
        );
        Promise.all(newPlants).then(plants => {
          debugger;
          history.push(`/nooks/${nook.id}`);
        });
      },
    );
    toggleAddNookModal(false);
  };

  return showAddPlants ? (
    <section className={s.addPlantsModal}>
      <h1 className={s.addNookHeader}>{t.addNookHeader}</h1>
      <label className={s.addPlantsLabel}>{t.addPlants}</label>
      <div className={s.plantTypeList}>
        {data &&
          suggestedPlantTypes.map(p => {
            const className = selectedPlantTypeIds.includes(p.id)
              ? s.selectedPlant
              : t.unselectedPlant;
            return (
              <>
                <img
                  id={p.id}
                  key={p.id}
                  alt={p.name}
                  className={className}
                  onClick={onPlantTypeClick}
                  src={p.photoUrlVerticalCrop}
                />
                {/* <span className={s.plantTypeTooltip} ></span> */}
              </>
            );
          })}
      </div>
      {selectedPlantTypeIds.length > 0 && (
        <button className={s.addNookButton} onClick={onAddNookClick}>
          {t.addNook}
        </button>
      )}
    </section>
  ) : (
    <section className={s.addNookModal}>
      <h1 className={s.addNookHeader}>{t.addNookHeader}</h1>
      <label className={s.newNookNameLabel}>{t.newNookNameLabel}</label>
      <input
        type="text"
        value={newNookName}
        className={s.newNookNameInput}
        placeholder={placeholder}
        onChange={onNewNookNameChange}
      />
      <label className={s.newNookLuxLabel}>{t.newNookLuxLevel}</label>
      <div className={s.luxIconContainer}>
        {luxIconLow}
        {luxIconMedium}
        {luxIconHigh}
      </div>
      <div className={s.luxLabelContainer}>
        <span id="LOW" className={s.luxLabel} onClick={onLuxClick}>
          {t.low}
        </span>
        <span id="MEDIUM" className={s.luxLabel} onClick={onLuxClick}>
          {t.medium}
        </span>
        <span id="HIGH" className={s.luxLabel} onClick={onLuxClick}>
          {t.high}
        </span>
      </div>
      {newLuxLevel && newNookName.length > 0 && (
        <button
          className={s.nextStepButton}
          onClick={() => toggleAddPlants(true)}
        >
          {t.nextStep}
        </button>
      )}
    </section>
  );
};

export default withRouter(AddNookModal);
