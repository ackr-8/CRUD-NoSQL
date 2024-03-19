export function Navbar({ sessionId }: NavbarProps) {
  return (
    <header class="text-white font-medium">
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
        <div class="flex h-16 items-center ">
          <div class="flex items-center flex-1">
            <a href="/" class="flex items-center">
              <div class="ml-1">
              <span class="font-extrabold text-sky-500">Shorty</span>
              </div>
            </a>
          </div>

          <div>
            <nav aria-label="Global">
              <ul class="flex items-center gap-6 text-sm">
                {sessionId ? (
                  <>
                    <li>
                      <a
                        class="font-bold transition hover:text-sky-500"
                        href="/account/myshorts"
                      >
                        Shorts
                      </a>
                    </li>
                    <li>
                      <a
                        class="transition hover:text-sky-500"
                        href="/signout"
                      >
                        Sign Out
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <a
                      class="transition hover:text-sky-500"
                      href="/signin"
                    >
                      Sign In
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
