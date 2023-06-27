import React from 'react';
import styles from './styles.css';
import { CircleLoader } from 'react-spinners';

import { getPlantType } from 'src/api/queries/getPlantType';
import { ProTipsCard } from '../ProTipsCard';
import { SummaryCard } from '../SummaryCard';
import { TopCard } from '../TopCard';

export const PlantTypePage = ({ match }) => {
  const { plantTypeId } = match.params;
  const { error, data } = getPlantType(plantTypeId);
  if (error) return `Error! ${error.message}`;
  return (
    <div className={styles.plantView}>
      {data ? (
        <>
          <TopCard {...data.plantType} />
          <ProTipsCard {...data.plantType} />
          <SummaryCard {...data.plantType} />
        </>
      ) : (
        <span className={styles.loading}>
          <CircleLoader color={'#ffc32d'} loading={true} />
        </span>
      )}
    </div>
  );
};
