# Component Map — Website Patterns to MUI

When you identify UI patterns on the website, use this guide to map them
to the correct MUI components and workspace patterns.

---

## Navigation Patterns

| Website Pattern | MUI Implementation |
|---|---|
| Top navigation bar | `AppBar` + `Toolbar` → use existing `Header` component |
| Vertical sidebar | `Drawer` (permanent/temporary) → use existing `NavLinks` component |
| Breadcrumbs | `Breadcrumbs` + `Link` |
| Tab navigation | `Tabs` + `Tab` |
| Dropdown menu | `Menu` + `MenuItem` |
| Mobile hamburger | `IconButton` with `MenuOutlined` icon |

---

## Data Display Patterns

| Website Pattern | MUI Implementation |
|---|---|
| Card grid | `Grid container` + `Grid item` + `Card` |
| Data table | `@tanstack/react-table` + MUI `Table` components |
| Stats/metric card | Use existing `StatsCard` component |
| List with avatars | `List` + `ListItem` + `ListItemAvatar` + `Avatar` |
| Timeline | `Timeline` from `@mui/lab` |
| Accordion/FAQ | `Accordion` + `AccordionSummary` + `AccordionDetails` |
| Chips/tags | `Chip` with `size="small"` and `variant="outlined"` |
| Badges | `Badge` wrapping an icon or avatar |
| Rating stars | `Rating` from `@mui/material` |
| Progress bar | `LinearProgress` or `CircularProgress` |
| Avatar with name | `Avatar` + `Typography` in a `Stack` |

---

## Filter & Search Patterns

| Website Pattern | MUI Implementation |
|---|---|
| Search input | `TextField` with `InputAdornment` (search icon) |
| Filter sidebar | `Drawer` or `Box` with `Stack` of filter controls |
| Filter chips (horizontal scroll) | `Stack direction="row"` + `Chip` buttons |
| Select dropdown | `Select` + `MenuItem` or `Autocomplete` |
| Date range picker | `DatePicker` from `@mui/x-date-pickers` |
| Range slider | `Slider` with `min/max/step` |
| Toggle buttons | `ToggleButtonGroup` + `ToggleButton` |
| Checkbox list | `FormGroup` + `FormControlLabel` + `Checkbox` |
| Radio group | `RadioGroup` + `FormControlLabel` + `Radio` |
| Switch/toggle | `Switch` + `FormControlLabel` |

---

## Form Patterns

| Website Pattern | MUI Implementation |
|---|---|
| Text input | `TextField` (`size="small"`, `fullWidth`) |
| Password input | `TextField type="password"` + visibility toggle |
| Multi-line text | `TextField multiline rows={N}` |
| Email input | `TextField type="email"` |
| Number input | `TextField type="number"` |
| File upload | `Button` + hidden `<input type="file">` |
| Form with sections | `Card` per section + `Divider` between sections |
| Inline form | `Stack direction="row"` + `TextField` + `Button` |

Always wrap all forms in react-hook-form with Controller + yupResolver.

---

## Feedback & Overlay Patterns

| Website Pattern | MUI Implementation |
|---|---|
| Toast/notification | `showSuccess()` / `showError()` from `@/lib/snackbar` |
| Modal/dialog | `Dialog` + `DialogTitle` + `DialogContent` + `DialogActions` |
| Confirmation dialog | Use existing `CommonDialog` component |
| Loading overlay | `Backdrop` + `CircularProgress` |
| Skeleton loading | `Skeleton` (variant: text/rectangular/circular) |
| Tooltip | `Tooltip` wrapping any element |
| Alert banner | `Alert` with `severity` prop |
| Empty state | Use existing `EmptyState` component |

---

## Layout Patterns

| Website Pattern | MUI Implementation |
|---|---|
| Two-column layout | `Grid container` with `Grid item xs={12} md={8}` + `md={4}` |
| Three-column grid | `Grid item xs={12} sm={6} md={4}` |
| Four-column grid | `Grid item xs={12} sm={6} md={3}` |
| Sidebar + content | `Box display="flex"` + `Drawer` + `Box flex={1}` |
| Centered card | `Container maxWidth="sm"` + `Box justifyContent="center"` |
| Full-width hero | `Box` with background + `Container` inside |
| Sticky header | Already handled by existing `Header` component |
| Footer | `Box component="footer"` at bottom of layout |

---

## Chart Patterns (always dynamic import!)

| Website Pattern | ApexCharts Type |
|---|---|
| Line chart / trend | `type="line"` |
| Bar chart | `type="bar"` |
| Area chart | `type="area"` |
| Donut/pie chart | `type="donut"` or `type="pie"` |
| Radial/gauge | `type="radialBar"` |
| Heatmap | `type="heatmap"` |

```tsx
// Always use dynamic import
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
```

---

## Icon Mapping

Use `@mui/icons-material`. Common patterns:

| Action | Icon |
|---|---|
| Search | `SearchOutlined` |
| Filter | `FilterListOutlined` |
| Settings | `SettingsOutlined` |
| User/Profile | `PersonOutlined` |
| Bookmark | `BookmarkBorderOutlined` / `BookmarkOutlined` |
| Share | `ShareOutlined` |
| More options | `MoreVertOutlined` |
| Close/X | `CloseOutlined` |
| Add | `AddOutlined` |
| Edit | `EditOutlined` |
| Delete | `DeleteOutlined` |
| Download | `DownloadOutlined` |
| Upload | `UploadOutlined` |
| Star/Rating | `StarOutlined` / `StarBorderOutlined` |
| Chat | `ChatBubbleOutlineOutlined` |
| Dashboard | `DashboardOutlined` |
| Analytics | `BarChartOutlined` |
| AI/Robot | `SmartToyOutlined` |
| Compare | `CompareArrowsOutlined` |
| Marketplace | `StoreOutlined` |

---

## Color Usage in Context

```tsx
// Status colors
active:   color="success"  → #36B37E
pending:  color="warning"  → #FFAB00
inactive: color="error"    → #FF5630
info:     color="info"     → #00B8D9

// Price type chips
free:      sx={{ bgcolor: 'success.light', color: 'success.dark' }}
paid:      sx={{ bgcolor: 'error.light', color: 'error.dark' }}
freemium:  sx={{ bgcolor: 'warning.light', color: 'warning.dark' }}

// Category/capability chips
sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
```
