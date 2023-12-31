import {
  Button,
  Checkbox,
  Grid,
  Input,
  Modal,
  Radio,
  Text,
  Textarea,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { checkData } from '../helpers/checkData';
import { formatDate } from '../helpers/getFormatDate';
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
    timeWindow: ['9hs - 13hs'],
    chargeDelivery: true,
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...data };

    newData[name] = value;
    setData(newData);
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

  const handleTimeWindow = (e) => {
    setData({ ...data, timeWindow: e });
  };

  const handleChargeDelivery = (e) => {
    setData({ ...data, chargeDelivery: e === 'yes' });
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
        <Grid xs={12} sm={4}>
          <Input
            label="Cobrar de producto *"
            type="number"
            name="pay"
            width="100%"
            onChange={handleChange}
            value={data.pay}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Radio.Group
            label="Cobrar envío"
            defaultValue="1"
            size="sm"
            orientation="horizontal"
            name="chargeDelivery"
            onChange={handleChargeDelivery}
          >
            <Radio value="yes" defaultChecked>
              Si
            </Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Grid>
        <Grid xs={12} sm={6}>
          <Checkbox.Group
            color="primary"
            label="Franja horaria disponible"
            orientation="horizontal"
            onChange={handleTimeWindow}
            value={data.timeWindow}
            name="timeWindow"
            size="sm"
          >
            <Checkbox value="9hs - 13hs">9hs - 13hs</Checkbox>
            <Checkbox value="13hs - 18hs">13hs - 18hs</Checkbox>
          </Checkbox.Group>
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
