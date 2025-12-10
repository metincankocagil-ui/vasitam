"use client";

import { useCallback, useMemo, useRef, useState, type DragEvent } from "react";

type ImageItem = {
  id: string;
  dataUrl: string;
  name: string;
};

type ListingImageUploaderProps = {
  initialImages?: string[];
};

const MAX_IMAGES = 8;
const MAX_FILE_SIZE_MB = 4;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_TOTAL_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_ENTRY_BYTE_SIZE = 400_000;

export default function ListingImageUploader({ initialImages = [] }: ListingImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialValues = useMemo(() => {
    const normalized = normalizeInitialImages(initialImages);
    return {
      images: normalized,
      coverId: normalized[0]?.id ?? null,
    };
  }, [initialImages]);
  const [images, setImages] = useState<ImageItem[]>(() => initialValues.images);
  const [coverId, setCoverId] = useState<string | null>(() => initialValues.coverId);
  const [error, setError] = useState<string>("");
  const totalImageBytes = useMemo(() => getTotalBytes(images), [images]);
  const exceedsTotalLimit = totalImageBytes > MAX_TOTAL_IMAGE_BYTES;

  const handleFiles = useCallback(
    async (filesList: FileList | null) => {
      if (!filesList) {
        return;
      }
      const remainingSlots = MAX_IMAGES - images.length;
      if (remainingSlots <= 0) {
        setError(`En fazla ${MAX_IMAGES} görsel yükleyebilirsiniz.`);
        return;
      }

      const selectedFiles = Array.from(filesList).slice(0, remainingSlots);
      const oversizedFile = selectedFiles.find((file) => file.size > MAX_FILE_SIZE_BYTES);
      if (oversizedFile) {
        setError(`Her görsel en fazla ${MAX_FILE_SIZE_MB}MB olabilir (${oversizedFile.name}).`);
        return;
      }

      try {
        const dataUrls = await Promise.all(selectedFiles.map(convertFileToDataUrl));
        const newImages = dataUrls.map((dataUrl, idx) => {
          if (dataUrl.length > MAX_ENTRY_BYTE_SIZE) {
            throw new Error("entry-too-large");
          }
          return {
            id: crypto.randomUUID(),
            dataUrl,
            name: selectedFiles[idx]?.name ?? `Görsel ${images.length + idx + 1}`,
          };
        });
        const nextImages = [...images, ...newImages];
        if (getTotalBytes(nextImages) > MAX_TOTAL_IMAGE_BYTES) {
          setError("Görsellerin toplam boyutu 5MB sınırını aşamaz. Lütfen daha küçük görseller seçin.");
          return;
        }

        setImages(nextImages);
        setCoverId((current) => current ?? nextImages[0]?.id ?? null);
        setError("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (err) {
        if ((err as Error)?.message === "entry-too-large") {
          setError("Seçtiğiniz görsellerden biri çok büyük. Lütfen daha küçük bir görsel seçin.");
        } else {
          setError("Görseller yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.");
        }
      }
    },
    [images],
  );

  const handleSelectFiles = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleCoverSelect = useCallback((id: string) => {
    setCoverId(id);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setImages((prev) => {
      const next = prev.filter((image) => image.id !== id);
      setCoverId((current) => {
        if (current === id) {
          return next[0]?.id ?? null;
        }
        return current;
      });
      return next;
    });
    setError("");
  }, []);

  const dropHandlers = useMemo(
    () => ({
      onDragOver: (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      },
      onDrop: (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
      },
    }),
    [handleFiles],
  );

  const coverImage = images.find((image) => image.id === coverId)?.dataUrl ?? "";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Görseller</label>
          <p className="text-xs text-gray-500">
            En fazla {MAX_IMAGES} görsel ekleyebilir, birini vitrin fotoğrafı olarak seçebilirsiniz.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSelectFiles}
          className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Görsel Ekle
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => handleFiles(event.target.files)}
        className="hidden"
      />

      <div
        className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center text-sm text-gray-500 transition hover:border-blue-300 hover:bg-white"
        onClick={handleSelectFiles}
        {...dropHandlers}
      >
        <p className="text-base font-medium text-gray-700">Görselleri sürükleyip bırakın</p>
        <p>veya bilgisayarınızdan seçin</p>
        <p className="text-xs text-gray-400">PNG, JPG veya WEBP • Max {MAX_FILE_SIZE_MB}MB</p>
      </div>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      {!error && exceedsTotalLimit && (
        <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Görsellerin toplam boyutu 5MB sınırını aşıyor. Lütfen bazı görselleri kaldırın.
        </div>
      )}

      {images.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {images.map((image) => {
            const isCover = image.id === coverId;
            return (
              <div
                key={image.id}
                className={`space-y-3 rounded-2xl border p-3 ${
                  isCover ? "border-blue-400 bg-blue-50/40" : "border-gray-200 bg-white"
                }`}
              >
                <div className="aspect-video overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={image.dataUrl}
                    alt={image.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => handleCoverSelect(image.id)}
                    className={`rounded-full px-3 py-1 ${
                      isCover
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {isCover ? "Vitrin Fotoğrafı" : "Vitrin Yap"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(image.id)}
                    className="text-red-500 transition hover:text-red-600"
                  >
                    Sil
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {images.map((image) => (
        <input key={image.id} type="hidden" name="uploadedImages" value={image.dataUrl} />
      ))}
      <input type="hidden" name="coverImage" value={coverImage} />
    </div>
  );
}

function convertFileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("read_error"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function normalizeInitialImages(images: string[]) {
  return images
    .filter((image): image is string => typeof image === "string" && image.length > 0)
    .slice(0, MAX_IMAGES)
    .map((dataUrl, idx) => ({
      id: `initial-image-${idx}`,
      dataUrl,
      name: `Görsel ${idx + 1}`,
    }));
}

function getTotalBytes(items: ImageItem[]) {
  return items.reduce((sum, item) => sum + item.dataUrl.length, 0);
}
