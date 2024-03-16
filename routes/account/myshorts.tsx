// deno-lint-ignore-file
import { Handlers, RouteContext } from "$fresh/server.ts";
import Short from "../../islands/Short.tsx";
import { ShortEntity, deleteShort, getShortsByUser, updateShortOriginalUrl } from "../../utils/db.ts";
import { newShort } from "../../utils/helper.ts";
import { State } from "../_middleware.ts";

export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const originalUrl = form.get("original")?.toString();

    return newShort(originalUrl, ctx.state.user!.login);
  },

  async DELETE(req, ctx) {
    const short = await req.json() as ShortEntity;
    if (ctx.state.user!.login === short.userLogin) {
      await deleteShort(short);
    }

    return ctx.render();
  },

  async PUT(req, ctx) {
    if (!ctx.state.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { shortUrl, newOriginalUrl } = await req.json();
    if (!shortUrl || !newOriginalUrl) {
      return new Response("Invalid request", { status: 400 });
    }

    try {
      await updateShortOriginalUrl(shortUrl, newOriginalUrl);
      return new Response(null, {
        status: 200, // OK
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
};

export default async function ShortsPage(req: Request, ctx: RouteContext<any, State>) {
  const error = new URL(req.url).searchParams.get("error");
  const shorts = await getShortsByUser(ctx.state.user!.login);

  const url = new URL(req.url);
  const hostname = `${url.protocol}//${url.host}`;

  return (
    <div class="px-4 py-8 mx-auto ">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        {error && (
          <div class="w-full bg-red-400 border-l-4 p-4 mb-5" role="alert">
            <p class="font-bold">Error</p>
            <p>Failed creating or updating short</p>
            <p>{error}</p>
          </div>
        )}
        <div class="w-full">
          <div class="mb-4 flex items-center">
            <form method="POST" class="flex items-center w-full">
              <input type="text" name="original" class="px-4 py-2 text-black border rounded border(gray-500 2) w-full" placeholder="Enter your URL here" />
              <button type="submit" class="ml-2 px-3 py-1 bg-sky-500 rounded hover:bg-sky-300 active:bg-sky-350">Submit</button>
            </form>
          </div>
          
          <ul class="space-y-4">
            {shorts.map((short) => 
              <li class="bg-white p-4 rounded-md shadow-md" key={short.shortUrl}>
                <Short short={short} hostname={hostname} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
