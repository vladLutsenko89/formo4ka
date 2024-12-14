import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  updateInput,
  updateSelect,
  setLoading,
  setResult,
  hideResult,
  resetForm,
} from '../reducers/form-reducer';
import { placeOptions, statusOptions } from '../data/peremishchennia';
import Loader from './Loader';
import '../styles/MilitaryForm.css';

const SERVER_URL =
  'https://cb3a-2a0d-3344-1e00-e210-793a-18a1-b5de-c08e.ngrok-free.app/shtatka/peremishchennia';

const MilitaryForm = () => {
  const dispatch = useDispatch();
  const { input, place, status, isLoading, result } = useSelector(
    (state) => state.form,
  );

  const handleInputChange = (value) => {
    dispatch(updateInput(value));
  };

  const handleSelectChange = (field, value) => {
    dispatch(updateSelect({ field, value }));
  };

  const handleCloseModal = () => {
    dispatch(hideResult());
    dispatch(resetForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      // перетворюємо текст в масив, видаляємо порожні рядки
      const ipns = input
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      console.log('Data array:', ipns);

      const requestResult = await axios.put(SERVER_URL, {
        ipns,
        place,
        status,
      });

      console.log('requestResult -----------> ', requestResult);

      dispatch(
        setResult({
          success: true,
          message: requestResult.message,
        }),
      );
    } catch (error) {
      console.log('Setting error result');
      dispatch(
        setResult({
          success: false,
          message: 'Помилка виконання операції',
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
          <select
            value={place}
            onChange={(e) => handleSelectChange('place', e.target.value)}
            className="form-input"
          >
            <option value="">вибери місце знаходження</option>
            {placeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <select
            value={status}
            onChange={(e) => handleSelectChange('status', e.target.value)}
            className="form-input"
          >
            <option value="">вибери статус</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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

export default MilitaryForm;
