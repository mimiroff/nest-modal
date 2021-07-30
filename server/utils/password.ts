import * as bcrypt from 'bcrypt';

const roundsCount = 10;

export class Password {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, roundsCount);
  }

  static async isValid(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
