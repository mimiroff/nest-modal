import { getConfig } from '../config';

export const jwtConstants = {
  secret: getConfig().JWT_SECRET,
};
