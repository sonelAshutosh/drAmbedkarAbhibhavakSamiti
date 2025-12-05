/**
 * SectionHeading component for consistent section titles
 */
export default function SectionHeading({ title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`mb-8 ${alignClass}`}>
      <h2 className="text-3xl lg:text-4xl font-bold text-secondary-dark mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-secondary-dark/80">{subtitle}</p>
      )}
    </div>
  )
}
