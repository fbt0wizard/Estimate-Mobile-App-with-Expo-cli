// import { StyleSheet, Text, View } from 'react-native'
// import React, { useRef, useMemo } from 'react'
// import BottomSheet from '@gorhom/bottom-sheet';

// const BottomSheetComponent = () => {
//       // ref
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);
//   return (
//     <View style={styles.container}>
//     <BottomSheet
//       ref={bottomSheetRef}
//       index={1}
//       snapPoints={snapPoints}
//       onChange={handleSheetChanges}
//     >
//       <View style={styles.contentContainer}>
//         <Text>Awesome 🎉</Text>
//       </View>
//     </BottomSheet>
//   </View>
//   )
// }

// export default BottomSheetComponent

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: 'grey',
//       },
//       contentContainer: {
//         flex: 1,
//         alignItems: 'center',
//       },
// })