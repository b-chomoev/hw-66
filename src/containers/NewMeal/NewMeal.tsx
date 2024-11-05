import MealForm from '../../components/MealForm/MealForm';
import { INewMeal } from '../../types';
import axiosAPI from '../../axiosAPI';

const NewMeal = () => {
  const submitForm = async (meal: INewMeal) => {
    await axiosAPI.post('meals.json', {...meal});
  };

  return (
    <>
      <MealForm submitForm={submitForm}/>
    </>
  );
};

export default NewMeal;