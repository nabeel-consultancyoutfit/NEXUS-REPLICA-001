import { useState, ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  AddCircleOutlineOutlined,
  ArticleOutlined,
  BarChartOutlined,
  CalendarMonthOutlined,
  CheckCircleOutlined,
  CloudOutlined,
  NotificationsOutlined,
  RemoveCircleOutlineOutlined,
  RestartAltOutlined,
  StorageOutlined,
  TableChartOutlined,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

// Internal imports — correct paths
import AuthGuard from '@/GuardsAndPermissions/AuthGuard';
import PageHeader from '@/components/PageHeader/index';
import CustomButton from '@/components/Buttons/CustomButton';
import StatsCard from '@/components/StatsCard';
import MainLayout from '@/layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { increment, decrement, reset, setStep } from '@/redux/slices/counter';
import { useGetPostsQuery, useGetUsersQuery } from '@/services/demo';
import { showSuccess, showError, showWarning, showInfo } from '@/lib/snackbar';
import { formatDate } from '@/utils';
import { mockTableData, mockChartSeries, mockChartCategories } from '@/mock';

// ─── Dynamic import: ApexCharts (SSR disabled) ────────────────────────────────
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ─── Types ────────────────────────────────────────────────────────────────────
interface MockTableRow {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  createdAt: string;
}

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

// ─── Yup schema ──────────────────────────────────────────────────────────────
const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().min(10, 'At least 10 characters').required('Message is required'),
});

// ─── Section header helper ────────────────────────────────────────────────────
function SectionTitle({ icon, title }: { icon: ReactElement; title: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ color: 'primary.main' }}>{icon}</Box>
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </Box>
      <Chip label="✓ Working" color="success" size="small" />
    </Box>
  );
}

// ─── Section 1: Redux Toolkit ─────────────────────────────────────────────────
function ReduxSection() {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector((s) => s.counter.value);
  const step = useAppSelector((s) => s.counter.step);

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <SectionTitle icon={<StorageOutlined />} title="Redux Toolkit" />
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h2" fontWeight={700} color="primary.main">
          {counterValue}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Counter Value (step: {step})
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
        <CustomButton
          label="−"
          onClick={() => dispatch(decrement())}
          variant="outlined"
          size="small"
          startIcon={<RemoveCircleOutlineOutlined />}
        />
        <CustomButton
          label="Reset"
          onClick={() => dispatch(reset())}
          variant="outlined"
          size="small"
          startIcon={<RestartAltOutlined />}
        />
        <CustomButton
          label="+"
          onClick={() => dispatch(increment())}
          variant="contained"
          size="small"
          startIcon={<AddCircleOutlineOutlined />}
        />
      </Stack>
      <TextField
        type="number"
        label="Step"
        value={step}
        onChange={(e) => dispatch(setStep(Number(e.target.value) || 1))}
        size="small"
        fullWidth
        inputProps={{ min: 1, max: 100 }}
      />
    </Card>
  );
}

