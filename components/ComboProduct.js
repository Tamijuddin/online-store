import React, { Component, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

import CustomizableProductItem from './CustomizableProductItem';

const { width, height } = Dimensions.get('window');

export default class ComboProduct extends Component {
  state = {
    selected: 0,
    modalVisible: false,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card_title}>
          <Text style={styles.card_title_text}>
            Dal Makhani with Brown Rice
          </Text>
          <Text style={styles.is_customizable}>Customizeable</Text>
        </View>
        <View style={styles.item_parent_container}>
          {[1, 2, 3].map((data, _id) => {
            let last = false;
            let selected = this.state.selected;
            let isSelected = selected == _id ? true : false;
            if (_id == 2) {
              last = true;
            }
            return (
              <CustomizableProductItem
                isSelected={isSelected}
                _id={_id}
                setSelected={(index) => this.setState({ selected: index })}
                isLast={last}
                key={_id}
                openModal={() => this.setState({ modalVisible: true })}
                navigation={this.props.navigation}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

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
});