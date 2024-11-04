import { Text, TouchableOpacity } from "react-native";
import { styles } from '@/assets/styles';
import { Link, useRouter } from "expo-router";

// Define an interface for the school object
interface school {
    id: number,
    name: string,
    address: string,
    contact: string,
    type: string
}
// Define props type
interface props {
    data: school;
}

export default function SchoolDetailBox( { data }: props ){
    const router = useRouter();
    const handlePress = () => {
        router.push(`/details/${data.id}`);
    };
    
    return (
        <TouchableOpacity style={styles.schoolItem} onPress={handlePress}>
            <Text style={styles.schoolName}>{data.name}</Text>
            <Text style={styles.schoolDetails}>Location: {data.address}</Text>
            <Text style={styles.schoolDetails}>Type: {data.type}</Text>
        </TouchableOpacity>
    )
}
