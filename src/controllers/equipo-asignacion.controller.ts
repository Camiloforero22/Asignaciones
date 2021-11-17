import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Equipo,
  Asignacion,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoAsignacionController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/asignacions', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Asignacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asignacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asignacion>,
  ): Promise<Asignacion[]> {
    return this.equipoRepository.asignacions(id).find(filter);
  }

  @post('/equipos/{id}/asignacions', {
    responses: {
      '200': {
        description: 'Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asignacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Equipo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignacion, {
            title: 'NewAsignacionInEquipo',
            exclude: ['id'],
            optional: ['equipoId']
          }),
        },
      },
    }) asignacion: Omit<Asignacion, 'id'>,
  ): Promise<Asignacion> {
    return this.equipoRepository.asignacions(id).create(asignacion);
  }

  @patch('/equipos/{id}/asignacions', {
    responses: {
      '200': {
        description: 'Equipo.Asignacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignacion, {partial: true}),
        },
      },
    })
    asignacion: Partial<Asignacion>,
    @param.query.object('where', getWhereSchemaFor(Asignacion)) where?: Where<Asignacion>,
  ): Promise<Count> {
    return this.equipoRepository.asignacions(id).patch(asignacion, where);
  }

  @del('/equipos/{id}/asignacions', {
    responses: {
      '200': {
        description: 'Equipo.Asignacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asignacion)) where?: Where<Asignacion>,
  ): Promise<Count> {
    return this.equipoRepository.asignacions(id).delete(where);
  }
}
