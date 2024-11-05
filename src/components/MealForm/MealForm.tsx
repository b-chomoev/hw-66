import { categories } from '../../helpers/constants';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { INewMeal } from '../../types';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  description: '',
  calories: 0,
};

interface Props {
  form?: INewMeal;
  submitForm: (meal: INewMeal) => void;
}

const MealForm: React.FC<Props> = ({form, submitForm}) => {
  const [newMeal, setNewMeal] = useState<INewMeal>(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (form) {
      setNewMeal(prevState => ({
        ...prevState,
        ...form,
      }));
    }
  }, [form]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    submitForm({...newMeal});

    if (!form) {
      setNewMeal(initialState);
    }
    navigate('/');
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewMeal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <h3> {form ? 'Edit' : 'Add new '} meal</h3>
      <div className="form-group mb-2">
        <label htmlFor="name">Meal Name:</label>
        <select className="form-select mt-2" name="name" onChange={onChangeField} value={newMeal.name}>
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

      <button className="btn btn-dark">
        {form ? 'Save Edits' : 'Save'}
      </button>
    </form>
  );
};

export default MealForm;