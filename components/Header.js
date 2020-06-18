import { withNavigation } from '@react-navigation/compat';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import argonTheme from '../constants/Theme';
import { useCartContext } from '../context/cart';
import { width } from '../utils/Scalaing';
import Icon from './Icon';
import NavBar from './NavBar';
import { useAppContext } from '../context/app';

const BasketButton = ({ isWhite, style, navigation }) => {
  const { cart } = useCartContext();
  const { visual } = useAppContext();
  let numberOfProducts = cart?.cartInfo?.products?.length || 0;

  return (
    <TouchableOpacity
      style={[styles.button, style, { position: 'relative' }]}
      onPress={() => navigation.navigate('OrderSummary')}
    >
      {Boolean(numberOfProducts) && (
        <Text
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: visual.color,
            color: '#fff',
            borderRadius: 20,
            height: 25,
            width: 25,
            padding: 2,
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {numberOfProducts}
        </Text>
      )}
      <Icon
        size={24}
        name='shopping-cart'
        color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
      />
    </TouchableOpacity>
  );
};

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;
    return (
      <BasketButton key='basket-home' navigation={navigation} isWhite={white} />
    );
  };

  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const headerStyles = [
      {
        height: 64,
        width: width,
        marginHorizontal: 'auto',
      },
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];

    return (
      <View style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          navigation={navigation}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'chevron-left' : 'menu'}
              family='entypo'
              size={20}
              onPress={this.handleLeftPress}
              color={
                iconColor ||
                (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)
              }
            />
          }
          //  leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    zIndex: 5,
  },

  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: 16 / 2,
    width: 16 / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: argonTheme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: argonTheme.COLORS.ICON,
  },
  search: {
    height: 0,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: argonTheme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER,
  },
});

export default withNavigation(Header);
