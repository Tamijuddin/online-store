import { useLinking } from '@react-navigation/native'
import { Linking } from 'expo'

export default function (containerRef) {
   return useLinking(containerRef, {
      prefixes: [Linking.makeUrl('/')],
      config: {
         App: {
            path: '/store',
            screens: {
               Home: {
                  path: '/',
               },
               ProfileScreen: {
                  path: 'ProfileScreen',
               },
               OrderHistory: {
                  path: 'OrderHistory',
               },
               OrderSummary: {
                  path: 'OrderSummary',
               },
               ProductPage: {
                  path: 'ProductPage',
                  parse: {
                     id: Number,
                     type: String,
                  },
               },
               Search: {
                  path: 'Search',
               },
               Recipe: {
                  path: 'Recipe',
                  parse: {
                     recipeId: Number,
                     refId: Number,
                     refType: String,
                  },
               },
               CategoryProductsPage: {
                  path: 'CategoryProductsPage',
                  parse: {
                     category: String,
                  },
               },
            },
         },
      },
   })
}
