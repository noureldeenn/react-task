import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import Search from "./Components/Search";
import Youtube from "./Images/Youtube.jpg";
import YouTubeIcon from "@mui/icons-material/YouTube";

const options = [
  "2015-09-21T00:00:00Z",
  "2014-09-21T00:00:00Z",
  "2013-09-21T00:00:00Z",
  "2012-09-21T00:00:00Z",
  "2011-09-21T00:00:00Z",
];

const ITEM_HEIGHT = 48;

const App = () => {
  const [data, setData] = useState<any>();
  const [search, setSearch] = useState("spongebob");
  const [load, setLoad] = useState(false);
  const [afterDate, setAfterDate] = useState("2015-09-21T00:00:00Z");
  const [beforeDate, setBeforeDate] = useState("2020-09-22T02:00:00Z");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = () => {
    setAfterDate("");
    setBeforeDate("");
  };

  console.log(search);
  useEffect(() => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyD9_B_zHEDjyAl81Di6ut5T7z9AweFViaE&q=${search}&part=snippet&order=date&maxResults=40&publishedAfter=${afterDate}&publishedBefore=${beforeDate}`;

    const fetchData = async () => {
      try {
        setLoad(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoad(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [afterDate, beforeDate, search]);

  console.log(data);
  const mdScreen = useMediaQuery("(min-width:600px)");
  return (
    <Stack width={mdScreen ? "80%" : "100%"} sx={{ mx: "auto" }}>
      <Stack
        direction="row"
        height={80}
        width="100%"
        alignItems="center"
        sx={{
          position: mdScreen ? "fixed" : "",
          px: "10px",
          bgcolor: mdScreen ? "white" : "red",
          zIndex: "999",
        }}
      >
        <Box sx={{ px: mdScreen ? "100px" : "0px" }}>
          {mdScreen ? (
            <img src={Youtube} alt="" width={100} height={30} />
          ) : (
            <YouTubeIcon sx={{ fontSize: "55px", color: "white" }} />
          )}
        </Box>
        <Search setSearch={setSearch} />
      </Stack>
      <Box
        sx={{
          bgcolor: mdScreen ? "#D3D3D3" : "white",
          mt: mdScreen ? "80px" : "0px",
        }}
      >
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderBottom: "1px solid",
            borderColor: "grey",
            mb: "20px",
          }}
        >
          {mdScreen ? (
            <>
              <Typography>
                {`About ${data?.items?.length} flittered results`}
              </Typography>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <FilterListIcon />
                <Typography>flitter</Typography>
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel>All</InputLabel>
                  <Select value="" label="date" onChange={handleChange}>
                    <MenuItem>All</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
        </Stack>
        <Stack gap={2}>
          {load ? (
            <Stack
              height="80vh"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress color="inherit" />
            </Stack>
          ) : (
            data?.items?.map(
              (item: {
                id: { videoId: any };
                snippet: {
                  channelTitle:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                  description:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                };
              }) => (
                <Stack direction="row" width="100%" alignItems="start" gap={2}>
                  <iframe
                    width="50%"
                    height="300"
                    src={`https://www.youtube.com/embed/${item.id.videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                  <Stack width="50%" height="300">
                    <Typography>{item.snippet.channelTitle}</Typography>
                    <Typography>{item.snippet.description}</Typography>
                  </Stack>
                </Stack>
              )
            )
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
export default App;
