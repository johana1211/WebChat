import React, { FC, useCallback, useState } from 'react';
import { useRut } from 'react-rut-formatter';
import * as yup from 'yup';
import { webchatProps } from '../../WebChat/Webchat';

export const ChatBoxForm: FC<webchatProps> = function ({
  RUT,
  name,
  setSetingNameAndRUT,
  validateBusinessTime,
  outOfHour,
  setOutOfHourWarning,
  setName,
  setRUT,
}) {
  const { rut, updateRut, isValid } = useRut();

  const [validationErrors, setValidationErrors] = useState('');

  // <<< VALIDACIÓN DE INPUTS >>>
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Debe introducir su Nombre')
      .min(3, 'El Nombre debe tener 3 caracteres como mínimo'),
    RUT: yup
      .string()
      .required('Debe introducir su RUT')
      .test('validate-rut', 'RUT inválido', () => isValid),
  });

  const handleSetNameAndRUTOnStorage = useCallback(async () => {
    try {
      await validationSchema.validate({ RUT, name });
      sessionStorage.setItem('webchat_elipse_name', name);
      sessionStorage.setItem('webchat_elipse_RUT', RUT.replace(/[,-]/g, ''));
      setSetingNameAndRUT(true);
      setValidationErrors('');
    } catch (err) {
      setValidationErrors(err.errors[0]);
    }
  }, [RUT, name, validationSchema, setSetingNameAndRUT]);

  const handleSendButton = () => {
    validateBusinessTime();
    if (outOfHour) {
      setOutOfHourWarning(true);
      return;
    }
    handleSetNameAndRUTOnStorage();
  };

  const handleLocaleStorageName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLocaleStorageRUT = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRut(e.target.value);
    setRUT(e.target.value);
  };

  return (
    <div className="chat-box-without-name-and-RUT__ewc-class">
      <div className="without-header__ewc-class">
        <div className="without-welcome__ewc-class">Bienvenido!</div>
        <div className="without-information__ewc-class">
          Completa los siguientes campos para poder iniciar la comunicación con
          uno de nuestros agentes.
        </div>
      </div>
      <form className="without-body__ewc-class">
        <input
          type="text"
          className={
            validationErrors.includes('Nombre')
              ? 'inp-control__ewc-class inp-control-error__ewc-class'
              : 'inp-control__ewc-class'
          }
          placeholder="Nombre Completo"
          onChange={handleLocaleStorageName}
        />
        <input
          type="text"
          className={
            validationErrors.includes('RUT')
              ? 'inp-control__ewc-class inp-control-error__ewc-class'
              : 'inp-control__ewc-class'
          }
          value={rut.formatted}
          placeholder="RUT"
          onChange={handleLocaleStorageRUT}
        />
        <p className="error-message__ewc-class">{validationErrors}</p>
        <input
          type="button"
          className="but-control__ewc-class"
          value="ENVIAR"
          onClick={handleSendButton}
        />
      </form>
    </div>
  );
};
