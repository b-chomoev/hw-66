import ToolBar from './components/ToolBar/ToolBar';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import MealForm from './containers/MealForm/MealForm';

const App = () => {


  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main className='container mt-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new-meal' element={<MealForm />} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;