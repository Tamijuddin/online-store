import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import CustomizableProductItem from './CustomizableProductItem';
import SimpleProductItem from './SimpleProductItem';
import InventoryProductItem from './InventoryProductItem';
import { COMBO_PRODUCT } from '../gql/Queries';

const { width, height } = Dimensions.get('window');

const ComboProduct = ({
  tunnelItem,
  navigation,
  setcardData,
  id,
  setcartItem,
  setIsLastComboItem,
}) => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(0);

  const [comboProductsArray, setcomboProductsArray] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let res = await axios({
          url: 'https://dailykitdatahub.herokuapp.com/v1/graphql',
          method: 'POST',
          data: COMBO_PRODUCT(id),
        });
        setData(res.data.data.comboProduct);
        let items = res.data.data;
        if (!tunnelItem) {
          setcardData(res.data.data.comboProduct);
        }
        if (tunnelItem) {
          setcartItem(comboProductsArray);
        }
        setisLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
    return () => {};
  }, []);

  if (isLoading || data == null || data == undefined) {
    return (
      <View style={styles.flexContainer}>
        <ActivityIndicator />
      </View>
    );
  }
  let selectedArr = data.comboProductComponents.map((el, _id) => false);
  return (
    <View style={styles.container}>
      <View style={styles.card_title}>
        <Text style={styles.card_title_text}>
          {data.name ? data.name : 'Resturant Name'}
        </Text>
        <Text style={styles.is_customizable}>Customizeable</Text>
      </View>
      <View style={styles.item_parent_container}>
        {data.comboProductComponents.map((el, _id) => {
          let last = false;
          let isSelected = selected == _id;
          if (_id == data.comboProductComponents.length - 1) {
            last = true;
          }
          if (el.customizableProductId !== null) {
            return (
              <CustomizableProductItem
                isSelected={isSelected}
                _id={_id}
                data={el}
                setSelected={(index) => {
                  selectedArr[index] = true;
                  setSelected(index);
                  if (selectedArr.every((item) => item == true)) {
                    setIsLastComboItem(true);
                  }
                }}
                isLast={last}
                key={_id}
                navigation={navigation}
                tunnelItem={tunnelItem}
                id={el.customizableProductId}
                setcartItem={(item) => {
                  setcartItem(item);
                }}
                setDefault={(item) => setcomboProductsArray(item)}
              />
            );
          }
          if (el.simpleRecipeProductId !== null) {
            return (
              <SimpleProductItem
                isSelected={isSelected}
                _id={_id}
                data={el}
                setSelected={(index) => {
                  selectedArr[index] = true;
                  setSelected(index);
                  if (selectedArr.every((item) => item == true)) {
                    setIsLastComboItem(true);
                  }
                }}
                isLast={last}
                key={_id}
                navigation={navigation}
                id={el.simpleRecipeProductId}
                tunnelItem={tunnelItem}
                setcartItem={(item) => {
                  setcartItem(item);
                }}
              />
            );
          }
          if (el.inventoryProductId !== null) {
            return (
              <InventoryProductItem
                isSelected={isSelected}
                _id={_id}
                data={el}
                setSelected={(index) => {
                  selectedArr[index] = true;
                  setSelected(index);
                  console.log(selectedArr);
                  if (selectedArr.every((item) => item == true)) {
                    setIsLastComboItem(true);
                  }
                }}
                isLast={last}
                key={_id}
                navigation={navigation}
                id={el.inventoryProductId}
                tunnelItem={tunnelItem}
                setcartItem={(item) => {
                  setcartItem(item);
                }}
              />
            );
          }
        })}
      </View>
    </View>
  );
};

export default ComboProduct;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  card_container: {
    height: height * 0.55,
    width,
    paddingHorizontal: 20,
    elevation: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: {},
  },
  card_title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card_title_text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  is_customizable: {
    fontSize: 8,
    color: 'gray',
  },
  item_parent_container: {
    flex: 5,
    backgroundColor: '#fff',
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});