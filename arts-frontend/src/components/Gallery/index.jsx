import useAxios from '../../hook/user-axios'
import instance from '../../helper/axios-instance';

import ExpoArts from '../ExpoArts';

function artworkYear(date) {
  if (!date) {
    return ''
  };
  const [year, month, day] = date.split("T")[0].split("-");

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate
}

function Gallery() {

  const [listGallery, loading, setLoading, , reloadGallery, setListGallery] = useAxios({
    instance,
    method: 'GET',
    url: '/artworks'
  })

  const addArtwork = (newArtwork) => {
    setListGallery(prev => [...prev, newArtwork])
  }

  const works = Array.isArray(listGallery) ? listGallery : [];
  const masonryItems = works.map((work, index) => ({
    key: work.id ?? `${work.title}-${index}`,
    data: work,
  }));

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (values) => {
    console.log('Valores editados:', values);
  };

  return (
    <div className="home-gallery">
      <ExpoArts
        title={'Exposião de artes'}
        loading={loading}
        works={works}
        masonryItems={masonryItems}
        setLoading={setLoading}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        reloadGallery={reloadGallery}
        onPosted={addArtwork}
        artworkYear={artworkYear}
        endPoint={'/'}
      />
    </div>
  )
}

export default Gallery;
