import { Button, Grid, Checkbox, Spacer, Text } from "@nextui-org/react";
import React from "react";
import { ProgressBar } from "../../types";

export interface StatusbarProps {
  status: ProgressBar;
  onStart: () => Promise<void>;
  markAsDone: () => Promise<void>;
}

const Index = ({ markAsDone, onStart, status }: StatusbarProps) => {
  switch (status) {
    case ProgressBar.CREATED:
      return (
        <Button size='sm' color='success' shadow onPress={onStart}>
          Start task
        </Button>
      );
    case ProgressBar.STARTED:
      return (
        <Grid.Container alignItems='center' justify='flex-end'>
          <Grid>
            <Checkbox color='success' onChange={markAsDone} size='md'>
              <Text h4 b css={{ color: "$success" }}>
                Done
              </Text>
            </Checkbox>
          </Grid>
          <Spacer />
          <Grid></Grid>
        </Grid.Container>
      );

    default:
      return <></>;
  }
};

export default Index;
