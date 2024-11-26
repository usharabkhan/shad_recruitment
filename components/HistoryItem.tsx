import { View, Text, TouchableOpacity } from "react-native"
import { HistoryItem, ActivityItem, SchoolVisit } from "@/app/constants/types"
import AntDesign from '@expo/vector-icons/AntDesign';
import { API_URL } from "@/app/constants/constant";
import axios from "axios";

interface HistoryItemCardProps {
    item: HistoryItem
    onDelete: () => void
    editMode: boolean
}

interface DeleteProps{
    type: string
    id: number
}

export default function HistoryItemCard(  {item, onDelete, editMode}  : HistoryItemCardProps): JSX.Element{
    const itemType = item.type == 'activity' ? 'activity' : 'visit'
    const containerStyle = [
        styles.historyItemContainer, 
        itemType == 'visit' ? {backgroundColor: 'rgba(180, 249, 176, 1)'} : {backgroundColor: 'rgba(249, 249, 249, 0.7)'}
    ]
    var desc: string = "No description available";
    var toDelete : DeleteProps;

    // Activity
    if ('a_id' in item.data){ 
        desc = item.data.description ? String(item.data.description) : "No description available";
        toDelete = { type: "activity", id : item.data.a_id};
    }
    // Visit
    else{
        desc = "Visited with " + item.data.students + " students in attendance";
        toDelete = { type: "visit", id : item.data.visit_id};
    }

    // Function to delete activity
    const handleDeleteActivity = async( toDel : DeleteProps  ) => {
        try {
            if (toDel.type === "activity"){
                const response = await axios.delete(API_URL + 'activity/delete/' + toDel.id);
                onDelete();
            }
        }
        catch (error) {
            // do nothing
        }
    }
    return(
        <View style={containerStyle} >
            <View style={{flex: 1}}>
                <Text style={styles.historyItemDate}>{new Date(item.date).toDateString()}</Text>
                <Text style={styles.historyItemText}>{desc}</Text>
            </View>
            {editMode && itemType == 'activity' &&
                <TouchableOpacity style={{marginLeft: 4}} onPress={() => handleDeleteActivity(toDelete)}>
                    <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = {
    
    historyItemContainer: {
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
        // backgroundColor: '#f9f9f9',
        borderWidth: 1, 
        borderColor: '#613493'
    },
    historyItemDate: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        fontSize: 14,
        fontFamily: 'Inter' 
    },
    historyItemText: {
        flexShrink: 1,
        color: '#666',
        fontSize: 14,
        fontFamily: 'Inter' 
    }
    
}