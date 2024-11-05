import MealForm from '../../components/MealForm/MealForm';
import { INewMeal } from '../../types';
import axiosAPI from '../../axiosAPI';
import { useState } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const NewMeal = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (meal: INewMeal) => {
    try {
      setLoading(true);
      await axiosAPI.post('meals.json', {...meal});
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Spinner /> : <MealForm submitForm={submitForm}/>}
    </>
  );
};

export default NewMeal;