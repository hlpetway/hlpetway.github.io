import { React, useEffect, useId, useRef, useState } from 'react';
import { Box, Flex, Image, Heading, Label, Link, Masonry, Text } from 'gestalt';

function getPins() {
  const pins = [
    {
      color: '#2b3938',
      height: 563,
      src: 'https://imgur.com/4a50XsW.jpg',
      width: 1000,
      name: 'An inhabitant of the Alhambra in Grenada, Spain. ',
    },
    {
      color: '#8e7439',
      height: 563,
      src: 'https://i.imgur.com/xdGtNty.jpg',
      width: 1000,
      name: 'Walter takes a nap on the side of the trail to St John Fortress in Kotor, Montenegro.',
    },
    {
      color: '#698157',
      height: 533,
      src: 'https://imgur.com/JR2OyG3.jpg',
      width: 300,
      name: 'A local takes a nap in Porto, Portugal.'
    },
    {
      color: '#4e5d50',
      height: 625,
      src: 'https://imgur.com/wSqMAJU.jpg',
      width: 500,
      name: 'Theo, caretaker of the Henry Miller Museum in Big Sur, California..',
    },
    {
      color: '#6d6368',
      height: 500,
      src: 'https://imgur.com/WZLKyyh.jpg',
      width: 750,
      name: 'A quick photo with Walter on the way down from St John Fortress in Kotor Montenegro.',
    },
    {
      color: '#6d6368',
      height: 500,
      src: 'https://i.imgur.com/I0YLbO6.jpg',
      width: 500,
      name: 'Raoul does a big stretch in Seattle, WA.',
    },
    {
      color: '#6d6368',
      height: 667,
      src: 'https://i.imgur.com/LUeTMCi.jpg',
      width: 500,
      name: 'Kevin kindly requests that you open the door again in Panama City Beach, FL.',
    },
    {
      color: '#6d6368',
      height: 563,
      src: 'https://i.imgur.com/NpQdD9p.jpg',
      width: 750,
      name: 'A kitten stops for a quick chat in Bali, Indonesia..',
    },
    {
      color: '#6d6368',
      height: 500,
      src: 'https://i.imgur.com/M58zKg6.jpg',
      width: 750,
      name: 'A local enjoys a warm nap on the fortress walls in Dubrovnik, Croatia.',
    },
    {
      color: '#6d6368',
      height: 533,
      src: 'https://i.imgur.com/81glb0l.jpg',
      width: 300,
      name: 'Elvis borrows my shopping bag at Thee Fish Bowl in Evanston, IL.',
    },
    {
      color: '#6d6368',
      height: 630,
      src: 'https://i.imgur.com/RULlh6m.jpg',
      width: 472,
      name: 'Leonards office hours are open at Neko Cafe in Seattle, WA.',
    },
  ];

  const pinList = [...new Array(2)].map(() => [...pins]).flat();
  return Promise.resolve(pinList);
}

function GridComponent({ data }) {
  return (
    <Flex direction="column">
      <Image
        alt={data.name}
        color={data.color}
        naturalHeight={data.height}
        naturalWidth={data.width}
        src={data.src}
      />
      <Text>{data.name}</Text>
    </Flex>
  );
}

export default function Example() {
  const [pins, setPins] = useState([]);
  const [width, setWidth] = useState(955);
  const scrollContainerRef = useRef();
  const gridRef = useRef();

  const labelId = useId();

  useEffect(() => {
    getPins().then((startPins) => {
      setPins(startPins);
    });
  }, []);

  useEffect(() => gridRef.current?.handleResize(), [width]);

  const updateWidth = ({ target }) => {
    setWidth(Number(target.value));
  };

  return (
    <Box padding={4}>
      <Flex direction="column" flex="grow" gap={4}>
        <Flex alignItems="center" direction="column">
          <Flex.Item>
            <Label htmlFor={labelId}>
              <Heading accessibilityLevel='1' align='center'>
                Cats Around The World
              </Heading>
            </Label>
          </Flex.Item>
        </Flex>
        <div
          tabIndex={0}
          ref={(el) => {
            scrollContainerRef.current = el;
          }}
          style={{
            height: '600px',
            margin: 'auto',
            outline: '3px solid #ddd',
            overflowY: 'scroll',
            padding: '20px',
            width: '80%',
          }}
        >
          {scrollContainerRef.current && (
            <Masonry
              columnWidth={170}
              gutterWidth={20}
              items={pins}
              layout="basicCentered"
              minCols={1}
              ref={(ref) => {
                gridRef.current = ref;
              }}
              renderItem={({ data }) => <GridComponent data={data} />}
              scrollContainer={() => scrollContainerRef.current}
            />
          )}
        </div>
      </Flex>
      <Flex alignItems="center" direction="column">
          <Flex.Item>
            <Label htmlFor={labelId}>
              <Text>This is an example of the <Link display='inline' underline='always' href='https://gestalt.pinterest.systems/get_started/about_us'>Masonry Layout</Link></Text>
              <Text>This gallery can be resized and the columns will reflow to fit the space. Over slow connections, users will see a place holder block.</Text>
            </Label>
          </Flex.Item>
        </Flex>
    </Box>
  );
}