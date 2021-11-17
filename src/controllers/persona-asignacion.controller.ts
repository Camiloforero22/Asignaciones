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
  Persona,
  Asignacion,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaAsignacionController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/asignacions', {
    responses: {
      '200': {
        description: 'Array of Persona has many Asignacion',
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
    return this.personaRepository.asignacions(id).find(filter);
  }

  @post('/personas/{id}/asignacions', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asignacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignacion, {
            title: 'NewAsignacionInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) asignacion: Omit<Asignacion, 'id'>,
  ): Promise<Asignacion> {
    return this.personaRepository.asignacions(id).create(asignacion);
  }

  @patch('/personas/{id}/asignacions', {
    responses: {
      '200': {
        description: 'Persona.Asignacion PATCH success count',
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
    return this.personaRepository.asignacions(id).patch(asignacion, where);
  }

  @del('/personas/{id}/asignacions', {
    responses: {
      '200': {
        description: 'Persona.Asignacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asignacion)) where?: Where<Asignacion>,
  ): Promise<Count> {
    return this.personaRepository.asignacions(id).delete(where);
  }
}
