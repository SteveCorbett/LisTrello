export enum MenuItemTypes {
  CHANGE_SIZE,
  LINK,
  LOGOUT,
}
export interface MenuItemParm {
  target: string;
  title: string;
  tooltips: string[];
  iconName: string;
  type: MenuItemTypes;
}
