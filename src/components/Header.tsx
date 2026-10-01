export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-coal/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-extrabold tracking-wide">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-ember to-ember-light" />
          JAVA CHARCOAL
        </div>
        <nav className="hidden gap-7 text-sm text-muted md:flex">
          <a href="#products" className="hover:text-ink">Products</a>
          <a href="#certifications" className="hover:text-ink">Documents</a>
          <a href="#faq" className="hover:text-ink">FAQ and MOQ</a>
          <a href="#contact" className="hover:text-ink">Contact</a>
        </nav>
        <a
          href="#contact"
          className="whitespace-nowrap rounded-lg bg-ember px-4 py-2 text-sm font-bold text-coal"
        >
          Request Quotation
        </a>
      </div>
    </header>
  );
}
