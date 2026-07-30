/**
 * Runtime — Learning Player : adaptateurs média INJECTABLES (Sprint C).
 *
 * Interfaces abstraites pour lecteurs PDF / Vidéo / Audio, visionneuse de ressources et gestionnaire de
 * téléchargements. **Aucune dépendance à une librairie**, aucun accès réseau ici. Des implémentations
 * « no-op » sont fournies (tests, SSR, sécurité) : elles n'exécutent aucun téléchargement réel.
 */
import type { DownloadItem, ResourceItem } from "./types.ts";

export type MediaEventName = "play" | "pause" | "timeupdate" | "ended" | "loaded";

/** Lecteur média générique (base des lecteurs vidéo et audio). */
export interface MediaPlayerAdapter {
  readonly kind: "video" | "audio";
  load(src: string): void | Promise<void>;
  play(): void | Promise<void>;
  pause(): void | Promise<void>;
  seek(seconds: number): void | Promise<void>;
  getPosition(): number;
  getDuration(): number;
  on(event: MediaEventName, handler: (payload?: unknown) => void): () => void;
}

/** Abstraction VideoPlayer (kind = "video"). */
export type VideoPlayerAdapter = MediaPlayerAdapter & { readonly kind: "video" };
/** Abstraction AudioPlayer (kind = "audio"). */
export type AudioPlayerAdapter = MediaPlayerAdapter & { readonly kind: "audio" };

/** Visionneuse PDF injectable. */
export interface PdfViewerAdapter {
  open(src: string, page?: number): void | Promise<void>;
  gotoPage(page: number): void | Promise<void>;
  currentPage(): number;
  pageCount(): number;
}

/** Visionneuse de ressources génériques (ouvre lien/pdf/vidéo/audio selon le type). */
export interface ResourceViewerAdapter {
  open(resource: ResourceItem): void | Promise<void>;
}

/** Gestionnaire de téléchargements injectable. L'implémentation par défaut n'exécute AUCUN téléchargement. */
export interface DownloadManagerAdapter {
  request(item: DownloadItem): void | Promise<void>;
  requested(): DownloadItem[];
}

/** Ensemble d'adaptateurs média fournis au Player (tous optionnels). */
export interface MediaAdapters {
  video?: VideoPlayerAdapter;
  audio?: AudioPlayerAdapter;
  pdf?: PdfViewerAdapter;
  resources?: ResourceViewerAdapter;
  downloads?: DownloadManagerAdapter;
}

// ─────────────────────────── Implémentations no-op (par défaut) ───────────────────────────

/** Lecteur média inerte : mémorise position/durée, n'ouvre rien. Sert de défaut sûr. */
export class NoopMediaPlayer implements MediaPlayerAdapter {
  readonly kind: "video" | "audio";
  private position = 0;
  private duration = 0;
  constructor(kind: "video" | "audio") {
    this.kind = kind;
  }
  load(): void {}
  play(): void {}
  pause(): void {}
  seek(seconds: number): void {
    this.position = Math.max(0, seconds);
  }
  getPosition(): number {
    return this.position;
  }
  getDuration(): number {
    return this.duration;
  }
  on(): () => void {
    return () => {};
  }
}

/** Gestionnaire de téléchargements par défaut : enregistre l'INTENTION, ne télécharge rien. */
export class RecordingDownloadManager implements DownloadManagerAdapter {
  private items: DownloadItem[] = [];
  request(item: DownloadItem): void {
    this.items.push(item);
  }
  requested(): DownloadItem[] {
    return [...this.items];
  }
}
