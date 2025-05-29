// #region imports
import { createLogger, format, transports } from 'winston';
// #endregion imports

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    // Add a transport here for Elasticsearch or CloudWatch
  ],
});

export default logger;
