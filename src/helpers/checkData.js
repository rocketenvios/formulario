import { FIELDS } from '../util/fieldsName';
import { diffTime, getTime } from './utilTime';

export const checkData = (data) => {
  const errors = [];

  const fields = [
    'name',
    'date',
    'direction',
    'zone',
    'whatsapp',
    'pay',
    'quantity',
    'initTime',
    'finishTime',
  ];

  try {
    fields.forEach((field) => {
      if (!data[field]) {
        errors.push(`El campo "${FIELDS[field]}" es obligatorio.`);
      }
    });

    if (errors.length > 0) {
      throw new Error(errors);
    }

    if (getTime(data.finishTime) < getTime(data.initTime)) {
      errors.push(
        'El tiempo final de la franja no puede ser menor que el tiempo inicial'
      );
      throw new Error(errors);
    }

    if (diffTime(data.initTime, data.finishTime) < 120) {
      errors.push('La franja horaria debe ser de al menos 2 horas');
      throw new Error(errors);
    }

    if (data.quantity <= 0 || data.quantity > 10) {
      errors.push('La cantidad de paquetes debe ser entre 1 y 10');
      throw new Error(errors);
    }

    return {
      errors: errors.length > 0,
    };
  } catch (error) {
    return {
      errors: errors.length > 0,
      list: errors,
    };
  }
};
