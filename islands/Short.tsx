import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/copy.tsx";
import { useState } from "preact/hooks";
import { ShortEntity } from "../utils/db.ts";

interface ShortProps {
  short: ShortEntity;
  hostname: string;
}

export default function Short({ short, hostname }: ShortProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newOriginalUrl, setNewOriginalUrl] = useState<string>(short.originalUrl);
  const [updateError, setUpdateError] = useState<string>("");

  const onUpdate = async () => {
    try {
      const response = await fetch("/account/myshorts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shortUrl: short.shortUrl, newOriginalUrl }),
        credentials: "same-origin",
      });
      if (!response.ok) {
        throw new Error("Failed to update the original URL.");
      }
      window.location.reload();
    } catch (error) {
      setUpdateError(error.message);
    }
  };

  const onDelete = async () => {
    await fetch("/account/myshorts", {
      method: "DELETE",
      credentials: "same-origin",
      body: JSON.stringify(short),
    });
    window.location.reload();
  };

  return (
    <>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div>
            <p class="text-sky-600 font-semibold">Short URL</p>
            <p class="text-gray-600">{hostname}/s/{short.shortUrl}</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(`${hostname}/s/${short.shortUrl}`)}
            class="text-sky-600 hover:text-sky-800 focus:outline-none"
          >
            <IconCopy class="w-6 h-6" />
          </button>
        </div>
        <div>
          {isEdit ? (
            <>
              <button onClick={onUpdate} class="text-sky-600 hover:underline m-3">
                Save
              </button>
              <button onClick={() => setIsEdit(false)} class="text-sky-600 hover:underline m-3">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEdit(true)} class="text-sky-600 hover:underline m-3">
                Update Original
              </button>
              |
              <button onClick={onDelete} class="text-sky-600 hover:underline m-3">
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {isEdit ? (
        <input
          class="mt-4 bg-white text-black border border-gray-300 p-2 rounded-md w-full"
          value={newOriginalUrl}
          onChange={(e) => setNewOriginalUrl(e.target.value)}
        />
      ) : (
        <div class="mt-4 bg-white text-black border border-gray-300 p-2 rounded-md whitespace-pre">
          {short.originalUrl}
        </div>
      )}

      {updateError && (
        <div class="text-red-500">
          {updateError}
        </div>
      )}
    </>
  );
}
