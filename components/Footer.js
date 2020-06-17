import React from 'react';
import { View, Text } from 'react-native';
import { useAppContext } from '../context/app';
import { width } from '../utils/Scalaing';

const Footer = () => {
  const { visual, brand } = useAppContext();

  return (
    <View
      style={{
        backgroundColor: visual.color,
        marginTop: 40,
        flexDirection: width > 768 ? 'row' : 'column',
        alignItems: 'center',
        padding: 60,
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#fff' }}>
        {brand.name}
      </Text>
      <Text style={{ color: '#fff' }}>Powered by DailyKIT</Text>
    </View>
  );
};

export default Footer;