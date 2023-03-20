import * as React from "react";
import { ImageList, ImageListItem } from "@mui/material";
import Nav from "../components/Nav";
import { getAllImageList, imageState } from "../store/images/reducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { goto } from "../common";

const Image = () => {
  const img = useAppSelector(imageState);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllImageList());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Nav page="image" id=""></Nav>
      <ImageList cols={3}>
        {img.image.list.map((item, idx) => (
          <ImageListItem
            key={idx}
            onClick={() => {
              goto("/view?sid=" + item.sid);
            }}
          >
            <img
              alt="storypic"
              src={`${item.filename}?fit=crop&auto=format`}
              srcSet={`${item.filename}?fit=crop&auto=format`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </React.Fragment>
  );
};

export default Image;
