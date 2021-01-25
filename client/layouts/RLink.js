import NextLink from "next/link";
import React, { forwardRef } from "react";

const RLink = forwardRef(({ children, color, href, ...rest }, ref) => (
  <NextLink href={href}>
    <a ref={ref} {...rest} style={{ textDecoration: "none", color: color }}>
      {children}
    </a>
  </NextLink>
));

export default RLink;
