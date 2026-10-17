import { Sidenav } from "./Sidenav"
import { SidenavToc } from "./SidenavToc"

interface SidenavPageProps {
  btnText?: string
  page: string
}

export const SidenavPage: React.FC<SidenavPageProps> = ({
  btnText = null,
  page,
}) => {
  return (
    <Sidenav btnText={btnText || "Table of Contents"}>
      <SidenavToc page={page} />
    </Sidenav>
  )
}
