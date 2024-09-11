import { Result } from "ts-results-es";

export interface IExecutable<TReturnType> {
    execute(...args: any[]): Promise<Result<TReturnType, Error>>;
};
