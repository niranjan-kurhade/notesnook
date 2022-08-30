import { Icons } from "@notesnook/editor/dist/toolbar/icons";
import {
  getDefaultPresets,
  getAllTools
} from "@notesnook/editor/dist/toolbar/tool-definitions";
import { ToolId } from "@notesnook/editor/dist/toolbar/tools";
import { ToolbarGroupDefinition } from "@notesnook/editor/dist/toolbar/index";
import { useThemeStore } from "../../../stores/use-theme-store";

export const tools = getAllTools();
export const presets: { [name: string]: ToolbarGroupDefinition[] } = {
  default: getDefaultPresets().default,
  minimal: getDefaultPresets().minimal,
  custom: []
};

export function findToolById(id: keyof typeof tools): {
  title: string;
  icon: string;
} {
  return tools[id];
}

export function getToolIcon(id: keyof typeof tools) {
  //@ts-ignore
  const icon = Icons[id];
  const colors = useThemeStore.getState().colors;
  //@ts-ignore
  return id === "none"
    ? null
    : `<svg width="20" height="20"  >
  <path d="${icon}" fill="${colors.icon}" />
</svg>`;
}

export function getUngroupedTools(
  toolDefinition: (string | string[])[][]
): string[] {
  const keys = Object.keys(tools);
  console.log(keys);
  const ungrouped = [];
  const toolString = JSON.stringify(toolDefinition);
  for (const key of keys) {
    if (tools[key as ToolId].conditional) continue;
    if (!toolString.includes(key)) ungrouped.push(key);
  }
  console.log(ungrouped);
  return ungrouped;
}
