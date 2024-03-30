import React, { useCallback } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { Drawer, CustomDrawerHeader, SiderItem } from "./SideStyle";

export const CustomDrawer = React.memo(({ open, items, openDrawer, mobile, pathname }) => {
  const navigate = useNavigate();

  const navigateTo = useCallback((item) => {
    mobile && openDrawer();
    item.link && navigate(`/${item.link}`);
  }, [mobile, openDrawer, navigate]);

  return (
    <Drawer variant="permanent" open={open}>
      <CustomDrawerHeader />
      <List sx={{ paddingTop: '0px !important' }}>
        {items.map((item, index) => {
          const { label, icon, divider, fontWeight } = item;
          return (
            <>
              <SiderItem
                index={index}
                icon={icon}
                label={label}
                open={open}
                fontWeight={fontWeight}
                selected={pathname === `/${item.link}`}
                handleClick={() => navigateTo(item)}
              />
              {divider && (<Divider />)}
            </>
          );
        })}
      </List>
    </Drawer>
  );
});


