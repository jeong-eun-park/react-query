import React from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
const Main = () => {
  // console.log(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
};

export default Main;

const Example = () => {
  const { isLoading, error, data } = useQuery(
    "image",
    () =>
      fetch("https://dog.ceo/api/breeds/image/random/10").then((res) =>
        res.json()
      )
    //.then((data) => console.log(data))
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred ";

  const resetCache = () => {
    queryClient.resetQueries("image");
  };

  // const removeCache = () => {
  //   queryClient.refetchQueries("image");
  // };

  return (
    <Box>
      {data?.message.map((image, index) => {
        return (
          <ImageBox key={index}>
            <Image src={image} />
          </ImageBox>
        );
      })}
      <Btn onClick={resetCache}>클릭</Btn>
      {/* <Btn onClick={removeCache}>클릭</Btn> */}
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
