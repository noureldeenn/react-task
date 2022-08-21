import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, useMediaQuery } from "@mui/material";

type Props = {
  setSearch: (value: string) => void;
};

const Search = ({ setSearch }: Props) => {
  const [value, setValue] = useState("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const keyDownHandler = (event: {
      key: string;
      preventDefault: () => void;
    }) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Enter") {
        event.preventDefault();
        setSearch(value);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [setSearch, value]);

  const mdScreen = useMediaQuery("(min-width:600px)");
  return (
    <TextField
      sx={{
        width: mdScreen ? "428px" : "306px",
        bgcolor: "white",
        ml: "10px",
        borderRadius: "3px",
      }}
      color="secondary"
      value={value}
      onChange={handleChange}
      placeholder="search"
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="start"
            sx={{
              borderLeft: "1px solid",
            }}
          >
            <IconButton onClick={() => setSearch(value)}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default Search;
