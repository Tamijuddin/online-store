import EStyleSheet from 'react-native-extended-stylesheet';
import { height, width } from '../../utils/Scalaing';

export const styles = EStyleSheet.create({
  item_container: {
    flexDirection: 'column',
    paddingBottom: 5,
    marginBottom: 2,
    paddingBottom: 20,
    paddingHorizontal: 10,
    marginTop: 4,
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
  },
  item_container_one: {
    flex: 4,
    position: 'relative',
    paddingTop: 20,
    height: height * 0.3,
  },
  item_container_two: {
    flex: 1.3,
    paddingTop: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingTop: 15,
    paddingLeft: 10,
  },
  item_container_three: {
    flex: 1.3,
    paddingTop: 15,
  },
  bottom_container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  item_image_title: {
    position: 'absolute',
    zIndex: 8,
    color: 'gray',
    fontWeight: 'bold',
  },
  item_image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
  },
  item_title: {
    fontSize: '$m',
  },
  item_chef: {
    fontSize: 18,
    color: '#4f4e4e',
    flex: 1,
    textAlign: 'right',
  },
  something: {
    fontSize: '$s',
    color: '#4f4e4e',
    marginVertical: 10,
  },
  item_category: {
    color: 'white',
    width: 70,
    textAlign: 'center',
    marginTop: 5,
    paddingVertical: 2,
    borderRadius: 2,
    fontSize: '$s',
  },
  options_text: {
    color: '#3fa4fd',
    textAlign: 'right',
    fontSize: '$s',
  },
  item_details: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '$s',
    flex: 1,
  },
  price: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  add_to_cart_container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#3fa4ff',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  add_to_card_text: {
    color: 'white',
    fontSize: '$s',
  },
  price_text: {
    fontSize: '$l',
    fontWeight: 'bold',
  },
  details: {
    justifyContent: 'center',
  },
  type_container: {
    height: height * 0.1,
    flexDirection: 'row',
  },
  type_container_right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  type_button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
  },
  done_container: {
    backgroundColor: '#3fa4ff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    height: 20,
    width: 20,
  },
  item_three_upper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  item_three_lower: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
