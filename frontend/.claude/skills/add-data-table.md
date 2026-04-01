# Skill: Add Data Table

Use this skill when the user asks to add a table to a page or feature module. This uses `@tanstack/react-table` with MUI's Table components, matching the pattern established in the dashboard.

---

## When to Use

- "Add a table to the Users page"
- "Create a paginated table for Orders"
- "Show this data in a table with sorting and pagination"

---

## Template

```tsx
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import EmptyState from '@/components/EmptyState';
import { formatDate } from '@/utils';

// ── Replace with your actual row type ───────────────────────────────────────
interface RowType {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

interface DataTableProps {
  data: RowType[];
  isLoading?: boolean;
}

const statusColor: Record<string, 'success' | 'warning' | 'error'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'error',
};

export default function FeatureDataTable({ data, isLoading }: DataTableProps) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<RowType>[] = [
    { accessorKey: 'id', header: '#', size: 60 },
    { accessorKey: 'name', header: 'Name' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue<string>();
        return <Chip label={s} size="small" color={statusColor[s] ?? 'default'} variant="outlined" />;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },
    // Add action column if needed:
    // {
    //   id: 'actions',
    //   header: 'Actions',
    //   cell: ({ row }) => (
    //     <CustomIconButton icon={<EditOutlined />} onClick={() => handleEdit(row.original)} />
    //   ),
    // },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data.length) {
    return <EmptyState message="No records found." />;
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableCell
                    key={h.id}
                    sx={{ fontWeight: 600, bgcolor: 'grey.100', whiteSpace: 'nowrap' }}
                  >
                    {h.isPlaceholder ? null : h.column.getCanSort() ? (
                      <TableSortLabel
                        active={!!h.column.getIsSorted()}
                        direction={h.column.getIsSorted() === 'desc' ? 'desc' : 'asc'}
                        onClick={h.column.getToggleSortingHandler()}
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </TableSortLabel>
                    ) : (
                      flexRender(h.column.columnDef.header, h.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} hover>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(_, p) => setPagination((prev) => ({ ...prev, pageIndex: p }))}
        onRowsPerPageChange={(e) =>
          setPagination({ pageIndex: 0, pageSize: parseInt(e.target.value, 10) })
        }
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
```

---

## Notes

- Always show `<CircularProgress>` while data is loading
- Always show `<EmptyState>` when data array is empty — never render an empty table
- Use `size="small"` on the MUI Table for compact display
- Place the table inside a `Card` with `overflowX: 'auto'` for mobile safety
- For server-side pagination, set `manualPagination: true` and pass `pageCount` to `useReactTable`
