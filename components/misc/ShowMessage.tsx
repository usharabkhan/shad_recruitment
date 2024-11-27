import { RED_COLOR } from "@/app/constants/constant";
import Toast from "react-native-root-toast";

export function showMessage(message: string, type: string){
    var backgroundColor = "#D9E8E1"
    var textColor = "#2C6E52"
    if (type === "error"){
        textColor = "#93231A"
        backgroundColor = "#CFC4C3"
    }
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        animation: true,
        backgroundColor: backgroundColor,
        textColor: textColor,
        textStyle: {fontWeight: 'bold', paddingHorizontal: 10},
        keyboardAvoiding: true,
        position: 120,
        opacity: 1,
    });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function hideToast() {
        Toast.hide(toast);
    }, Toast.durations.LONG);
}