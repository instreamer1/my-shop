import MenuItem from "../components/MenuItem";

type CatalogItemBase = {
  slug: string;
  label: string;
  href: string;
  hasSubmenu: boolean;
};

type CatalogItemWithSubmenu = CatalogItemBase & {
  hasSubmenu: true;
  submenuItems: {
    slug: string;
    href: string;
    label: string;
  }[];
};

type CatalogItemWithoutSubmenu = CatalogItemBase & {
  hasSubmenu: false;
};

export type CatalogItem = CatalogItemWithSubmenu | CatalogItemWithoutSubmenu;


export type MenuItems= {

  label: string;
  href: string;

};
