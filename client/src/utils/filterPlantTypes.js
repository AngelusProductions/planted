const t = {
  luxLevel: 'luxLevel',
  waterCycle: 'waterCycle',
  jungleVibes: {
    category: 'Jungle Vibes',
    property: 'hasJungleVibes',
  },
  airyFresh: {
    category: 'Airy Fresh',
    property: 'isAiryFresh',
  },
  airPurifying: {
    category: 'Purifies the Air',
    property: 'isAirPurifying',
  },
};

const getFilterDict = filterId => {
  const [type, value] = filterId.split(':');
  return { type, value };
};

const filterPlantTypes = (plantTypes, filterIds) => {
  const filters = filterIds.map(filterId => getFilterDict(filterId));

  const isLevelPass = (plantType, property) => {
    const levelFilter = filters.find(filter => filter.type === property);
    if (!levelFilter) return true;
    return plantType[property] === levelFilter.value;
  };

  const isCategoryPass = (plantType, category, property) => {
    const categoryFilter = filters.find(filter => filter.value === category);
    if (!categoryFilter) return true;
    return plantType[property];
  };

  const luxLevelPass = plantTypes.filter(plantType =>
    isLevelPass(plantType, t.luxLevel),
  );
  const waterCyclePass = plantTypes.filter(plantType =>
    isLevelPass(plantType, t.waterCycle),
  );
  const jungleVibesPass = plantTypes.filter(plantType =>
    isCategoryPass(plantType, t.jungleVibes.category, t.jungleVibes.property),
  );
  const airyFreshPass = plantTypes.filter(plantType =>
    isCategoryPass(plantType, t.airyFresh.category, t.airyFresh.property),
  );
  const airPurifyingPass = plantTypes.filter(plantType =>
    isCategoryPass(plantType, t.airPurifying.category, t.airPurifying.property),
  );

  return plantTypes.filter(plantType => {
    return (
      waterCyclePass.includes(plantType) &&
      luxLevelPass.includes(plantType) &&
      jungleVibesPass.includes(plantType) &&
      airyFreshPass.includes(plantType) &&
      airPurifyingPass.includes(plantType)
    );
  });
};

export default filterPlantTypes;
