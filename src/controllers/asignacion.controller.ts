import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Asignacion} from '../models';
import {AsignacionRepository} from '../repositories';

export class AsignacionController {
  constructor(
    @repository(AsignacionRepository)
    public asignacionRepository : AsignacionRepository,
  ) {}

  @post('/asignacions')
  @response(200, {
    description: 'Asignacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asignacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignacion, {
            title: 'NewAsignacion',
            exclude: ['id'],
          }),
        },
      },
    })
    asignacion: Omit<Asignacion, 'id'>,
  ): Promise<Asignacion> {
    return this.asignacionRepository.create(asignacion);
  }

  @get('/asignacions/count')
  @response(200, {
    description: 'Asignacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asignacion) where?: Where<Asignacion>,
  ): Promise<Count> {
    return this.asignacionRepository.count(where);
  }

  @get('/asignacions')
  @response(200, {
    description: 'Array of Asignacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asignacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asignacion) filter?: Filter<Asignacion>,
  ): Promise<Asignacion[]> {
    return this.asignacionRepository.find(filter);
  }

  @patch('/asignacions')
  @response(200, {
    description: 'Asignacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignacion, {partial: true}),
        },
      },
    })
    asignacion: Asignacion,
    @param.where(Asignacion) where?: Where<Asignacion>,
  ): Promise<Count> {
    return this.asignacionRepository.updateAll(asignacion, where);
  }

  @get('/asignacions/{id}')
  @response(200, {
    description: 'Asignacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asignacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asignacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Asignacion>
  ): Promise<Asignacion> {
    return this.asignacionRepository.findById(id, filter);
  }

  @patch('/asignacions/{id}')
  @response(204, {
    description: 'Asignacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignacion, {partial: true}),
        },
      },
    })
    asignacion: Asignacion,
  ): Promise<void> {
    await this.asignacionRepository.updateById(id, asignacion);
  }

  @put('/asignacions/{id}')
  @response(204, {
    description: 'Asignacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asignacion: Asignacion,
  ): Promise<void> {
    await this.asignacionRepository.replaceById(id, asignacion);
  }

  @del('/asignacions/{id}')
  @response(204, {
    description: 'Asignacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asignacionRepository.deleteById(id);
  }
}
