// #region imports
import client from 'prom-client';
// #endregion imports

const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [50, 100, 300, 500, 1000, 2000], 
});

register.registerMetric(httpRequestDurationMicroseconds);

export { register };
