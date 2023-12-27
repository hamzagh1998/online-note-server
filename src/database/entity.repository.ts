import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async create(createEntityData: unknown): Promise<unknown> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  // check if doc exists and return it if so
  async checkAndCreate(
    entityFilterQuery: FilterQuery<T>,
    createEntityData: unknown,
  ): Promise<unknown> {
    const entityDoc = await this.entityModel.findOne(entityFilterQuery);
    if (entityDoc) return entityDoc;

    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projctions?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projctions,
      })
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projctions?: Record<string, unknown>,
  ): Promise<Array<T> | null> {
    return this.entityModel
      .find(entityFilterQuery, {
        __v: 0,
        ...projctions,
      })
      .exec();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEndtityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEndtityData,
      { new: true },
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  async aggregate(entityPipelineQuery: object[]): Promise<unknown[]> {
    return this.entityModel.aggregate(entityPipelineQuery as any).exec();
  }
}
