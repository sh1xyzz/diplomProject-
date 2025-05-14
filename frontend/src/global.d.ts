// src/global.d.ts
import { MenuProps } from "antd";

declare global {
  declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }

  declare module "*jpg" {
    const classes: string;
    export default classes;
  }

  declare module "*.json" {
    const value: any;
    export default value;
  }

  type AntdMenuProps = MenuProps;
}
