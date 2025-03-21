import type { ReactNode } from "react";

export type TableProps = {
  columns: Column[];
  renderRow: RenderRowType;
  data: unknown[];
};

export type Column = {
  header: string;
  accessor: string;
  className?: string;
};

export type RenderRowType = (item: Record<string, unknown>) => ReactNode;

export type ToastNotificationProps = {
  message: string;
  durationMs: number;
  type: "error" | "info";
};
