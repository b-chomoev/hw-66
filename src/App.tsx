import ToolBar from './components/ToolBar/ToolBar';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import NewMeal from './containers/NewMeal/NewMeal';
import EditMeal from './containers/EditMeal/EditMeal';

const App = () => {

  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main className='container mt-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new-meal' element={<NewMeal />} />
          <Route path='/:id/edit' element={<EditMeal />} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;