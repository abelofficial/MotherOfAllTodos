import { Grid } from "@nextui-org/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

import useSWR from "swr";
import AddTodoFormModal from "../../components/AddTodoFormModal";
import TodoItem from "../../components/TodoItem";
import { AuthContextInterface, AuthContext } from "../../Contexts/Auth";
import { getUserTodoListQuery } from "../../services/Queries";
import { UserTodoListURL } from "../../services/QueriesGateway";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  var projectId: number = +(id + "");
  const { token } = useContext<AuthContextInterface>(AuthContext);

  const { data } = useSWR(UserTodoListURL(), () =>
    getUserTodoListQuery(token + "", projectId)
  );

  if (!data) return <div>loading...</div>;

  return (
    <Grid.Container direction='column'>
      <Grid>
        <AddTodoFormModal id={projectId} />
      </Grid>
      <Grid>
        <Grid.Container
          gap={1}
          css={{
            display: "flex",
            alignItem: "center",
            justifyContent: "space-between",
          }}
        >
          {data?.map((td) => (
            <Grid xs={12} key={td.id}>
              <TodoItem
                id={td.id}
                projectId={projectId}
                title={td.title}
                description={td.description}
                status={td.status}
              />
            </Grid>
          ))}
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
};

export default Home;
