import Title from '@common/title/title';
import React, { useState } from 'react';
import styles from './configurationManagement.module.scss';
import OptionSwitch from './optionSwitch/optionSwitch';
import useStore from '@store/index';

const ConfigurationManagement = () => {
  const { valueParameter, setSystemColor } = useStore((state) => ({
    valueParameter: state.valueParameter,
    setSystemColor: state.setSystemColor,
  }));
  const setColor = (event) => {
    console.log(event.target.value);
    setSelectedColor(event.target.value);
    setSystemColor(event.target.value);
  };
  const opacity = 1 / 6;
  const [selectedColor, setSelectedColor] = useState('#00A4AD');
  return (
    <div className={styles.container_configuration}>
      <div className={styles.configuration_management}>
        <Title text="Configuración" />
        <OptionSwitch
          title={'Activar sede'}
          text={
            'RECUERDE: si habilita este campo no puede deshacer los cambios una vez tenga datos registrados en la base de datos.'
          }
          option={1}
          checked={valueParameter.stateSede}
        />
        <OptionSwitch
          title={'Activar nombre en cuestionarios'}
          option={2}
          text={'Si desea capturar el nombre de la persona encuestada active el campo. '}
          checked={valueParameter.stateFirstName}
        />
        <OptionSwitch
          title={'Activar apellido en cuestionarios'}
          option={3}
          text={'Si desea capturar el apellido de la persona encuestada active el campo. '}
          checked={valueParameter.stateLastName}
        />
        <div className={styles.color_palette}>
          <p>Paleta de colores</p>
          <p>Seleccione algunas de nuestras sugerencias como color predeterminado para su página</p>

          <div className={styles.palette__chooser}>
            <div onChange={setColor}>
              <div className={styles.input_color__container}>
                <input
                  type="radio"
                  value="#00A4AD"
                  name="colorBlue"
                  checked={selectedColor === '#00A4AD'}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#00A4AD', opacity: opacity * 5 }}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#00A4AD', opacity: opacity * 4 }}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#00A4AD', opacity: opacity * 3 }}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#00A4AD', opacity: opacity * 2 }}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#00A4AD', opacity: opacity }}
                />
              </div>
              <div className={styles.input_color__container}>
                <input
                  type="radio"
                  value="#AD0000"
                  name="colorRed"
                  checked={selectedColor === '#AD0000'}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#AD0000', opacity: opacity * 5 }}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#AD0000', opacity: opacity * 4 }}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#AD0000', opacity: opacity * 3 }}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#AD0000', opacity: opacity * 2 }}
                />
                <div
                  className={styles.square_color}
                  style={{ backgroundColor: '#AD0000', opacity: opacity }}
                />
              </div>
            </div>
          </div>
          <label htmlFor="colorpicker">
            Use el selector de color para escoger un color presonalizado
          </label>
          <input type="color" id="colorpicker" name="colorpicker" value="#0000ff" />
        </div>
      </div>
    </div>
  );
};

export default ConfigurationManagement;
