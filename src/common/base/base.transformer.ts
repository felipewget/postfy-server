export abstract class BaseTransformer<T> {
  protected abstract serialize(
    entity: T,
    options?: Record<string, any>,
  ): Record<string, any>;

  transform(data: T | T[], options?: Record<string, any>) {
    if (!data) return null;

    if (Array.isArray(data)) {
      return data.map((entity) => this.serialize(entity, options));
    }
    return this.serialize(data, options);
  }
}
