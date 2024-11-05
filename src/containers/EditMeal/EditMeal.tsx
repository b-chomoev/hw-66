import MealForm from '../../components/MealForm/MealForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IMeal, INewMeal } from '../../types';
import axiosAPI from '../../axiosAPI';

const EditMeal = () => {
  const [meal, setMeal] = useState<IMeal>();
  const params = useParams<{id: string}>();
  const navigate = useNavigate();

  const fetchData = useCallback(async (id: string) => {
    const response: {data: IMeal} = await axiosAPI<IMeal>(`meals/${id}.json`);

    if (response.data) {
      setMeal(response.data);
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      void fetchData(params.id);
    }
  }, [params.id, fetchData]);

  const submitForm = async (submitMeal: INewMeal) => {
    try {
      if (params.id) {
        await axiosAPI.put(`/meals/${params.id}.json`, {...submitMeal});
        navigate('/');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <MealForm form={meal} submitForm={submitForm}/>
    </>
  );
};

export default EditMeal;