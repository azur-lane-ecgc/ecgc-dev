import { Sidenav } from "./Sidenav"
import { SidenavToc } from "./SidenavToc"

interface SidenavPageProps {
  page: string
}

export const SidenavPage: React.FC<SidenavPageProps> = ({ page }) => {
  return (
    <Sidenav>
      <SidenavToc page={page} />
    </Sidenav>
  )
}
