import { ReactNode, useState } from "react";
import { Providers } from "./contexts";
import { ListingTable } from "./table/ListingTable";
import { ListingContainer } from "./ListingContainer";
import { ListingFilters } from "./filters/ListingFilters";
import { TableNameWithActions } from "./table/TableNameWithActions";
import { TableConfigurationPanel } from "./configurationPanel/TableConfigurationPanel";
import {
  BaseTableEntity,
  Column,
  ColumnsConfiguration,
  FiltersConfiguration,
} from "./types";

interface Props<Entity, TableEntity extends BaseTableEntity> {
  listingName?: string;
  renderData: Entity[];
  withNumber?: boolean;
  listingActions?: ReactNode;
  groupBy?: keyof TableEntity;
  columns: Column<TableEntity>[];
  columnsConfigurator?: ColumnsConfiguration;
  tableDataAdapter: (entity: Entity) => TableEntity;
  filtersConfiguration?: FiltersConfiguration<TableEntity>[];
  onSelect?: (selectedRowId: string, selectedRows: string[]) => void;
}

export const Listing = <
  Entity extends any,
  TableEntity extends BaseTableEntity,
>({
  columns,
  groupBy,
  onSelect,
  renderData,
  listingName,
  listingActions,
  tableDataAdapter,
  columnsConfigurator,
  withNumber = false,
  filtersConfiguration,
}: Props<Entity, TableEntity>) => {
  const tableData = renderData.map(tableDataAdapter);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <Providers<TableEntity>
      groupBy={groupBy}
      tableData={tableData}
      filtersConfiguration={filtersConfiguration}
    >
      <ListingContainer>
        <TableNameWithActions
          listingName={listingName}
          listingActions={listingActions}
        />

        {filtersConfiguration && (
          <ListingFilters<TableEntity> configuration={filtersConfiguration} />
        )}

        <TableConfigurationPanel<TableEntity>
          columns={columns}
          selectedRows={selectedRows}
          columnsConfigurator={columnsConfigurator}
        />

        <ListingTable<TableEntity>
          columns={columns}
          onSelect={onSelect}
          withNumber={withNumber}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          columnsConfigurator={columnsConfigurator}
        />
      </ListingContainer>
    </Providers>
  );
};
