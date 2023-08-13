import { CONFIG } from '../util/config';

export const generateLink = (data) => {
  const {
    name,
    date,
    direction,
    zone,
    whatsapp,
    quantity,
    chargeDelivery,
    comments,
  } = data;

  const timeWindow = data.timeWindow.join(' | ');
  const pay = chargeDelivery ? `$${data.pay} %2b ENVIO` : `$${data.pay}`;

  const whatsappDomain = 'https://api.whatsapp.com/send?phone=';
  const phone = CONFIG.phone;

  const template = `DATOS DESTINATARIO - ${date}%0a%0a-Nombre: ${name}%0a-Whatsapp: ${whatsapp}%0a-Dirección: ${direction} - ${zone}%0a-Horario disponible de entrega: ${timeWindow}%0a-Cantidad de paquetes: ${quantity}%0a-Cobrar: ${pay}%0a-Comentarios: ${comments}`;
  return `${whatsappDomain}${phone}&text=${template}`;
};
