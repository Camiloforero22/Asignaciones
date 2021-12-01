import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Mensaje, MensajeRelations} from '../models';

export class MensajeRepository extends DefaultCrudRepository<
  Mensaje,
  typeof Mensaje.prototype.id,
  MensajeRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Mensaje, dataSource);
  }
}
