import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();
const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
};

export default Main;

const Example = () => {
  const [click, setClick] = useState(true);
  const { isError, isLoading, data } = useQuery(
    "image",
    async () => {
      const res = await axios("https://dog.ceo/api/breeds/image/random/10");
      const resData = await res.data.message;
      return resData;
    },
    { enabled: !!click }
  );

  if (isLoading) return <div> "Loading..." </div>;

  if (isError) return <div>"An error has occurred "</div>;
  const resetCache = () => {
    queryClient.resetQueries("image");
  };

  const changeBoolean = () => {
    setClick(!click);
  };
  console.log(queryClient);

  return (
    <Box>
      {data.map((image, index) => {
        return (
          <ImageBox key={index}>
            <Image src={image} />
          </ImageBox>
        );
      })}
      <Btn onClick={resetCache}>클릭</Btn>
      <Btn onClick={changeBoolean}>boolean</Btn>
    </Box>
  );
};

const Box = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
`;
const ImageBox = styled.div``;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Btn = styled.button`
  width: 200px;
  height: 100px;
`;
