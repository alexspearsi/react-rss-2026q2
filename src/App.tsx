import { Route, Routes, useParams } from 'react-router';
import { Layout } from './Layout';
import { ArticleDetail } from './components/article-detail/ArticleDetail';
import { NotFoundPage } from './components/not-found/NotFoundPage';
import { AboutPage } from './components/about/AboutPage';

const ArticleDetailRoute = () => {
  const { id } = useParams();
  return <ArticleDetail key={id} />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="articles/:id" element={<ArticleDetailRoute />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default App;
