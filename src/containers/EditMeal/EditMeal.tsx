import MealForm from '../../components/MealForm/MealForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IMeal, INewMeal } from '../../types';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/UI/Spinner/Spinner';

const EditMeal = () => {
  const [meal, setMeal] = useState<IMeal>();
  const [loading, setLoading] = useState(false);
  const params = useParams<{id: string}>();
  const navigate = useNavigate();

  const fetchData = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response: {data: IMeal} = await axiosAPI<IMeal>(`meals/${id}.json`);

      if (response.data) {
        setMeal(response.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
        setLoading(true);
        await axiosAPI.put(`/meals/${params.id}.json`, {...submitMeal});
        navigate('/');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Spinner/> :
        <>
          {meal ?
            <>
              <MealForm form={meal} submitForm={submitForm}/>
            </>
            :
            null
          }
        </>
      }
    </>
  );
};

export default EditMeal;