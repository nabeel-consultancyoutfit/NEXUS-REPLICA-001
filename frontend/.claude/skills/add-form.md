# Skill: Add Form

Use this skill when the user asks to create a form — standalone page, modal/dialog form, or inline form — using React Hook Form + Yup + MUI.

---

## When to Use

- "Add a create user form"
- "Build a settings form"
- "Add an edit modal with form validation"

---

## Template — Standard Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Card,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import CustomButton from '@/components/Buttons/CustomButton';
import { showSuccess, showError } from '@/lib/snackbar';

// ── 1. Define types ──────────────────────────────────────────────────────────
interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// ── 2. Define schema outside component ──────────────────────────────────────
const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required'),
});

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

// ── 3. Form component ────────────────────────────────────────────────────────
export default function MyForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MyFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    },
  });

  const onSubmit = async (data: MyFormValues) => {
    try {
      // await createItem(data).unwrap();  ← RTK Query mutation
      showSuccess('Saved successfully!');
      reset();
    } catch {
      showError('Something went wrong. Please try again.');
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Form Title
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>

          {/* Text field */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  size="small"
                  fullWidth
                  error={!!errors.firstName}
                />
              )}
            />
            {errors.firstName && (
              <FormHelperText error>{errors.firstName.message}</FormHelperText>
            )}
          </Grid>

          {/* Select field */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  size="small"
                  fullWidth
                  error={!!errors.role}
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {errors.role && (
              <FormHelperText error>{errors.role.message}</FormHelperText>
            )}
          </Grid>

        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
          <CustomButton
            label="Cancel"
            variant="outlined"
            onClick={() => reset()}
          />
          <CustomButton
            label="Save"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          />
        </Box>
      </Box>
    </Card>
  );
}
```

---

## Template — Form inside CommonDialog (Modal)

```tsx
import CommonDialog from '@/components/CommonDialog';

<CommonDialog
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Create User"
  maxWidth="sm"
>
  <MyForm onSuccess={() => setIsModalOpen(false)} />
</CommonDialog>
```

---

## Rules

- Schema always defined **outside** the component — never inline
- Every field wrapped in `<Controller>` — no uncontrolled inputs
- Error message always rendered with `<FormHelperText error>`
- Use `showSuccess` / `showError` from `@/lib/snackbar` — never `alert()`
- Submit button uses `loading={isSubmitting}` state
- `reset()` called on success to clear the form
