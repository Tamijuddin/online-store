import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/store')],
    config: {
      App: {
        path: '/',
        screens: {
          Home: {
            path: '/',
            screens: {
              Home: {
                path: 'home/',
              },
              ProductPage: {
                path: 'product',
                parse: {
                  data: Object,
                  name: String,
                },
                stringify: {
                  data: (data) => '',
                },
              },
            },
          },
        },
      },
    },
  });
}
