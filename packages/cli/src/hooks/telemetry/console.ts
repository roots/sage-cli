/** this shows the user the telemetry data is being collected */
import { Hook } from '@oclif/config'

export const log: Hook<'telemetry'> = async function (options) {
  delete options.config;
  console.log('The following user data has been collected:');
  console.log(JSON.stringify(options, null, 2));
}
