import { FIELDS } from '../util/fieldsName';

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
    'timeWindow',
  ];

  try {
    fields.forEach((field) => {
      if (!data[field]) {
        errors.push(`El campo "${FIELDS[field]}" es obligatorio.`);
      }
    });

    if (data.timeWindow.length === 0) {
      errors.push(`Debes seleccionar al menos una franja horaria`);
    }

    if (errors.length > 0) {
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
