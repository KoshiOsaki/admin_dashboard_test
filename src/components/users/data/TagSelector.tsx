import { tagListForGraphState } from '@/store/tagListForGraphState';
import { TagChecked } from '@/types/data';
import { CheckIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

export const TagSelector = () => {
  const [tagList, setTagList] = useRecoilState<TagChecked[]>(tagListForGraphState);

  //前に言った、checkedを変える時に謎のreadonlyエラーが出てしまうので再生成している。要改善
  const handleChange = (index: number) => {
    let _tagList: TagChecked[] = [];
    tagList.map((tag) => {
      _tagList.push({ tag: { tagId: tag.tag.tagId, fieldId: '', tagName: tag.tag.tagName }, checked: tag.checked });
    });
    _tagList[index].checked = !_tagList[index].checked;
    setTagList(_tagList);
  };

  return (
    <Flex direction="column" border="1px" rounded="2xl" borderColor="gray.300" h="500px">
      {tagList &&
        tagList.map((tag, index) => (
          <HStack
            key={index}
            onClick={() => handleChange(index)}
            borderBottom="1px"
            borderColor="gray.200"
            _hover={{ bg: 'blue.100', cursor: 'pointer' }}
            px="3"
            py="2"
          >
            {tag.checked ? <CheckIcon /> : <Box w="16px"></Box>}
            <Flex>
              <Text mr="2">{tag.tag.tagId}</Text>
              <Text fontSize="sm" textColor="gray.600" pt="1">
                {tag.tag.tagName}
              </Text>
            </Flex>
          </HStack>
        ))}
    </Flex>
  );
};
