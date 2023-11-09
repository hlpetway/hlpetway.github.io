import { useEffect, useId, useRef, useState } from 'react';
import { Box, Flex, Image, Label, Masonry, Text } from 'gestalt';

function getPins() {
  const pins = [
    {
      color: '#2b3938',
      height: 563,
      src: 'https://imgur.com/4a50XsW',
      width: 474,
      name: 'An inhabitant of the Alhambra in Grenada, Spain. ',
    },
    {
      color: '#8e7439',
      height: 563,
      src: 'https://imgur.com/xdGtNty',
      width: 474,
      name: 'Walter takes a nap on the side of the trail to St John Fortress in Kotor, Montenegro.',
    },
    {
      color: '#698157',
      height: 533,
      src: 'https://imgur.com/JR2OyG3',
      width: 474,
      name: 'A local takes a nap in Porto, Portugal.',
    },
    {
      color: '#4e5d50',
      height: 625,
      src: 'https://imgur.com/wSqMAJU',
      width: 474,
      name: 'Theo, caretaker of the Henry Miller Museum in Big Sur, California..',
    },
    {
      color: '#6d6368',
      height: 500,
      src: 'https://imgur.com/WZLKyyh',
      width: 474,
      name: 'A quick photo with Walter on the way down from St John Fortress in Kotor Montenegro.',
    },
  ];

  const pinList = [...new Array(3)].map(() => [...pins]).flat();
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
  const [width, setWidth] = useState(700);
  const scrollContainerRef = useRef();
  const gridRef = useRef();

  const labelId = useId();

  useEffect(() => {
    getPins().then((startPins) => {
      setPins(startPins);
    });
  }, []);

  useEffect(() => {
    gridRef.current?.handleResize();
  }, [width]);

  const updateWidth = ({ target }) => {
    setWidth(Number(target.value));
  };

  return (
    <Box padding={2}>
      <Flex direction="column" gap={4}>
        <Flex alignItems="center" direction="column">
          <Flex.Item>
            <Label htmlFor={labelId}>
              <Text>Container Width</Text>
            </Label>
          </Flex.Item>
          <input
            id={labelId}
            type="range"
            defaultValue={800}
            onChange={updateWidth}
            min={200}
            max={800}
            step={5}
            style={{ width: '400px', display: 'block', margin: '10px auto' }}
          />
        </Flex>

        <div
          tabIndex={0}
          ref={(el) => {
            scrollContainerRef.current = el;
          }}
          style={{
            height: '300px',
            margin: '0 auto',
            outline: '3px solid #ddd',
            overflowY: 'scroll',
            width: `${width}px`,
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
    </Box>
  );
}
