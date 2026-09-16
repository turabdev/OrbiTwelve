/**
 * Forces a Mongoose .lean() result (or anything containing ObjectId/Date
 * instances) into a plain JSON-safe shape, so it can cross the Server
 * Component -> Client Component boundary. Next.js rejects objects with a
 * toJSON method (ObjectId, Date) as props on "use client" components.
 *
 * Use on every .lean() result that gets passed as a prop to a client
 * component. Cheap, synchronous, safe on arrays or single docs.
 */
export function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}
