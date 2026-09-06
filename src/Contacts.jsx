const contactDetails = [
  {
    title: "Email",
    value: "pixelmesh.dev@gmail.com",
    href: "mailto:pixelmesh.dev@gmail.com",
    icon: "✉",
  },
  {
    title: "GitHub",
    value: "https://github.com/pixelmeshdev",
    href: "https://github.com/pixelmeshdev",
    icon: "⌘",
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/ankit-kumar-ux",
    href: "",
    icon: "in",
  },
  {
    title: "Location",
    value: "India",
    icon: "⌖",
  },
];

export default function Contacts() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-content">
        <p className="contact-eyebrow">Get in touch</p>
        <h2 id="contact-title">Contact Details</h2>
        <p className="contact-intro">
          Feel free to reach out directly via email or connect with me on social
          channels.
        </p>

        <div className="contact-list">
          {contactDetails.map((item) => (
            <div className="contact-card" key={item.title}>
              <span className="contact-icon" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <p className="contact-label">{item.title}</p>
                {item.href ? (
                  <a
                    className="contact-value"
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="contact-value">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
