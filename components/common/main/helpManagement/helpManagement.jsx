import React from 'react';
import styles from './helpManagement.module.scss';
// import { helpOptions } from '@consts/helpOptions';
const purpose = '/icons/propositoHerramienta.svg';
const structure = '/icons/estructuraIndice.svg';
const methodology = '/icons/methodology.svg';
const moreInfo = '/icons/masInfo.svg';
const manual = '/icons/manual.svg';
const manualIcon = '/icons/pdfIcon.svg';
const zipIcon = '/icons/zipIcon.svg';
const manualUsuario = '/files/manualDeUsuario.pdf';
const zipIndice = '/files/documentosProyecto.zip';
import storybook from '@talentumlab/storybook-design-system';
import 'react-accessible-accordion/dist/fancy-example.css';
import IconButton from './iconButton/iconButton';
// import 'bootstrap/dist/css/bootstrap.css';

const HelpManagement = () => {
  const purposeContent = (
    <div className={styles.purpose}>
      <p>
        Esta herramienta permite a la institución educativa realizar el proceso de autoevaluación de
        la gestión en inclusión, orientada a reconocer el estado actual en la atención a la
        diversidad, analizar las fortalezas y oportunidades de mejoramiento, establecer prioridades
        y tomar decisiones para cualificar las condiciones de aprendizaje, participación y
        convivencia de su comunidad.
      </p>
    </div>
  );
  const structureContent = (
    <div className={styles.structure}>
      <p>
        Para obtener el Índice de Inclusión se utiliza un cuestionario estructurado desde las cuatro
        áreas de gestión: directiva, administrativa, académica y comunidad. El cuestionario se
        compone por descriptores que orientan la evaluación del proceso y sus componentes inclusivos
        en cada área de gestión.
      </p>
      <p>
        El Índice presenta dos cuestionarios: uno para docentes, directivos docentes, personal de
        apoyo y administrativo, cuestionario No 1. Otro para familias y estudiantes, cuestionario No
        2.
      </p>
    </div>
  );
  const methodologyContent = (
    <div className={styles.methodology}>
      <p>
        Está diseñado para motivar a las comunidades educativas a compartir y construir nuevas
        iniciativas, y valorar con detalle las posibilidades reales que existen con el fin de
        cualificar las condiciones de aprendizaje, participación y convivencia de todos sus
        estudiantes.
      </p>
      <p>
        Para obtener el Índice de Inclusión de la institución educativa se recomienda desarrollar
        las siguientes actividades:
      </p>
      <ol>
        <li> Reunir o conformar el grupo que lidera la aplicación del Índice </li>
        <li>Planear el proceso de aplicación.</li>
        <li>
          Aplicar los cuestionarios del Índice a la muestra seleccionada de la comunidad educativa.
        </li>
        <li> Tabulación y procesamiento de datos.</li>
      </ol>
    </div>
  );
  const userManual = (
    <div className={styles.user_manual}>
      <storybook.Image src={manualIcon} />
      <a href={manualUsuario} download>
        Manual de Usuario.pdf
      </a>
    </div>
  );
  const moreInfoContent = (
    <div className={styles.more_info}>
      <p>
        Si desea tener información de manera local en su computador descargue el siguiente archivo
        zip.
      </p>
      <div>
        <storybook.Image src={zipIcon} />
        <a href={zipIndice} download>
          Índice_de_inclusión.zip
        </a>
      </div>
    </div>
  );
  return (
    <div className={styles.container_executions}>
      <main className={styles.execution_management}>
        <h2 className={styles.title}>Ayuda</h2>
        <h4 className={styles.subtitle}>
          Descubre aquí información de ayuda sobre nuestros servicios y resuelve tus inquietudes{' '}
        </h4>
        <div className={styles.container}>
          <IconButton
            icon={purpose}
            title={'Propósito de la herramienta'}
            content={purposeContent}
          />
          <IconButton icon={structure} title={'Estructura índice'} content={structureContent} />
          <IconButton
            icon={methodology}
            title={'Metodología para obtener el índice'}
            content={methodologyContent}
          />
          <IconButton icon={manual} title={'Manual de usuario'} content={userManual} />
          <IconButton icon={moreInfo} title={'Para más información'} content={moreInfoContent} />
        </div>
      </main>
    </div>
  );
};

HelpManagement.propTypes = {};

export default HelpManagement;
