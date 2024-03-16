import { Handlers, PageProps } from "$fresh/server.ts";
import IconBrandGoogle from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-google.tsx"
import { State } from "./_middleware.ts";
import { newShort } from "../utils/helper.ts";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  GET(_req, ctx) {
    return ctx.render({...ctx.state});
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const orginalUrl = form.get("original")?.toString();

    if (!ctx.state.user) {
      const headers = new Headers();
      headers.set("location", "/");
      return new Response(null, {
        status: 302,
        headers,
      });
    }

    return newShort(orginalUrl, ctx.state.user!.login);
  },
}

export default function Home(props: PageProps) {
  return (
    <div class="px-4 py-8 mx-auto ">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/fav.png"
          width="128"
          height="128"
          alt="CK | ackr8.com"
        />
        <h1 class="text-3xl font-bold"> <span class="text-sky-500">ST</span> URL Shortner</h1>
        <p class="my-5 text-xl">
          A No Fuss URL Shortner
        </p>
        {
          props.data.sessionId ? (
            <>
              <form method="POST">
                <input type="text" name="original" class="px-3 py-2 text-black bg-gray-100 rounded border(sky-500 2)" placeholder="Enter your URL" />
                <button type="submit" class="mt-3 px-3 py-2 bg-sky-500 rounded hover:bg-sky-300 active:bg-sky-350">Shorten</button>
              </form>
            </>
          ) : (
            <a href="/signin" class="bg-sky-500 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md flex items-center">
              <IconBrandGoogle class="w-6 h-6 inline-block mr-2" />
              Sign in with Google
            </a>
          )
        }
      </div>
    </div>
  );
}
