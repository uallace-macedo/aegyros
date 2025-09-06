export interface IRandomPasswordGenerator {
  generate(): Promise<string>
}