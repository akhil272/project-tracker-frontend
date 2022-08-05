import {
  useDisclosure,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { createClient } from "@Query/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const CreateClientModal = ({ isOpen, onOpen, onClose }: any) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const mutation = useMutation(createClient, {
    onSuccess: () => {
      toast({
        title: "Submitted!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      // Invalidate and refetch
      queryClient.invalidateQueries(["clients"]);
    },
  });
  const toast = useToast();
  const onSubmit = (data: any) => {
    mutation.mutate({
      name: data.name,
      phoneNumber: data.phoneNumber,
      imageUrl: data?.imageUrl,
      mapLink: data?.mapLink,
      address: {
        state: data?.state,
        country: data?.country,
        pinCode: data?.pinCode,
        addressLine1: data?.addressLine1,
      },
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input
                  id="name"
                  placeholder="Enter client name"
                  {...register("name", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />

                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                <Input
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  {...register("phoneNumber", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormLabel htmlFor="imageUrl">Image Url</FormLabel>
                <Input
                  id="imageUrl"
                  placeholder="Enter image url"
                  {...register("imageUrl", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormLabel htmlFor="country">Enter country</FormLabel>
                <Input
                  id="country"
                  placeholder="Enter image url"
                  {...register("country", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormLabel htmlFor="state">Enter state</FormLabel>
                <Input
                  id="state"
                  placeholder="Enter image url"
                  {...register("state", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormLabel htmlFor="pinCode">Enter pinCode</FormLabel>
                <Input
                  id="pinCode"
                  placeholder="Enter image url"
                  {...register("pinCode", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormLabel htmlFor="addressLine1">Enter address line</FormLabel>
                <Input
                  id="addressLine1"
                  placeholder="Enter image url"
                  {...register("addressLine1", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <Input
                  id="mapLink"
                  placeholder="Enter map url"
                  {...register("mapLink", {
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
              </FormControl>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateClientModal;
