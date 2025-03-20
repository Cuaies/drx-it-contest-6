import { StreamableFileOptions } from '@nestjs/common/file-stream/interfaces';

/**
 * Generates `StreamableFileOptions`.
 * @param type The truncated value that will be used for the `Content-Type` response header.
 * @param filename The truncated value that will be used for the `Content-Disposition` response header.
 * @returns Generated options.
 */
export const createStreamableFileOptions = (
  type: 'pdf',
  filename: string,
): StreamableFileOptions => {
  switch (type) {
    case 'pdf':
      return {
        type: 'application/pdf',
        disposition: `attachment; filename="${filename}-${Date.now()}"`,
      };
    default:
      return {};
  }
};
