import React from 'react';
import { CircleLoader } from 'react-spinners';
import { useQuery } from '@apollo/react-hooks';
import styles, {
  searchViewContainer,
  header,
  plantTypeListClass,
  greenText,
} from './styles.css';
import GET_PLANT_TYPES from 'api/queries/getPlantTypes';
import PlantCardLarge from '../../UI/plant-cards/PlantCardLarge';

const SearchView = () => {
  let headerText = '';
  const { data, loading } = useQuery(GET_PLANT_TYPES);
  if (loading)
    return (
      <span className={styles.loading}>
        <CircleLoader color={'#ffc32d'} loading={true} />
      </span>
    );
  const searchString = localStorage.getItem('searchString');
  const filteredPlantTypes =
    data &&
    searchString &&
    data.plantTypes.filter(plantType =>
      plantType.name.toLowerCase().includes(searchString.toLowerCase()),
    );
  if (data)
    headerText = `Showing ${filteredPlantTypes.length} result${
      filteredPlantTypes.length === 1 ? '' : 's'
    } for `;
  return (
    <div className={searchViewContainer}>
      {data && filteredPlantTypes ? (
        <>
          <h1 className={header}>
            {headerText}
            <span className={greenText}> "{searchString}"</span>
          </h1>
          <div className={plantTypeListClass}>
            {filteredPlantTypes.map(plantType => (
              <PlantCardLarge key={plantType.name} {...plantType} />
            ))}
          </div>
        </>
      ) : (
        <h1 className={header}>You searched for nothing. Here is is:</h1>
      )}
    </div>
  );
};

export default SearchView;
