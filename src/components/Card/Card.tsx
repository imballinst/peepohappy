import { formatDistanceToNowStrict } from 'date-fns';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import { ExternalLinkIcon } from '../Links';

import { Text } from '../Typography';

import styles from './Card.module.css';

export interface CardProps {
  href?: string;
  img?: string;
  imgAlt?: string;
  title: string;
  // ISO8601 date string.
  date: string;
  text: string;
  className?: string;
}

export function Card(props: CardProps) {
  const className = props.className || '';
  const cardImage =
    props.img !== undefined ? (
      <img
        src={props.img}
        alt={props.imgAlt}
        className={`${styles['featured-image']} rounded-t-lg`}
      />
    ) : undefined;
  const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {};
  let titleChildren: ReactNode | undefined = undefined;

  if (
    props.href !== undefined &&
    (props.href.includes('http://') || props.href.includes('https://'))
  ) {
    anchorProps.target = '_blank';
    anchorProps.rel = 'noopener';

    titleChildren = <ExternalLinkIcon />;
  }

  return (
    <a href={props.href!} {...anchorProps}>
      <div
        className={`border rounded-lg border-gray-200 hover:border-teal-500 dark:border-gray-600 dark:hover:border-teal-200 transition-colors ${className}`}
      >
        {cardImage}

        <div className="p-4">
          <Text
            className="font-semibold leading-tight truncate text-lg"
            as="h4"
            colorScheme="teal"
          >
            {props.title}
            {titleChildren}
          </Text>

          <div className="flex flex-row items-center mb-1 text-sm text-gray-600 dark:text-gray-400">
            {formatDistanceToNowStrict(new Date(props.date), {
              addSuffix: true
            })}
          </div>

          <div
            className={`flex mt-2 items-center flex-col ${styles['card-text']}`}
          >
            <Text>{props.text}</Text>
          </div>
        </div>
      </div>
    </a>
  );
}
