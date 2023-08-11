import { Button, Grid, Input, Modal, Text, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { checkData } from '../helpers/checkData';
import { formatDate } from '../helpers/getFormatDate';
import { getTime, isOnTime } from '../helpers/utilTime';
import { generateLink } from '../helpers/generateLink';

export const Form = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const [errors, setErrors] = useState([]);

  const closeHandler = () => {
    setVisible(false);
  };

  const [data, setData] = useState({
    name: '',
    date: formatDate(),
    direction: '',
    zone: '',
    whatsapp: '',
    pay: '',
    quantity: '',
    initTime: '09:00',
    finishTime: '18:00',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isTime = name === 'initTime' || name === 'finishTime';
    const newData = { ...data };

    if (
      !isTime ||
      (name === 'initTime' && isOnTime(value, 'min')) ||
      (name === 'finishTime' && isOnTime(value, 'max'))
    ) {
      newData[name] = value;
      setData(newData);
    } else {
      newData[name] = name === 'initTime' ? '09:00' : '18:00';
      setData(newData);
    }
  };

  const handleSubmit = () => {
    const { errors, list } = checkData(data);

    if (errors) {
      setErrors(list);
      setVisible(true);
    } else {
      window.location = generateLink(data);
    }
  };

  return (
    <form action="">
      <Grid.Container gap={2}>
        <Grid xs={12} sm={7}>
          <Input
            label="Recibe: *"
            type="text"
            name="name"
            width="100%"
            onChange={handleChange}
            value={data.name}
          />
        </Grid>
        <Grid xs={12} sm={5}>
          <Input
            label="Fecha *"
            type="date"
            name="date"
            width="100%"
            onChange={handleChange}
            value={data.date}
            min={formatDate()}
            max={formatDate(1)}
          />
        </Grid>
        <Grid xs={12} sm={8}>
          <Input
            label="Dirección *"
            type="text"
            name="direction"
            width="100%"
            onChange={handleChange}
            value={data.direction}
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <Input
            label="Barrio *"
            type="text"
            name="zone"
            width="100%"
            onChange={handleChange}
            value={data.zone}
          />
        </Grid>
        <Grid xs={12} sm={5}>
          <Input
            label="Whatsapp *"
            type="text"
            name="whatsapp"
            width="100%"
            onChange={handleChange}
            value={data.whatsapp}
            minLength={8}
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <Input
            label="Cobrar *"
            type="number"
            name="pay"
            width="100%"
            onChange={handleChange}
            value={data.pay}
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <Input
            label="Paquetes *"
            type="number"
            name="quantity"
            width="100%"
            onChange={handleChange}
            value={data.quantity}
            min={1}
            max={10}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input
            label="Desde hora *"
            type="time"
            name="initTime"
            width="100%"
            onChange={handleChange}
            value={data.initTime}
            min="09:00"
            helperText="Min. 09:00"
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input
            label="Hasta hora *"
            type="time"
            name="finishTime"
            width="100%"
            onChange={handleChange}
            value={data.finishTime}
            max="18:00"
            helperText="Max. 18:00"
          />
        </Grid>
        <Grid xs={12} sm={12}>
          <Textarea
            placeholder="Si tienes algun detalle va acá.."
            minRows={4}
            width="100%"
            onChange={handleChange}
            label="Comentarios"
            name="comments"
          />
        </Grid>
      </Grid.Container>
      <Button onClick={handleSubmit}>ENVIAR POR WHATSAPP</Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Revisa los datos
          </Text>
        </Modal.Header>
        <Modal.Body>
          {errors && errors.map((error, i) => <p key={`${i}-must`}>{error}</p>)}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Entendido!
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};