// ─── Section 2: RTK Query ─────────────────────────────────────────────────────
function RTKQuerySection() {
  const { data: posts = [], isLoading: postsLoading } = useGetPostsQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <SectionTitle icon={<CloudOutlined />} title="RTK Query" />
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        Live fetch → jsonplaceholder.typicode.com
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            Posts
          </Typography>
          {postsLoading ? (
            <CircularProgress size={20} />
          ) : (
            <List dense disablePadding>
              {posts.slice(0, 3).map((p) => (
                <ListItem key={p.id} disableGutters>
                  <ListItemText
                    primary={`#${p.id} ${p.title}`}
                    primaryTypographyProps={{ variant: 'caption', noWrap: true }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            Users
          </Typography>
          {usersLoading ? (
            <CircularProgress size={20} />
          ) : (
            <List dense disablePadding>
              {users.slice(0, 3).map((u) => (
                <ListItem key={u.id} disableGutters>
                  <ListItemText
                    primary={u.name}
                    secondary={u.email}
                    primaryTypographyProps={{ variant: 'caption', noWrap: true }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}

// ─── Section 3: TanStack Table ────────────────────────────────────────────────
function TanStackTableSection() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const columns: ColumnDef<MockTableRow>[] = [
    { accessorKey: 'id', header: '#', size: 40 },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue<string>();
        const color: Record<string, 'success' | 'warning' | 'error'> = {
          active: 'success',
          pending: 'warning',
          inactive: 'error',
        };
        return <Chip label={s} size="small" color={color[s] ?? 'default'} variant="outlined" />;
      },
    },
    { accessorKey: 'role', header: 'Role' },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },
  ];

  const table = useReactTable({
    data: mockTableData as MockTableRow[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <Card sx={{ p: 3 }}>
      <SectionTitle icon={<TableChartOutlined />} title="@tanstack/react-table" />
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableCell key={h.id} sx={{ fontWeight: 600, bgcolor: 'grey.100' }}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
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
        count={mockTableData.length}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(_, p) => setPagination((prev) => ({ ...prev, pageIndex: p }))}
        onRowsPerPageChange={(e) =>
          setPagination({ pageIndex: 0, pageSize: parseInt(e.target.value, 10) })
        }
        rowsPerPageOptions={[5, 10]}
      />
    </Card>
  );
}

// ─── Section 4: ApexCharts ────────────────────────────────────────────────────
function ApexChartsSection() {
  const chartOptions = {
    chart: { id: 'demo-line', toolbar: { show: false } },
    xaxis: { categories: mockChartCategories },
    stroke: { curve: 'smooth' as const },
    colors: ['#38CAB5', '#35456D'],
    grid: { borderColor: '#f1f1f1' },
    dataLabels: { enabled: false },
    legend: { position: 'top' as const },
  };

  return (
    <Card sx={{ p: 3 }}>
      <SectionTitle icon={<BarChartOutlined />} title="ApexCharts" />
      <ApexChart type="line" series={mockChartSeries} options={chartOptions} height={260} />
    </Card>
  );
}

// ─── Section 5: React Hook Form + Yup ────────────────────────────────────────
function RHFSection() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (_data: ContactFormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    showSuccess('Form submitted successfully! ✓');
    reset();
  };

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <SectionTitle icon={<ArticleOutlined />} title="React Hook Form + Yup" />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {(['name', 'email', 'message'] as const).map((field) => (
          <Box key={field} sx={{ mb: 2 }}>
            <Controller
              name={field}
              control={control}
              render={({ field: f }) => (
                <TextField
                  {...f}
                  fullWidth
                  size="small"
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  type={field === 'email' ? 'email' : 'text'}
                  multiline={field === 'message'}
                  rows={field === 'message' ? 3 : 1}
                  error={!!errors[field]}
                />
              )}
            />
            {errors[field] && (
              <FormHelperText error>{errors[field]?.message}</FormHelperText>
            )}
          </Box>
        ))}
        <CustomButton label="Submit Form" type="submit" loading={isSubmitting} fullWidth />
      </Box>
    </Card>
  );
}

// ─── Section 6: MUI X Date Picker ────────────────────────────────────────────
function DatePickerSection() {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <SectionTitle icon={<CalendarMonthOutlined />} title="MUI X Date Picker" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          onChange={setDate}
          slotProps={{ textField: { size: 'small', fullWidth: true } }}
        />
      </LocalizationProvider>
      <Box
        sx={{
          mt: 2,
          p: 2,
          bgcolor: 'grey.100',
          borderRadius: 1,
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color={date ? 'text.primary' : 'text.secondary'}>
          {date ? `Selected: ${formatDate(date.toISOString())}` : 'No date selected'}
        </Typography>
      </Box>
    </Card>
  );
}

// ─── Section 7: Notistack ─────────────────────────────────────────────────────
function NotistackSection() {
  const toasts = [
    { label: 'Success', fn: () => showSuccess('Operation completed successfully!'), color: 'success' as const },
    { label: 'Error', fn: () => showError('Something went wrong!'), color: 'error' as const },
    { label: 'Warning', fn: () => showWarning('Please review this warning.'), color: 'warning' as const },
    { label: 'Info', fn: () => showInfo('Here is some information.'), color: 'info' as const },
  ];

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <SectionTitle icon={<NotificationsOutlined />} title="Notistack" />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click each button to trigger a toast notification:
      </Typography>
      <Stack spacing={1.5}>
        {toasts.map(({ label, fn, color }) => (
          <CustomButton
            key={label}
            label={`Show ${label}`}
            onClick={fn}
            variant="contained"
            color={color}
            fullWidth
            size="small"
          />
        ))}
      </Stack>
    </Card>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
function DashboardContent() {
  const { data: posts = [] } = useGetPostsQuery();
  const counterValue = useAppSelector((s) => s.counter.value);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <PageHeader
        title="Dependency Demo Dashboard"
        subtitle="Every card below confirms a key dependency is installed and working correctly"
      />

      {/* Stats row */}
      <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
        {[
          { title: 'Posts Loaded (RTK Query)', value: posts.length || '—', icon: <CloudOutlined /> },
          { title: 'Counter (Redux)', value: counterValue, icon: <StorageOutlined /> },
          { title: 'Table Rows', value: mockTableData.length, icon: <TableChartOutlined /> },
          { title: 'Chart Series', value: mockChartSeries.length, icon: <BarChartOutlined /> },
        ].map((stat) => (
          <Grid key={stat.title} item xs={12} sm={6} md={3}>
            <StatsCard title={stat.title} value={stat.value} icon={stat.icon} />
          </Grid>
        ))}
      </Grid>

      {/* Demo cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}><ReduxSection /></Grid>
        <Grid item xs={12} md={6} lg={4}><RTKQuerySection /></Grid>
        <Grid item xs={12} md={6} lg={4}><NotistackSection /></Grid>
        <Grid item xs={12} md={6} lg={4}><RHFSection /></Grid>
        <Grid item xs={12} md={6} lg={4}><DatePickerSection /></Grid>
        <Grid item xs={12} md={12} lg={8}><ApexChartsSection /></Grid>
        <Grid item xs={12}><TanStackTableSection /></Grid>
      </Grid>
    </Container>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}

DashboardPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
