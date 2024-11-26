import { Text, TouchableOpacity } from "react-native";
import { styles } from '@/assets/styles';
import { Link, useRouter } from "expo-router";
import { School } from "@/app/constants/types";

// Define props type
interface props {
    data: School;
}

export default function SchoolDetailBox( { data }: props ){
    const router = useRouter();

    // Ensure that data.name is always a string
    const schoolName = String(data?.name || 'Unnamed School');

    const handlePress = () => {
        router.push(`/details/${data.id}`);
    };

    return (
        <TouchableOpacity key={data.id} style={styles.schoolItem} onPress={handlePress}>
            <Text style={styles.schoolName}>{schoolName}</Text>
            <Text style={styles.schoolDetails}>Location: {data?.address}</Text>
            <Text style={styles.schoolDetails}>Type: {data?.type}</Text>
        </TouchableOpacity>
    );
}
