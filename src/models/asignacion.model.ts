import {Entity, model, property} from '@loopback/repository';

@model()
export class Asignacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  personaId?: string;

  @property({
    type: 'string',
  })
  equipoId?: string;

  constructor(data?: Partial<Asignacion>) {
    super(data);
  }
}

export interface AsignacionRelations {
  // describe navigational properties here
}

export type AsignacionWithRelations = Asignacion & AsignacionRelations;
