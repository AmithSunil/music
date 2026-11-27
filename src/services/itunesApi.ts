import { ItunesTrackPreview } from '../types/music';

const previewCache = new Map<string, ItunesTrackPreview>();

interface ItunesApiResult {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName?: string;
  previewUrl?: string;
  artworkUrl100?: string;
}

/**
 * Fetches a single verified 30-second song preview from the public iTunes Search API
 */
export async function fetchSongPreview(
  query: string,
  expectedTitle?: string
): Promise<ItunesTrackPreview | null> {
  const cacheKey = query.trim().toLowerCase();
  if (previewCache.has(cacheKey)) {
    return previewCache.get(cacheKey)!;
  }

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&media=music&entity=song&limit=6`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = (await res.json()) as { results?: ItunesApiResult[] };
    const results = (data.results || []).filter((r) => Boolean(r.previewUrl));
    if (results.length === 0) return null;

    // Pick best matching result
    let chosen = results[0];
    if (expectedTitle) {
      const lowerExpected = expectedTitle.toLowerCase();
      const exactMatch = results.find((r) =>
        r.trackName.toLowerCase().includes(lowerExpected)
      );
      if (exactMatch) chosen = exactMatch;
    }

    const mapped: ItunesTrackPreview = {
      trackId: chosen.trackId,
      trackName: chosen.trackName,
      artistName: chosen.artistName,
      collectionName: chosen.collectionName || '',
      previewUrl: chosen.previewUrl!,
      artworkUrl: (chosen.artworkUrl100 || '').replace('100x100bb', '300x300bb'),
    };

    previewCache.set(cacheKey, mapped);
    return mapped;
  } catch {
    return null;
  }
}

/**
 * Searches any songs on iTunes for the "Explore Any Song" ear-training workbench
 */
export async function searchItunesSongs(query: string): Promise<ItunesTrackPreview[]> {
  if (!query.trim()) return [];
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&media=music&entity=song&limit=8`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = (await res.json()) as { results?: ItunesApiResult[] };
    return (data.results || [])
      .filter((r) => Boolean(r.previewUrl))
      .map((r) => ({
        trackId: r.trackId,
        trackName: r.trackName,
        artistName: r.artistName,
        collectionName: r.collectionName || '',
        previewUrl: r.previewUrl!,
        artworkUrl: (r.artworkUrl100 || '').replace('100x100bb', '300x300bb'),
      }));
  } catch {
    return [];
  }
}
