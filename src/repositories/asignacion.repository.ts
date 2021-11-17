import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Asignacion, AsignacionRelations} from '../models';

export class AsignacionRepository extends DefaultCrudRepository<
  Asignacion,
  typeof Asignacion.prototype.id,
  AsignacionRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Asignacion, dataSource);
  }
}
