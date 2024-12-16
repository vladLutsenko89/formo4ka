import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';

import Loader from './Loader';
import {
  updateInput,
  updateSelect,
  setLoading,
  setResult,
  hideResult,
  resetForm,
} from '../reducers/form-reducer';
import { placeOptions, statusOptions } from '../data/peremishchennia';
import { customSelectStyles } from '../styles/SelectStyles';
import '../styles/Peremishchennia.css';

const SERVER_URL = 'http://localhost:3000/shtatka/peremishchennia';

const Peremishchennia = () => {
  const dispatch = useDispatch();
  const { input, place, status, isLoading, result } = useSelector(
    (state) => state.form,
  );

  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);

  const handleInputChange = (value) => {
    dispatch(updateInput(value));
  };

  const handleSelectChange = (field, selectedOption) => {
    dispatch(updateSelect({ field, value: selectedOption?.value || '' }));
  };

  const handleCloseModal = () => {
    dispatch(hideResult());
    dispatch(resetForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    let requestResult;
    try {
      const ipns = input
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => !!line.length);

      console.log('Data array:', ipns, place, status);

      requestResult = await axios.put(SERVER_URL, {
        ipns,
        place,
        status,
      });

      console.log('requestResult -----------> ', requestResult);

      dispatch(
        setResult({
          success: true,
          message: _.get(requestResult, 'message'),
        }),
      );
    } catch (error) {
      console.log('Setting error result');
      dispatch(
        setResult({
          success: false,
          message:
            _.get(requestResult, 'message') || 'Помилка виконання операції',
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const isSubmitDisabled = !input.trim() || (!place && !status);

  return (
    <div className="form-container">
      {isLoading && <Loader />}

      {result.show && (
        <>
          <div className="modal-overlay" />
          <div
            className={`result-modal ${result.success ? 'success' : 'error'}`}
          >
            <div className="result-content">
              <h3>{result.success ? 'Успіх' : 'Помилка'}</h3>
              <p>{result.message}</p>
              <button onClick={handleCloseModal}>Закрити</button>
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="military-form">
        <h2 className="form-title">Переміщення</h2>

        <div className="form-group">
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="form-input form-textarea"
            placeholder="кидай ІПНки сюди (кожен запис з нового рядка)"
            rows="10"
          />
        </div>

        <div className="form-group">
          <Select
            value={placeOptions.find((opt) => opt.value === place)}
            onChange={(option) => handleSelectChange('place', option)}
            options={placeOptions}
            styles={customSelectStyles}
            placeholder="вибери місце знаходження"
            className="form-select"
            isClearable
            menuPlacement="top"
          />
        </div>

        <div className="form-group">
          <Select
            value={statusOptions.find((opt) => opt.value === status)}
            onChange={(option) => handleSelectChange('status', option)}
            options={statusOptions}
            styles={customSelectStyles}
            placeholder="вибери статус"
            className="form-select"
            isClearable
            menuPlacement="top"
          />
        </div>

        <button
          type="submit"
          className={`submit-button ${isSubmitDisabled ? 'disabled' : ''}`}
          disabled={isSubmitDisabled}
        >
          Поїхали
        </button>
      </form>
    </div>
  );
};

export default Peremishchennia;
