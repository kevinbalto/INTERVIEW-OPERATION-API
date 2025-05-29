// #region imports
import { CorsOptions } from "cors";
// #endregion imports

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = [process.env.FRONTEND_URL]

        if(whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Cors error!'))
        }
    }
};