import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { createClient } from "@Query/clients";
import { fetchTasks, startTask, stopTask } from "@Query/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface taskProps {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  totalTime: number;
  comments: string;
  projectsOnProcessProjectId: number;
  projectsOnProcessProcessId: number;
  projectsOnProcess: {
    projectId: number;
    processId: number;
    project: {
      id: number;
      name: string;
      type: string;
      clientId: 1;
      client: {
        id: number;
        name: string;
        phoneNumber: string;
        imageUrl: string;
        mapLink: string;
        addressId: number;
      };
    };
  };
}

const Task = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data, status } = useQuery(["tasks"], fetchTasks);
  const startTaskMutation = useMutation(startTask, {
    onSuccess: () => {
      toast({
        title: "Submitted!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // Invalidate and refetch
      queryClient.invalidateQueries(["tasks"]);
    },
  });
  const stopTaskMutation = useMutation(stopTask, {
    onSuccess: () => {
      toast({
        title: "Submitted!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // Invalidate and refetch
      queryClient.invalidateQueries(["tasks"]);
    },
  });
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error...</p>;
  }

  return (
    <div>
      {data?.map((task: taskProps) => (
        <Box marginY={4} key={task.id}>
          <Box>
            <Text>Task Name</Text>
            <Text> {task.name}</Text>
            <Text>{task.projectsOnProcess.project.name}</Text>
            <Text>{task.projectsOnProcess.project.client.name}</Text>
            <br />

            <Box marginY={4}>
              <Text>Total Time</Text>
              <Text>{task.totalTime}</Text>
            </Box>
          </Box>
          <Button
            onClick={() => {
              startTaskMutation.mutate({ id: task.id, startTime: new Date() });
            }}
          >
            Start
          </Button>
          <Button
            onClick={() => {
              stopTaskMutation.mutate({ id: task.id, endTime: new Date() });
            }}
          >
            End
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default Task;
