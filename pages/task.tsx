import { Box, useToast } from "@chakra-ui/react";
import TaskCard from "@Components/TaskCard";
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
  running: boolean;
  projectsOnProcessProjectId: number;
  projectsOnProcessProcessId: number;
  projectsOnProcess: {
    projectId: number;
    processId: number;
    process: {
      id: number;
      name: string;
    };
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
  const handleStart = (id: number) => {
    startTaskMutation.mutate({ id, startTime: new Date() });
  };
  const handleEnd = (id: number) => {
    stopTaskMutation.mutate({ id, endTime: new Date() });
  };
  return (
    <div>
      {data?.map((task: taskProps) => (
        <Box marginY={2} key={task.id}>
          <TaskCard
            name={task.name}
            projectName={task.projectsOnProcess.project.name}
            process={task.projectsOnProcess.process.name}
            clientName={task.projectsOnProcess.project.client.name}
            totalTime={task.totalTime}
            handleStart={() => handleStart(task.id)}
            handleEnd={() => handleEnd(task.id)}
            running={task.running}
            startTime={task.startTime}
          />
        </Box>
      ))}
    </div>
  );
};

export default Task;
