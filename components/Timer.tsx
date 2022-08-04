import { Box, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const Timer = () => {
  const [start, setStart] = useState(false);
  return (
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
  );
};

export default Timer;
