import { Dimensions, StyleSheet } from "react-native";

export const {width, height, fontScale} = Dimensions.get('window');

export const globalStyles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})