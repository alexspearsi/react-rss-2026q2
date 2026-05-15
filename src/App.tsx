import { Route, Routes } from 'react-router';
import { Layout } from './Layout';
import { ArticleDetail } from './components/article-detail/ArticleDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="articles/:id" element={<ArticleDetail />} />
      </Route>
    </Routes>
  );
};
export default App;
