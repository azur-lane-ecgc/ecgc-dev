import { HR } from "@components/_common/HR"
import { TocLink } from "./TocLink"
import globalTOC from "./TocContent.json"

interface SidenavTocProps {
  page?: string
}

interface TocContentType {
  id: string
  content: string
  subheadings: {
    id: string
    content: string
  }[]
}

export const SidenavToc: React.FC<SidenavTocProps> = ({ page = "" }) => {
  const TocContent: TocContentType[] =
    globalTOC.find((file) => file.fileName === page)?.toc || []

  const smToggleFunction = () => {
    if (window.innerWidth < 1016) {
      const mainSidenavButton = document.getElementById("sidenavButton")
      mainSidenavButton?.click()
    }
  }

  return (
    <>
      <span className="sidenav-header block md:hidden">
        <h2 className="text-center">Table of Contents</h2>
        <HR />
      </span>
      {TocContent.length > 0 && (
        <div className="toc">
          <ol>
            {TocContent.map((tocLink) => (
              <li key={tocLink.id}>
                <TocLink id={tocLink.id} level={1} onClick={smToggleFunction}>
                  {tocLink.content}
                </TocLink>
                {tocLink.subheadings.length > 0 && (
                  <ol>
                    {tocLink.subheadings.map((tocLinkSubheading) => (
                      <li key={tocLinkSubheading.id}>
                        <TocLink
                          id={tocLinkSubheading.id}
                          level={2}
                          onClick={smToggleFunction}
                        >
                          {tocLinkSubheading.content}
                        </TocLink>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
