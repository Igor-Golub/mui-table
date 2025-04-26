import { Listing } from "./listing/Listing.tsx";
import { Column, InputTypes } from "./listing/types.ts";
import { User, users, UserTableEntity } from "./listing/mocks.ts";
import { Button, Stack, Typography } from "@mui/material";
import { UIFilters } from "./filters/ui/Filters.tsx";

export function App() {
  const columns: Column<UserTableEntity>[] = [
    {
      header: "First Name",
      dataKey: "firstName",
      headerCellProps: {
        align: "center",
      },
    },
    {
      header: "Last Name",
      dataKey: "lastName",
      headerCellProps: {
        align: "center",
      },
    },
    {
      header: "Age",
      dataKey: "age",
      headerCellProps: {
        align: "center",
      },
    },
    {
      header: "Email",
      dataKey: "email",
      bodyCellProps: {
        align: "center",
      },
      headerCellProps: {
        align: "center",
      },
    },
    {
      header: "Actions",
      dataKey: "actions",
      headerCellProps: {
        align: "center",
      },
      bodyCellProps: {
        align: "right",
      },
      headerComponent: (
        <Typography component="span" color="textSecondary">
          Actions here
        </Typography>
      ),
      renderCell: (entity) => (
        <Stack direction="row" gap="1rem" justifyContent="flex-end">
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              alert(`I will be update ${entity.id}`);
            }}
          >
            Update
          </Button>

          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => {
              alert(`I will be remove ${entity.id}`);
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const userTableDataAdapter = (
    user: User,
    index: number,
  ): UserTableEntity => ({
    id: user.id,
    age: user.age,
    email: user.email,
    renderIndex: index,
    isAdmin: user.isAdmin,
    lastName: user.lastName,
    firstName: user.firstName,
  });

  return (
    <>
      <UIFilters />
      <Listing<User, UserTableEntity>
        columns={columns}
        filtersConfiguration={[
          {
            filterValue: "search",
            fields: ["email", "age"],
            inputType: InputTypes.Text,
            inputProps: {
              label: "Search by email & age",
            },
          },
          {
            fields: ["age"],
            filterValue: "selectAge",
            inputType: InputTypes.Select,
            inputProps: {
              options: [{ label: "24", value: "24" }],
            },
          },
          {
            fields: ["isAdmin"],
            filterValue: "isAdmin",
            inputType: InputTypes.Checkbox,
            inputProps: {
              label: "Is admin",
            },
          },
        ]}
        columnsConfigurator={{
          canHideColumn: true,
        }}
        onRowClick={(row) => {
          console.log(row);
        }}
        withNumber
        onSelect={(selectedRowId, selectedRows) => {
          console.log(selectedRowId, selectedRows);
        }}
        renderData={users}
        listingName="Listing"
        listingActions={<Button variant="contained">Some action</Button>}
        groupBy="age"
        tableDataAdapter={userTableDataAdapter}
      />
    </>
  );
}
