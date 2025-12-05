/**
 * PageHeader component for consistent hero sections across pages
 */
export default function PageHeader({
  title,
  backgroundImage = '/images/about_us.png',
}) {
  return (
    <div
      className={`relative h-screen bg-fixed bg-cover bg-center flex items-center justify-center before:absolute before:inset-0 before:bg-secondary-dark/50`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <h1 className="relative z-10 text-5xl lg:text-7xl font-bold text-primary-base drop-shadow-lg">
        {title}
      </h1>
    </div>
  )
}
