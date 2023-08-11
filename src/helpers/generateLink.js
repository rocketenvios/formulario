import { CONFIG } from '../util/config';

export const generateLink = (data) => {
  const {
    name,
    date,
    direction,
    zone,
    whatsapp,
    pay,
    quantity,
    initTime,
    finishTime,
    comments,
  } = data;

  const whatsappDomain = 'https://api.whatsapp.com/send?phone=';
  const phone = CONFIG.phone;
  const template = `DATOS DESTINATARIO - ${date}%0a%0a-Nombre: ${name}%0a-Whatsapp: ${whatsapp}%0a-Dirección: ${direction} - ${zone}%0a-Horario disponible de entrega: ${initTime} - ${finishTime}%0a-Cantidad de paquetes: ${quantity}%0a-Cobrar: ${pay}%0a-Comentarios: ${comments}`;
  return `${whatsappDomain}${phone}&text=${template}`;
};
// Hola%20-%F0%9F%91%8B%0a%0a%F0%9F%9A%80%20Somos%20Rocket%20Envios%20y%20tenemos%20un%20pedido%20para%20ti%20de%20parte%20de%20Leisy%0a%0a%E2%8F%B3%20Estaremos%20pasando%20entre:%2008:20%20-%2010:20.%20Mas%20cercano%20a%20la%20hora%20te%20pasamos%20%20bien%20cuando%20vamos%20a%20estar%20llegando%20y%205min%20antes%20te%20mando%20ubicaci%C3%B3n%20en%20tiempo%20real.%20%0a%0a%F0%9F%92%B5%20Debes%20abonar%20el%20total%20de:%20$900+170%20Av%C3%ADsame%20si%20vas%20a%20necesitar%20cambio%20asi%20estamos%20preparados.%0a%0a%E2%9A%A0%EF%B8%8FRecordar:%20No%20ingresamos%20a%20complejos,oficinas,%20shopping%20ni%20edificios.

// %20
// %0a
