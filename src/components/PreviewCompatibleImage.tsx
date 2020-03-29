import React from 'react';
import Img, { FluidObject } from 'gatsby-image';

export type Fluid = { fluid: FluidObject };

type Props = {
  imageInfo: {
    alt?: string;
    childImageSharp?: Fluid;
    image: string | { childImageSharp: Fluid };
    style?: object;
  };
};

const PreviewCompatibleImage = ({ imageInfo }: Props) => {
  const imageStyle = { borderRadius: '5px' };
  const { alt = '', childImageSharp, image } = imageInfo;

  if (typeof image === 'object') {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    );
  }

  if (childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />;
  }

  if (image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />;

  return null;
};

export default PreviewCompatibleImage;
