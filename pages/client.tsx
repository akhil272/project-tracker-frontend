import { Box, Button, useDisclosure } from "@chakra-ui/react";
import ClientCard from "@Components/ClientCard";
import CreateClientModal from "@Components/Models/client/CreateClientModal";
import { createClient, fetchClients } from "@Query/clients";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface Address {
  id: number;
  pinCode: number;
  state: string;
  country: string;
  addressLine1: string;
}

interface clientProps {
  id: number;
  name: string;
  phoneNumber: string;
  address?: Address;
  imageUrl?: string;
  mapLink?: string;
}

const Client = () => {
  const { data, status } = useQuery(["clients"], fetchClients);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error...</p>;
  }
  return (
    <div>
      <Button onClick={onOpen}>Create new</Button>
      <CreateClientModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      {data?.map((client: clientProps) => (
        <Box marginY={4} key={client.id}>
          <ClientCard
            name={client.name}
            phoneNumber={client.phoneNumber}
            imageUrl={client.imageUrl}
            mapLink={client.mapLink}
            clientId={client.id}
          />
        </Box>
      ))}
    </div>
  );
};

export default Client;
