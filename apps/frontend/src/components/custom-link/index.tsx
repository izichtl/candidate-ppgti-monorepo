import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { forwardRef } from 'react';

type CombinedLinkProps = MuiLinkProps & RouterLinkProps;

const CustomLink = forwardRef<HTMLAnchorElement, CombinedLinkProps>(
  (props, ref) => {
    return <MuiLink ref={ref} component={RouterLink} {...props} />;
  }
);

export default CustomLink;
