import React from "react";
import { Breadcrumbs, Box, Typography } from "@mui/material/";
import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const CustomBreadcrumbs = ({ pathnames }) => {
  return (
    pathnames.length > 0 &&
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
      }}
      role="presentation"
      onClick={handleClick}
    >
      <Breadcrumbs separator={<Typography>{'>'}</Typography>}>
        <Link to={`/${pathnames[0]}`}
          style={{
            textDecoration: 'none',
            color: 'black',
            backgroundColor: '#F1F5F9',
            padding: 6,
            borderRadius: 3
          }}>
          Home
        </Link>
        {pathnames.map((pathname) => (
          <Link key={pathname} style={{ textDecoration: 'none', color: 'grey' }}>
            {convertToTitleCase(pathname)}</Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default CustomBreadcrumbs;

export const convertToTitleCase = (input) => {
  return input
    .replace(/(?:^|\b)(\w)/g, (match, letter) => letter.toUpperCase()) // Convert first letter of each word to uppercase
    .replace(/-+/g, " "); // Replace hyphens with spaces (handles multiple consecutive hyphens)
}