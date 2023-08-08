import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/New_York');
export default function formatDate(date, hour = false) {
    
    if (hour) {
        return dayjs.tz(date).format("DD MMMM YYYY - HH:mm")
    } else {
        return dayjs.tz(date).format("DD MMMM YYYY")
    }
}