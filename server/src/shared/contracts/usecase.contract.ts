export interface UsecaseContract<Input, Output> {
  execute(input: Input): Promise<Output>;
}