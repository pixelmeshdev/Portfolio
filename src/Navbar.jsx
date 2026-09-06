import { useEffect, useState } from "react"

const navLinks = [
  { id: "hero", title: "Hero" },
  { id: "about", title: "About" },
  { id: "contact", title: "Contact" },
]

export default function Navbar() {
  const [active, setActive] = useState("hero")
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // 1. Target Drei's actual scrollable overlay instead of the window! [cite: 40]
    const scrollContainer = document.querySelector('div[style*="overflow-y: scroll"]') || window

    const handleScroll = () => {
      const currentScroll = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop
      setScrolled(currentScroll > 40)
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    // 2. Observe elements scrolling inside Drei's viewport [cite: 40]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.25, rootMargin: "-15% 0px -60% 0px" }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // 3. Smoothly scroll Drei's container when clicking a link [cite: 40]
  const goTo = (id) => {
    setActive(id)
    setOpen(false)
    
    const target = document.getElementById(id)
    const scrollContainer = document.querySelector('div[style*="overflow-y: scroll"]')

    if (target && scrollContainer) {
      scrollContainer.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className={`site-navbar ${scrolled ? "is-scrolled" : ""}`} aria-label="Main navigation">
      <div className="site-brand-box">
        <a className="site-brand" href="#hero" onClick={(e) => { e.preventDefault(); goTo("hero") }}>AK</a>
      </div>
      <div className="site-links-box">
        <button
          className="site-menu-button"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "×" : "☰"}
        </button>
        <ul className={`site-links ${open ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                className={active === link.id ? "is-active" : ""}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault() // Prevents default hash-jump which breaks 3D scroll [cite: 40]
                  goTo(link.id)
                }}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}