import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts, setCurrentPathName } from '../../actions/index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { container, carouselContainer, 
  carouselItem, carouselDots } from '../../style/Post.module.css';
import Post from '../presentationals/Post';
import { useNavigate, useLocation } from 'react-router-dom';

function Posts (props) {
  const { getPosts, allPosts, username,
    favoriteOnly, setCurrentPathName } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;

  const responsive = {
    mobile: {
      breakpoint : { max: 400, min: 0 },
      items: 1.2
    }
  };

  useEffect(() => {
    if(!search) {
      if (favoriteOnly) {
        if (!username) navigate('/login');
        else {
          setCurrentPathName('Favorites');
          getPosts('favorite');
        };
      }
      else {
        setCurrentPathName('Unknown Detections');
        getPosts('all');
      }; 
    } else {
      const query = search.split('?')[1];
      setCurrentPathName(`"${query}"`);
      getPosts('search', query);
    }
    
  },[username, favoriteOnly, search]);


  return(
    <div className={container}>
      {allPosts 
      &&
      <Carousel 
        responsive={responsive}
        deviceType="mobile"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass={carouselItem}
        containerClass={carouselContainer}
        dotListClass={carouselDots}
        swipeable={true}
        draggable={true}
        showDots={true}
        focusOnSelect={true}
        additionalTransfrom={10}
      >
        { allPosts.map((post) =>  (<Post 
                                      title={post.attributes.title}
                                      imageUrl={post.attributes.image}
                                      description={post.attributes.description}
                                      location={post.attributes.location}
                                      favorite={post.attributes.favorite}
                                      id={post.id}
                                    />)) }
      </Carousel>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  allPosts: state.posts.all,
  username: state.user.name
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: (type, query) => {dispatch(getPosts(type, query));},
  setCurrentPathName: (name) => {dispatch(setCurrentPathName(name));},
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);