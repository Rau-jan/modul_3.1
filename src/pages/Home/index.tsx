import { Link } from 'react-router-dom';
import { PageUrl } from '@/constants/urls';
import { Page } from '@/components/Page';
import { useImageStore } from '@/store/images/useImagesStore';
import { useMemo } from 'react';

const Home = () => {
  const { images } = useImageStore();
  const orderedImages = useMemo(() => images.sort((a, b) => b.updatedAt - a.updatedAt), [images]);
  return (
    <Page title="Pixel Editor">
      <main className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        {orderedImages.length > 0 && (
          <div className="mb-3">
            <h2 className="text-center">Open</h2>
            <ul className="list-group list-group-flush mb-3">
              {orderedImages.map((it) => {
                const url = PageUrl.Editor.replace(':id', it.id);
                return (
                  <li key={it.id} className="list-group-item btn-link">
                    <Link to={url}>{it.name}</Link>
                  </li>
                );
              })}
            </ul>
            <h5 className="d-flex gap-3 align-items-center">
              <hr className="flex-grow-1" />
              Or
              <hr className="flex-grow-1" />
            </h5>
          </div>
        )}
        <Link to={PageUrl.CreateImage} className="btn btn-primary btn-lg">
          Create new image
        </Link>
      </main>
    </Page>
  );
};

export default Home;
