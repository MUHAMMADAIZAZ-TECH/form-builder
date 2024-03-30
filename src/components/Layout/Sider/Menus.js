import { Add, List } from "@mui/icons-material";

export const SiderMenus = [
  {
    label: "Add New",
    icon: <Add htmlColor="#1acc9f" />,
    divider: true,
    fontWeight: 'bold',
    link: "add",
  },
  {
    label: "MFA Codes",
    icon: <List htmlColor="#1a7bce" />,
    divider: true,
    fontWeight: 'bold',
    link: "list",
  },
];
