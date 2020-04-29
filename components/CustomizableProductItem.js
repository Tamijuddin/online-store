import React, { useState } from 'react';
import { View, Text } from 'react-native';

import CustomizableProductItemCollapsed from './CustomizableProductItemCollapsed';
import CustomizableProductItemExpanded from './CustomizableProductItemExpanded';

const CustomizableProductItem = ({
  isSelected,
  _id,
  setSelected,
  isLast,
  openModal,
  navigation,
  data,
}) => {
  const [expanded, setExpanded] = useState(false);

  const [isSelectedInside, setisSelectedInside] = useState(0);
  let default_first_product =
    data.customizableProduct !== null
      ? data.customizableProduct.customizableProductOptions[0]
      : null;
  if (
    data.customizableProduct == null ||
    data.customizableProduct.customizableProductOptions == null
  ) {
    return <Text>Bad data</Text>;
  }
  if (expanded && isSelected) {
    return (
      <CustomizableProductItemExpanded
        isSelected={isSelected}
        _id={_id}
        data={data.customizableProduct.customizableProductOptions}
        setSelected={setSelected}
        isLast={isLast}
        openModal={openModal}
        navigation={navigation}
        setExpanded={setExpanded}
        label={data.label}
      />
    );
  }
  return (
    <CustomizableProductItemCollapsed
      isSelected={isSelected}
      _id={_id}
      data={default_first_product}
      setSelected={setSelected}
      isLast={isLast}
      openModal={openModal}
      navigation={navigation}
      setExpanded={setExpanded}
      label={data.label}
    />
  );
};

export default CustomizableProductItem;
