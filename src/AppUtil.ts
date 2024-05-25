import {FieldValue, Timestamp} from 'firebase/firestore';
import moment from "moment";

class AppUtil {
    static readonly APP_VERSION : string = "1.0.2";

    static printDate(timestamp: Date | Timestamp | string | FieldValue): string{
        if (timestamp instanceof Timestamp){
            const date = moment.unix(timestamp.seconds).add(timestamp.nanoseconds / 1000000, 'milliseconds');
            const formattedDate = date.format('ddd MMMM, yyyy - h:mm a');
            return formattedDate.toString();
        }
        if (typeof timestamp === 'string') {
            // Handle string timestamps
            const date = moment(timestamp); // Use moment.js to parse the string
            if (date.isValid()) {
                return date.format('ddd MMMM, yyyy - h:mm a');
            }
        }
        // if (timestamp instanceof FieldValue) {
        //     return moment().format('YYYY-MM-DD');
        // }
        return "Invalid Date";
    }

    static cleanEmail(email: string): string {
        // Remove all punctuations
        return email.replace(/[^\w]/g, '');
    }


}

export default AppUtil;
