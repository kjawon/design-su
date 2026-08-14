import "./SuyeongPageHeading.css"

interface SuyeongPageHeadingProps {
  description: string
  title: string
}

export function SuyeongPageHeading({ description, title }: SuyeongPageHeadingProps) {
  return (
    <div className="sy-page-heading">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
