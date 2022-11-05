export const normalizePageName = (pathname: string): string => {
  if (pathname.length === 0) return "homePageTitle";
  switch (pathname) {
    case "profile":
      return "userPageTitle";
    case "settings":
      return "settingsPageTitle";
    default:
      return "homePageTitle";
  }
};

export const createPathname = (pathnames: string[], index: number): string => {
  if (index === 0) return "/";
  let pathname = ``;
  for (let i = 0; i < index + 1; i++) {
    pathname = pathname + "/" + pathnames[i];
  }
  return pathname;
};
