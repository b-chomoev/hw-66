import { useCallback, useEffect, useState } from 'react';
import { IMeal, IMealsAPI } from '../../types';
import axiosAPI from '../../axiosAPI';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [meal, setMeal] = useState<IMeal[]>([]);

  const fetchData = useCallback (async () => {
    const response: {data: IMealsAPI} = await axiosAPI<IMealsAPI>('meals.json');

    if (response.data) {
      const mealsFromAPI: IMeal[] = Object.keys(response.data).map((meal) => {
        return{
          ...response.data[meal],
          id: meal,
        };
      });

      setMeal(mealsFromAPI);
    }
  }, []);

  useEffect(() => {
    void fetchData();
    }, [fetchData]);

  const onDelete = () => {

  };

  return (
    <>
      <h2 className='text-end mb-3'>Total calories: 0</h2>
      {meal.map((meal) => (
        <div key={meal.id} className="card mb-3 p-3 shadow-sm border-0">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-1">{meal.name}</h5>
              <p className="text-muted">{meal.description}</p>
            </div>
            <div className="text-end">
              <p className="fw-bold mb-1">{meal.calories} kcal</p>
              <div>
                <button className="btn btn-danger btn-sm me-2" onClick={onDelete}>Delete</button>
                <NavLink to={`/${meal.id}/edit`} className="btn btn-dark btn-sm">Edit</NavLink>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;