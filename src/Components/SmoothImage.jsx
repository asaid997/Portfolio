import React from 'react';
import PropTypes from 'prop-types';

const proptypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  placeholderImgUrl: PropTypes.string,
  containerStyles: PropTypes.object,
  imageStyles: PropTypes.string,
  transitionTime: PropTypes.number,
  transitionTimingFunction: PropTypes.string,
};

const defaultProps = {
  containerStyles: {},
  imageStyles: {},
  transitionTime: 0.3,
  transitionTimingFunction: 'ease-in',
  placeholderImgUrl: '',
};

export default class SmoothImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: {},
    };

    this.imageLoadHandler = this.imageLoadHandler.bind(this);
  }

  imageLoadHandler() {
    const { transitionTime, transitionTimingFunction } = this.props;
    this.setState({
      loaded: {
        opacity: '1',
        transitionProperty: 'opacity',
        transitionDuration: `${transitionTime}s`,
        transitionTimingFunction,
      },
    });
  }

  render() {
    const {
      placeholderImgUrl,
      containerStyles,
      imageStyles,
      src,
      alt,
    } = this.props;
    const bgImage = placeholderImgUrl && `url(${placeholderImgUrl})`;
    const { loaded } = this.state;

    return (
      <div
        style={Object.assign(
          {},
          {
            width: '20vh',
            height: 0,
            opacity: 0,
            overflow: 'hidden',
            backgroundImage: bgImage,
            // if you do not want square images, overwrite the paddingBottom % by
            // passing from containerStyles
            paddingBottom: '22vh',
            backgroundSize: 'cover',
          },
          containerStyles,
          loaded,
        )}
      >
        <img
          src={src}
          alt={alt}
          className={imageStyles} 
          onLoad={this.imageLoadHandler}
        />
      </div>
    );
  }
}

SmoothImage.propTypes = proptypes;
SmoothImage.defaultProps = defaultProps;
