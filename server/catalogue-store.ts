import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomBytes } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "..", "data");
const REQUESTS_FILE = path.join(DATA_DIR, "catalogue-requests.json");
const CODES_FILE = path.join(DATA_DIR, "download-codes.json");

export interface CatalogueRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  comment?: string;
  catalogueUrl: string;
  catalogueName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface DownloadCode {
  id: string;
  requestId: string;
  code: string;
  catalogueUrl: string;
  used: boolean;
  permanent?: boolean; // if true, never marked as used — can be redeemed unlimited times
  createdAt: string;
}

// ── Permanent seed codes (one per catalogue) ─────────────────────────────
const SEED_CODES: Omit<DownloadCode, "id" | "used" | "createdAt">[] = [
  { code: "PL2026", catalogueUrl: "/catalogues/2026 Paralight Aluminum Profile Catalog \u2014 Comprehensive.pdf", requestId: "seed", permanent: true },
  { code: "PLCOML", catalogueUrl: "/catalogues/Commercial Lighting Catalog.pdf",              requestId: "seed", permanent: true },
  { code: "PLCOLR", catalogueUrl: "/catalogues/Colorful Linear Series Catalog.pdf",            requestId: "seed", permanent: true },
  { code: "ML05SR", catalogueUrl: "/catalogues/05 Series Magnetic Track Brochure.pdf",         requestId: "seed", permanent: true },
  { code: "ML10SR", catalogueUrl: "/catalogues/10 Series Magnetic Track Brochure.pdf",         requestId: "seed", permanent: true },
  { code: "ML20SR", catalogueUrl: "/catalogues/20 Series Magnetic Track Brochure.pdf",         requestId: "seed", permanent: true },
  { code: "MLS06R", catalogueUrl: "/catalogues/S06 Series Magnetic Track Brochure.pdf",        requestId: "seed", permanent: true },
];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readRequests(): CatalogueRequest[] {
  ensureDataDir();
  if (!fs.existsSync(REQUESTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(REQUESTS_FILE, "utf-8"));
}

function writeRequests(data: CatalogueRequest[]) {
  ensureDataDir();
  fs.writeFileSync(REQUESTS_FILE, JSON.stringify(data, null, 2));
}

function readCodes(): DownloadCode[] {
  ensureDataDir();
  if (!fs.existsSync(CODES_FILE)) return [];
  return JSON.parse(fs.readFileSync(CODES_FILE, "utf-8"));
}

function writeCodes(data: DownloadCode[]) {
  ensureDataDir();
  fs.writeFileSync(CODES_FILE, JSON.stringify(data, null, 2));
}

/** Ensure seed codes exist in the codes file (idempotent) */
export function seedPermanentCodes() {
  const codes = readCodes();
  const existing = new Set(codes.map((c) => c.code));
  let changed = false;
  for (const seed of SEED_CODES) {
    if (!existing.has(seed.code)) {
      codes.push({ ...seed, id: randomBytes(8).toString("hex"), used: false, createdAt: new Date().toISOString() });
      changed = true;
    }
  }
  if (changed) writeCodes(codes);
}

export function createRequest(payload: Omit<CatalogueRequest, "id" | "status" | "createdAt">): CatalogueRequest {
  const requests = readRequests();
  const req: CatalogueRequest = {
    ...payload,
    id: randomBytes(8).toString("hex"),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  requests.push(req);
  writeRequests(requests);
  return req;
}

export function getRequests(): CatalogueRequest[] {
  return readRequests().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function approveRequest(id: string): { request: CatalogueRequest; code: string } | null {
  const requests = readRequests();
  const idx = requests.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  requests[idx].status = "approved";
  writeRequests(requests);

  // Generate unique 6-char alphanumeric code (uppercase)
  let code: string;
  const existing = readCodes().map((c) => c.code);
  do {
    code = randomBytes(3).toString("hex").toUpperCase();
  } while (existing.includes(code));

  const codes = readCodes();
  codes.push({
    id: randomBytes(8).toString("hex"),
    requestId: id,
    code,
    catalogueUrl: requests[idx].catalogueUrl,
    used: false,
    createdAt: new Date().toISOString(),
  });
  writeCodes(codes);

  return { request: requests[idx], code };
}

export function redeemCode(code: string): { catalogueUrl: string } | null {
  const codes = readCodes();
  const idx = codes.findIndex((c) => c.code === code.toUpperCase() && !c.used);
  if (idx === -1) return null;
  // Only mark as used if it's not a permanent code
  if (!codes[idx].permanent) {
    codes[idx].used = true;
    writeCodes(codes);
  }
  return { catalogueUrl: codes[idx].catalogueUrl };
}
