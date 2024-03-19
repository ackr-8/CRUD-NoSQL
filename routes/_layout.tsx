import { LayoutProps } from "$fresh/server.ts";
import { Navbar } from "../components/Navbar.tsx";
import BrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-github.tsx";

export default function Layout({ Component, state }: LayoutProps) {
  return (
    <div class="layout text-white">
      <Navbar sessionId={state.sessionId as string | undefined} />
      <Component />
      
    <footer class="fixed bottom-0 left-0 z-20 w-full p-4">
    <div class="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
        <span class="text-sm sm:text-center"><a target="_blank" href="https://ackr8.com">© 2024 Chandra Kiran</a></span>
        <ul class="flex items-center">
            <li>
                <a href="https://github.com/ackr-8/" class="inline-block" aria-label="GitHub">
                    <BrandGithub aria-hidden="true" />
                </a>
            </li>
        </ul>
    </div>
</footer>

    </div>
  );
}