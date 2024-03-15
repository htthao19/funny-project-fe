import { notification } from "antd";
import { APIError } from "services/api/base";

export class Notification {
    apiError(actionName: string, e: APIError) {
        notification.error({message: `${actionName} has an error. Status: ${e.status}, message: ${e.message}, details: ${e.details}`})
    }
    info(message: string) {
        notification.info({message: message})
    }
}

let _default = new Notification();
export default _default;
