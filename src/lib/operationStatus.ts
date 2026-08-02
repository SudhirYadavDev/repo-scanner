export type OperationType = "sync" | "import" | "scan" | null;

const STORAGE_KEY = "repoScannerOperation";

export function startOperation(operation: Exclude<OperationType, null>) {
  sessionStorage.setItem(STORAGE_KEY, operation);
  window.dispatchEvent(new Event("operation-status-changed"));
}

export function finishOperation() {
  sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("operation-status-changed"));
}

export function getOperation(): OperationType {
  return (sessionStorage.getItem(STORAGE_KEY) as OperationType) ?? null;
}