export function mapUserToFormikValues<T extends Record<string, any>>(
  user: Partial<Record<string, any>>,
  initial: T
): T {
  const result: Partial<T> = {};

  for (const key in initial) {
    if (user.hasOwnProperty(key)) {
      result[key] = user[key];
    } else {
      result[key] = initial[key];
    }
  }

  return result as T;
}
