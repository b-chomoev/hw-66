import { categories } from '../../helpers/constants';
import * as React from 'react';
import { useState } from 'react';
import { IMeal } from '../../types';
import axiosAPI from '../../axiosAPI';

const initialState = {
  name: '',
  description: '',
  calories: 0,
};

const MealForm = () => {
  const [newMeal, setNewMeal] = useState<IMeal>(initialState);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axiosAPI.post('meals.json', {...newMeal});

    setNewMeal(initialState);
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewMeal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Add new meal</h3>
      <div className="form-group mb-2">
        <label htmlFor="name">Meal Name:</label>
        <select className="form-select mt-2" name='name' onChange={onChangeField} value={newMeal.name}>
          <option>Open this select menu</option>
          {categories.map((category) =>
            <option key={category.value} value={category.value}>
              {category.value}
            </option>)}
        </select>
      </div>

      <div className="form-group mb-2">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          className="form-control"
          onChange={onChangeField}
          value={newMeal.description}
          required
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="description">Calories:</label>
        <input
          type="number"
          id="calories"
          name="calories"
          className="form-control"
          onChange={onChangeField}
          value={newMeal.calories}
          required
        />
      </div>

      <button className="btn btn-dark">Save</button>
    </form>
  );
};

export default MealForm;