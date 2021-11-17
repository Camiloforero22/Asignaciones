import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Persona, PersonaRelations, Asignacion} from '../models';
import {AsignacionRepository} from './asignacion.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly asignacions: HasManyRepositoryFactory<Asignacion, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('AsignacionRepository') protected asignacionRepositoryGetter: Getter<AsignacionRepository>,
  ) {
    super(Persona, dataSource);
    this.asignacions = this.createHasManyRepositoryFactoryFor('asignacions', asignacionRepositoryGetter,);
    this.registerInclusionResolver('asignacions', this.asignacions.inclusionResolver);
  }
}
