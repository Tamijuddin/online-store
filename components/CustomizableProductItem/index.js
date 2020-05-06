import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

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
  id,
  independantItem,
  tunnelItem,
  setcardData,
  setcartItem,
  setPrice,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSelectedInside, setisSelectedInside] = useState(0);
  const [customizableProduct, set_customizableProduct] = useState(null);
  const [numberOfOptions, setnumberOfOptions] = useState(0);

  useEffect(() => {
    if (independantItem) {
      fetchData();
    } else {
      set_customizableProduct(data);
      if (
        data &&
        data.customizableProduct &&
        data.customizableProduct.customizableProductOptions
      ) {
        setnumberOfOptions(
          data.customizableProduct.customizableProductOptions.length
        );
      }

      setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    try {
      let res = await axios({
        url: 'https://dailykitdatahub.herokuapp.com/v1/graphql',
        method: 'POST',
        data: JSON.stringify({
          query: `
          {
            customizableProduct(id: ${id}) {
              name
              customizableProductOptions {
                simpleRecipeProduct {
                  name
                  default
                  simpleRecipeProductOptions {
                    price
                    type
                    simpleRecipeYield {
                    yield
                    }
                    simpleRecipeYieldId
                  }

                  simpleRecipe {
                    author
                    cookingTime
                    assets
                    cuisine
                    description
                    id
                    image
                    name
                    procedures
                    show
                    utensilsRequired
                  }
                }
              }
            }
          }
        `,
        }),
      });
      set_customizableProduct(res.data.data);
      if (
        res.data.data &&
        res.data.data.customizableProduct &&
        res.data.data.customizableProduct.customizableProductOptions
      ) {
        setnumberOfOptions(
          res.data.data.customizableProduct.customizableProductOptions.length
        );
      }
      let item = res.data.data.customizableProduct;
      if (item.customizableProductOptions[0] && independantItem) {
        let objToAddToCart = {};
        if (!tunnelItem) {
          setPrice(
            item.customizableProductOptions[0].simpleRecipeProduct
              .simpleRecipeProductOptions[0].price[0].value
          );
        }
        if (tunnelItem) {
          setcartItem(objToAddToCart);
        }
        if (independantItem && !tunnelItem) {
          setcardData(item);
        }
      }

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  if (loading || !customizableProduct) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
  let default_first_product =
    customizableProduct.customizableProduct !== null
      ? customizableProduct.customizableProduct.customizableProductOptions[0]
      : null;
  if (
    customizableProduct.customizableProduct == null ||
    customizableProduct.customizableProduct.customizableProductOptions == null
  ) {
    return <Text>Bad data</Text>;
  }
  if ((expanded && isSelected) || (expanded && independantItem)) {
    return (
      <CustomizableProductItemExpanded
        isSelected={isSelected}
        _id={_id}
        data={
          customizableProduct.customizableProduct.customizableProductOptions
        }
        setSelected={setSelected}
        isLast={isLast}
        openModal={openModal}
        navigation={navigation}
        setExpanded={setExpanded}
        label={independantItem ? '' : customizableProduct.label}
        independantItem={independantItem ? true : false}
        numberOfOptions={numberOfOptions}
        tunnelItem={tunnelItem}
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
      label={independantItem ? '' : data.label}
      independantItem={independantItem ? true : false}
      numberOfOptions={numberOfOptions}
    />
  );
};

export default CustomizableProductItem;