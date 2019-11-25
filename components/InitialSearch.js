// import React from 'react';
// import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
// import { ListItem } from 'react-native-elements';
// import { colors, sizes, fonts } from '../constants/theme';
// import IconSearch from './HomeSearch';

// const list = [
//     {
//       name: 'Yam Market',
//       subtitle: 'Haatso'
//     },
//     {
//       name: 'Liberation Road',
//       subtitle: 'Accra'
//     },
//   ]
  

// export default class InitialSearch extends React.Component { 

//     // constructor(props) {

//     //     this.state = {
//     //         translateYValue: new Animated.Value(0)
//     //     }
//     // }

//     // componentDidMount() {
//     //     this.translateY(this.props);
//     // }

//     // translateY = (props) => {

//     //     Animated.timing(
//     //         translateYValue, 
//     //         {
                
//     //         }
//     //     ).start();
//     // }

//     render() {
//         const { isVisible} = this.props;
//         return (
//             <View style={styles.container}>
//                 <View style={styles.header}>
//                     <Text style={styles.headerText}>Hello, Esther</Text>
//                 </View>
//                 <View style={styles.searchContainer}>
//                     <IconSearch placeholder='Delivery to?' iconName='motorbike' iconType ='material-community' />
//                 </View>
//                 <View style={styles.listContainer}>
//                 {
//                   list.map((item, i) => (
//                     <ListItem
//                       key={i}
//                       title={item.name}
//                       subtitle={item.subtitle}
//                       leftIcon={{ name: 'map-marker-radius', type:'material-community', color: colors.primary }}
//                       bottomDivider
//                       Component={TouchableOpacity}
//                       onPress={console.log('location pressed!')}
//                     />
//                   ))
//                 }
//                 </View>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         width: sizes.screenWidth,
//         height: sizes.screenHeight*1/2,
//         position: 'absolute',
//         bottom: 0,
//         backgroundColor: colors.white
//     },
//     header: {
//         borderBottomWidth: 1,
//         borderBottomColor: colors.gray2,
//         height: 60,
//         width: sizes.screenWidth,
//     },
//     headerText: {
//         alignSelf: 'center',
//         fontSize: fonts.header.fontSize,
//         marginVertical: 20,
//         color: colors.black
//     },
//     searchContainer: {
//         alignSelf: 'center',
//         marginTop: 20
//     }, 
//     listContainer: {
//         marginVertical: 30,
//         paddingHorizontal: 20
//     }
// })