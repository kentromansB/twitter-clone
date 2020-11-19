import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';


const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.light.tint,
        position: 'absolute',
        bottom: 25,
        right: 25,
        borderRadius: 50,
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
    }

}
);

export default styles;
