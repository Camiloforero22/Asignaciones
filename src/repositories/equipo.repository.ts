import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Equipo, EquipoRelations, Asignacion} from '../models';
import {AsignacionRepository} from './asignacion.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {

  public readonly asignacions: HasManyRepositoryFactory<Asignacion, typeof Equipo.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('AsignacionRepository') protected asignacionRepositoryGetter: Getter<AsignacionRepository>,
  ) {
    super(Equipo, dataSource);
    this.asignacions = this.createHasManyRepositoryFactoryFor('asignacions', asignacionRepositoryGetter,);
    this.registerInclusionResolver('asignacions', this.asignacions.inclusionResolver);
  }
}
