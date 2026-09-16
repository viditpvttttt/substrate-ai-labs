import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// List of tool routes – mirrors the main site navigation
const tools = [
  { to: "/kernel", label: "Kernel" },
  { to: "/folio", label: "Folio" },
  { to: "/gridline", label: "Gridline" },
  { to: "/work", label: "Work" },
  { to: "/studio", label: "Studio" },
] as const;

/**
 * Navigation component styled like the existing site navigation.
 * It can be placed anywhere (e.g., a sidebar, a secondary header, or a dedicated tools page).
 */
export function ToolsNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-4">
        {tools.map((item) => (
          <NavigationMenuItem key={item.to}>
            <NavigationMenuLink asChild>
              <Link
                to={item.to}
                className={navigationMenuTriggerStyle()}
                activeProps={{ className: navigationMenuTriggerStyle() + " text-foreground" }}
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default ToolsNavigation;
