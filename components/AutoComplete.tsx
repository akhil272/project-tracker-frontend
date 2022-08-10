import React, { Ref, useState } from "react";
import { Input, Table, Tbody, Td, Tr, VStack } from "@chakra-ui/react";

type AutoCompleteProps = {
  suggestions: AutoCompleteSuggestions[];
  isValid: (b: boolean) => void;
  placeholder: string;
};

export type AutoCompleteSuggestions = {
  key: string;
  value: string;
};

// eslint-disable-next-line react/display-name
export const AutoComplete = React.forwardRef(
  (
    { suggestions, isValid, placeholder }: AutoCompleteProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const [filteredSuggestions, setFilteredSuggestions] =
      useState<AutoCompleteSuggestions[]>();
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("");

    function onChange(
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
      console.log("Changing", userInput, e.currentTarget.value);
      const newUserInput = e.currentTarget.value;
      if (!newUserInput) {
        //setActiveSuggestion(-1);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        isValid(true);
        setUserInput(e.currentTarget.value);
      }
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.value.toLowerCase().startsWith(userInput.toLowerCase())
      );
      //setActiveSuggestion(e.target.innerText);
      setFilteredSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      isValid(false);
      setUserInput(e.currentTarget.value);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function onClick(e: MouseEvent<HTMLLIElement, MouseEvent>) {
      console.log("Clicked", e.target.innerText);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      isValid(true);
      setUserInput(e.target.innerText);
    }

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions?.length) {
        suggestionsListComponent = (
          <Table
            className={"suggestions"}
            position={"absolute"}
            top={10}
            left={0}
            right={0}
            variant="simple"
            zIndex={999}
          >
            <Tbody>
              {filteredSuggestions?.map((suggestion, index) => {
                return (
                  <Tr
                    key={index}
                    _hover={{
                      background: "gray.200",
                      color: "green",
                    }}
                    onClick={onClick}
                  >
                    <Td>
                      <span className={"selectedText"}>{suggestion.value}</span>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No countries found for that input!</em>
          </div>
        );
      }
    }

    return (
      <>
        <VStack position={"relative"}>
          <Input
            ref={ref}
            type="text"
            onChange={onChange}
            value={userInput}
            placeholder={placeholder}
          />
          {suggestionsListComponent}
        </VStack>
      </>
    );
  }
);

export default AutoComplete;
