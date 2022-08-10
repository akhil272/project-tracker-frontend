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
  FormHelperText,
} from "@chakra-ui/react";
import { createClient } from "@Query/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateClientFormSchema } from "@Utils/FormSchema";
const CreateClientModal = ({ isOpen, onOpen, onClose }: any) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateClientFormSchema),
  });

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
  const onInvalid = () => alert("This form is invalid try again");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
              <FormControl>
                <FormLabel htmlFor="name">Business name</FormLabel>
                <Input {...register("name")} />
                {errors?.name && (
                  <FormErrorMessage>
                    {errors.name?.message as any}
                  </FormErrorMessage>
                )}
                <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
                <Input {...register("phoneNumber")} />
                <FormLabel htmlFor="imageUrl">Image Url</FormLabel>
                <Input {...register("imageUrl")} />
                <FormLabel htmlFor="country">Enter country</FormLabel>
                <Input {...register("country")} />
                <FormLabel htmlFor="state">Enter state</FormLabel>
                <Input {...register("state")} />
                <FormLabel htmlFor="pinCode">Enter pinCode</FormLabel>
                <Input {...register("pinCode")} />
                <FormLabel htmlFor="addressLine1">Enter address line</FormLabel>
                <Input {...register("addressLine1")} />
                <FormLabel htmlFor="mapLink">Enter map link</FormLabel>
                <Input {...register("mapLink")} />
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                onSubmit={handleSubmit(onSubmit, onInvalid)}
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
